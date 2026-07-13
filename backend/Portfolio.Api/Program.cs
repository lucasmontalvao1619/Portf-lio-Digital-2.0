using System.Threading.RateLimiting;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Api.Models;
using Portfolio.Api.Services;
using Resend;

var builder = WebApplication.CreateBuilder(args);
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();

// Limita payloads antes de chegar aos controllers; o formulário precisa de poucos KB.
builder.WebHost.ConfigureKestrel(options =>
{
    options.Limits.MaxRequestBodySize = 16 * 1024;
});

// Controllers + ProblemDetails padronizam respostas de validação sem expor detalhes internos.
builder.Services.AddControllers();
builder.Services.AddProblemDetails();
builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.InvalidModelStateResponseFactory = context =>
    {
        var problem = new ValidationProblemDetails(context.ModelState)
        {
            Title = "Dados inválidos.",
            Status = StatusCodes.Status400BadRequest,
            Detail = "Revise os campos enviados e tente novamente.",
            Instance = context.HttpContext.Request.Path
        };

        return new BadRequestObjectResult(problem)
        {
            ContentTypes = { "application/problem+json" }
        };
    };
});

// CORS fica em configuração: no desenvolvimento, apenas Vite em localhost/127.0.0.1.
const string FrontendCorsPolicy = "FrontendCorsPolicy";
var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>()
    ?? Array.Empty<string>();
var corsOriginsFromEnvironment = Environment.GetEnvironmentVariable("CORS_ALLOWED_ORIGINS");

if (!string.IsNullOrWhiteSpace(corsOriginsFromEnvironment))
{
    allowedOrigins = corsOriginsFromEnvironment
        .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
}

if (!builder.Environment.IsDevelopment() && allowedOrigins.Length == 0)
{
    throw new InvalidOperationException("Configure Cors:AllowedOrigins or CORS_ALLOWED_ORIGINS before running in production.");
}

builder.Services.AddCors(options =>
{
    options.AddPolicy(FrontendCorsPolicy, policy =>
    {
        policy.WithOrigins(allowedOrigins)
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// Rate limiting por IP reduz spam e automação abusiva no endpoint de contato.
builder.Services.AddRateLimiter(options =>
{
    options.OnRejected = async (context, cancellationToken) =>
    {
        context.HttpContext.Response.StatusCode = StatusCodes.Status429TooManyRequests;
        context.HttpContext.Response.ContentType = "application/problem+json";

        await context.HttpContext.Response.WriteAsJsonAsync(new ProblemDetails
        {
            Title = "Muitas tentativas.",
            Detail = "Aguarde um pouco antes de enviar outra mensagem.",
            Status = StatusCodes.Status429TooManyRequests,
            Instance = context.HttpContext.Request.Path
        }, cancellationToken);
    };

    options.AddPolicy("contact", httpContext =>
    {
        var clientIp = httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown";

        return RateLimitPartition.GetFixedWindowLimiter(clientIp, _ => new FixedWindowRateLimiterOptions
        {
            PermitLimit = 5,
            Window = TimeSpan.FromMinutes(1),
            QueueLimit = 0,
            AutoReplenishment = true
        });
    });

    // /api/github/stats é somente leitura, cacheado, mas ainda assim limitamos por IP
    // para evitar amplification em caso de burst.
    options.AddPolicy("github", httpContext =>
    {
        var clientIp = httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown";

        return RateLimitPartition.GetFixedWindowLimiter(clientIp, _ => new FixedWindowRateLimiterOptions
        {
            PermitLimit = 30,
            Window = TimeSpan.FromMinutes(1),
            QueueLimit = 0,
            AutoReplenishment = true
        });
    });
});

// Resend usa apenas variável de ambiente para token; nenhuma chave fica no código.
builder.Services.AddOptions();
builder.Services.AddHttpClient<ResendClient>();
builder.Services.Configure<ResendClientOptions>(options =>
{
    options.ApiToken = Environment.GetEnvironmentVariable("RESEND_APITOKEN") ?? string.Empty;
});
builder.Services.AddTransient<IResend, ResendClient>();

// Opções não secretas do envio. Em produção, sobrescreva por variáveis de ambiente.
builder.Services.Configure<ContactEmailOptions>(builder.Configuration.GetSection(ContactEmailOptions.SectionName));
builder.Services.AddSingleton<IInputSanitizer, InputSanitizer>();
builder.Services.AddScoped<IEmailService, EmailService>();

// Proxy de estatísticas do GitHub: HttpClientFactory + IMemoryCache para
// reduzir chamadas e ficar dentro do limite de 60 req/hora sem token.
var githubUsernameFromEnv = Environment.GetEnvironmentVariable("GITHUBSTATS__USERNAME");
var githubTokenFromEnv = Environment.GetEnvironmentVariable("GITHUBSTATS__TOKEN");
builder.Services.AddHttpClient();
builder.Services.AddMemoryCache();
builder.Services.AddResponseCaching();
builder.Services.Configure<GitHubStatsOptions>(options =>
{
    builder.Configuration.GetSection(GitHubStatsOptions.SectionName).Bind(options);
    if (!string.IsNullOrWhiteSpace(githubUsernameFromEnv))
    {
        options.Username = githubUsernameFromEnv;
    }
    if (!string.IsNullOrWhiteSpace(githubTokenFromEnv))
    {
        options.Token = githubTokenFromEnv;
    }
});
builder.Services.AddScoped<IGitHubStatsService, GitHubStatsService>();

var app = builder.Build();

// Handler global evita stack traces em respostas HTTP, inclusive em produção.
app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        var exceptionFeature = context.Features.Get<IExceptionHandlerFeature>();
        var exception = exceptionFeature?.Error;
        var isPayloadTooLarge = exception is BadHttpRequestException badRequestException
            && badRequestException.StatusCode == StatusCodes.Status413PayloadTooLarge;

        if (isPayloadTooLarge)
        {
            app.Logger.LogWarning(exception, "Request payload exceeded the configured limit");
        }
        else
        {
            app.Logger.LogError(exception, "Unhandled API error");
        }

        context.Response.StatusCode = isPayloadTooLarge
            ? StatusCodes.Status413PayloadTooLarge
            : StatusCodes.Status500InternalServerError;
        context.Response.ContentType = "application/problem+json";

        await context.Response.WriteAsJsonAsync(new ProblemDetails
        {
            Title = isPayloadTooLarge ? "Payload muito grande." : "Erro interno.",
            Detail = isPayloadTooLarge
                ? "O corpo da requisição excede o tamanho máximo permitido."
                : "Não foi possível processar a solicitação agora.",
            Status = context.Response.StatusCode,
            Instance = context.Request.Path
        });
    });
});

if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}
app.UseCors(FrontendCorsPolicy);
app.UseResponseCaching();
app.UseRateLimiter();
app.MapControllers();

app.Run();

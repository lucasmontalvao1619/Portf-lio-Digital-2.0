using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Portfolio.Api.DTOs;
using Portfolio.Api.Models;
using Portfolio.Api.Services;

namespace Portfolio.Api.Controllers;

[ApiController]
[Route("api/contact")]
[EnableRateLimiting("contact")]
[RequestSizeLimit(16 * 1024)]
public sealed class ContactController : ControllerBase
{
    private readonly IEmailService _emailService;
    private readonly IInputSanitizer _sanitizer;

    public ContactController(IEmailService emailService, IInputSanitizer sanitizer)
    {
        _emailService = emailService;
        _sanitizer = sanitizer;
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status429TooManyRequests)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> Send([FromBody] ContactRequest request, CancellationToken cancellationToken)
    {
        if (!string.IsNullOrWhiteSpace(request.Website))
        {
            return Ok(new { message = "Mensagem recebida." });
        }

        // Futuro Turnstile: validar request.TurnstileToken aqui antes de enviar o e-mail.
        var contact = new ContactMessage(
            _sanitizer.CleanText(request.Name, 120),
            _sanitizer.CleanEmail(request.Email),
            _sanitizer.CleanText(request.Message, 2000));

        await _emailService.SendContactEmailAsync(contact, cancellationToken);

        return Ok(new { message = "Mensagem enviada com sucesso." });
    }
}

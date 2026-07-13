using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Portfolio.Api.Services;

namespace Portfolio.Api.Controllers;

[ApiController]
[Route("api/github")]
[EnableRateLimiting("github")]
public sealed class GitHubController : ControllerBase
{
    private readonly IGitHubStatsService _statsService;
    private readonly ILogger<GitHubController> _logger;

    public GitHubController(IGitHubStatsService statsService, ILogger<GitHubController> logger)
    {
        _statsService = statsService;
        _logger = logger;
    }

    [HttpGet("stats")]
    [ResponseCache(Duration = 300, Location = ResponseCacheLocation.Any)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status502BadGateway)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status503ServiceUnavailable)]
    public async Task<IActionResult> GetStats(CancellationToken cancellationToken)
    {
        try
        {
            var stats = await _statsService.GetStatsAsync(cancellationToken);
            return Ok(stats);
        }
        catch (InvalidOperationException ex)
        {
            _logger.LogError(ex, "GitHub stats não configurado.");
            return StatusCode(StatusCodes.Status503ServiceUnavailable, new ProblemDetails
            {
                Title = "Serviço indisponível.",
                Detail = "GitHub stats não está configurado.",
                Status = StatusCodes.Status503ServiceUnavailable,
            });
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex, "Falha ao consultar GitHub API.");
            return StatusCode(StatusCodes.Status502BadGateway, new ProblemDetails
            {
                Title = "Falha ao consultar GitHub.",
                Detail = "Tente novamente em instantes.",
                Status = StatusCodes.Status502BadGateway,
            });
        }
    }
}

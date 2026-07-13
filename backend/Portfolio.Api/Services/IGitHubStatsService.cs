using Portfolio.Api.DTOs;

namespace Portfolio.Api.Services;

public interface IGitHubStatsService
{
    Task<GitHubStatsResponse> GetStatsAsync(CancellationToken cancellationToken);
}

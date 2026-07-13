namespace Portfolio.Api.DTOs;

public sealed record GitHubStatsResponse(
    GitHubProfile Profile,
    GitHubTotals Totals,
    IReadOnlyList<GitHubLanguage> TopLanguages,
    IReadOnlyList<GitHubRepositorySummary> TopRepositories,
    DateTime GeneratedAt);

public sealed record GitHubProfile(
    string Login,
    string? Name,
    string? Bio,
    string AvatarUrl,
    string HtmlUrl,
    int PublicRepos,
    int Followers,
    int Following);

public sealed record GitHubTotals(
    int TotalStars,
    int TotalForks,
    int TotalRepositories);

public sealed record GitHubLanguage(
    string Name,
    int RepositoryCount,
    double Percentage);

public sealed record GitHubRepositorySummary(
    string Name,
    string? Description,
    int Stars,
    int Forks,
    string? Language,
    string HtmlUrl,
    DateTime UpdatedAt);

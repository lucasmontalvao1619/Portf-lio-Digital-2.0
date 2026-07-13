using System.Net.Http.Headers;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using Portfolio.Api.DTOs;
using Portfolio.Api.Models;

namespace Portfolio.Api.Services;

public sealed class GitHubStatsService : IGitHubStatsService
{
    private const string CacheKey = "github-stats";
    private const string GitHubApiBase = "https://api.github.com";
    private const string UserAgent = "portfolio-lucas-montalvao";

    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower,
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
    };

    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IMemoryCache _cache;
    private readonly GitHubStatsOptions _options;
    private readonly ILogger<GitHubStatsService> _logger;

    public GitHubStatsService(
        IHttpClientFactory httpClientFactory,
        IMemoryCache cache,
        IOptions<GitHubStatsOptions> options,
        ILogger<GitHubStatsService> logger)
    {
        _httpClientFactory = httpClientFactory;
        _cache = cache;
        _options = options.Value;
        _logger = logger;
    }

    public async Task<GitHubStatsResponse> GetStatsAsync(CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(_options.Username))
        {
            throw new InvalidOperationException("GitHubStats:Username não configurado.");
        }

        if (_cache.TryGetValue(CacheKey, out GitHubStatsResponse? cached) && cached is not null)
        {
            return cached;
        }

        var stats = await FetchStatsAsync(cancellationToken);

        var cacheDuration = TimeSpan.FromMinutes(Math.Max(1, _options.CacheMinutes));
        _cache.Set(CacheKey, stats, cacheDuration);

        return stats;
    }

    private async Task<GitHubStatsResponse> FetchStatsAsync(CancellationToken cancellationToken)
    {
        using var client = CreateClient();

        var profile = await GetAsync<GitHubUserPayload>(client, $"/users/{_options.Username}", cancellationToken)
            ?? throw new InvalidOperationException("Perfil do GitHub não pôde ser obtido.");

        var repositories = await GetAsync<List<GitHubRepositoryPayload>>(
            client,
            $"/users/{_options.Username}/repos?per_page=100&type=owner&sort=updated",
            cancellationToken) ?? new List<GitHubRepositoryPayload>();

        var visibleRepos = repositories.Where(repo => !repo.Fork && !repo.Private).ToList();

        var totals = new GitHubTotals(
            TotalStars: visibleRepos.Sum(repo => repo.StargazersCount),
            TotalForks: visibleRepos.Sum(repo => repo.ForksCount),
            TotalRepositories: visibleRepos.Count);

        var languages = BuildLanguageBreakdown(visibleRepos);

        var topRepos = visibleRepos
            .OrderByDescending(repo => repo.StargazersCount)
            .ThenByDescending(repo => repo.UpdatedAt)
            .Take(Math.Max(1, _options.TopReposCount))
            .Select(repo => new GitHubRepositorySummary(
                Name: repo.Name,
                Description: repo.Description,
                Stars: repo.StargazersCount,
                Forks: repo.ForksCount,
                Language: repo.Language,
                HtmlUrl: repo.HtmlUrl,
                UpdatedAt: repo.UpdatedAt))
            .ToList();

        var profileDto = new GitHubProfile(
            Login: profile.Login,
            Name: profile.Name,
            Bio: profile.Bio,
            AvatarUrl: profile.AvatarUrl,
            HtmlUrl: profile.HtmlUrl,
            PublicRepos: profile.PublicRepos,
            Followers: profile.Followers,
            Following: profile.Following);

        return new GitHubStatsResponse(
            Profile: profileDto,
            Totals: totals,
            TopLanguages: languages,
            TopRepositories: topRepos,
            GeneratedAt: DateTime.UtcNow);
    }

    private IReadOnlyList<GitHubLanguage> BuildLanguageBreakdown(List<GitHubRepositoryPayload> repositories)
    {
        var withLanguage = repositories
            .Where(repo => !string.IsNullOrWhiteSpace(repo.Language))
            .ToList();

        if (withLanguage.Count == 0)
        {
            return Array.Empty<GitHubLanguage>();
        }

        var totalWithLanguage = withLanguage.Count;
        var take = Math.Max(1, _options.TopLanguagesCount);

        return withLanguage
            .GroupBy(repo => repo.Language!)
            .Select(group => new GitHubLanguage(
                Name: group.Key,
                RepositoryCount: group.Count(),
                Percentage: Math.Round((double)group.Count() / totalWithLanguage * 100, 1)))
            .OrderByDescending(language => language.RepositoryCount)
            .ThenBy(language => language.Name)
            .Take(take)
            .ToList();
    }

    private HttpClient CreateClient()
    {
        var client = _httpClientFactory.CreateClient();
        client.BaseAddress = new Uri(GitHubApiBase);
        client.Timeout = TimeSpan.FromSeconds(10);
        client.DefaultRequestHeaders.UserAgent.ParseAdd(UserAgent);
        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/vnd.github+json"));
        client.DefaultRequestHeaders.Add("X-GitHub-Api-Version", "2022-11-28");

        if (!string.IsNullOrWhiteSpace(_options.Token))
        {
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _options.Token);
        }

        return client;
    }

    private async Task<T?> GetAsync<T>(HttpClient client, string path, CancellationToken cancellationToken)
    {
        using var response = await client.GetAsync(path, cancellationToken);

        if (!response.IsSuccessStatusCode)
        {
            var body = await response.Content.ReadAsStringAsync(cancellationToken);
            _logger.LogWarning("GitHub API {Path} respondeu {Status}: {Body}", path, (int)response.StatusCode, Truncate(body, 400));
            throw new HttpRequestException($"GitHub API respondeu {(int)response.StatusCode}.");
        }

        return await response.Content.ReadFromJsonAsync<T>(JsonOptions, cancellationToken);
    }

    private static string Truncate(string value, int max) => value.Length <= max ? value : value[..max];

    private sealed record GitHubUserPayload(
        string Login,
        string? Name,
        string? Bio,
        [property: JsonPropertyName("avatar_url")] string AvatarUrl,
        [property: JsonPropertyName("html_url")] string HtmlUrl,
        [property: JsonPropertyName("public_repos")] int PublicRepos,
        int Followers,
        int Following);

    private sealed record GitHubRepositoryPayload(
        string Name,
        string? Description,
        [property: JsonPropertyName("html_url")] string HtmlUrl,
        [property: JsonPropertyName("stargazers_count")] int StargazersCount,
        [property: JsonPropertyName("forks_count")] int ForksCount,
        string? Language,
        bool Fork,
        bool Private,
        [property: JsonPropertyName("updated_at")] DateTime UpdatedAt);
}

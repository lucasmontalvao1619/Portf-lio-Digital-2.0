using System.Net;
using System.Text;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Options;
using Portfolio.Api.Models;
using Portfolio.Api.Services;

namespace Portfolio.Api.Tests;

public sealed class GitHubStatsServiceTests
{
    private const string UserJson = """
        {
          "login": "lucasmontalvao1619",
          "name": "Lucas Montalvão",
          "bio": "Estudante de Ciência da Computação",
          "avatar_url": "https://avatars.githubusercontent.com/u/1",
          "html_url": "https://github.com/lucasmontalvao1619",
          "public_repos": 10,
          "followers": 12,
          "following": 8
        }
        """;

    private const string ReposJson = """
        [
          {
            "name": "portfolio",
            "description": "Meu portfólio",
            "html_url": "https://github.com/lucasmontalvao1619/portfolio",
            "stargazers_count": 5,
            "forks_count": 2,
            "language": "TypeScript",
            "fork": false,
            "private": false,
            "updated_at": "2026-07-01T00:00:00Z"
          },
          {
            "name": "api-dotnet",
            "description": null,
            "html_url": "https://github.com/lucasmontalvao1619/api-dotnet",
            "stargazers_count": 3,
            "forks_count": 1,
            "language": "C#",
            "fork": false,
            "private": false,
            "updated_at": "2026-06-01T00:00:00Z"
          },
          {
            "name": "scripts",
            "description": null,
            "html_url": "https://github.com/lucasmontalvao1619/scripts",
            "stargazers_count": 1,
            "forks_count": 0,
            "language": "TypeScript",
            "fork": false,
            "private": false,
            "updated_at": "2026-05-01T00:00:00Z"
          },
          {
            "name": "fork-de-terceiro",
            "description": null,
            "html_url": "https://github.com/lucasmontalvao1619/fork-de-terceiro",
            "stargazers_count": 100,
            "forks_count": 50,
            "language": "Go",
            "fork": true,
            "private": false,
            "updated_at": "2026-04-01T00:00:00Z"
          }
        ]
        """;

    [Fact]
    public async Task GetStatsAsync_AgregaTotaisIgnorandoForks()
    {
        var service = CreateService(out _);

        var stats = await service.GetStatsAsync(CancellationToken.None);

        Assert.Equal(3, stats.Totals.TotalRepositories);
        Assert.Equal(9, stats.Totals.TotalStars);
        Assert.Equal(3, stats.Totals.TotalForks);
        Assert.DoesNotContain(stats.TopRepositories, repo => repo.Name == "fork-de-terceiro");
    }

    [Fact]
    public async Task GetStatsAsync_CalculaPercentualDasLinguagens()
    {
        var service = CreateService(out _);

        var stats = await service.GetStatsAsync(CancellationToken.None);

        var typescript = Assert.Single(stats.TopLanguages, language => language.Name == "TypeScript");
        Assert.Equal(2, typescript.RepositoryCount);
        Assert.Equal(66.7, typescript.Percentage);

        var csharp = Assert.Single(stats.TopLanguages, language => language.Name == "C#");
        Assert.Equal(33.3, csharp.Percentage);
    }

    [Fact]
    public async Task GetStatsAsync_OrdenaTopRepositoriosPorEstrelas()
    {
        var service = CreateService(out _);

        var stats = await service.GetStatsAsync(CancellationToken.None);

        Assert.Equal(new[] { "portfolio", "api-dotnet", "scripts" }, stats.TopRepositories.Select(repo => repo.Name));
    }

    [Fact]
    public async Task GetStatsAsync_UsaCacheNaSegundaChamada()
    {
        var service = CreateService(out var handler);

        await service.GetStatsAsync(CancellationToken.None);
        var requestsAfterFirstCall = handler.RequestCount;

        await service.GetStatsAsync(CancellationToken.None);

        Assert.Equal(requestsAfterFirstCall, handler.RequestCount);
    }

    [Fact]
    public async Task GetStatsAsync_FalhaQuandoUsernameNaoConfigurado()
    {
        var service = CreateService(out _, username: "");

        await Assert.ThrowsAsync<InvalidOperationException>(
            () => service.GetStatsAsync(CancellationToken.None));
    }

    private static GitHubStatsService CreateService(out StubGitHubHandler handler, string username = "lucasmontalvao1619")
    {
        handler = new StubGitHubHandler();
        var options = Options.Create(new GitHubStatsOptions
        {
            Username = username,
            CacheMinutes = 10,
            TopLanguagesCount = 5,
            TopReposCount = 4
        });

        return new GitHubStatsService(
            new StubHttpClientFactory(handler),
            new MemoryCache(new MemoryCacheOptions()),
            options,
            NullLogger<GitHubStatsService>.Instance);
    }

    private sealed class StubHttpClientFactory(HttpMessageHandler handler) : IHttpClientFactory
    {
        public HttpClient CreateClient(string name) => new(handler, disposeHandler: false);
    }

    private sealed class StubGitHubHandler : HttpMessageHandler
    {
        public int RequestCount { get; private set; }

        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            RequestCount++;

            var path = request.RequestUri!.AbsolutePath;
            var payload = path.EndsWith("/repos", StringComparison.Ordinal) ? ReposJson : UserJson;

            return Task.FromResult(new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(payload, Encoding.UTF8, "application/json")
            });
        }
    }
}

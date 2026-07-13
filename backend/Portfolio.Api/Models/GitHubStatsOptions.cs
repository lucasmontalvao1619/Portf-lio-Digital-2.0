using System.ComponentModel.DataAnnotations;

namespace Portfolio.Api.Models;

public sealed class GitHubStatsOptions
{
    public const string SectionName = "GitHubStats";

    [Required]
    public string Username { get; set; } = string.Empty;

    // Personal Access Token opcional. Sem token o limite é 60 req/hora por IP,
    // que já basta porque o resultado é cacheado por vários minutos.
    public string? Token { get; set; }

    // Tempo de cache em minutos para as estatísticas agregadas.
    public int CacheMinutes { get; set; } = 10;

    // Quantidade máxima de linguagens e repositórios expostos na resposta.
    public int TopLanguagesCount { get; set; } = 5;
    public int TopReposCount { get; set; } = 4;
}

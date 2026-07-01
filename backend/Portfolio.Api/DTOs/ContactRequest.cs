using System.ComponentModel.DataAnnotations;

namespace Portfolio.Api.DTOs;

public sealed class ContactRequest
{
    [Required(ErrorMessage = "Nome é obrigatório.")]
    [StringLength(120, ErrorMessage = "Nome deve ter no máximo 120 caracteres.")]
    public string Name { get; init; } = string.Empty;

    [Required(ErrorMessage = "E-mail é obrigatório.")]
    [EmailAddress(ErrorMessage = "E-mail inválido.")]
    [StringLength(254, ErrorMessage = "E-mail deve ter no máximo 254 caracteres.")]
    public string Email { get; init; } = string.Empty;

    [Required(ErrorMessage = "Mensagem é obrigatória.")]
    [MaxLength(2000, ErrorMessage = "Mensagem deve ter no máximo 2000 caracteres.")]
    public string Message { get; init; } = string.Empty;

    // Honeypot: usuários reais não veem esse campo; bots costumam preenchê-lo.
    [StringLength(100)]
    public string? Website { get; init; }

    // Preparado para validação futura com Cloudflare Turnstile.
    [StringLength(2048)]
    public string? TurnstileToken { get; init; }
}

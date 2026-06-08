using System.ComponentModel.DataAnnotations;

namespace Portfolio.Api.Models;

public sealed class ContactEmailOptions
{
    public const string SectionName = "ContactEmail";

    [Required]
    public string FromEmail { get; init; } = string.Empty;

    [Required]
    [EmailAddress]
    public string ToEmail { get; init; } = string.Empty;
}

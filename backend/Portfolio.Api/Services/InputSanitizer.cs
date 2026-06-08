using System.Text;
using System.Text.RegularExpressions;

namespace Portfolio.Api.Services;

public sealed partial class InputSanitizer : IInputSanitizer
{
    public string CleanText(string value, int maxLength)
    {
        var normalized = (value ?? string.Empty).Normalize(NormalizationForm.FormKC);
        var withoutTags = HtmlTagRegex().Replace(normalized, string.Empty);
        var withoutControls = new string(withoutTags
            .Where(character => !char.IsControl(character) || character is '\r' or '\n' or '\t')
            .ToArray());
        var trimmed = withoutControls.Trim();

        return trimmed.Length <= maxLength ? trimmed : trimmed[..maxLength];
    }

    public string CleanEmail(string value)
    {
        var normalized = CleanText(value, 254);
        return WhitespaceRegex().Replace(normalized, string.Empty).ToLowerInvariant();
    }

    [GeneratedRegex("<.*?>", RegexOptions.Compiled, matchTimeoutMilliseconds: 500)]
    private static partial Regex HtmlTagRegex();

    [GeneratedRegex(@"\s+", RegexOptions.Compiled, matchTimeoutMilliseconds: 500)]
    private static partial Regex WhitespaceRegex();
}

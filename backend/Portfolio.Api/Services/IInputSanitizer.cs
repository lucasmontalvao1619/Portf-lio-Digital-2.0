namespace Portfolio.Api.Services;

public interface IInputSanitizer
{
    string CleanText(string value, int maxLength);
    string CleanEmail(string value);
}

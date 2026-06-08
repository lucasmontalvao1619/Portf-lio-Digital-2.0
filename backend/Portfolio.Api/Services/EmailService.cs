using Microsoft.Extensions.Options;
using Portfolio.Api.Models;
using Resend;

namespace Portfolio.Api.Services;

public sealed class EmailService : IEmailService
{
    private const string Subject = "Novo contato do portfólio";

    private readonly IResend _resend;
    private readonly ContactEmailOptions _options;
    private readonly ILogger<EmailService> _logger;

    public EmailService(
        IResend resend,
        IOptions<ContactEmailOptions> options,
        ILogger<EmailService> logger)
    {
        _resend = resend;
        _options = options.Value;
        _logger = logger;
    }

    public async Task SendContactEmailAsync(ContactMessage contact, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(_options.FromEmail) || string.IsNullOrWhiteSpace(_options.ToEmail))
        {
            throw new InvalidOperationException("Contact email options are not configured.");
        }

        var message = new EmailMessage
        {
            From = _options.FromEmail,
            Subject = Subject,
            TextBody = BuildBody(contact),
            ReplyTo = contact.Email
        };

        message.To.Add(_options.ToEmail);

        await _resend.EmailSendAsync(message, cancellationToken);
        _logger.LogInformation("Portfolio contact email sent for {Email}", contact.Email);
    }

    private static string BuildBody(ContactMessage contact)
    {
        return $"""
            Nome: {contact.Name}

            Email: {contact.Email}

            Mensagem:
            {contact.Message}
            """;
    }
}

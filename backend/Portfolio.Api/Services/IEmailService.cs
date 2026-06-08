using Portfolio.Api.Models;

namespace Portfolio.Api.Services;

public interface IEmailService
{
    Task SendContactEmailAsync(ContactMessage contact, CancellationToken cancellationToken);
}

using SevenPersonal.Application.Dtos;
using SevenPersonal.Application.Interfaces;
using SevenPersonal.Domain.Interfaces;

namespace SevenPersonal.Application.Services;

public class SiteSettingsService : ISiteSettingsService
{
    private readonly ISiteSettingsRepository _repo;
    public SiteSettingsService(ISiteSettingsRepository repo) => _repo = repo;

    public async Task<SiteSettingsDto> GetAsync()
    {
        var s = await _repo.GetAsync();
        return new SiteSettingsDto(
            s.WhatsappNumber, s.InstagramUrl, s.Address, s.OpeningHours, s.WhatsappDefaultMessage);
    }

    public async Task<SiteSettingsDto> UpdateAsync(SiteSettingsInputDto input)
    {
        var s = await _repo.GetAsync();

        s.WhatsappNumber = input.WhatsappNumber;
        s.InstagramUrl = input.InstagramUrl;
        s.Address = input.Address;
        s.OpeningHours = input.OpeningHours;
        s.WhatsappDefaultMessage = input.WhatsappDefaultMessage;
        s.UpdatedAt = DateTime.UtcNow;

        await _repo.SaveChangesAsync();
        return new SiteSettingsDto(
            s.WhatsappNumber, s.InstagramUrl, s.Address, s.OpeningHours, s.WhatsappDefaultMessage);
    }
}

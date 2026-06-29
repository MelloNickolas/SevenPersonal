using Microsoft.EntityFrameworkCore;
using SevenPersonal.Domain.Entities;
using SevenPersonal.Domain.Interfaces;
using SevenPersonal.Repository.Context;

namespace SevenPersonal.Repository.Repositories;

public class SiteSettingsRepository : ISiteSettingsRepository
{
    private readonly AppDbContext _db;
    public SiteSettingsRepository(AppDbContext db) => _db = db;

    public async Task<SiteSettings> GetAsync()
    {
        var settings = await _db.SiteSettings.FirstOrDefaultAsync(s => s.Id == 1);
        if (settings is null)
        {
            settings = new SiteSettings { Id = 1 };
            await _db.SiteSettings.AddAsync(settings);
            await _db.SaveChangesAsync();
        }
        return settings;
    }

    public Task SaveChangesAsync() => _db.SaveChangesAsync();
}

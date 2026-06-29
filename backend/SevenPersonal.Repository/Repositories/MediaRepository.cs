using Microsoft.EntityFrameworkCore;
using SevenPersonal.Domain.Entities;
using SevenPersonal.Domain.Interfaces;
using SevenPersonal.Repository.Context;

namespace SevenPersonal.Repository.Repositories;

public class MediaRepository : IMediaRepository
{
    private readonly AppDbContext _db;
    public MediaRepository(AppDbContext db) => _db = db;

    public Task<List<MediaItem>> GetAllAsync() =>
        _db.MediaItems.OrderBy(m => m.Order).ThenByDescending(m => m.CreatedAt).ToListAsync();

    public Task<MediaItem?> GetByIdAsync(int id) =>
        _db.MediaItems.FirstOrDefaultAsync(m => m.Id == id);

    public async Task AddAsync(MediaItem item) => await _db.MediaItems.AddAsync(item);

    public void Remove(MediaItem item) => _db.MediaItems.Remove(item);

    public Task SaveChangesAsync() => _db.SaveChangesAsync();
}

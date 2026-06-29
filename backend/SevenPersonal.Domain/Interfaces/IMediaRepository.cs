using SevenPersonal.Domain.Entities;

namespace SevenPersonal.Domain.Interfaces;

public interface IMediaRepository
{
    Task<List<MediaItem>> GetAllAsync();
    Task<MediaItem?> GetByIdAsync(int id);
    Task AddAsync(MediaItem item);
    void Remove(MediaItem item);
    Task SaveChangesAsync();
}

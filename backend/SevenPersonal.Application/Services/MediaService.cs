using SevenPersonal.Application.Dtos;
using SevenPersonal.Application.Interfaces;
using SevenPersonal.Domain.Entities;
using SevenPersonal.Domain.Interfaces;

namespace SevenPersonal.Application.Services;

public class MediaService : IMediaService
{
    private readonly IMediaRepository _repo;
    private readonly ICloudinaryService _cloudinary;

    public MediaService(IMediaRepository repo, ICloudinaryService cloudinary)
    {
        _repo = repo;
        _cloudinary = cloudinary;
    }

    public async Task<List<MediaItemDto>> GetAllAsync()
    {
        var items = await _repo.GetAllAsync();
        return items.Select(Map).ToList();
    }

    public async Task<MediaItemDto> CreateAsync(MediaItemInputDto input)
    {
        var item = new MediaItem
        {
            Type = input.Type,
            Url = input.Url,
            CloudinaryPublicId = input.CloudinaryPublicId,
            ThumbnailUrl = input.ThumbnailUrl,
            Caption = input.Caption,
            Width = input.Width,
            Height = input.Height,
            Order = input.Order,
            CreatedAt = DateTime.UtcNow
        };

        await _repo.AddAsync(item);
        await _repo.SaveChangesAsync();
        return Map(item);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var item = await _repo.GetByIdAsync(id);
        if (item is null) return false;

        await _cloudinary.DeleteAsync(item.CloudinaryPublicId, item.Type);

        _repo.Remove(item);
        await _repo.SaveChangesAsync();
        return true;
    }

    private static MediaItemDto Map(MediaItem m) => new(
        m.Id, m.Type, m.Url, m.ThumbnailUrl, m.Caption, m.Width, m.Height, m.Order);
}

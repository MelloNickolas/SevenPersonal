using SevenPersonal.Application.Dtos;
using SevenPersonal.Application.Interfaces;
using SevenPersonal.Domain.Entities;
using SevenPersonal.Domain.Interfaces;

namespace SevenPersonal.Application.Services;

public class CarouselService : ICarouselService
{
    private readonly ICarouselRepository _repo;
    private readonly ICloudinaryService _cloudinary;

    public CarouselService(ICarouselRepository repo, ICloudinaryService cloudinary)
    {
        _repo = repo;
        _cloudinary = cloudinary;
    }

    public async Task<List<CarouselImageDto>> GetAllAsync()
    {
        var images = await _repo.GetAllAsync();
        return images.Select(i => new CarouselImageDto(i.Id, i.ImageUrl, i.Order)).ToList();
    }

    public async Task<CarouselImageDto> CreateAsync(CarouselImageInputDto input)
    {
        var image = new CarouselImage
        {
            ImageUrl = input.ImageUrl,
            CloudinaryPublicId = input.CloudinaryPublicId,
            Order = input.Order,
            CreatedAt = DateTime.UtcNow
        };

        await _repo.AddAsync(image);
        await _repo.SaveChangesAsync();
        return new CarouselImageDto(image.Id, image.ImageUrl, image.Order);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var image = await _repo.GetByIdAsync(id);
        if (image is null) return false;

        // Remove o arquivo no Cloudinary (imagens do carrossel são sempre fotos).
        await _cloudinary.DeleteAsync(image.CloudinaryPublicId, Domain.Enums.MediaType.Photo);

        _repo.Remove(image);
        await _repo.SaveChangesAsync();
        return true;
    }
}

using SevenPersonal.Domain.Entities;

namespace SevenPersonal.Domain.Interfaces;

public interface ICarouselRepository
{
    Task<List<CarouselImage>> GetAllAsync();
    Task<CarouselImage?> GetByIdAsync(int id);
    Task AddAsync(CarouselImage image);
    void Remove(CarouselImage image);
    Task SaveChangesAsync();
}

using Microsoft.EntityFrameworkCore;
using SevenPersonal.Domain.Entities;
using SevenPersonal.Domain.Interfaces;
using SevenPersonal.Repository.Context;

namespace SevenPersonal.Repository.Repositories;

public class CarouselRepository : ICarouselRepository
{
    private readonly AppDbContext _db;
    public CarouselRepository(AppDbContext db) => _db = db;

    public Task<List<CarouselImage>> GetAllAsync() =>
        _db.CarouselImages.OrderBy(c => c.Order).ThenBy(c => c.Id).ToListAsync();

    public Task<CarouselImage?> GetByIdAsync(int id) =>
        _db.CarouselImages.FirstOrDefaultAsync(c => c.Id == id);

    public async Task AddAsync(CarouselImage image) => await _db.CarouselImages.AddAsync(image);

    public void Remove(CarouselImage image) => _db.CarouselImages.Remove(image);

    public Task SaveChangesAsync() => _db.SaveChangesAsync();
}

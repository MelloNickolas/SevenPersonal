using SevenPersonal.Domain.Entities;

namespace SevenPersonal.Domain.Interfaces;

public interface IPlanRepository
{
    Task<List<Plan>> GetAllAsync();
    Task<Plan?> GetByIdAsync(int id);
    Task AddAsync(Plan plan);
    void Update(Plan plan);
    void Remove(Plan plan);
    Task SaveChangesAsync();
}

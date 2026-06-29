using Microsoft.EntityFrameworkCore;
using SevenPersonal.Domain.Entities;
using SevenPersonal.Domain.Interfaces;
using SevenPersonal.Repository.Context;

namespace SevenPersonal.Repository.Repositories;

public class PlanRepository : IPlanRepository
{
    private readonly AppDbContext _db;
    public PlanRepository(AppDbContext db) => _db = db;

    public Task<List<Plan>> GetAllAsync() =>
        _db.Plans.OrderBy(p => p.Order).ThenBy(p => p.Id).ToListAsync();

    public Task<Plan?> GetByIdAsync(int id) =>
        _db.Plans.FirstOrDefaultAsync(p => p.Id == id);

    public async Task AddAsync(Plan plan) => await _db.Plans.AddAsync(plan);

    public void Update(Plan plan) => _db.Plans.Update(plan);

    public void Remove(Plan plan) => _db.Plans.Remove(plan);

    public Task SaveChangesAsync() => _db.SaveChangesAsync();
}

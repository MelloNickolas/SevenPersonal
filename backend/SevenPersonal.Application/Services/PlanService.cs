using SevenPersonal.Application.Dtos;
using SevenPersonal.Application.Interfaces;
using SevenPersonal.Domain.Entities;
using SevenPersonal.Domain.Interfaces;

namespace SevenPersonal.Application.Services;

public class PlanService : IPlanService
{
    private readonly IPlanRepository _repo;
    public PlanService(IPlanRepository repo) => _repo = repo;

    public async Task<List<PlanDto>> GetAllAsync()
    {
        var plans = await _repo.GetAllAsync();
        return plans.Select(Map).ToList();
    }

    public async Task<PlanDto?> GetByIdAsync(int id)
    {
        var plan = await _repo.GetByIdAsync(id);
        return plan is null ? null : Map(plan);
    }

    public async Task<PlanDto> CreateAsync(PlanInputDto input)
    {
        var plan = new Plan
        {
            Name = input.Name,
            Description = input.Description,
            Price = input.Price,
            TimesPerWeek = input.TimesPerWeek,
            IsPromotion = input.IsPromotion,
            PromotionalPrice = input.IsPromotion ? input.PromotionalPrice : null,
            Order = input.Order,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        await _repo.AddAsync(plan);
        await _repo.SaveChangesAsync();
        return Map(plan);
    }

    public async Task<PlanDto?> UpdateAsync(int id, PlanInputDto input)
    {
        var plan = await _repo.GetByIdAsync(id);
        if (plan is null) return null;

        plan.Name = input.Name;
        plan.Description = input.Description;
        plan.Price = input.Price;
        plan.TimesPerWeek = input.TimesPerWeek;
        plan.IsPromotion = input.IsPromotion;
        plan.PromotionalPrice = input.IsPromotion ? input.PromotionalPrice : null;
        plan.Order = input.Order;
        plan.UpdatedAt = DateTime.UtcNow;

        _repo.Update(plan);
        await _repo.SaveChangesAsync();
        return Map(plan);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var plan = await _repo.GetByIdAsync(id);
        if (plan is null) return false;

        _repo.Remove(plan);
        await _repo.SaveChangesAsync();
        return true;
    }

    private static PlanDto Map(Plan p) => new(
        p.Id, p.Name, p.Description, p.Price, p.TimesPerWeek,
        p.IsPromotion, p.PromotionalPrice, p.Order);
}

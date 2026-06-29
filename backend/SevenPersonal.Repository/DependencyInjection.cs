using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using SevenPersonal.Domain.Interfaces;
using SevenPersonal.Repository.Context;
using SevenPersonal.Repository.Repositories;

namespace SevenPersonal.Repository;

public static class DependencyInjection
{
    /// <summary>
    /// Registra o DbContext escolhendo o provider:
    /// "postgres" → Npgsql (Neon); qualquer outro valor → SQLite.
    /// </summary>
    public static IServiceCollection AddRepository(
        this IServiceCollection services, string provider, string connectionString)
    {
        services.AddDbContext<AppDbContext>(options =>
        {
            if (provider.Equals("postgres", StringComparison.OrdinalIgnoreCase))
                options.UseNpgsql(connectionString);
            else
                options.UseSqlite(connectionString);
        });

        services.AddScoped<IPlanRepository, PlanRepository>();
        services.AddScoped<ICarouselRepository, CarouselRepository>();
        services.AddScoped<IMediaRepository, MediaRepository>();
        services.AddScoped<ISiteSettingsRepository, SiteSettingsRepository>();

        return services;
    }
}

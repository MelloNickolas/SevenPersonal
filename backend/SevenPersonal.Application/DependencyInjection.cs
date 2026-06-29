using Microsoft.Extensions.DependencyInjection;
using SevenPersonal.Application.Interfaces;
using SevenPersonal.Application.Services;

namespace SevenPersonal.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<IPlanService, PlanService>();
        services.AddScoped<ICarouselService, CarouselService>();
        services.AddScoped<IMediaService, MediaService>();
        services.AddScoped<ISiteSettingsService, SiteSettingsService>();
        services.AddScoped<IAuthService, AuthService>();

        return services;
    }
}

using Microsoft.Extensions.DependencyInjection;
using SevenPersonal.Application.Interfaces;
using SevenPersonal.Services.Auth;
using SevenPersonal.Services.Media;

namespace SevenPersonal.Services;

public static class DependencyInjection
{
    public static IServiceCollection AddServices(this IServiceCollection services)
    {
        services.AddSingleton<IJwtService, JwtService>();
        services.AddSingleton<ICloudinaryService, CloudinaryService>();
        return services;
    }
}

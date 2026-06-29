using SevenPersonal.Application.Dtos;
using SevenPersonal.Domain.Enums;

namespace SevenPersonal.Application.Interfaces;

public interface IPlanService
{
    Task<List<PlanDto>> GetAllAsync();
    Task<PlanDto?> GetByIdAsync(int id);
    Task<PlanDto> CreateAsync(PlanInputDto input);
    Task<PlanDto?> UpdateAsync(int id, PlanInputDto input);
    Task<bool> DeleteAsync(int id);
}

public interface ICarouselService
{
    Task<List<CarouselImageDto>> GetAllAsync();
    Task<CarouselImageDto> CreateAsync(CarouselImageInputDto input);
    Task<bool> DeleteAsync(int id);
}

public interface IMediaService
{
    Task<List<MediaItemDto>> GetAllAsync();
    Task<MediaItemDto> CreateAsync(MediaItemInputDto input);
    Task<bool> DeleteAsync(int id);
}

public interface ISiteSettingsService
{
    Task<SiteSettingsDto> GetAsync();
    Task<SiteSettingsDto> UpdateAsync(SiteSettingsInputDto input);
}

public interface IAuthService
{
    Task<AuthResultDto?> LoginAsync(LoginDto input);
}

/// <summary>Geração da assinatura de upload do Cloudinary (port).</summary>
public interface ICloudinaryService
{
    UploadSignatureDto GenerateUploadSignature();
    Task DeleteAsync(string publicId, MediaType type);
}

/// <summary>Emissão de token JWT (port).</summary>
public interface IJwtService
{
    AuthResultDto GenerateToken(string username);
}

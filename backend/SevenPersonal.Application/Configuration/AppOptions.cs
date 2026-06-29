namespace SevenPersonal.Application.Configuration;

/// <summary>Configuração do JWT do admin.</summary>
public class JwtOptions
{
    public const string SectionName = "Jwt";
    public string Secret { get; set; } = string.Empty;
    public string Issuer { get; set; } = "SevenPersonal";
    public string Audience { get; set; } = "SevenPersonal";
    public int ExpiryHours { get; set; } = 8;
}

/// <summary>Credenciais do proprietário (admin único).</summary>
public class AdminOptions
{
    public const string SectionName = "Admin";
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

/// <summary>Configuração do Cloudinary.</summary>
public class CloudinaryOptions
{
    public const string SectionName = "Cloudinary";
    public string CloudName { get; set; } = string.Empty;
    public string ApiKey { get; set; } = string.Empty;
    public string ApiSecret { get; set; } = string.Empty;
    public string UploadFolder { get; set; } = "seven-personal";
}

using Microsoft.Extensions.Options;
using SevenPersonal.Application.Configuration;
using SevenPersonal.Application.Dtos;
using SevenPersonal.Application.Interfaces;

namespace SevenPersonal.Application.Services;

public class AuthService : IAuthService
{
    private readonly AdminOptions _admin;
    private readonly IJwtService _jwt;

    public AuthService(IOptions<AdminOptions> admin, IJwtService jwt)
    {
        _admin = admin.Value;
        _jwt = jwt;
    }

    public Task<AuthResultDto?> LoginAsync(LoginDto input)
    {
        var ok =
            CryptographicEquals(input.Username, _admin.Username) &&
            CryptographicEquals(input.Password, _admin.Password);

        if (!ok)
            return Task.FromResult<AuthResultDto?>(null);

        return Task.FromResult<AuthResultDto?>(_jwt.GenerateToken(_admin.Username));
    }

    /// <summary>Comparação em tempo constante para evitar timing attacks.</summary>
    private static bool CryptographicEquals(string a, string b)
    {
        if (string.IsNullOrEmpty(a) || string.IsNullOrEmpty(b)) return false;
        var ba = System.Text.Encoding.UTF8.GetBytes(a);
        var bb = System.Text.Encoding.UTF8.GetBytes(b);
        return System.Security.Cryptography.CryptographicOperations.FixedTimeEquals(ba, bb);
    }
}

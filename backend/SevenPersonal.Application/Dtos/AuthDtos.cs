using System.ComponentModel.DataAnnotations;

namespace SevenPersonal.Application.Dtos;

public class LoginDto
{
    [Required]
    public string Username { get; set; } = string.Empty;

    [Required]
    public string Password { get; set; } = string.Empty;
}

public record AuthResultDto(string Token, DateTime ExpiresAt);

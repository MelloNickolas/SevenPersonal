using Microsoft.AspNetCore.Mvc;
using SevenPersonal.Application.Dtos;
using SevenPersonal.Application.Interfaces;

namespace SevenPersonal.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _auth;
    public AuthController(IAuthService auth) => _auth = auth;

    /// <summary>Login do proprietário. Retorna um JWT para usar nas rotas do painel.</summary>
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto input)
    {
        var result = await _auth.LoginAsync(input);
        if (result is null)
            return Unauthorized(new { message = "Usuário ou senha inválidos." });

        return Ok(result);
    }
}

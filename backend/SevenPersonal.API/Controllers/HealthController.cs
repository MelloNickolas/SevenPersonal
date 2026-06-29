using Microsoft.AspNetCore.Mvc;

namespace SevenPersonal.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HealthController : ControllerBase
{
    /// <summary>Endpoint leve usado pelo keep-alive (GitHub Actions) para evitar cold start no Render.</summary>
    [HttpGet]
    public IActionResult Get() => Ok(new { status = "ok", time = DateTime.UtcNow });
}

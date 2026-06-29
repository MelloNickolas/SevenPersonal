using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SevenPersonal.Application.Dtos;
using SevenPersonal.Application.Interfaces;

namespace SevenPersonal.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SettingsController : ControllerBase
{
    private readonly ISiteSettingsService _service;
    public SettingsController(ISiteSettingsService service) => _service = service;

    /// <summary>Configurações de contato exibidas no site (público).</summary>
    [HttpGet]
    public async Task<ActionResult<SiteSettingsDto>> Get() => Ok(await _service.GetAsync());

    [HttpPut]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<SiteSettingsDto>> Update([FromBody] SiteSettingsInputDto input)
        => Ok(await _service.UpdateAsync(input));
}

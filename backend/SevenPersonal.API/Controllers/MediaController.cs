using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SevenPersonal.Application.Dtos;
using SevenPersonal.Application.Interfaces;

namespace SevenPersonal.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MediaController : ControllerBase
{
    private readonly IMediaService _service;
    public MediaController(IMediaService service) => _service = service;

    /// <summary>Itens da Galeria Seven (fotos e vídeos).</summary>
    [HttpGet]
    public async Task<ActionResult<List<MediaItemDto>>> GetAll() => Ok(await _service.GetAllAsync());

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<MediaItemDto>> Create([FromBody] MediaItemInputDto input)
    {
        var created = await _service.CreateAsync(input);
        return Ok(created);
    }

    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var ok = await _service.DeleteAsync(id);
        return ok ? NoContent() : NotFound();
    }
}

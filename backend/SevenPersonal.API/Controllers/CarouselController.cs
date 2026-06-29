using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SevenPersonal.Application.Dtos;
using SevenPersonal.Application.Interfaces;

namespace SevenPersonal.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CarouselController : ControllerBase
{
    private readonly ICarouselService _service;
    public CarouselController(ICarouselService service) => _service = service;

    /// <summary>Imagens da "Programação do Mês".</summary>
    [HttpGet]
    public async Task<ActionResult<List<CarouselImageDto>>> GetAll() => Ok(await _service.GetAllAsync());

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<CarouselImageDto>> Create([FromBody] CarouselImageInputDto input)
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

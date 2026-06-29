using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SevenPersonal.Application.Dtos;
using SevenPersonal.Application.Interfaces;

namespace SevenPersonal.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class UploadController : ControllerBase
{
    private readonly ICloudinaryService _cloudinary;
    public UploadController(ICloudinaryService cloudinary) => _cloudinary = cloudinary;

    /// <summary>
    /// Retorna a assinatura para o painel enviar o arquivo direto ao Cloudinary,
    /// sem o arquivo passar pelo backend (evita limites do plano free do Render).
    /// </summary>
    [HttpGet("signature")]
    public ActionResult<UploadSignatureDto> GetSignature() => Ok(_cloudinary.GenerateUploadSignature());
}

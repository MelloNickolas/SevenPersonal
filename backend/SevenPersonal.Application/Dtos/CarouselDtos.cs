using System.ComponentModel.DataAnnotations;

namespace SevenPersonal.Application.Dtos;

/// <summary>Imagem do carrossel "Programação do Mês".</summary>
public record CarouselImageDto(
    int Id,
    string ImageUrl,
    int Order
);

/// <summary>
/// Dados enviados pelo painel após o upload direto no Cloudinary
/// para persistir a imagem do carrossel.
/// </summary>
public class CarouselImageInputDto
{
    [Required]
    public string ImageUrl { get; set; } = string.Empty;

    [Required]
    public string CloudinaryPublicId { get; set; } = string.Empty;

    public int Order { get; set; }
}

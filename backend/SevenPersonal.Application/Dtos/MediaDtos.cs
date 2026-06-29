using System.ComponentModel.DataAnnotations;
using SevenPersonal.Domain.Enums;

namespace SevenPersonal.Application.Dtos;

/// <summary>Item da Galeria Seven retornado para o site/painel.</summary>
public record MediaItemDto(
    int Id,
    MediaType Type,
    string Url,
    string? ThumbnailUrl,
    string? Caption,
    int Width,
    int Height,
    int Order
);

/// <summary>
/// Dados enviados pelo painel após o upload direto no Cloudinary
/// para persistir um item da galeria.
/// </summary>
public class MediaItemInputDto
{
    [Required]
    public MediaType Type { get; set; }

    [Required]
    public string Url { get; set; } = string.Empty;

    [Required]
    public string CloudinaryPublicId { get; set; } = string.Empty;

    public string? ThumbnailUrl { get; set; }

    [MaxLength(500)]
    public string? Caption { get; set; }

    public int Width { get; set; }
    public int Height { get; set; }
    public int Order { get; set; }
}

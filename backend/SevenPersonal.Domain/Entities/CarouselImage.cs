namespace SevenPersonal.Domain.Entities;

/// <summary>
/// Imagem da "Programação do Mês" — replica o carrossel do Instagram.
/// O proprietário substitui as imagens a cada mês.
/// </summary>
public class CarouselImage
{
    public int Id { get; set; }

    /// <summary>URL da imagem (Cloudinary).</summary>
    public string ImageUrl { get; set; } = string.Empty;

    /// <summary>Public ID no Cloudinary (para exclusão).</summary>
    public string CloudinaryPublicId { get; set; } = string.Empty;

    /// <summary>Ordem dentro do carrossel.</summary>
    public int Order { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

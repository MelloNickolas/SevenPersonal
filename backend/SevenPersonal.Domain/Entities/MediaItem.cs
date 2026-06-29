using SevenPersonal.Domain.Enums;

namespace SevenPersonal.Domain.Entities;

/// <summary>Item da Galeria Seven — foto ou vídeo (arquivos próprios via Cloudinary).</summary>
public class MediaItem
{
    public int Id { get; set; }

    /// <summary>Foto ou vídeo.</summary>
    public MediaType Type { get; set; }

    /// <summary>URL do arquivo (Cloudinary).</summary>
    public string Url { get; set; } = string.Empty;

    /// <summary>Public ID no Cloudinary (para exclusão).</summary>
    public string CloudinaryPublicId { get; set; } = string.Empty;

    /// <summary>Poster/thumbnail (principalmente para vídeos).</summary>
    public string? ThumbnailUrl { get; set; }

    /// <summary>Legenda opcional.</summary>
    public string? Caption { get; set; }

    /// <summary>Largura original — alimenta o layout masonry adaptativo.</summary>
    public int Width { get; set; }

    /// <summary>Altura original — alimenta o layout masonry adaptativo.</summary>
    public int Height { get; set; }

    /// <summary>Ordem de exibição na grade.</summary>
    public int Order { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

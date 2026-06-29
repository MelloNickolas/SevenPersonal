using System.ComponentModel.DataAnnotations;

namespace SevenPersonal.Application.Dtos;

/// <summary>Configurações de contato exibidas no site.</summary>
public record SiteSettingsDto(
    string WhatsappNumber,
    string InstagramUrl,
    string Address,
    string OpeningHours,
    string WhatsappDefaultMessage
);

/// <summary>Dados de entrada para atualizar as configurações pelo painel.</summary>
public class SiteSettingsInputDto
{
    [MaxLength(30)]
    public string WhatsappNumber { get; set; } = string.Empty;

    [MaxLength(300)]
    public string InstagramUrl { get; set; } = string.Empty;

    [MaxLength(500)]
    public string Address { get; set; } = string.Empty;

    [MaxLength(500)]
    public string OpeningHours { get; set; } = string.Empty;

    [MaxLength(300)]
    public string WhatsappDefaultMessage { get; set; } = string.Empty;
}

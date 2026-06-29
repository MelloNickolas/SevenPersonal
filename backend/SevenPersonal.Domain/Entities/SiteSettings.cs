namespace SevenPersonal.Domain.Entities;

/// <summary>
/// Configurações editáveis de contato/identidade do site (registro único, Id = 1).
/// Permite o proprietário alterar WhatsApp, Instagram, endereço e horários sem redeploy.
/// </summary>
public class SiteSettings
{
    public int Id { get; set; } = 1;

    /// <summary>Número do WhatsApp em formato internacional, só dígitos (ex.: 5511999999999).</summary>
    public string WhatsappNumber { get; set; } = string.Empty;

    /// <summary>URL do Instagram.</summary>
    public string InstagramUrl { get; set; } = string.Empty;

    /// <summary>Endereço da academia.</summary>
    public string Address { get; set; } = string.Empty;

    /// <summary>Horário de funcionamento (texto livre).</summary>
    public string OpeningHours { get; set; } = string.Empty;

    /// <summary>Mensagem padrão pré-preenchida no WhatsApp (o nome do plano é anexado).</summary>
    public string WhatsappDefaultMessage { get; set; } = "Olá! Tenho interesse no plano";

    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

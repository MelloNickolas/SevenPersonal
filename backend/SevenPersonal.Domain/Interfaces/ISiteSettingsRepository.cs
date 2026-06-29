using SevenPersonal.Domain.Entities;

namespace SevenPersonal.Domain.Interfaces;

public interface ISiteSettingsRepository
{
    /// <summary>Retorna o registro único de configurações (cria com defaults se não existir).</summary>
    Task<SiteSettings> GetAsync();
    Task SaveChangesAsync();
}

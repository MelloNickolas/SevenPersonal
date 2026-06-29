namespace SevenPersonal.Domain.Entities;

/// <summary>Plano da academia. O proprietário cadastra/edita pelo painel.</summary>
public class Plan
{
    public int Id { get; set; }

    /// <summary>Nome do plano (ex.: "Mensal", "Trimestral").</summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>Descrição / benefícios do plano.</summary>
    public string Description { get; set; } = string.Empty;

    /// <summary>Preço normal.</summary>
    public decimal Price { get; set; }

    /// <summary>Quantidade de vezes na semana.</summary>
    public int TimesPerWeek { get; set; }

    /// <summary>Quando true, o card aparece em destaque de promoção.</summary>
    public bool IsPromotion { get; set; }

    /// <summary>Preço promocional (usado quando IsPromotion = true).</summary>
    public decimal? PromotionalPrice { get; set; }

    /// <summary>Ordem de exibição dos cards.</summary>
    public int Order { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

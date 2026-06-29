using System.ComponentModel.DataAnnotations;

namespace SevenPersonal.Application.Dtos;

/// <summary>Plano retornado para o site/painel.</summary>
public record PlanDto(
    int Id,
    string Name,
    string Description,
    decimal Price,
    int TimesPerWeek,
    bool IsPromotion,
    decimal? PromotionalPrice,
    int Order
);

/// <summary>Dados de entrada para criar/editar um plano.</summary>
public class PlanInputDto
{
    [Required, MaxLength(120)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(2000)]
    public string Description { get; set; } = string.Empty;

    [Range(0, 1_000_000)]
    public decimal Price { get; set; }

    [Range(1, 7)]
    public int TimesPerWeek { get; set; }

    public bool IsPromotion { get; set; }

    [Range(0, 1_000_000)]
    public decimal? PromotionalPrice { get; set; }

    public int Order { get; set; }
}

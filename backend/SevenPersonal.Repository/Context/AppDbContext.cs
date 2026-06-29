using Microsoft.EntityFrameworkCore;
using SevenPersonal.Domain.Entities;

namespace SevenPersonal.Repository.Context;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Plan> Plans => Set<Plan>();
    public DbSet<CarouselImage> CarouselImages => Set<CarouselImage>();
    public DbSet<MediaItem> MediaItems => Set<MediaItem>();
    public DbSet<SiteSettings> SiteSettings => Set<SiteSettings>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Plan>(e =>
        {
            e.Property(p => p.Name).IsRequired().HasMaxLength(120);
            e.Property(p => p.Description).HasMaxLength(2000);
            e.Property(p => p.Price).HasPrecision(10, 2);
            e.Property(p => p.PromotionalPrice).HasPrecision(10, 2);
        });

        modelBuilder.Entity<CarouselImage>(e =>
        {
            e.Property(c => c.ImageUrl).IsRequired();
            e.Property(c => c.CloudinaryPublicId).IsRequired();
        });

        modelBuilder.Entity<MediaItem>(e =>
        {
            e.Property(m => m.Url).IsRequired();
            e.Property(m => m.CloudinaryPublicId).IsRequired();
            e.Property(m => m.Caption).HasMaxLength(500);
        });

        modelBuilder.Entity<SiteSettings>(e =>
        {
            e.Property(s => s.WhatsappNumber).HasMaxLength(30);
            e.Property(s => s.InstagramUrl).HasMaxLength(300);
            e.Property(s => s.Address).HasMaxLength(500);
            e.Property(s => s.OpeningHours).HasMaxLength(500);
            e.Property(s => s.WhatsappDefaultMessage).HasMaxLength(300);

            // Seed do registro único de configurações com placeholders.
            e.HasData(new SiteSettings
            {
                Id = 1,
                WhatsappNumber = "5500000000000",
                InstagramUrl = "https://instagram.com/sevenpersonal_",
                Address = "Endereço a definir",
                OpeningHours = "Seg a Sex: 06h às 22h • Sáb: 08h às 12h",
                WhatsappDefaultMessage = "Olá! Tenho interesse no plano",
                UpdatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc)
            });
        });
    }
}

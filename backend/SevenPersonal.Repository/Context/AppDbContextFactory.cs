using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace SevenPersonal.Repository.Context;

/// <summary>
/// Factory de design-time (usada por ferramentas EF). O schema em runtime é criado
/// via EnsureCreated no startup, então isto serve só de fallback para tooling local (SQLite).
/// </summary>
public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
{
    public AppDbContext CreateDbContext(string[] args)
    {
        var connectionString =
            Environment.GetEnvironmentVariable("CONNECTION_STRING") ?? "Data Source=seven.db";

        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseSqlite(connectionString)
            .Options;

        return new AppDbContext(options);
    }
}

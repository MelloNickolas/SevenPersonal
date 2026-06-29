namespace SevenPersonal.API.Configuration;

/// <summary>
/// Converte uma URL postgres://user:pass@host:port/db (formato do Neon/Render)
/// para o formato de connection string do Npgsql. Aceita também a string já no formato Npgsql.
/// </summary>
public static class NpgsqlUrlParser
{
    public static bool IsPostgresUrl(string connection) =>
        connection.StartsWith("postgres://", StringComparison.OrdinalIgnoreCase) ||
        connection.StartsWith("postgresql://", StringComparison.OrdinalIgnoreCase);

    public static string Normalize(string connection)
    {
        if (string.IsNullOrWhiteSpace(connection) || !IsPostgresUrl(connection))
            return connection; // já está no formato Npgsql (ou vazio)

        var uri = new Uri(connection);
        var userInfo = uri.UserInfo.Split(':', 2);
        var username = Uri.UnescapeDataString(userInfo[0]);
        var password = userInfo.Length > 1 ? Uri.UnescapeDataString(userInfo[1]) : string.Empty;
        var database = uri.AbsolutePath.TrimStart('/');
        var port = uri.Port > 0 ? uri.Port : 5432;

        // Neon exige SSL.
        return $"Host={uri.Host};Port={port};Database={database};Username={username};" +
               $"Password={password};SSL Mode=Require;Trust Server Certificate=true";
    }
}

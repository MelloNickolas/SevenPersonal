using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SevenPersonal.API.Configuration;
using SevenPersonal.Application;
using SevenPersonal.Application.Configuration;
using SevenPersonal.Repository;
using SevenPersonal.Repository.Context;
using SevenPersonal.Services;

// Carrega variáveis de .env em desenvolvimento (em produção use as envs do host).
DotNetEnv.Env.TraversePath().Load();

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;

// Render injeta a porta na env PORT — o Kestrel precisa escutar nela.
var port = Environment.GetEnvironmentVariable("PORT");
if (!string.IsNullOrWhiteSpace(port))
    builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

// ---------------------------------------------------------------------------
// Configuração (envs > appsettings)
// ---------------------------------------------------------------------------
string Get(string key, string fallback = "") =>
    Environment.GetEnvironmentVariable(key) ?? config[key] ?? fallback;

// Banco: detecta o provider pelo DATABASE_URL.
// URL postgres:// → Postgres (Neon); vazio → SQLite (seven.db); senão usa o valor como veio.
var rawConn = Get("DATABASE_URL");
var isPostgres = NpgsqlUrlParser.IsPostgresUrl(rawConn);
var dbProvider = isPostgres ? "postgres" : "sqlite";
var connectionString = isPostgres
    ? NpgsqlUrlParser.Normalize(rawConn)
    : string.IsNullOrWhiteSpace(rawConn) ? "Data Source=seven.db" : rawConn;

builder.Services.Configure<JwtOptions>(o =>
{
    o.Secret = Get("JWT_SECRET", "dev-only-change-me-super-secret-key-32chars!");
    o.Issuer = Get("JWT_ISSUER", "SevenPersonal");
    o.Audience = Get("JWT_AUDIENCE", "SevenPersonal");
    o.ExpiryHours = int.TryParse(Get("JWT_EXPIRY_HOURS", "8"), out var h) ? h : 8;
});

builder.Services.Configure<AdminOptions>(o =>
{
    o.Username = Get("ADMIN_USER", "admin");
    o.Password = Get("ADMIN_PASSWORD", "admin123");
});

builder.Services.Configure<CloudinaryOptions>(o =>
{
    o.CloudName = Get("CLOUDINARY_CLOUD_NAME");
    o.ApiKey = Get("CLOUDINARY_API_KEY");
    o.ApiSecret = Get("CLOUDINARY_API_SECRET");
    o.UploadFolder = Get("CLOUDINARY_UPLOAD_FOLDER", "seven-personal");
});

var jwtSecret = Get("JWT_SECRET", "dev-only-change-me-super-secret-key-32chars!");
var jwtIssuer = Get("JWT_ISSUER", "SevenPersonal");
var jwtAudience = Get("JWT_AUDIENCE", "SevenPersonal");

// ---------------------------------------------------------------------------
// Camadas
// ---------------------------------------------------------------------------
builder.Services.AddRepository(dbProvider, connectionString);
builder.Services.AddApplication();
builder.Services.AddServices();

// ---------------------------------------------------------------------------
// Autenticação JWT
// ---------------------------------------------------------------------------
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtIssuer,
            ValidAudience = jwtAudience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret))
        };
    });

builder.Services.AddAuthorization();

// ---------------------------------------------------------------------------
// CORS (frontend Vercel + localhost)
// ---------------------------------------------------------------------------
var corsOrigins = Get("CORS_ORIGIN", "http://localhost:5173")
    .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins(corsOrigins).AllowAnyHeader().AllowAnyMethod());
});

// ---------------------------------------------------------------------------
// Controllers + Swagger
// ---------------------------------------------------------------------------
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Seven Personal API", Version = "v1" });

    var scheme = new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Informe o token JWT obtido em /api/auth/login.",
        Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
    };
    c.AddSecurityDefinition("Bearer", scheme);
    c.AddSecurityRequirement(new OpenApiSecurityRequirement { [scheme] = Array.Empty<string>() });
});

var app = builder.Build();

// ---------------------------------------------------------------------------
// Cria o schema no startup (agnóstico de provider: SQLite ou Postgres)
// ---------------------------------------------------------------------------
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();

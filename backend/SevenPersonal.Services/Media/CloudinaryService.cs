using System.Security.Cryptography;
using System.Text;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;
using SevenPersonal.Application.Configuration;
using SevenPersonal.Application.Dtos;
using SevenPersonal.Application.Interfaces;
using SevenPersonal.Domain.Enums;

namespace SevenPersonal.Services.Media;

public class CloudinaryService : ICloudinaryService
{
    private readonly CloudinaryOptions _options;
    private readonly Cloudinary _cloudinary;

    public CloudinaryService(IOptions<CloudinaryOptions> options)
    {
        _options = options.Value;
        var account = new Account(_options.CloudName, _options.ApiKey, _options.ApiSecret);
        _cloudinary = new Cloudinary(account) { Api = { Secure = true } };
    }

    /// <summary>
    /// Gera a assinatura para upload direto navegador → Cloudinary.
    /// Os parâmetros assinados (folder + timestamp) precisam ser exatamente os
    /// enviados pelo front no upload.
    /// </summary>
    public UploadSignatureDto GenerateUploadSignature()
    {
        var timestamp = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
        var folder = _options.UploadFolder;

        // Parâmetros em ordem alfabética: folder, timestamp.
        var toSign = $"folder={folder}&timestamp={timestamp}{_options.ApiSecret}";
        var signature = Sha1Hex(toSign);

        return new UploadSignatureDto(signature, timestamp, _options.ApiKey, _options.CloudName, folder);
    }

    public async Task DeleteAsync(string publicId, MediaType type)
    {
        if (string.IsNullOrWhiteSpace(publicId)) return;

        var resourceType = type == MediaType.Video ? ResourceType.Video : ResourceType.Image;
        var deletionParams = new DeletionParams(publicId) { ResourceType = resourceType };
        await _cloudinary.DestroyAsync(deletionParams);
    }

    private static string Sha1Hex(string input)
    {
        var bytes = SHA1.HashData(Encoding.UTF8.GetBytes(input));
        var sb = new StringBuilder(bytes.Length * 2);
        foreach (var b in bytes) sb.Append(b.ToString("x2"));
        return sb.ToString();
    }
}

namespace SevenPersonal.Application.Dtos;

/// <summary>
/// Assinatura para upload direto do navegador → Cloudinary.
/// O front usa esses campos para enviar o arquivo sem expor o ApiSecret.
/// </summary>
public record UploadSignatureDto(
    string Signature,
    long Timestamp,
    string ApiKey,
    string CloudName,
    string Folder
);

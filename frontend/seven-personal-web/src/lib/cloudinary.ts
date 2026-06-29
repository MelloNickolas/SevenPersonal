import { uploadApi } from './services'

export interface CloudinaryUploadResult {
  url: string
  publicId: string
  width: number
  height: number
  resourceType: 'image' | 'video'
  thumbnailUrl: string | null
}

/**
 * Faz upload assinado direto do navegador para o Cloudinary.
 * O arquivo NÃO passa pelo backend — só a assinatura vem dele.
 */
export async function uploadToCloudinary(
  file: File,
  onProgress?: (percent: number) => void,
): Promise<CloudinaryUploadResult> {
  const sig = await uploadApi.getSignature()
  const isVideo = file.type.startsWith('video/')
  const resourceType = isVideo ? 'video' : 'image'

  const form = new FormData()
  form.append('file', file)
  form.append('api_key', sig.apiKey)
  form.append('timestamp', String(sig.timestamp))
  form.append('signature', sig.signature)
  form.append('folder', sig.folder)

  const endpoint = `https://api.cloudinary.com/v1_1/${sig.cloudName}/${resourceType}/upload`

  const result = await new Promise<Record<string, unknown>>((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', endpoint)
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100))
      }
    }
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText))
      } else {
        reject(new Error(`Falha no upload (${xhr.status}): ${xhr.responseText}`))
      }
    }
    xhr.onerror = () => reject(new Error('Erro de rede no upload.'))
    xhr.send(form)
  })

  const secureUrl = result.secure_url as string
  const publicId = result.public_id as string
  const width = (result.width as number) ?? 0
  const height = (result.height as number) ?? 0

  // Para vídeo, gera um poster (.jpg) a partir do mesmo asset.
  const thumbnailUrl = isVideo
    ? secureUrl.replace('/upload/', '/upload/so_0/').replace(/\.[^/.]+$/, '.jpg')
    : null

  return { url: secureUrl, publicId, width, height, resourceType, thumbnailUrl }
}

import { useEffect, useRef, useState } from 'react'
import { mediaApi } from '@/lib/services'
import { uploadToCloudinary } from '@/lib/cloudinary'
import { useToast } from '@/lib/useToast'
import { MediaType, type MediaItem } from '@/lib/types'

export default function GalleryAdmin() {
  const [items, setItems] = useState<MediaItem[]>([])
  const [progress, setProgress] = useState<number | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { showToast, Toast } = useToast()

  async function load() {
    setItems(await mediaApi.getAll())
  }
  useEffect(() => {
    load()
  }, [])

  async function onFiles(files: FileList | null) {
    if (!files || files.length === 0) return
    try {
      let order = items.length
      for (const file of Array.from(files)) {
        setProgress(0)
        const result = await uploadToCloudinary(file, setProgress)
        await mediaApi.create({
          type: result.resourceType === 'video' ? MediaType.Video : MediaType.Photo,
          url: result.url,
          cloudinaryPublicId: result.publicId,
          thumbnailUrl: result.thumbnailUrl,
          caption: null,
          width: result.width,
          height: result.height,
          order: order++,
        })
      }
      showToast('Mídia adicionada!')
      await load()
    } catch {
      showToast('Falha no upload.')
    } finally {
      setProgress(null)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  async function onDelete(id: number) {
    if (!confirm('Excluir esta mídia da galeria?')) return
    await mediaApi.remove(id)
    showToast('Mídia excluída.')
    await load()
  }

  return (
    <>
      <div className="admin__head">
        <div>
          <h1>Galeria Seven</h1>
          <p>Fotos e vídeos dos treinos. Tudo centralizado em uma galeria só.</p>
        </div>
      </div>

      <div className="panel">
        <label className="uploader">
          <input
            ref={inputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={(e) => onFiles(e.target.files)}
          />
          <div style={{ fontSize: '2rem' }}>📤</div>
          <strong>Clique para enviar fotos ou vídeos</strong>
          <div style={{ fontSize: '0.85rem', marginTop: 4 }}>Imagens ou vídeos (MP4, MOV)</div>
        </label>

        {progress !== null && (
          <div className="upload-bar">
            <div className="upload-bar__fill" style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>

      <div className="panel">
        <h2>Itens na galeria ({items.length})</h2>
        {items.length === 0 ? (
          <p className="empty-note">Nenhuma mídia ainda.</p>
        ) : (
          <div className="media-grid">
            {items.map((item) => (
              <div key={item.id} className="media-grid__item">
                {item.type === MediaType.Video ? (
                  <img src={item.thumbnailUrl ?? item.url} alt="Vídeo" />
                ) : (
                  <img src={item.url} alt="Foto" />
                )}
                <span className="media-grid__badge">
                  {item.type === MediaType.Video ? '▶ Vídeo' : 'Foto'}
                </span>
                <button className="media-grid__del" onClick={() => onDelete(item.id)}>
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Toast />
    </>
  )
}

import { useEffect, useRef, useState } from 'react'
import { carouselApi } from '@/lib/services'
import { uploadToCloudinary } from '@/lib/cloudinary'
import { useToast } from '@/lib/useToast'
import type { CarouselImage } from '@/lib/types'

export default function CarouselAdmin() {
  const [images, setImages] = useState<CarouselImage[]>([])
  const [progress, setProgress] = useState<number | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { showToast, Toast } = useToast()

  async function load() {
    setImages(await carouselApi.getAll())
  }
  useEffect(() => {
    load()
  }, [])

  async function onFiles(files: FileList | null) {
    if (!files || files.length === 0) return
    try {
      let order = images.length
      for (const file of Array.from(files)) {
        setProgress(0)
        const result = await uploadToCloudinary(file, setProgress)
        await carouselApi.create({
          imageUrl: result.url,
          cloudinaryPublicId: result.publicId,
          order: order++,
        })
      }
      showToast('Imagem(ns) adicionada(s)!')
      await load()
    } catch {
      showToast('Falha no upload.')
    } finally {
      setProgress(null)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  async function onDelete(id: number) {
    if (!confirm('Remover esta imagem do carrossel?')) return
    await carouselApi.remove(id)
    showToast('Imagem removida.')
    await load()
  }

  return (
    <>
      <div className="admin__head">
        <div>
          <h1>Programação do mês</h1>
          <p>Suba as imagens do carrossel (mesmo formato do post do Instagram).</p>
        </div>
      </div>

      <div className="panel">
        <label className="uploader">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => onFiles(e.target.files)}
          />
          <div style={{ fontSize: '2rem' }}>📤</div>
          <strong>Clique para enviar imagens</strong>
          <div style={{ fontSize: '0.85rem', marginTop: 4 }}>JPG, PNG ou WEBP</div>
        </label>

        {progress !== null && (
          <div className="upload-bar">
            <div className="upload-bar__fill" style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>

      <div className="panel">
        <h2>Imagens no carrossel ({images.length})</h2>
        {images.length === 0 ? (
          <p className="empty-note">Nenhuma imagem ainda.</p>
        ) : (
          <div className="media-grid">
            {images.map((img) => (
              <div key={img.id} className="media-grid__item">
                <img src={img.imageUrl} alt="Programação" />
                <button className="media-grid__del" onClick={() => onDelete(img.id)}>
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

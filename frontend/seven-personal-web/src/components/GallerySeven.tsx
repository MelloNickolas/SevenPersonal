import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Reveal from './Reveal'
import Lightbox from './Lightbox'
import { MediaType, type MediaItem } from '@/lib/types'

export default function GallerySeven({ items }: { items: MediaItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="section gallery" id="galeria">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <span className="eyebrow">Galeria Seven</span>
            <h2 className="section-title">Suor em movimento</h2>
            <p>A nossa rotina, sem filtro. Fotos e vídeos da galera no treino — clique pra ampliar.</p>
          </div>
        </Reveal>

        {items.length === 0 ? (
          <p className="empty-note">A galeria tá esquentando…</p>
        ) : (
          <div className="gallery__grid">
            {items.map((item, i) => (
              <div key={item.id} className="gallery__item" onClick={() => setOpenIndex(i)}>
                {item.type === MediaType.Video ? (
                  <>
                    <img
                      src={item.thumbnailUrl ?? item.url}
                      alt={item.caption ?? 'Vídeo'}
                      loading="lazy"
                    />
                    <span className="gallery__play">▶</span>
                  </>
                ) : (
                  <img src={item.url} alt={item.caption ?? 'Foto'} loading="lazy" />
                )}
                {item.caption && <div className="gallery__caption">{item.caption}</div>}
              </div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <Lightbox
            items={items}
            index={openIndex}
            onClose={() => setOpenIndex(null)}
            onNavigate={setOpenIndex}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

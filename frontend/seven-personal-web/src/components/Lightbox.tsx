import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { MediaType, type MediaItem } from '@/lib/types'

interface Props {
  items: MediaItem[]
  index: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export default function Lightbox({ items, index, onClose, onNavigate }: Props) {
  const item = items[index]

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate((index + 1) % items.length)
      if (e.key === 'ArrowLeft') onNavigate((index - 1 + items.length) % items.length)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [index, items.length, onClose, onNavigate])

  if (!item) return null

  return (
    <motion.div
      className="lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button className="lightbox__close" onClick={onClose} aria-label="Fechar">✕</button>

      {items.length > 1 && (
        <button
          className="lightbox__nav lightbox__nav--prev"
          onClick={(e) => {
            e.stopPropagation()
            onNavigate((index - 1 + items.length) % items.length)
          }}
          aria-label="Anterior"
        >
          ‹
        </button>
      )}

      <motion.div
        className="lightbox__content"
        key={item.id}
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === MediaType.Video ? (
          <video src={item.url} controls autoPlay playsInline />
        ) : (
          <img src={item.url} alt={item.caption ?? 'Galeria Seven'} />
        )}
      </motion.div>

      {items.length > 1 && (
        <button
          className="lightbox__nav lightbox__nav--next"
          onClick={(e) => {
            e.stopPropagation()
            onNavigate((index + 1) % items.length)
          }}
          aria-label="Próximo"
        >
          ›
        </button>
      )}
    </motion.div>
  )
}

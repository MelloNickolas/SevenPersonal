import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from './Reveal'
import type { CarouselImage } from '@/lib/types'

const AUTOPLAY_MS = 4500

export default function MonthlyCarousel({ images }: { images: CarouselImage[] }) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const count = images.length

  const go = useCallback(
    (dir: number) => {
      setDirection(dir)
      setIndex((prev) => (prev + dir + count) % count)
    },
    [count],
  )

  // Autoplay
  useEffect(() => {
    if (count <= 1) return
    const timer = setInterval(() => go(1), AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [count, index, go])

  return (
    <section className="section program" id="programacao">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <span className="eyebrow">Agenda</span>
            <h2 className="section-title">Programação do mês</h2>
            <p>Aulões, desafios e eventos da Seven. Toda semana tem motivo pra aparecer.</p>
          </div>
        </Reveal>

        {count === 0 ? (
          <div className="carousel carousel--empty">Programação chegando…</div>
        ) : (
          <Reveal>
            <div className="carousel">
              <div className="carousel__track">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={images[index].id}
                    className="carousel__slide"
                    custom={direction}
                    initial={{ opacity: 0, x: direction > 0 ? 80 : -80 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction > 0 ? -80 : 80 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <img src={images[index].imageUrl} alt={`Programação ${index + 1}`} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {count > 1 && (
                <>
                  <button className="carousel__btn carousel__btn--prev" onClick={() => go(-1)} aria-label="Anterior">
                    ‹
                  </button>
                  <button className="carousel__btn carousel__btn--next" onClick={() => go(1)} aria-label="Próximo">
                    ›
                  </button>
                  <div className="carousel__dots">
                    {images.map((img, i) => (
                      <button
                        key={img.id}
                        className={`carousel__dot ${i === index ? 'carousel__dot--active' : ''}`}
                        onClick={() => {
                          setDirection(i > index ? 1 : -1)
                          setIndex(i)
                        }}
                        aria-label={`Ir para imagem ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}

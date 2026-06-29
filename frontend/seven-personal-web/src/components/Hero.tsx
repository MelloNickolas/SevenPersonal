import { motion } from 'framer-motion'
import Logo from './Logo'
import { IconArrow, IconBolt } from './icons'
import type { SiteSettings } from '@/lib/types'
import { buildWhatsappLink } from '@/lib/format'

const fade = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function Hero({ settings }: { settings: SiteSettings | null }) {
  const whatsapp = buildWhatsappLink(settings)

  return (
    <section className="hero" id="top">
      <div className="hero__glow" />
      <span className="hero__watermark">07</span>

      <div className="container hero__grid">
        <div>
          <motion.span className="hero__tag" variants={fade} custom={0} initial="hidden" animate="show">
            <IconBolt width={16} height={16} /> Academia · Personal Training
          </motion.span>

          <motion.h1 className="hero__title" variants={fade} custom={1} initial="hidden" animate="show">
            Menos<br />
            desculpa.<br />
            <em className="text-gradient">Mais suor.</em>
          </motion.h1>

          <motion.p className="hero__subtitle" variants={fade} custom={2} initial="hidden" animate="show">
            Treino com método, acompanhamento de verdade e a energia que te faz voltar
            todo dia. Na Seven, o seu limite é só o ponto de partida.
          </motion.p>

          <motion.div className="hero__actions" variants={fade} custom={3} initial="hidden" animate="show">
            <a href={whatsapp} target="_blank" rel="noreferrer" className="btn btn-primary">
              Começar agora <IconArrow width={18} height={18} />
            </a>
            <a href="#planos" className="btn btn-ghost">Ver planos</a>
          </motion.div>
        </div>

        <motion.div
          className="hero__art"
          initial={{ opacity: 0, scale: 0.82, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero__art-frame">
            <Logo size={190} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

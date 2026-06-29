import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Logo from './Logo'
import type { SiteSettings } from '@/lib/types'
import { buildWhatsappLink } from '@/lib/format'

const links = [
  { href: '#planos', label: 'Planos' },
  { href: '#programacao', label: 'Programação' },
  { href: '#galeria', label: 'Galeria' },
  { href: '#contato', label: 'Contato' },
]

export default function Navbar({ settings }: { settings: SiteSettings | null }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const whatsapp = buildWhatsappLink(settings)

  return (
    <header className={`nav ${scrolled ? 'nav--solid' : 'nav--transparent'}`}>
      <div className="container nav__inner">
        <a href="#top" aria-label="Início">
          <Logo size={38} withText mono />
        </a>

        <nav className="nav__links">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav__link">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav__cta">
          <a href={whatsapp} target="_blank" rel="noreferrer" className="btn btn-primary">
            Matricule-se
          </a>
          <button
            className="nav__burger"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="nav__mobile"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
          >
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
            <a
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
              onClick={() => setOpen(false)}
            >
              Matricule-se
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

import Reveal from './Reveal'
import { IconClock, IconInstagram, IconPin, IconWhatsApp } from './icons'
import type { SiteSettings } from '@/lib/types'
import { buildWhatsappLink } from '@/lib/format'

export default function ContactSection({ settings }: { settings: SiteSettings | null }) {
  const whatsapp = buildWhatsappLink(settings)
  const instagram = settings?.instagramUrl || 'https://instagram.com/sevenpersonal_'

  return (
    <section className="section contact" id="contato">
      <div className="container contact__grid">
        <Reveal>
          <div>
            <span className="eyebrow">Contato</span>
            <h2 className="section-title">Bora pro treino</h2>

            <div className="contact__list">
              {settings?.address && (
                <div className="contact__row">
                  <div className="contact__icon"><IconPin /></div>
                  <div>
                    <strong>Endereço</strong>
                    <span>{settings.address}</span>
                  </div>
                </div>
              )}
              {settings?.openingHours && (
                <div className="contact__row">
                  <div className="contact__icon"><IconClock /></div>
                  <div>
                    <strong>Horários</strong>
                    <span>{settings.openingHours}</span>
                  </div>
                </div>
              )}
              <a className="contact__row" href={instagram} target="_blank" rel="noreferrer">
                <div className="contact__icon"><IconInstagram /></div>
                <div>
                  <strong>Instagram</strong>
                  <span>@sevenpersonal_</span>
                </div>
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="contact__cta">
            <h3>Sua melhor versão te espera</h3>
            <p>Chama no WhatsApp, tira suas dúvidas e garanta seu plano hoje mesmo.</p>
            <a href={whatsapp} target="_blank" rel="noreferrer" className="btn">
              <IconWhatsApp width={18} height={18} /> Chamar no WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

import type { SiteSettings } from './types'

/** Formata um valor em Real brasileiro. */
export function formatPrice(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

/** Monta o link do WhatsApp com a mensagem padrão + nome do plano (opcional). */
export function buildWhatsappLink(settings: SiteSettings | null, planName?: string): string {
  const number = (settings?.whatsappNumber ?? '').replace(/\D/g, '')
  const base = settings?.whatsappDefaultMessage?.trim() || 'Olá! Tenho interesse'
  const message = planName ? `${base} ${planName}.` : `${base}.`
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

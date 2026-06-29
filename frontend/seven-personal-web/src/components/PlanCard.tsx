import type { Plan, SiteSettings } from '@/lib/types'
import { buildWhatsappLink, formatPrice } from '@/lib/format'
import { IconDumbbell } from './icons'

export default function PlanCard({ plan, settings }: { plan: Plan; settings: SiteSettings | null }) {
  const promo = plan.isPromotion && plan.promotionalPrice != null
  const finalPrice = promo ? plan.promotionalPrice! : plan.price
  const whatsapp = buildWhatsappLink(settings, plan.name)

  return (
    <div className={`plan-card ${promo ? 'plan-card--promo' : ''}`}>
      {promo && <span className="plan-card__badge">Promoção</span>}

      <h3 className="plan-card__name">{plan.name}</h3>
      <span className="plan-card__freq">
        <IconDumbbell width={17} height={17} /> {plan.timesPerWeek}× por semana
      </span>

      <div className="plan-card__price-area">
        {promo && <div className="plan-card__price-old">{formatPrice(plan.price)}</div>}
        <div className="plan-card__price">
          {formatPrice(finalPrice)} <small>/mês</small>
        </div>
      </div>

      {plan.description && <p className="plan-card__desc">{plan.description}</p>}

      <a href={whatsapp} target="_blank" rel="noreferrer" className="btn btn-primary btn-block">
        Quero esse plano
      </a>
    </div>
  )
}

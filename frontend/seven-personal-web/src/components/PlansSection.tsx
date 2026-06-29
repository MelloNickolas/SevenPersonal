import PlanCard from './PlanCard'
import Reveal from './Reveal'
import type { Plan, SiteSettings } from '@/lib/types'

interface Props {
  plans: Plan[]
  settings: SiteSettings | null
}

export default function PlansSection({ plans, settings }: Props) {
  return (
    <section className="section plans" id="planos">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <span className="eyebrow">Planos</span>
            <h2 className="section-title">Escolha seu ritmo</h2>
            <p>
              Da rotina puxada ao foco total: tem plano pra cada objetivo.
              Promoção rolando? Ela aparece em destaque aqui embaixo.
            </p>
          </div>
        </Reveal>

        {plans.length === 0 ? (
          <p className="empty-note">Em breve, novos planos no pedaço.</p>
        ) : (
          <div className="plans__grid">
            {plans.map((plan, i) => (
              <Reveal key={plan.id} delay={i * 0.06}>
                <PlanCard plan={plan} settings={settings} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

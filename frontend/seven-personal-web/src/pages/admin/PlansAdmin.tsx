import { useEffect, useState, type FormEvent } from 'react'
import { plansApi } from '@/lib/services'
import { formatPrice } from '@/lib/format'
import { useToast } from '@/lib/useToast'
import type { Plan, PlanInput } from '@/lib/types'

const emptyForm: PlanInput = {
  name: '',
  description: '',
  price: 0,
  timesPerWeek: 3,
  isPromotion: false,
  promotionalPrice: null,
  order: 0,
}

export default function PlansAdmin() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [form, setForm] = useState<PlanInput>(emptyForm)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const { showToast, Toast } = useToast()

  async function load() {
    setPlans(await plansApi.getAll())
  }
  useEffect(() => {
    load()
  }, [])

  function startEdit(plan: Plan) {
    setEditingId(plan.id)
    setForm({
      name: plan.name,
      description: plan.description,
      price: plan.price,
      timesPerWeek: plan.timesPerWeek,
      isPromotion: plan.isPromotion,
      promotionalPrice: plan.promotionalPrice,
      order: plan.order,
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function reset() {
    setEditingId(null)
    setForm(emptyForm)
    setError('')
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    if (!form.name.trim()) return setError('Informe o nome do plano.')
    if (form.isPromotion && (form.promotionalPrice == null || form.promotionalPrice <= 0)) {
      return setError('Informe o preço promocional.')
    }
    setSaving(true)
    try {
      if (editingId) {
        await plansApi.update(editingId, form)
        showToast('Plano atualizado!')
      } else {
        await plansApi.create(form)
        showToast('Plano criado!')
      }
      reset()
      await load()
    } catch {
      setError('Não foi possível salvar. Tente novamente.')
    } finally {
      setSaving(false)
    }
  }

  async function onDelete(id: number) {
    if (!confirm('Excluir este plano?')) return
    await plansApi.remove(id)
    showToast('Plano excluído.')
    await load()
  }

  return (
    <>
      <div className="admin__head">
        <div>
          <h1>Planos</h1>
          <p>Cadastre planos, preços e marque promoções em destaque.</p>
        </div>
      </div>

      <div className="panel">
        <h2>{editingId ? 'Editar plano' : 'Novo plano'}</h2>
        <form onSubmit={onSubmit}>
          {error && <div className="form-error">{error}</div>}

          <div className="field">
            <label>Nome</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Ex.: Mensal"
            />
          </div>

          <div className="field">
            <label>Descrição / benefícios</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Ex.: Acesso livre à musculação, acompanhamento..."
            />
          </div>

          <div className="field--row">
            <div className="field">
              <label>Preço (R$)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
              />
            </div>
            <div className="field">
              <label>Vezes por semana</label>
              <input
                type="number"
                min="1"
                max="7"
                value={form.timesPerWeek}
                onChange={(e) => setForm({ ...form, timesPerWeek: Number(e.target.value) })}
              />
            </div>
            <div className="field">
              <label>Ordem</label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="field field-check">
            <input
              id="promo"
              type="checkbox"
              checked={form.isPromotion}
              onChange={(e) => setForm({ ...form, isPromotion: e.target.checked })}
            />
            <label htmlFor="promo" style={{ marginBottom: 0 }}>
              Está em promoção (destaque no site)
            </label>
          </div>

          {form.isPromotion && (
            <div className="field">
              <label>Preço promocional (R$)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.promotionalPrice ?? ''}
                onChange={(e) =>
                  setForm({
                    ...form,
                    promotionalPrice: e.target.value ? Number(e.target.value) : null,
                  })
                }
              />
            </div>
          )}

          <div className="form-actions">
            <button type="submit" className="btn btn-primary btn-sm" disabled={saving}>
              {saving ? 'Salvando…' : editingId ? 'Salvar alterações' : 'Adicionar plano'}
            </button>
            {editingId && (
              <button type="button" className="btn btn-outline btn-sm" onClick={reset}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="panel">
        <h2>Planos cadastrados ({plans.length})</h2>
        {plans.length === 0 ? (
          <p className="empty-note">Nenhum plano cadastrado ainda.</p>
        ) : (
          <div className="admin-list">
            {plans.map((plan) => (
              <div key={plan.id} className="admin-row">
                <div className="admin-row__main">
                  <div className="admin-row__title">
                    {plan.name}
                    {plan.isPromotion && <span className="tag-promo">Promo</span>}
                  </div>
                  <div className="admin-row__meta">
                    {plan.timesPerWeek}×/sem ·{' '}
                    {plan.isPromotion && plan.promotionalPrice != null ? (
                      <>
                        <s>{formatPrice(plan.price)}</s> {formatPrice(plan.promotionalPrice)}
                      </>
                    ) : (
                      formatPrice(plan.price)
                    )}
                  </div>
                </div>
                <button className="btn btn-outline btn-sm" onClick={() => startEdit(plan)}>
                  Editar
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => onDelete(plan.id)}>
                  Excluir
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

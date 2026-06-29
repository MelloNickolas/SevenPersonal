import { useEffect, useState, type FormEvent } from 'react'
import { settingsApi } from '@/lib/services'
import { useToast } from '@/lib/useToast'
import type { SiteSettings } from '@/lib/types'

const empty: SiteSettings = {
  whatsappNumber: '',
  instagramUrl: '',
  address: '',
  openingHours: '',
  whatsappDefaultMessage: 'Olá! Tenho interesse no plano',
}

export default function SettingsAdmin() {
  const [form, setForm] = useState<SiteSettings>(empty)
  const [saving, setSaving] = useState(false)
  const { showToast, Toast } = useToast()

  useEffect(() => {
    settingsApi.get().then(setForm)
  }, [])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const saved = await settingsApi.update(form)
      setForm(saved)
      showToast('Configurações salvas!')
    } catch {
      showToast('Não foi possível salvar.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <div className="admin__head">
        <div>
          <h1>Configurações</h1>
          <p>Contato exibido no site — atualize quando precisar.</p>
        </div>
      </div>

      <div className="panel">
        <form onSubmit={onSubmit}>
          <div className="field">
            <label>WhatsApp (só números, com DDI e DDD)</label>
            <input
              value={form.whatsappNumber}
              onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
              placeholder="Ex.: 5511999999999"
            />
          </div>

          <div className="field">
            <label>Mensagem padrão do WhatsApp</label>
            <input
              value={form.whatsappDefaultMessage}
              onChange={(e) => setForm({ ...form, whatsappDefaultMessage: e.target.value })}
              placeholder="Olá! Tenho interesse no plano"
            />
          </div>

          <div className="field">
            <label>Instagram (URL)</label>
            <input
              value={form.instagramUrl}
              onChange={(e) => setForm({ ...form, instagramUrl: e.target.value })}
              placeholder="https://instagram.com/sevenpersonal_"
            />
          </div>

          <div className="field">
            <label>Endereço</label>
            <input
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="Rua, número, bairro, cidade"
            />
          </div>

          <div className="field">
            <label>Horário de funcionamento</label>
            <input
              value={form.openingHours}
              onChange={(e) => setForm({ ...form, openingHours: e.target.value })}
              placeholder="Seg a Sex: 06h às 22h • Sáb: 08h às 12h"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary btn-sm" disabled={saving}>
              {saving ? 'Salvando…' : 'Salvar configurações'}
            </button>
          </div>
        </form>
      </div>

      <Toast />
    </>
  )
}

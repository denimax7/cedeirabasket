'use client'

import { useState } from 'react'

interface Labels {
  nameLabel: string
  namePlaceholder: string
  emailFieldLabel: string
  emailPlaceholder: string
  phoneFieldLabel: string
  phonePlaceholder: string
  messageLabel: string
  messagePlaceholder: string
  submitBtn: string
  sending: string
  successTitle: string
  successBody: string
  errorMsg: string
}

const inputClass =
  'w-full h-11 px-4 rounded border border-gray-200 bg-white font-body text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-blue transition-colors'
const labelClass = 'block font-body text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5'

export function ContactoForm({ labels }: { labels: Labels }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-blue/5 border border-blue/20 rounded p-8 text-center">
        <div className="w-12 h-12 rounded bg-blue flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display font-black text-xl uppercase tracking-tight text-black mb-2">
          {labels.successTitle}
        </h3>
        <p className="font-body text-gray-600 text-sm">{labels.successBody}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label className={labelClass}>{labels.nameLabel}</label>
        <input
          type="text"
          required
          placeholder={labels.namePlaceholder}
          value={form.name}
          onChange={set('name')}
          className={inputClass}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>{labels.emailFieldLabel}</label>
          <input
            type="email"
            required
            placeholder={labels.emailPlaceholder}
            value={form.email}
            onChange={set('email')}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>{labels.phoneFieldLabel}</label>
          <input
            type="tel"
            placeholder={labels.phonePlaceholder}
            value={form.phone}
            onChange={set('phone')}
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label className={labelClass}>{labels.messageLabel}</label>
        <textarea
          required
          rows={5}
          placeholder={labels.messagePlaceholder}
          value={form.message}
          onChange={set('message')}
          className={`${inputClass} h-auto resize-none py-3`}
        />
      </div>

      {status === 'error' && (
        <p className="font-body text-sm text-red-600">{labels.errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="self-start inline-flex items-center h-12 px-8 rounded bg-blue text-white font-semibold text-base hover:bg-blue-bright transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? labels.sending : labels.submitBtn}
      </button>
    </form>
  )
}

'use client'

import { useState } from 'react'

interface Labels {
  formTitle: string
  playerNameLabel: string
  playerNamePlaceholder: string
  birthYearLabel: string
  birthYearPlaceholder: string
  categoryLabel: string
  categoryPlaceholder: string
  contactNameLabel: string
  contactNamePlaceholder: string
  contactPhoneLabel: string
  contactPhonePlaceholder: string
  contactEmailLabel: string
  contactEmailPlaceholder: string
  notesLabel: string
  notesPlaceholder: string
  submitBtn: string
  sending: string
  successTitle: string
  successBody: string
  errorMsg: string
  privacyNote: string
}

const inputClass =
  'w-full h-11 px-4 rounded border border-gray-200 bg-white font-body text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-blue transition-colors'
const labelClass =
  'block font-body text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5'

const CATEGORIES = ['Mini-Basket (7-8)', 'Benjamín (9-10)', 'Alevín (11-12)', 'Infantil (13-14)', 'Cadete (15-16)']

export function InscripcionForm({ labels }: { labels: Labels }) {
  const [form, setForm] = useState({
    playerName: '',
    birthYear: '',
    category: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    notes: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/inscripcion', {
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
      <div className="bg-blue/5 border border-blue/20 rounded p-10 text-center">
        <div className="w-14 h-14 rounded bg-blue flex items-center justify-center mx-auto mb-5">
          <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display font-black text-2xl uppercase tracking-tight text-black mb-3">
          {labels.successTitle}
        </h3>
        <p className="font-body text-gray-600 text-base max-w-md mx-auto">{labels.successBody}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Deportista */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>{labels.playerNameLabel}</label>
          <input
            type="text"
            required
            placeholder={labels.playerNamePlaceholder}
            value={form.playerName}
            onChange={set('playerName')}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>{labels.birthYearLabel}</label>
          <input
            type="number"
            required
            min={2008}
            max={2020}
            placeholder={labels.birthYearPlaceholder}
            value={form.birthYear}
            onChange={set('birthYear')}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>{labels.categoryLabel}</label>
        <select
          value={form.category}
          onChange={set('category')}
          className={`${inputClass} cursor-pointer`}
        >
          <option value="">{labels.categoryPlaceholder}</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="border-t border-gray-100 pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className={labelClass}>{labels.contactNameLabel}</label>
            <input
              type="text"
              required
              placeholder={labels.contactNamePlaceholder}
              value={form.contactName}
              onChange={set('contactName')}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>{labels.contactPhoneLabel}</label>
            <input
              type="tel"
              required
              placeholder={labels.contactPhonePlaceholder}
              value={form.contactPhone}
              onChange={set('contactPhone')}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>{labels.contactEmailLabel}</label>
            <input
              type="email"
              required
              placeholder={labels.contactEmailPlaceholder}
              value={form.contactEmail}
              onChange={set('contactEmail')}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <div>
        <label className={labelClass}>{labels.notesLabel}</label>
        <textarea
          rows={3}
          placeholder={labels.notesPlaceholder}
          value={form.notes}
          onChange={set('notes')}
          className={`${inputClass} h-auto resize-none py-3`}
        />
      </div>

      {status === 'error' && (
        <p className="font-body text-sm text-red-600">{labels.errorMsg}</p>
      )}

      <div className="flex flex-col gap-3">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="self-start inline-flex items-center h-12 px-8 rounded bg-blue text-white font-semibold text-base hover:bg-blue-bright transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? labels.sending : labels.submitBtn}
        </button>
        <p className="font-body text-xs text-gray-400">{labels.privacyNote}</p>
      </div>
    </form>
  )
}

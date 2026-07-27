'use client'

import { useState, useEffect } from 'react'

interface CountdownProps {
  targetDate: string
  labels: { days: string; hours: string; min: string; sec: string }
  addToCalendarLabel: string
  eventTitle: string
  eventLocation: string
  eventStart: string
  eventEnd: string
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function generateICS(title: string, location: string, start: string, end: string) {
  const fmt = (s: string) =>
    new Date(s).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Cedeira Basket Club//ES',
    'BEGIN:VEVENT',
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${title}`,
    `LOCATION:${location}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

export function CountdownClient({
  targetDate,
  labels,
  addToCalendarLabel,
  eventTitle,
  eventLocation,
  eventStart,
  eventEnd,
}: CountdownProps) {
  const [time, setTime] = useState<{ d: number; h: number; m: number; s: number } | null>(null)

  useEffect(() => {
    const update = () => {
      const diff = new Date(targetDate).getTime() - Date.now()
      if (diff <= 0) {
        setTime({ d: 0, h: 0, m: 0, s: 0 })
        return
      }
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      })
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [targetDate])

  const handleDownload = () => {
    const ics = generateICS(eventTitle, eventLocation, eventStart, eventEnd)
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'evento-cedeira-basket.ics'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const units = time
    ? [
        { value: pad(time.d), label: labels.days },
        { value: pad(time.h), label: labels.hours },
        { value: pad(time.m), label: labels.min },
        { value: pad(time.s), label: labels.sec },
      ]
    : null

  return (
    <div>
      {/* Countdown boxes */}
      <div className="flex items-end gap-2 sm:gap-3 mb-6">
        {units
          ? units.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="bg-white/10 border border-white/15 rounded-md w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center mb-1">
                  <span className="font-display font-black text-white text-2xl sm:text-3xl tabular-nums">
                    {value}
                  </span>
                </div>
                <span className="text-gray-300 text-[10px] uppercase tracking-widest font-body">
                  {label}
                </span>
              </div>
            ))
          : // SSR skeleton
            ['—', '—', '—', '—'].map((_, i) => (
              <div key={i} className="text-center">
                <div className="bg-white/10 border border-white/15 rounded-md w-16 sm:w-20 h-16 sm:h-20" />
              </div>
            ))}
      </div>

      {/* Add to calendar */}
      <button
        onClick={handleDownload}
        className="inline-flex items-center gap-2 h-10 px-5 rounded border border-white/30 text-white text-sm font-semibold hover:bg-white/10 transition-colors font-body"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        {addToCalendarLabel}
      </button>
    </div>
  )
}

import { Container } from '@/components/ui/Container'
import { CountdownClient } from './CountdownClient'
import { proximoEvento } from '@/data/events'
import type { Dictionary } from '@/lib/i18n'

interface ProximoEventoProps {
  lang: string
  dict: Dictionary
}

const typeColors: Record<string, string> = {
  partido: 'bg-blue text-white',
  torneo: 'bg-blue text-white',
  campamento: 'bg-navy text-white',
  outro: 'bg-white/20 text-white',
}

const typeLabels: Record<string, { gl: string; es: string }> = {
  partido: { gl: 'Partido', es: 'Partido' },
  torneo: { gl: 'Torneo', es: 'Torneo' },
  campamento: { gl: 'Campamento', es: 'Campamento' },
  outro: { gl: 'Evento', es: 'Evento' },
}

function formatDate(iso: string, lang: string) {
  return new Date(iso).toLocaleDateString(lang === 'gl' ? 'gl-ES' : 'es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function ProximoEvento({ lang, dict }: ProximoEventoProps) {
  const ev = proximoEvento
  const title = lang === 'gl' ? ev.titleGl : ev.titleEs
  const location = lang === 'gl' ? ev.locationGl : ev.locationEs
  const typeLabel = typeLabels[ev.type]?.[lang as 'gl' | 'es'] ?? ev.type

  return (
    <section className="bg-navy py-16 sm:py-20">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16">
          {/* Event info */}
          <div className="flex-1">
            <p className="text-xs font-body font-semibold uppercase tracking-[0.2em] text-blue mb-3">
              {dict.common.nextEvent}
            </p>
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-sm text-xs font-semibold uppercase tracking-wide font-body ${typeColors[ev.type]}`}
              >
                {typeLabel}
              </span>
            </div>
            <h2 className="font-display font-black text-white text-3xl sm:text-4xl uppercase leading-none tracking-tight mb-5">
              {title}
            </h2>
            <div className="flex flex-col gap-2 font-body text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="capitalize">{formatDate(ev.date, lang)}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{location}</span>
              </div>
            </div>
          </div>

          {/* Countdown */}
          <div className="lg:shrink-0">
            <CountdownClient
              targetDate={ev.date}
              labels={{
                days: dict.common.days,
                hours: dict.common.hours,
                min: dict.common.min,
                sec: dict.common.sec,
              }}
              addToCalendarLabel={dict.common.addToCalendar}
              eventTitle={title}
              eventLocation={location}
              eventStart={ev.date}
              eventEnd={ev.endDate}
            />
          </div>
        </div>
      </Container>
    </section>
  )
}

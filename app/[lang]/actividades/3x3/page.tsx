import { notFound } from 'next/navigation'
import Link from 'next/link'
import { hasLocale, getDictionary } from '@/lib/i18n'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/ui/PageHero'
import { CountdownClient } from '@/components/sections/CountdownClient'
import eventsData from '@/content/events.json'

export default async function Torneo3x3Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = getDictionary(lang)
  const t = dict.torneo3x3
  const ev = eventsData.proximoEvento

  const eventTitle = lang === 'gl' ? ev.titleGl : ev.titleEs
  const eventLocation = lang === 'gl' ? ev.locationGl : ev.locationEs

  const eventDate = new Date(ev.date)
  const dateFormatted = eventDate.toLocaleDateString(
    lang === 'gl' ? 'gl-ES' : 'es-ES',
    { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  )

  const formatItems = [t.format1, t.format2, t.format3, t.format4]

  const details = [
    { label: t.dateLabel,     value: dateFormatted },
    { label: t.timeLabel,     value: t.timeValue   },
    { label: t.locationLabel, value: t.locationValue },
    { label: t.priceLabel,    value: t.priceValue  },
  ]

  return (
    <>
      <PageHero
        kicker={t.kicker}
        title={dict.pages.torneo3x3.title}
        subtitle={dict.pages.torneo3x3.description}
        breadcrumbs={[{ label: dict.nav.actividades, href: `/${lang}` }]}
      />

      {/* Qué es + formato */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Qué es */}
            <div>
              <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-black leading-none mb-6">
                {t.what}
              </h2>
              <p className="font-body text-gray-600 text-base leading-relaxed">
                {t.whatBody}
              </p>
            </div>

            {/* Formato */}
            <div>
              <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-black leading-none mb-6">
                {t.formatTitle}
              </h2>
              <ul className="flex flex-col gap-3">
                {formatItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 font-body text-gray-700 text-base">
                    <span className="mt-1 w-5 h-5 flex-shrink-0 rounded-sm bg-blue flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Countdown + detalles */}
      <section className="bg-navy py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Countdown */}
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] font-body text-blue">
                {t.countdownTitle}
              </p>
              <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-white leading-none mb-8">
                {eventTitle}
              </h2>
              <CountdownClient
                targetDate={ev.date}
                labels={dict.common}
                addToCalendarLabel={dict.common.addToCalendar}
                eventTitle={eventTitle}
                eventLocation={eventLocation}
                eventStart={ev.date}
                eventEnd={ev.endDate}
              />
            </div>

            {/* Detalles */}
            <div className="bg-white/5 border border-white/10 rounded-md p-8">
              <h3 className="font-display font-black text-xl uppercase tracking-tight text-white leading-none mb-6">
                {t.detailsTitle}
              </h3>
              <dl className="flex flex-col gap-5">
                {details.map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-0.5">
                    <dt className="text-xs font-semibold uppercase tracking-widest text-white/40 font-body">
                      {label}
                    </dt>
                    <dd className="font-body text-white text-sm capitalize">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </section>

      {/* Inscripción CTA */}
      <section className="bg-gray-100 py-20 lg:py-28">
        <Container>
          <div className="max-w-2xl">
            <h2 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tight text-black leading-none mb-5">
              {t.registerTitle}
            </h2>
            <p className="font-body text-gray-600 text-base leading-relaxed mb-8">
              {t.registerDesc}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${lang}/inscripcion`}
                className="inline-flex items-center h-12 px-8 rounded bg-blue text-white font-semibold text-base hover:bg-blue-bright transition-colors"
              >
                {t.registerBtn}
              </Link>
              <Link
                href={`/${lang}/contacto`}
                className="inline-flex items-center h-12 px-8 rounded border border-gray-300 text-gray-700 font-semibold text-base hover:border-blue hover:text-blue transition-colors"
              >
                {t.contactBtn}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

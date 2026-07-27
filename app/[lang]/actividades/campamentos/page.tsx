import { notFound } from 'next/navigation'
import Link from 'next/link'
import { hasLocale, getDictionary } from '@/lib/i18n'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/ui/PageHero'

export default async function CampamentosPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = getDictionary(lang)
  const c = dict.campamentos

  const includes = [c.inc1, c.inc2, c.inc3, c.inc4, c.inc5, c.inc6]

  const turnos = [
    { label: c.turno1Label, dates: c.turno1Dates },
    { label: c.turno2Label, dates: c.turno2Dates },
  ]

  const details = [
    { label: c.agesLabel,     value: c.agesValue     },
    { label: c.priceLabel,    value: c.priceValue    },
    { label: c.scheduleLabel, value: c.scheduleValue },
    { label: c.locationLabel, value: c.locationValue },
  ]

  return (
    <>
      <PageHero
        kicker={c.kicker}
        title={dict.pages.campamentos.title}
        subtitle={dict.pages.campamentos.description}
        breadcrumbs={[{ label: dict.nav.actividades, href: `/${lang}` }]}
      />

      {/* Intro + qué incluye */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Descripción */}
            <div>
              <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-black leading-none mb-6">
                {c.introTitle}
              </h2>
              <p className="font-body text-gray-600 text-base leading-relaxed">
                {c.introBody}
              </p>
            </div>

            {/* Qué incluye */}
            <div>
              <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-black leading-none mb-6">
                {c.whatTitle}
              </h2>
              <ul className="flex flex-col gap-3">
                {includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 font-body text-gray-700 text-base">
                    <span className="mt-1 w-5 h-5 flex-shrink-0 rounded-sm bg-navy flex items-center justify-center">
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

      {/* Datas e detalles */}
      <section className="bg-gray-100 py-20 lg:py-28">
        <Container>
          <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-black leading-none mb-10">
            {c.datesTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Turnos */}
            {turnos.map((turno) => (
              <div key={turno.label} className="bg-white border-t-4 border-navy p-8">
                <p className="font-body text-xs uppercase tracking-widest text-blue font-semibold mb-2">
                  {turno.label}
                </p>
                <p className="font-display font-black text-2xl uppercase tracking-tight text-black leading-none">
                  {turno.dates}
                </p>
              </div>
            ))}
          </div>

          {/* Detalles */}
          <div className="bg-white p-8 grid grid-cols-2 sm:grid-cols-4 gap-px bg-gray-100 border border-gray-100">
            {details.map(({ label, value }) => (
              <div key={label} className="bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 font-body mb-2">
                  {label}
                </p>
                <p className="font-display font-black text-lg uppercase text-black leading-none">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-navy py-20 lg:py-28">
        <Container>
          <div className="max-w-2xl">
            <h2 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tight text-white leading-none mb-5">
              {c.registerTitle}
            </h2>
            <p className="font-body text-gray-300 text-base leading-relaxed mb-8">
              {c.registerDesc}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${lang}/inscripcion`}
                className="inline-flex items-center h-12 px-8 rounded bg-blue text-white font-semibold text-base hover:bg-blue-bright transition-colors"
              >
                {c.registerBtn}
              </Link>
              <Link
                href={`/${lang}/contacto`}
                className="inline-flex items-center h-12 px-8 rounded border border-white/25 text-white font-semibold text-base hover:bg-white/8 transition-colors"
              >
                {c.contactBtn}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

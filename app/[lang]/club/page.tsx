import { notFound } from 'next/navigation'
import Link from 'next/link'
import { hasLocale, getDictionary } from '@/lib/i18n'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/ui/PageHero'

export default async function ClubPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = getDictionary(lang)
  const c = dict.club

  const stats = [
    { label: c.foundedLabel, value: c.foundedValue },
    { label: c.membersLabel, value: c.membersValue },
    { label: c.categoriesLabel, value: c.categoriesValue },
    { label: c.locationLabel, value: c.locationValue },
  ]

  const valores = [
    { title: c.valor1Title, desc: c.valor1Desc, icon: '🏀' },
    { title: c.valor2Title, desc: c.valor2Desc, icon: '🏡' },
    { title: c.valor3Title, desc: c.valor3Desc, icon: '🤝' },
  ]

  return (
    <>
      <PageHero
        kicker={dict.nav.club}
        title={dict.pages.club.title}
        subtitle={dict.pages.club.description}
      />

      {/* Historia */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Text */}
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] font-body text-blue">
                {c.historyKicker}
              </p>
              <h2 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tight leading-none text-black mb-8">
                {c.historyTitle}
              </h2>
              <p className="font-body text-gray-600 leading-relaxed mb-5 text-base">
                {c.historyBody1}
              </p>
              <p className="font-body text-gray-600 leading-relaxed text-base">
                {c.historyBody2}
              </p>
              <div className="mt-8">
                <Link
                  href={`/${lang}/club/cuerpo-tecnico`}
                  className="inline-flex items-center gap-2 font-semibold text-blue hover:text-blue-bright transition-colors font-body text-sm uppercase tracking-wider"
                >
                  {dict.nav.cuerpoTecnico} →
                </Link>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-px bg-gray-100 border border-gray-100">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white p-8">
                  <p className="font-display font-black text-4xl sm:text-5xl text-navy leading-none mb-2">
                    {stat.value}
                  </p>
                  <p className="font-body text-xs uppercase tracking-widest text-gray-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Valores */}
      <section className="bg-gray-100 py-20 lg:py-28">
        <Container>
          <div className="text-center mb-14">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] font-body text-blue">
              {c.valoresKicker}
            </p>
            <h2 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tight leading-none text-black">
              {c.valoresTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {valores.map((v) => (
              <div key={v.title} className="bg-white p-8 border-t-4 border-blue">
                <div className="text-3xl mb-5">{v.icon}</div>
                <h3 className="font-display font-black text-2xl uppercase tracking-tight text-black mb-3">
                  {v.title}
                </h3>
                <p className="font-body text-gray-600 text-sm leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-navy py-20 lg:py-28">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tight leading-none text-white mb-5">
              {c.ctaTitle}
            </h2>
            <p className="font-body text-gray-300 text-base leading-relaxed mb-10">
              {c.ctaDesc}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={`/${lang}/inscripcion`}
                className="inline-flex items-center h-12 px-8 rounded bg-blue text-white font-semibold text-base hover:bg-blue-bright transition-colors"
              >
                {c.ctaBtn1}
              </Link>
              <Link
                href={`/${lang}/contacto`}
                className="inline-flex items-center h-12 px-8 rounded border border-white/25 text-white font-semibold text-base hover:bg-white/8 transition-colors"
              >
                {c.ctaBtn2}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

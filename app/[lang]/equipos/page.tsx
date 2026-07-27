import { notFound } from 'next/navigation'
import Link from 'next/link'
import { hasLocale, getDictionary } from '@/lib/i18n'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/ui/PageHero'
import equiposJson from '@/content/equipos.json'

interface Categoria {
  id: string
  nameGl: string
  nameEs: string
  ages: string
  birthYears: string
  color: string
  trainingGl: string
  trainingEs: string
  coachGl: string
  coachEs: string
  descGl: string
  descEs: string
}

const colorMap: Record<string, { bar: string; badge: string; text: string }> = {
  'bg-blue':  { bar: 'bg-blue',  badge: 'bg-blue/10 text-blue',   text: 'text-blue'  },
  'bg-navy':  { bar: 'bg-navy',  badge: 'bg-navy/10 text-navy',   text: 'text-navy'  },
  'bg-black': { bar: 'bg-black', badge: 'bg-black/10 text-black', text: 'text-black' },
}

export default async function EquiposPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = getDictionary(lang)
  const eq = dict.equipos
  const categorias = equiposJson.categorias as Categoria[]

  return (
    <>
      <PageHero
        kicker={eq.introKicker}
        title={dict.pages.equipos.title}
        subtitle={eq.introSubtitle}
      />

      <section className="bg-white py-20 lg:py-28">
        <Container>
          <div className="flex flex-col gap-0">
            {categorias.map((cat, i) => {
              const name    = lang === 'gl' ? cat.nameGl    : cat.nameEs
              const training = lang === 'gl' ? cat.trainingGl : cat.trainingEs
              const coach   = lang === 'gl' ? cat.coachGl   : cat.coachEs
              const desc    = lang === 'gl' ? cat.descGl    : cat.descEs
              const colors  = colorMap[cat.color] ?? colorMap['bg-navy']
              const isEven  = i % 2 === 0

              return (
                <div
                  key={cat.id}
                  className={`grid grid-cols-1 lg:grid-cols-2 border-b border-gray-100 last:border-0 ${isEven ? '' : 'lg:flex-row-reverse'}`}
                >
                  {/* Color block */}
                  <div
                    className={`${colors.bar} flex items-center justify-center py-16 px-8 ${isEven ? 'lg:order-first' : 'lg:order-last'}`}
                  >
                    <div className="text-center">
                      <p className="font-display font-black text-8xl sm:text-9xl text-white/10 leading-none select-none uppercase">
                        {cat.ages.split('-')[0]}
                      </p>
                      <h2 className="font-display font-black text-4xl sm:text-5xl text-white uppercase tracking-tight leading-none -mt-4">
                        {name}
                      </h2>
                      <p className="font-body text-white/60 text-sm mt-3 uppercase tracking-widest">
                        {cat.ages}
                      </p>
                    </div>
                  </div>

                  {/* Info block */}
                  <div className={`flex flex-col justify-center px-8 py-12 lg:px-14 ${isEven ? 'lg:order-last' : 'lg:order-first'}`}>
                    <p className="font-body text-gray-600 text-base leading-relaxed mb-8">
                      {desc}
                    </p>

                    <dl className="grid grid-cols-2 gap-x-6 gap-y-5 mb-8">
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-widest text-gray-400 font-body mb-1">
                          {eq.birthYearsLabel}
                        </dt>
                        <dd className="font-display font-black text-lg uppercase text-black leading-none">
                          {cat.birthYears}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-widest text-gray-400 font-body mb-1">
                          {eq.trainingLabel}
                        </dt>
                        <dd className="font-body text-sm text-gray-700 leading-snug">
                          {training}
                        </dd>
                      </div>
                      <div className="col-span-2">
                        <dt className="text-xs font-semibold uppercase tracking-widest text-gray-400 font-body mb-1">
                          {eq.coachLabel}
                        </dt>
                        <dd className="font-body text-sm text-gray-700">
                          {coach}
                        </dd>
                      </div>
                    </dl>

                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={`/${lang}/inscripcion`}
                        className="inline-flex items-center h-10 px-6 rounded bg-blue text-white font-semibold text-sm hover:bg-blue-bright transition-colors"
                      >
                        {eq.registerCta}
                      </Link>
                      <Link
                        href={`/${lang}/contacto`}
                        className="inline-flex items-center h-10 px-6 rounded border border-gray-200 text-gray-700 font-semibold text-sm hover:border-blue hover:text-blue transition-colors"
                      >
                        {eq.contactCta}
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* CTA strip */}
      <section className="bg-navy py-16">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight leading-none">
                {dict.common.joinUs}
              </p>
              <p className="font-body text-gray-300 text-sm mt-1">{dict.common.season}</p>
            </div>
            <Link
              href={`/${lang}/inscripcion`}
              className="inline-flex items-center h-12 px-8 rounded bg-blue text-white font-semibold text-base hover:bg-blue-bright transition-colors whitespace-nowrap flex-shrink-0"
            >
              {dict.common.register} →
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}

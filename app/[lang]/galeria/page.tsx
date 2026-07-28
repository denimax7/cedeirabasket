import { notFound } from 'next/navigation'
import Link from 'next/link'
import { hasLocale, getDictionary } from '@/lib/i18n'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/ui/PageHero'

export default async function GaleriaPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = getDictionary(lang)
  const g = dict.galeria

  return (
    <>
      <PageHero
        kicker={dict.nav.galeria}
        title={dict.pages.galeria.title}
        subtitle={dict.pages.galeria.description}
      />

      <section className="bg-white py-28 lg:py-40">
        <Container>
          <div className="max-w-xl mx-auto text-center">
            {/* Basketball SVG icon */}
            <div className="w-20 h-20 mx-auto mb-8 opacity-20">
              <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="38" stroke="#0b1f2e" strokeWidth="2"/>
                <path d="M40 2 Q40 40 40 78" stroke="#0b1f2e" strokeWidth="2"/>
                <path d="M2 40 Q40 40 78 40" stroke="#0b1f2e" strokeWidth="2"/>
                <path d="M10 15 Q40 35 70 15" stroke="#0b1f2e" strokeWidth="2" fill="none"/>
                <path d="M10 65 Q40 45 70 65" stroke="#0b1f2e" strokeWidth="2" fill="none"/>
              </svg>
            </div>

            <h2 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tight text-black leading-none mb-6">
              {g.comingSoonTitle}
            </h2>
            <p className="font-body text-gray-600 text-base leading-relaxed mb-10">
              {g.comingSoonBody}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://instagram.com/cedeirabasketclub"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center h-12 px-8 rounded bg-blue text-white font-semibold text-base hover:bg-blue-bright transition-colors"
              >
                {g.followUs} →
              </a>
              <Link
                href={`/${lang}`}
                className="inline-flex items-center h-12 px-8 rounded border border-gray-200 text-gray-700 font-semibold text-base hover:border-blue hover:text-blue transition-colors"
              >
                {dict.common.backHome}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

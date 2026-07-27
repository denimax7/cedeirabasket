import { notFound } from 'next/navigation'
import Link from 'next/link'
import { hasLocale, getDictionary } from '@/lib/i18n'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'

export default async function HomePage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = getDictionary(lang)

  return (
    <>
      {/* Hero */}
      <section className="relative bg-black min-h-[85vh] flex items-center overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#1d4ed830_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#0b1b3f60_0%,_transparent_60%)]" />

        {/* Basketball court lines (decorative) */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-5 pointer-events-none hidden lg:block">
          <div className="absolute inset-0 border-l border-white/40" />
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-64 h-64 rounded-full border border-white/40" />
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-32 h-32 rounded-full border border-white/40" />
        </div>

        <Container className="relative py-24 lg:py-32">
          <div className="max-w-2xl">
            <Badge variant="blue" className="mb-6">
              {dict.home.heroKicker}
            </Badge>
            <h1 className="font-display font-black text-white text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight mb-6">
              {dict.home.heroTitle.split('\n').map((line, i) => (
                <span key={i} className={`block ${i === 1 ? 'text-blue-bright' : ''}`}>
                  {line}
                </span>
              ))}
            </h1>
            <p className="font-body text-gray-300 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl">
              {dict.home.heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/${lang}/inscripcion`}
                className="inline-flex items-center h-13 px-8 rounded-xl bg-blue text-white font-semibold text-base hover:bg-blue-bright transition-colors"
              >
                {dict.home.heroCta1}
              </Link>
              <Link
                href={`/${lang}/club`}
                className="inline-flex items-center h-13 px-8 rounded-xl bg-transparent text-white font-semibold text-base border border-white/30 hover:bg-white/10 transition-colors"
              >
                {dict.home.heroCta2}
              </Link>
            </div>
          </div>
        </Container>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </section>

      {/* Placeholder cards — Fase 2 will flesh these out */}
      <section className="py-20 bg-white">
        <Container>
          <p className="text-center text-sm font-body text-gray-300 uppercase tracking-widest mb-12">
            {lang === 'gl' ? 'FASE 1 — andamiaje completo · Fase 2 desenvolverá esta sección' : 'FASE 1 — andamiaje completo · Fase 2 desarrollará esta sección'}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { href: `/${lang}/club`, label: dict.nav.club },
              { href: `/${lang}/club/cuerpo-tecnico`, label: dict.nav.cuerpoTecnico },
              { href: `/${lang}/equipos`, label: dict.nav.equipos },
              { href: `/${lang}/3x3`, label: dict.nav.torneo3x3 },
              { href: `/${lang}/inscripcion`, label: dict.nav.inscripcion },
              { href: `/${lang}/galeria`, label: dict.nav.galeria },
              { href: `/${lang}/contacto`, label: dict.nav.contacto },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center justify-center h-24 rounded-2xl border border-gray-300 text-sm font-semibold font-body text-black hover:border-blue hover:text-blue hover:bg-blue/5 transition-all duration-200"
              >
                {item.label} →
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}

import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import type { Dictionary } from '@/lib/i18n'

interface HeroProps {
  lang: string
  dict: Dictionary
}

export function Hero({ lang, dict }: HeroProps) {
  const titleLines = dict.home.heroTitle.split('\n')

  return (
    <section className="relative bg-black min-h-[88vh] flex items-center overflow-hidden">
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_60%_-10%,_#0066cc25_0%,_transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_-10%_80%,_#0b1f2e80_0%,_transparent_70%)]" />

      {/* Decorative court lines */}
      <div className="absolute right-0 top-0 bottom-0 w-[55%] opacity-[0.04] pointer-events-none hidden lg:block">
        <div className="absolute inset-y-0 left-0 w-px bg-white" />
        <div className="absolute top-1/2 left-8 -translate-y-1/2 w-72 h-72 rounded-full border border-white" />
        <div className="absolute top-1/2 left-8 -translate-y-1/2 w-36 h-36 rounded-full border border-white" />
        <div className="absolute top-0 right-0 bottom-0 left-0 border-t border-white top-1/2" />
      </div>

      {/* Large background number */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 font-display font-black text-[20rem] leading-none text-white/[0.02] select-none pointer-events-none hidden xl:block">
        CB
      </div>

      <Container className="relative py-28 lg:py-36">
        <div className="max-w-2xl">
          <Badge variant="blue" className="mb-6">
            {dict.home.heroKicker}
          </Badge>
          <h1 className="font-display font-bold text-white text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.92] tracking-tight mb-6">
            {titleLines.map((line, i) => (
              <span key={i} className={`block ${i === 1 ? 'text-blue' : ''}`}>
                {line}
              </span>
            ))}
          </h1>
          <p className="font-body text-gray-300 text-lg leading-relaxed mb-10 max-w-lg">
            {dict.home.heroSubtitle}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${lang}/inscripcion`}
              className="inline-flex items-center h-12 px-7 rounded bg-blue text-white font-semibold text-base hover:bg-blue-bright transition-colors"
            >
              {dict.home.heroCta1}
            </Link>
            <Link
              href={`/${lang}/club`}
              className="inline-flex items-center h-12 px-7 rounded bg-transparent text-white font-semibold text-base border border-white/25 hover:bg-white/8 transition-colors"
            >
              {dict.home.heroCta2}
            </Link>
          </div>
        </div>
      </Container>

      {/* Bottom gradient to white */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  )
}

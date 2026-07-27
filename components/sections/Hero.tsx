import Link from 'next/link'
import Image from 'next/image'
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
      {/* Background photo */}
      <Image
        src="/hero.jpg"
        alt="Cedeira Basket Club"
        fill
        className="object-cover object-center"
        priority
      />

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

    </section>
  )
}

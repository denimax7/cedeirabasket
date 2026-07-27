import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import type { Dictionary } from '@/lib/i18n'

interface DestacadosProps {
  lang: string
  dict: Dictionary
}

const ActivityIcon = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
)

const InscripcionIcon = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
  </svg>
)

const TecnicoIcon = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
)

export function Destacados({ lang, dict }: DestacadosProps) {
  const cards = [
    {
      icon: <ActivityIcon />,
      title: dict.home.destacado1Title,
      desc: dict.home.destacado1Desc,
      href: `/${lang}/actividades/3x3`,
      cta: dict.common.learnMore,
      accent: true,
    },
    {
      icon: <InscripcionIcon />,
      title: dict.home.destacado2Title,
      desc: dict.home.destacado2Desc,
      href: `/${lang}/inscripcion`,
      cta: dict.common.register,
      accent: false,
    },
    {
      icon: <TecnicoIcon />,
      title: dict.home.destacado3Title,
      desc: dict.home.destacado3Desc,
      href: `/${lang}/club/cuerpo-tecnico`,
      cta: dict.common.learnMore,
      accent: false,
    },
  ]

  return (
    <section className="bg-black py-20 sm:py-24">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/10">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group relative bg-black p-8 lg:p-10 flex flex-col gap-5 hover:bg-navy transition-colors duration-300"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-white/10 group-hover:bg-blue transition-colors duration-300" />

              <div className="text-blue">{card.icon}</div>

              <div className="flex-1">
                <h3 className="font-display font-black text-white text-2xl uppercase tracking-tight leading-none mb-3">
                  {card.title}
                </h3>
                <p className="font-body text-gray-300 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>

              <div className="flex items-center gap-2 text-blue text-sm font-semibold font-body group-hover:gap-3 transition-all duration-200">
                {card.cta}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}

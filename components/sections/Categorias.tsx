import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { categorias } from '@/data/equipos'
import type { Dictionary } from '@/lib/i18n'

interface CategoriasProps {
  lang: string
  dict: Dictionary
}

export function Categorias({ lang, dict }: CategoriasProps) {
  return (
    <section className="py-20 sm:py-24 bg-gray-100">
      <Container>
        <SectionHeading
          kicker={dict.home.categoriasKicker}
          title={dict.home.categoriasTitle}
          subtitle={dict.home.categoriasSubtitle}
          className="mb-12"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {categorias.map((cat) => {
            const name = lang === 'gl' ? cat.nameGl : cat.nameEs
            const training = lang === 'gl' ? cat.trainingGl : cat.trainingEs

            return (
              <Link
                key={cat.id}
                href={`/${lang}/equipos`}
                className="group relative bg-white border border-gray-300 rounded-md p-5 flex flex-col gap-3 hover:border-blue hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                {/* Color accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${cat.color} opacity-80`} />

                <div className="pt-1">
                  <p className="font-body text-xs text-gray-300 uppercase tracking-widest mb-1">
                    {cat.ages}
                  </p>
                  <h3 className="font-display font-black text-black text-xl uppercase leading-none group-hover:text-blue transition-colors">
                    {name}
                  </h3>
                </div>

                <p className="font-body text-xs text-gray-300 leading-relaxed mt-auto">
                  {training}
                </p>
              </Link>
            )
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            href={`/${lang}/equipos`}
            className="inline-flex items-center gap-2 text-sm font-semibold font-body text-blue hover:text-blue-bright transition-colors"
          >
            {dict.common.seeAll} →
          </Link>
        </div>
      </Container>
    </section>
  )
}

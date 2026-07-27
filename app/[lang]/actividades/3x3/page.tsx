import { notFound } from 'next/navigation'
import { hasLocale, getDictionary } from '@/lib/i18n'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'

export default async function Torneo3x3Page({ params }: PageProps<'/[lang]/actividades/3x3'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = getDictionary(lang)

  return (
    <section className="py-24 bg-black">
      <Container className="max-w-3xl text-center">
        <SectionHeading
          kicker={dict.nav.actividades}
          title={dict.pages.torneo3x3.title}
          subtitle={dict.pages.torneo3x3.description}
          light
        />
        <p className="mt-8 text-gray-300 font-body">{dict.common.underConstruction}</p>
        <div className="mt-8">
          <Button href={`/${lang}`} variant="ghost">{dict.common.backHome}</Button>
        </div>
      </Container>
    </section>
  )
}

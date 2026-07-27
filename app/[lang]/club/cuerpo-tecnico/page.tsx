import { notFound } from 'next/navigation'
import { hasLocale, getDictionary } from '@/lib/i18n'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'

export default async function CuerpoTecnicoPage({ params }: PageProps<'/[lang]/club/cuerpo-tecnico'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = getDictionary(lang)

  return (
    <section className="py-24">
      <Container className="max-w-3xl text-center">
        <SectionHeading
          kicker={dict.nav.club}
          title={dict.pages.cuerpoTecnico.title}
          subtitle={dict.pages.cuerpoTecnico.description}
        />
        <p className="mt-8 text-gray-300 font-body">{dict.common.underConstruction}</p>
        <div className="mt-8">
          <Button href={`/${lang}/club`} variant="secondary">{dict.nav.club}</Button>
        </div>
      </Container>
    </section>
  )
}

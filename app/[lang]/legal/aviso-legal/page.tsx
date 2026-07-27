import { notFound } from 'next/navigation'
import { hasLocale, getDictionary } from '@/lib/i18n'
import { Container } from '@/components/ui/Container'

export default async function AvisoLegalPage({ params }: PageProps<'/[lang]/legal/aviso-legal'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = getDictionary(lang)

  return (
    <section className="py-24">
      <Container className="max-w-2xl">
        <h1 className="font-display font-black text-4xl text-black mb-6">
          {dict.pages.avisoLegal.title}
        </h1>
        <p className="text-gray-300 font-body">{dict.common.underConstruction}</p>
      </Container>
    </section>
  )
}

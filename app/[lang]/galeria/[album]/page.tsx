import { notFound } from 'next/navigation'
import { hasLocale, getDictionary } from '@/lib/i18n'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

export default async function AlbumPage({ params }: PageProps<'/[lang]/galeria/[album]'>) {
  const { lang, album } = await params
  if (!hasLocale(lang)) notFound()
  const dict = getDictionary(lang)

  return (
    <section className="py-24">
      <Container className="max-w-3xl text-center">
        <p className="text-sm font-body text-blue font-semibold uppercase tracking-widest mb-3">
          {dict.nav.galeria}
        </p>
        <h1 className="font-display font-black text-4xl text-black mb-4">{album}</h1>
        <p className="text-gray-300 font-body">{dict.common.underConstruction}</p>
        <div className="mt-8">
          <Button href={`/${lang}/galeria`} variant="secondary">{dict.nav.galeria}</Button>
        </div>
      </Container>
    </section>
  )
}

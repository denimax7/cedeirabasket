import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { hasLocale, getDictionary } from '@/lib/i18n'

export function generateStaticParams() {
  return [{ lang: 'gl' }, { lang: 'es' }]
}

export async function generateMetadata({
  params,
}: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}

  const siteName = 'Cedeira Basket Club'
  const description =
    lang === 'gl'
      ? 'Club de baloncesto de base en Cedeira (A Coruña). Categorías dende os 7 anos. Mini-Basket, Benjamín, Alevín, Infantil e Cadete.'
      : 'Club de baloncesto de base en Cedeira (A Coruña). Categorías desde los 7 años. Mini-Basket, Benjamín, Alevín, Infantil y Cadete.'

  return {
    metadataBase: new URL('https://cedeirabasket.vercel.app'),
    title: { default: siteName, template: `%s · ${siteName}` },
    description,
    openGraph: {
      siteName,
      locale: lang === 'gl' ? 'gl_ES' : 'es_ES',
      type: 'website',
      images: [{ url: '/hero.jpg', width: 1200, height: 630, alt: siteName }],
    },
    twitter: { card: 'summary_large_image' },
    alternates: {
      languages: {
        'gl': `/gl`,
        'es': `/es`,
      },
    },
  }
}

export default async function LangLayout({
  children,
  params,
}: LayoutProps<'/[lang]'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = getDictionary(lang)

  return (
    <>
      <Navbar lang={lang} dict={dict} />
      <main className="flex-1">{children}</main>
      <Footer lang={lang} dict={dict} />
    </>
  )
}

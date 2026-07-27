import { notFound } from 'next/navigation'
import { hasLocale, getDictionary } from '@/lib/i18n'
import { Hero } from '@/components/sections/Hero'
import { ProximoEvento } from '@/components/sections/ProximoEvento'
import { Destacados } from '@/components/sections/Destacados'
import { Categorias } from '@/components/sections/Categorias'
import { GaleriaTeaser } from '@/components/sections/GaleriaTeaser'
import { DondeEstamos } from '@/components/sections/DondeEstamos'

export default async function HomePage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = getDictionary(lang)

  return (
    <>
      <Hero lang={lang} dict={dict} />
      <ProximoEvento lang={lang} dict={dict} />
      <Destacados lang={lang} dict={dict} />
      <Categorias lang={lang} dict={dict} />
      <GaleriaTeaser lang={lang} dict={dict} />
      <DondeEstamos lang={lang} dict={dict} />
    </>
  )
}

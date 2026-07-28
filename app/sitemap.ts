import type { MetadataRoute } from 'next'

const base = 'https://cedeirabasket.vercel.app'
const langs = ['gl', 'es']

const routes = [
  '',
  '/club',
  '/club/cuerpo-tecnico',
  '/equipos',
  '/actividades/3x3',
  '/actividades/campamentos',
  '/galeria',
  '/inscripcion',
  '/contacto',
]

export default function sitemap(): MetadataRoute.Sitemap {
  return langs.flatMap((lang) =>
    routes.map((route) => ({
      url: `${base}/${lang}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? ('weekly' as const) : ('monthly' as const),
      priority: route === '' ? 1 : 0.8,
    }))
  )
}

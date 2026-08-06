import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { hasLocale, getDictionary } from '@/lib/i18n'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/ui/PageHero'
import { getAlbums, drivePhotoUrl } from '@/lib/google-drive'

export const revalidate = 3600 // refresca cada hora

export default async function GaleriaPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = getDictionary(lang)
  const g = dict.galeria

  const albums = await getAlbums()
  const hasAlbums = albums.length > 0

  return (
    <>
      <PageHero
        kicker={dict.nav.galeria}
        title={dict.pages.galeria.title}
        subtitle={dict.pages.galeria.description}
      />

      <section className="bg-white py-20 lg:py-28">
        <Container>
          {hasAlbums ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {albums.map((album) => (
                <Link
                  key={album.id}
                  href={`/${lang}/galeria/${album.id}`}
                  className="group block overflow-hidden bg-gray-100 hover:shadow-lg transition-shadow"
                >
                  {/* Cover photo */}
                  <div className="aspect-[4/3] overflow-hidden relative bg-navy/10">
                    {album.coverPhotoId ? (
                      <Image
                        src={drivePhotoUrl(album.coverPhotoId, 600)}
                        alt={album.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg viewBox="0 0 80 80" className="w-16 h-16 opacity-10" fill="none">
                          <circle cx="40" cy="40" r="38" stroke="#0b1f2e" strokeWidth="2"/>
                          <path d="M40 2 Q40 40 40 78" stroke="#0b1f2e" strokeWidth="2"/>
                          <path d="M2 40 Q40 40 78 40" stroke="#0b1f2e" strokeWidth="2"/>
                          <path d="M10 15 Q40 35 70 15" stroke="#0b1f2e" strokeWidth="2"/>
                          <path d="M10 65 Q40 45 70 65" stroke="#0b1f2e" strokeWidth="2"/>
                        </svg>
                      </div>
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/30 transition-colors flex items-end p-4">
                      <span className="translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all text-white font-body text-sm font-semibold">
                        {lang === 'gl' ? 'Ver álbum →' : 'Ver álbum →'}
                      </span>
                    </div>
                  </div>

                  {/* Label */}
                  <div className="p-4 border-t-2 border-blue">
                    <h2 className="font-display font-black text-lg uppercase tracking-tight text-black leading-none">
                      {album.name}
                    </h2>
                    {album.createdTime && (
                      <p className="font-body text-xs text-gray-400 mt-1 uppercase tracking-wider">
                        {new Date(album.createdTime).getFullYear()}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* Placeholder cuando no hay credenciales o álbumes */
            <div className="max-w-xl mx-auto text-center">
              <div className="w-20 h-20 mx-auto mb-8 opacity-20">
                <svg viewBox="0 0 80 80" fill="none">
                  <circle cx="40" cy="40" r="38" stroke="#0b1f2e" strokeWidth="2"/>
                  <path d="M40 2 Q40 40 40 78" stroke="#0b1f2e" strokeWidth="2"/>
                  <path d="M2 40 Q40 40 78 40" stroke="#0b1f2e" strokeWidth="2"/>
                  <path d="M10 15 Q40 35 70 15" stroke="#0b1f2e" strokeWidth="2" fill="none"/>
                  <path d="M10 65 Q40 45 70 65" stroke="#0b1f2e" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <h2 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tight text-black leading-none mb-6">
                {g.comingSoonTitle}
              </h2>
              <p className="font-body text-gray-600 text-base leading-relaxed mb-10">
                {g.comingSoonBody}
              </p>
              <a
                href="https://instagram.com/cedeirabasketclub"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center h-12 px-8 rounded bg-blue text-white font-semibold text-base hover:bg-blue-bright transition-colors"
              >
                {g.followUs} →
              </a>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}

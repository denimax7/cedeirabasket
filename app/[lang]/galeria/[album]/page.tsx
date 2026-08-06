import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { hasLocale, getDictionary } from '@/lib/i18n'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/ui/PageHero'
import { getAlbumPhotos, getAlbumById, drivePhotoUrl } from '@/lib/google-drive'

export const revalidate = 3600

export default async function AlbumPage({
  params,
}: {
  params: Promise<{ lang: string; album: string }>
}) {
  const { lang, album: albumId } = await params
  if (!hasLocale(lang)) notFound()
  const dict = getDictionary(lang)

  const [albumInfo, photos] = await Promise.all([
    getAlbumById(albumId),
    getAlbumPhotos(albumId),
  ])

  if (!albumInfo && photos.length === 0) notFound()

  const albumName = albumInfo?.name ?? albumId

  return (
    <>
      <PageHero
        kicker={dict.nav.galeria}
        title={albumName}
        breadcrumbs={[{ label: dict.nav.galeria, href: `/${lang}/galeria` }]}
      />

      <section className="bg-white py-20 lg:py-28">
        <Container>
          {photos.length > 0 ? (
            <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
              {photos.map((photo) => {
                const isPortrait = photo.height && photo.width
                  ? photo.height > photo.width
                  : false
                return (
                  <div
                    key={photo.id}
                    className={`break-inside-avoid overflow-hidden bg-gray-100 ${isPortrait ? 'row-span-2' : ''}`}
                  >
                    <a
                      href={`https://drive.google.com/file/d/${photo.id}/view`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group relative"
                    >
                      <Image
                        src={drivePhotoUrl(photo.id, 800)}
                        alt={photo.name}
                        width={photo.width ?? 800}
                        height={photo.height ?? 600}
                        className="w-full h-auto group-hover:opacity-90 transition-opacity"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </a>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="font-body text-gray-500 text-base">{dict.common.comingSoon}</p>
            </div>
          )}

          <div className="mt-14 text-center">
            <Link
              href={`/${lang}/galeria`}
              className="inline-flex items-center h-11 px-7 rounded border border-gray-200 text-gray-700 font-semibold text-sm hover:border-blue hover:text-blue transition-colors font-body"
            >
              ← {dict.nav.galeria}
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}

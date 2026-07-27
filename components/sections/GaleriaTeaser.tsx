import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { Dictionary } from '@/lib/i18n'

interface GaleriaTeaserProps {
  lang: string
  dict: Dictionary
}

// Placeholder albums — replaced in Phase 5 with real Drive data
const placeholderAlbums = [
  { id: 1, labelGl: 'Tempada 2025-26', labelEs: 'Temporada 2025-26', count: 48, accent: 'from-navy to-blue/60' },
  { id: 2, labelGl: 'Torneo 3x3 2025', labelEs: 'Torneo 3x3 2025', count: 32, accent: 'from-black to-navy' },
  { id: 3, labelGl: 'Campamento Verán', labelEs: 'Campamento Verano', count: 61, accent: 'from-blue/80 to-navy' },
  { id: 4, labelGl: 'Presentación 2025', labelEs: 'Presentación 2025', count: 24, accent: 'from-black to-blue/40' },
]

const CameraIcon = () => (
  <svg className="w-8 h-8 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

export function GaleriaTeaser({ lang, dict }: GaleriaTeaserProps) {
  return (
    <section className="py-20 sm:py-24 bg-white">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <SectionHeading
            kicker={dict.home.galeriaKicker}
            title={dict.home.galeriaTitle}
            subtitle={dict.home.galeriaSubtitle}
            align="left"
            className="max-w-lg"
          />
          <Link
            href={`/${lang}/galeria`}
            className="shrink-0 inline-flex items-center gap-2 h-10 px-5 rounded border border-black text-black text-sm font-semibold hover:bg-black hover:text-white transition-colors font-body"
          >
            {dict.home.galeriaBtn} →
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {placeholderAlbums.map((album) => {
            const label = lang === 'gl' ? album.labelGl : album.labelEs
            return (
              <Link
                key={album.id}
                href={`/${lang}/galeria`}
                className="group relative aspect-[4/3] rounded-md overflow-hidden"
              >
                {/* Placeholder gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${album.accent}`} />

                {/* Subtle basketball texture pattern */}
                <div className="absolute inset-0 opacity-10">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id={`grid-${album.id}`} width="40" height="40" patternUnits="userSpaceOnUse">
                        <circle cx="20" cy="20" r="18" fill="none" stroke="white" strokeWidth="0.5" />
                        <line x1="2" y1="20" x2="38" y2="20" stroke="white" strokeWidth="0.5" />
                        <line x1="20" y1="2" x2="20" y2="38" stroke="white" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#grid-${album.id})`} />
                  </svg>
                </div>

                {/* Camera icon center */}
                <div className="absolute inset-0 flex items-center justify-center opacity-60 group-hover:opacity-30 transition-opacity">
                  <CameraIcon />
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                {/* Info bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="font-display font-black text-white text-sm uppercase leading-tight">
                    {label}
                  </p>
                  <p className="font-body text-white/60 text-xs mt-0.5">
                    {album.count} fotos
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

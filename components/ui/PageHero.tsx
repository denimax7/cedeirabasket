import Link from 'next/link'
import { Container } from '@/components/ui/Container'

interface Breadcrumb {
  label: string
  href: string
}

interface PageHeroProps {
  kicker: string
  title: string
  subtitle?: string
  breadcrumbs?: Breadcrumb[]
}

export function PageHero({ kicker, title, subtitle, breadcrumbs }: PageHeroProps) {
  return (
    <section className="relative bg-navy overflow-hidden">
      {/* Subtle gradient accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_100%_50%,_#0066cc12_0%,_transparent_70%)]" />

      {/* Decorative CB watermark */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 font-display font-black text-[14rem] leading-none text-white/[0.03] select-none pointer-events-none hidden xl:block">
        CB
      </div>

      <Container className="relative py-16 lg:py-20">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-2 mb-6 text-xs font-body text-white/40 uppercase tracking-widest">
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.href} className="flex items-center gap-2">
                {i > 0 && <span>/</span>}
                <Link href={crumb.href} className="hover:text-white/70 transition-colors">
                  {crumb.label}
                </Link>
              </span>
            ))}
            <span>/</span>
            <span className="text-white/70">{title}</span>
          </nav>
        )}
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] font-body text-blue">
          {kicker}
        </p>
        <h1 className="font-display font-black text-white text-5xl sm:text-6xl lg:text-7xl uppercase tracking-tight leading-none">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 text-base leading-relaxed font-body text-gray-300 max-w-xl">
            {subtitle}
          </p>
        )}
      </Container>
    </section>
  )
}

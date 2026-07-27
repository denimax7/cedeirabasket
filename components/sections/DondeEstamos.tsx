import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import type { Dictionary } from '@/lib/i18n'

interface DondeEstamosProps {
  lang: string
  dict: Dictionary
}

export function DondeEstamos({ lang, dict }: DondeEstamosProps) {
  return (
    <section className="py-20 sm:py-24 bg-black">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Info card */}
          <div>
            <p className="text-xs font-body font-semibold uppercase tracking-[0.2em] text-blue mb-3">
              {dict.home.mapaKicker}
            </p>
            <h2 className="font-display font-black text-white text-4xl sm:text-5xl uppercase leading-none tracking-tight mb-5">
              {dict.home.mapaTitle}
            </h2>
            <p className="font-body text-gray-300 text-base leading-relaxed mb-8 max-w-sm">
              {dict.home.mapaSubtitle}
            </p>

            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="font-body text-sm text-gray-300 leading-relaxed">
                  <p>Polideportivo Municipal de Cedeira</p>
                  <p>Av. España 60, 15357 Cedeira (A Coruña)</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-blue shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:cedeirabasket@gmail.com" className="font-body text-sm text-gray-300 hover:text-white transition-colors">
                  cedeirabasket@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-blue shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+34722558145" className="font-body text-sm text-gray-300 hover:text-white transition-colors">
                  722 558 145
                </a>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${lang}/contacto`}
                className="inline-flex items-center h-10 px-5 rounded bg-blue text-white text-sm font-semibold hover:bg-blue-bright transition-colors"
              >
                {dict.home.contactBtn}
              </Link>
              <a
                href="https://maps.google.com/?q=Polideportivo+Municipal+Cedeira+Avenida+España+60+Cedeira"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center h-10 px-5 rounded border border-white/25 text-white text-sm font-semibold hover:bg-white/8 transition-colors font-body"
              >
                {dict.home.mapaBtn} ↗
              </a>
            </div>
          </div>

          {/* Map embed */}
          <div className="relative rounded-md overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-80 border border-white/10">
            <iframe
              src="https://maps.google.com/maps?q=Polideportivo+Municipal+de+Cedeira,+Avenida+de+España,+Cedeira,+A+Coruña&output=embed&z=16"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(30%) contrast(1.1)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Polideportivo Municipal de Cedeira"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}

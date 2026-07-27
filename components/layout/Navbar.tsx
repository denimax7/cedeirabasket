'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import type { Dictionary } from '@/lib/i18n'

interface NavLink {
  href: string
  label: string
  children?: { href: string; label: string }[]
}

interface NavbarProps {
  lang: string
  dict: Dictionary
}

function Logo({ lang }: { lang: string }) {
  return (
    <Link href={`/${lang}`} className="flex items-center gap-3 shrink-0">
      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue">
        <span className="font-display font-black text-white text-sm leading-none">CB</span>
      </div>
      <div className="leading-none">
        <span className="block font-display font-black text-blue-bright text-base tracking-wide uppercase">
          Cedeira
        </span>
        <span className="block font-display font-black text-white text-xs tracking-widest uppercase opacity-80">
          Basket Club
        </span>
      </div>
    </Link>
  )
}

function LanguageSwitcher({ lang }: { lang: string }) {
  const pathname = usePathname()

  const switchTo = (newLang: string) => {
    const segments = pathname.split('/')
    segments[1] = newLang
    return segments.join('/')
  }

  return (
    <div className="flex items-center gap-1 rounded-lg bg-white/10 p-1">
      {(['gl', 'es'] as const).map((locale) => (
        <Link
          key={locale}
          href={switchTo(locale)}
          className={`px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors ${
            lang === locale
              ? 'bg-blue text-white'
              : 'text-gray-300 hover:text-white'
          }`}
        >
          {locale}
        </Link>
      ))}
    </div>
  )
}

function DesktopDropdown({
  link,
  isActive,
}: {
  link: NavLink
  isActive: boolean
}) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
          isActive ? 'text-blue-bright' : 'text-gray-300 hover:text-white'
        }`}
      >
        {link.label}
        <svg
          className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-1 w-48 rounded-xl bg-navy border border-white/10 shadow-xl py-1.5 z-50"
          >
            {link.children!.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                {child.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Navbar({ lang, dict }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const navLinks: NavLink[] = [
    { href: `/${lang}`, label: dict.nav.home },
    {
      href: `/${lang}/club`,
      label: dict.nav.club,
      children: [
        { href: `/${lang}/club`, label: dict.nav.aboutUs },
        { href: `/${lang}/club/cuerpo-tecnico`, label: dict.nav.cuerpoTecnico },
      ],
    },
    { href: `/${lang}/equipos`, label: dict.nav.equipos },
    { href: `/${lang}/3x3`, label: dict.nav.torneo3x3 },
    { href: `/${lang}/inscripcion`, label: dict.nav.inscripcion },
    { href: `/${lang}/galeria`, label: dict.nav.galeria },
    { href: `/${lang}/contacto`, label: dict.nav.contacto },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const isActive = (href: string) =>
    href === `/${lang}` ? pathname === href : pathname.startsWith(href)

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'bg-black/95 backdrop-blur-md border-white/10 shadow-lg'
          : 'bg-black border-white/10'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo lang={lang} />

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <DesktopDropdown
                  key={link.href}
                  link={link}
                  isActive={isActive(link.href)}
                />
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive(link.href)
                      ? 'text-blue-bright'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          {/* Right side: language switcher + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher lang={lang} />
            <Link
              href={`/${lang}/inscripcion`}
              className="inline-flex items-center h-9 px-4 rounded-xl bg-blue text-white text-sm font-semibold hover:bg-blue-bright transition-colors"
            >
              {dict.nav.joinUs}
            </Link>
          </div>

          {/* Mobile: lang + hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <LanguageSwitcher lang={lang} />
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menú"
              className="p-2 text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <motion.div
                animate={mobileOpen ? 'open' : 'closed'}
                className="w-5 h-5 flex flex-col justify-center gap-1"
              >
                <motion.span
                  variants={{
                    open: { rotate: 45, y: 6 },
                    closed: { rotate: 0, y: 0 },
                  }}
                  transition={{ duration: 0.2 }}
                  className="block h-0.5 w-5 bg-white origin-center"
                />
                <motion.span
                  variants={{ open: { opacity: 0 }, closed: { opacity: 1 } }}
                  transition={{ duration: 0.15 }}
                  className="block h-0.5 w-5 bg-white"
                />
                <motion.span
                  variants={{
                    open: { rotate: -45, y: -6 },
                    closed: { rotate: 0, y: 0 },
                  }}
                  transition={{ duration: 0.2 }}
                  className="block h-0.5 w-5 bg-white origin-center"
                />
              </motion.div>
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden border-t border-white/10 bg-black"
          >
            <Container>
              <nav className="py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <div key={link.href}>
                    <Link
                      href={link.href}
                      className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive(link.href)
                          ? 'text-blue-bright bg-blue/10'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {link.label}
                    </Link>
                    {link.children && (
                      <div className="ml-4 mt-1 flex flex-col gap-1">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-3 py-2 rounded-lg text-xs text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="mt-3 pt-3 border-t border-white/10">
                  <Link
                    href={`/${lang}/inscripcion`}
                    className="block text-center h-11 leading-[2.75rem] px-6 rounded-xl bg-blue text-white text-sm font-semibold hover:bg-blue-bright transition-colors"
                  >
                    {dict.nav.joinUs}
                  </Link>
                </div>
              </nav>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

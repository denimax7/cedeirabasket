import type { Metadata } from 'next'
import { Archivo, Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Cedeira Basket Club',
  description: 'Club de baloncesto de base en Cedeira (A Coruña). Categorías desde Mini-Basket. ¡Siente los colores!',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="gl" className={`${inter.variable} ${archivo.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-black antialiased">
        {children}
      </body>
    </html>
  )
}

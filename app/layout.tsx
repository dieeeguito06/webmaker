import type { Metadata } from 'next'
import { Montserrat, Roboto } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'MadridWebMaker — Web Profesional para tu Negocio en Madrid',
  description: 'Crea tu web profesional en 5 minutos con IA. SEO local Madrid, WhatsApp Business y Google Maps incluidos. 10.000+ webs creadas.',
  keywords: 'crear página web Madrid, web para negocios Madrid, diseño web Madrid, generador web IA',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="bg-[#FAFAFA]">
      <body className={`${montserrat.variable} ${roboto.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'CargoCalc — Freight Rate Calculator',
  description: 'Instant freight cost estimates for Guangzhou to Jebel Ali shipments',
  openGraph: {
    title: 'CargoCalc — Freight Rate Calculator',
    description: 'Calculate ocean freight costs instantly',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="bg-navy text-gray-100 min-h-screen font-dm antialiased">
        {children}
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CargoCalc — Freight Rate Calculator',
  description: 'Instant freight cost estimates for Guangzhou to Jebel Ali shipments',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from '../components/Header'

const inter = Inter({ subsets: ['latin'] })
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair'
})

export const metadata: Metadata = {
  title: "George Gilsenan's Irish Music | Authentic Irish CDs",
  description: '40 years of curated Irish traditional, country, and folk music from Kells to Wexford',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable}`}>
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}
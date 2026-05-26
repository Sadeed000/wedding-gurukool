import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans, Playfair_Display } from 'next/font/google'
import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://weddinggurukul.com'),
  title: {
    default: 'Wedding Gurukul – Luxury Wedding Decor & Event Management',
    template: '%s | Wedding Gurukul',
  },
  description: 'With 18+ years of expertise, Wedding Gurukul has delivered 550+ spectacular celebrations across India. Luxury wedding decor, planning, and event management.',
  keywords: ['luxury wedding', 'wedding decor', 'event management', 'wedding planner India', 'Rajasthani wedding', 'destination wedding'],
  authors: [{ name: 'Wedding Gurukul' }],
  creator: 'Wedding Gurukul',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://weddinggurukul.com',
    siteName: 'Wedding Gurukul',
    title: 'Wedding Gurukul – Luxury Wedding Decor & Event Management',
    description: 'Creating spectacular celebrations across India for 18+ years.',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Wedding Gurukul' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wedding Gurukul',
    description: 'Luxury Wedding Decor & Event Management across India',
    images: ['/images/og-image.jpg'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable} ${playfair.variable}`}>
      <body>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: { fontFamily: 'var(--font-dm-sans)', fontSize: '0.875rem' },
            success: { iconTheme: { primary: '#c9922a', secondary: '#fff' } },
          }}
        />
      </body>
    </html>
  )
}

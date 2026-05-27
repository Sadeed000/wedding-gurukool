import type { Metadata } from 'next'
import Script from 'next/script'
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

  description: 'With 11+ years of expertise, Wedding Gurukul has delivered 300+ spectacular celebrations across India. Luxury wedding decor, planning, and event management.',
  icons: {
    icon: '/images/logo-transparent.png',
    shortcut: '/images/logo-transparent.png',
    apple: '/images/logo-transparent.png',
  },

  keywords: ['luxury wedding', 'wedding decor', 'event management', 'wedding planner India', 'Rajasthani wedding', 'destination wedding'],
  authors: [{ name: 'Wedding Gurukul' }],
  creator: 'Wedding Gurukul',

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://weddinggurukul.com',
    siteName: 'Wedding Gurukul',
    title: 'Wedding Gurukul – Luxury Wedding Decor & Event Management',
    description: 'Creating spectacular celebrations across India for 11+ years.',
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DE7GZTY7HJ"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DE7GZTY7HJ');
          `}
        </Script>

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
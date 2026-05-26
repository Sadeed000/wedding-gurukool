'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'Who We Are' },
  {
    label: 'Our Work',
    children: [
      // { href: '/wedding-wall', label: 'Wedding Wall' },
      { href: '/portfolio', label: 'Portfolio' },
    ],
  },
  { href: '/venues', label: 'Venues' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: "Let's Connect" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const pathname = usePathname()
  const dropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onClickOut = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropdownOpen(false)
    }
    document.addEventListener('mousedown', onClickOut)
    return () => document.removeEventListener('mousedown', onClickOut)
  }, [])

  useEffect(() => { setMobileOpen(false); setDropdownOpen(false) }, [pathname])

  const isHome = pathname === '/'
  const transparent = isHome && !scrolled

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-white/97 backdrop-blur-md shadow-sm border-b border-gold-100'
          : isHome
          ? 'bg-transparent'
          : 'bg-white/97 backdrop-blur-md border-b border-gold-100'
      )}
    >
      {/* Top contact bar */}
      <div className={cn('hidden lg:flex items-center justify-end gap-6 px-8 py-2 text-xs border-b transition-all duration-300', transparent ? 'border-white/15' : 'border-gold-100')}>
        {/* Phone and email commented out per request; keeping in file for reference */}
        *
        <a href="tel:+919782667589" className={cn('flex items-center gap-2 transition-colors hover:text-gold-600', transparent ? 'text-white/75' : 'text-gold-500')}>
          <Phone size={11} /> +91 9782667589
        </a>
        <a href="mailto:weddinggurukuljpr@gmail.com" className={cn('transition-colors hover:text-gold-600', transparent ? 'text-white/75' : 'text-gold-500')}>
          weddinggurukuljpr@gmail.com
        </a>
       

        <a
          href="https://www.instagram.com/wedding_gurukul?igsh=MTZoZGV0MWVwbDVpdg%3D%3D&utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
          className={cn('transition-colors hover:text-gold-600', transparent ? 'text-white/75' : 'text-gold-500')}
        >
          Instagram
        </a>
      </div>

      {/* Main nav */}
      <div className="flex items-center justify-between px-6 lg:px-12 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-14 h-14 shrink-0">
            <Image
              src="/images/logo-transparent.png"
              alt="Wedding Gurukul"
              fill
              className={cn('object-contain transition-all duration-300', transparent ? 'brightness-0 invert' : '')}
              priority
            />
          </div>
         <div className="flex flex-col leading-none">
  <span
    className={cn(
      "font-cormorant text-[20px] sm:text-[22px] font-semibold tracking-[0.14em] uppercase transition-colors duration-300",
      transparent ? "text-white" : "text-charcoal-900"
    )}
  >
    Wedding
  </span>

  <div className="flex items-center gap-1.5 mt-0.5">
    <span
      className={cn(
        "h-px w-5 transition-colors duration-300",
        transparent ? "bg-gold-300/80" : "bg-gold-500/80"
      )}
    />

    <span
      className={cn(
        "font-cormorant text-[21px] sm:text-[23px] font-bold tracking-[0.1em] uppercase transition-colors duration-300",
        transparent ? "text-gold-300" : "text-gold-600"
      )}
    >
      Gurukul
    </span>

    <span
      className={cn(
        "h-px w-5 transition-colors duration-300",
        transparent ? "bg-gold-300/80" : "bg-gold-500/80"
      )}
    />
  </div>
</div>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            if (link.children) {
              return (
                <div key={link.label} className="relative" ref={dropRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={cn('flex items-center gap-1 font-dm-sans text-sm tracking-wide transition-colors duration-200', transparent ? 'text-white/85 hover:text-white' : 'text-gold-500 hover:text-gold-600')}
                  >
                    {link.label}
                    <ChevronDown size={13} className={cn('transition-transform duration-200', dropdownOpen && 'rotate-180')} />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-luxury border border-gold-100 py-2 z-50">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-3 text-sm font-dm-sans text-gold-500 hover:text-gold-600 hover:bg-cream-50 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            }
            return (
              <Link
                key={link.href}
                href={link.href!}
                className={cn(
                  'font-dm-sans text-sm tracking-wide transition-colors duration-200 relative group/link',
                  transparent ? 'text-white/85 hover:text-white' : 'text-gold-500 hover:text-gold-500',
                  pathname === link.href && !transparent && 'text-gold-500',
                  pathname === link.href && transparent && 'text-white'
                )}
              >
                {link.label}
                <span className={cn('absolute -bottom-0.5 left-0 w-0 h-px bg-current transition-all duration-300 group-hover/link:w-full', pathname === link.href && 'w-full')} />
              </Link>
            )
          })}
        </nav>

        {/* CTA button */}
        <div className="hidden lg:block">
          <Link
            href="/contact"
            className={cn(
              'px-5 py-2.5 text-sm font-dm-sans font-medium tracking-wide border transition-all duration-300',
              transparent
                ? 'border-white/50 text-white hover:bg-white hover:text-charcoal-900'
                : 'border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-white'
            )}
          >
            Book Consultation
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={cn('lg:hidden p-2 transition-colors', transparent ? 'text-white' : 'text-charcoal-800')}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      <div className={cn('lg:hidden bg-white border-t border-gold-100 overflow-hidden transition-all duration-300', mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0')}>
        <nav className="px-6 py-5 space-y-1">
          {navLinks.map((link) => {
            if (link.children) {
              return (
                <div key={link.label}>
                  <p className="py-3 font-dm-sans text-xs font-semibold text-charcoal-400 uppercase tracking-widest">{link.label}</p>
                  {link.children.map((child) => (
                    <Link key={child.href} href={child.href} className="block pl-4 py-2.5 font-dm-sans text-sm text-red-700 hover:text-gold-500 transition-colors">
                      {child.label}
                    </Link>
                  ))}
                </div>
              )
            }
            return (
              <Link
                key={link.href}
                href={link.href!}
                className={cn('block py-3 font-dm-sans text-sm text-charcoal-700 hover:text-gold-500 transition-colors border-b border-gold-50', pathname === link.href && 'text-gold-500')}
              >
                {link.label}
              </Link>
            )
          })}
          <div className="pt-4 space-y-3">
            {/* Phone commented out per request; kept as reference */}
            {/**
            <a href="tel:+919782667589" className="flex items-center gap-2 text-sm text-charcoal-600">
              <Phone size={14} className="text-gold-500" /> +91 9782667589
            </a>
            */}
            <a
              href="https://www.instagram.com/wedding_gurukul?igsh=MTZoZGV0MWVwbDVpdg%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-charcoal-600"
            >
              Instagram
            </a>
            <Link href="/contact" className="block w-full text-center bg-gold-500 text-white py-3 font-dm-sans text-sm font-medium tracking-wide">
              Book Consultation
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

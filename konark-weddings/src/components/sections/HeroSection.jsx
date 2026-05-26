'use client'
import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronDown, Play, Phone } from 'lucide-react'

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&q=90',
    tagline: "Rajasthan's Premier Wedding Experts",
    headline: 'Where Dreams\nBecome Reality',
    sub: "Crafting legendary celebrations across India's most iconic palaces & venues for over 18 years.",
  },
  {
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1920&q=90',
    tagline: '18+ Years of Spectacular Celebrations',
    headline: 'Every Detail,\nPerfectly Crafted',
    sub: 'From intimate mehendi ceremonies to grand multi-day extravaganzas — we do it all.',
  },
  {
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1920&q=90',
    tagline: '550+ Weddings Across India',
    headline: 'Your Story,\nOur Masterpiece',
    sub: 'Every love story deserves a celebration as unique and unforgettable as the two of you.',
  },
]

export default function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [transitioning, setTransitioning] = useState(false)

  const goTo = useCallback((idx) => {
    setTransitioning(true)
    setTimeout(() => { setCurrent(idx); setTransitioning(false) }, 600)
  }, [])

  useEffect(() => {
    setLoaded(true)
    const timer = setInterval(() => {
      goTo((prev) => {
        // avoid stale closure
        return 0 // will be corrected below
      })
      setCurrent(p => {
        const next = (p + 1) % slides.length
        return next
      })
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const slide = slides[current]

  return (
    <section className="relative h-screen min-h-[680px] overflow-hidden">
      {/* Background slides */}
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current && !transitioning ? 1 : 0, zIndex: 1 }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${s.image})`,
              transform: i === current ? 'scale(1.06)' : 'scale(1)',
              transition: 'transform 8s ease-out',
            }}
          />
        </div>
      ))}

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15 z-10" />

      {/* Left dot nav */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-3">
        <div className="w-px h-14 bg-white/20" />
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all duration-400 rounded-full ${i === current ? 'w-2 h-10 bg-gold-400' : 'w-2 h-2 bg-white/40 hover:bg-white/70'}`}
          />
        ))}
        <div className="w-px h-14 bg-white/20" />
      </div>

      {/* Main content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-14 w-full pt-24">
          <div
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 1.2s ease-out',
            }}
          >
            {/* Eyebrow label */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-px bg-gold-400" />
              <span className="font-dm-sans text-xs font-semibold tracking-[0.35em] uppercase text-gold-300">
                {slide.tagline}
              </span>
            </div>

            {/* Main headline */}
            <h1
              className="font-cormorant text-6xl sm:text-7xl lg:text-[88px] xl:text-[100px] text-white leading-[1.02] mb-7"
              style={{ whiteSpace: 'pre-line' }}
            >
              {slide.headline}
            </h1>

            <p className="font-dm-sans text-base lg:text-lg text-white/70 max-w-xl mb-10 leading-relaxed">
              {slide.sub}
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="group flex items-center gap-2 bg-gold-500 text-white px-8 py-4 font-dm-sans text-sm font-semibold tracking-wide hover:bg-gold-400 transition-all duration-300 shadow-gold"
              >
                Plan Your Wedding <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/portfolio"
                className="flex items-center gap-2 border border-white/50 text-white px-8 py-4 font-dm-sans text-sm font-semibold tracking-wide hover:bg-white hover:text-charcoal-900 transition-all duration-300"
              >
                View Portfolio
              </Link>
              <Link href="/venues" className="hidden sm:flex items-center gap-2 text-white/70 font-dm-sans text-sm hover:text-gold-300 transition-colors">
                <span className="w-8 h-px bg-white/30" /> Explore Venues
              </Link>
            </div>

            {/* Quick contact */}
            <div className="flex items-center gap-3 mt-8">
              <a href="tel:+917417416461" className="flex items-center gap-2 text-white/50 hover:text-gold-300 transition-colors font-dm-sans text-sm">
                <Phone size={14} className="text-gold-400" /> +91 7417416461
              </a>
              <span className="text-white/20">·</span>
              <span className="text-white/40 font-dm-sans text-xs">Free consultation available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Watch film hint — bottom right */}
      {/* <div
        className="absolute bottom-12 right-10 z-30 hidden lg:flex items-center gap-3 cursor-pointer group"
        onClick={() => document.getElementById('video-section')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:border-gold-400 group-hover:bg-gold-500/10 transition-all">
          <Play size={16} className="text-white ml-0.5" />
        </div>
        <span className="font-dm-sans text-xs text-white/50 tracking-widest uppercase group-hover:text-gold-300 transition-colors">Watch Film</span>
      </div> */}

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2">
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-white/30 animate-pulse" />
        <ChevronDown size={18} className="text-white/30 animate-bounce" />
      </div>

      {/* Slide progress bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-0.5 bg-white/10">
        <div
          className="h-full bg-gold-400"
          style={{
            width: `${((current + 1) / slides.length) * 100}%`,
            transition: 'width 6s linear',
          }}
        />
      </div>
    </section>
  )
}

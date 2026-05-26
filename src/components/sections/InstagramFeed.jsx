'use client'
import Image from 'next/image'
import { Instagram, ExternalLink } from 'lucide-react'

const photos = [
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&q=80',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=500&q=80',
  'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=500&q=80',
  'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=500&q=80',
  'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=500&q=80',
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=80',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500&q=80',
  'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=500&q=80',
]

export default function InstagramFeed() {
  return (
    <section className="section-padding px-6 bg-cream-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-label">Follow Our Journey</span>
          <div className="gold-divider my-4">
            <span className="ornament">✦</span>
          </div>
          <h2 className="font-cormorant text-4xl lg:text-5xl text-charcoal-900 mt-4 mb-3">
            Moments on <em className="text-gold-500">Instagram</em>
          </h2>
          <a
            href="https://instagram.com/weddinggurukul"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-dm-sans text-sm text-gold-500 hover:text-gold-600 transition-colors mt-1"
          >
            <Instagram size={16} /> @weddinggurukul <ExternalLink size={12} />
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5">
          {photos.map((src, i) => (
            <a
              key={i}
              href="https://instagram.com/weddinggurukul"
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative overflow-hidden block ${i < 2 ? 'col-span-2 row-span-2' : ''}`}
              style={{ aspectRatio: '1/1' }}
            >
              <Image
                src={src}
                alt={`Wedding photo ${i + 1}`}
                fill
                className="object-cover transition-transform duration-600 group-hover:scale-110"
                sizes="200px"
              />
              <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/45 transition-all duration-300 flex items-center justify-center">
                <Instagram size={22} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://instagram.com/weddinggurukul"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-gold"
          >
            <Instagram size={16} /> Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  )
}

'use client'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, ArrowRight } from 'lucide-react'

const destinations = [
  {
    city: 'Udaipur',
    state: 'Rajasthan',
    desc: 'The City of Lakes — home to palace hotels and shimmering lakeside venues.',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80',
    count: '12+ Venues',
    href: '/venues',
    featured: true,
  },
  {
    city: 'Jaipur',
    state: 'Rajasthan',
    desc: 'The Pink City — iconic heritage palaces and royal forts await.',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&q=80',
    count: '9+ Venues',
    href: '/venues',
  },
  {
    city: 'Goa',
    state: 'Goa',
    desc: 'Beach ceremonies, tropical gardens and sunset vows on golden sand.',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80',
    count: '8+ Venues',
    href: '/venues',
  },
  {
    city: 'Jodhpur',
    state: 'Rajasthan',
    desc: 'The Blue City — majestic forts and golden deserts form a royal backdrop.',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80',
    count: '6+ Venues',
    href: '/venues',
  },
  {
    city: 'New Delhi',
    state: 'Delhi NCR',
    desc: "India's capital offers grand ballrooms, heritage gardens and luxury hotels.",
    image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&q=80',
    count: '10+ Venues',
    href: '/venues',
  },
  {
    city: 'Shimla',
    state: 'Himachal Pradesh',
    desc: 'Mountain vistas, pine forests and intimate Himalayan resort weddings.',
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80',
    count: '5+ Venues',
    href: '/venues',
  },
]

export default function DestinationsSection() {
  return (
    <section className="section-padding px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start justify-between mb-12 gap-6">
          <div>
            <span className="section-label">Destinations</span>
            <div className="gold-divider justify-start my-4">
              <span className="ornament">✦</span>
            </div>
            <h2 className="font-cormorant text-4xl lg:text-5xl text-charcoal-900 mt-2">
              Dream Venues Across<br />
              <em className="text-gold-500">Incredible India</em>
            </h2>
          </div>
          <div className="lg:max-w-sm">
            <p className="font-dm-sans text-charcoal-600 mb-6 leading-relaxed">
              From Rajasthan's royal palaces to Goa's golden beaches — we curate and manage weddings at India's most spectacular destinations.
            </p>
            <Link href="/venues" className="btn-outline-gold">
              All Venues <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {destinations.map((d, i) => (
            <Link
              key={d.city}
              href={d.href}
              className={`group relative overflow-hidden cursor-pointer ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
              style={{ aspectRatio: i === 0 ? '1/1' : '3/4' }}
            >
              <Image
                src={d.image}
                alt={d.city}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes={i === 0 ? '400px' : '200px'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center gap-1 text-gold-300 font-dm-sans text-[10px] mb-1">
                  <MapPin size={10} /> {d.state}
                </div>
                <div className={`font-cormorant text-white font-semibold ${i === 0 ? 'text-2xl' : 'text-lg'}`}>{d.city}</div>
                <div className="font-dm-sans text-white/60 text-[10px] mt-0.5">{d.count}</div>
                {i === 0 && (
                  <p className="font-dm-sans text-white/70 text-xs mt-2 leading-relaxed line-clamp-2">{d.desc}</p>
                )}
              </div>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold-400/50 transition-all duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

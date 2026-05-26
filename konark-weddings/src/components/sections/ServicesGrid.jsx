'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const services = [
  {
    title: 'Wedding Planning',
    desc: 'End-to-end planning — budgeting, vendor management, day-of coordination, and everything in between.',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80',
    href: '/contact',
    badge: 'Most Popular',
  },
  {
    title: 'Luxury Decor & Florals',
    desc: 'From grand floral mandaps to intimate candlelit receptions — we design spaces that steal your breath away.',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=80',
    href: '/portfolio',
  },
  {
    title: 'Destination Weddings',
    desc: 'Udaipur palaces, Goa beaches, Shimla hills — we orchestrate dream weddings at India\'s most iconic venues.',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&q=80',
    href: '/venues',
    badge: 'Trending',
  },
  {
    title: 'Mehendi & Sangeet',
    desc: 'Every pre-wedding function designed with equal care — vibrant, joyful, and utterly unforgettable.',
    image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80',
    href: '/contact',
  },
  {
    title: 'Royal Rajasthani Weddings',
    desc: 'Palace ceremonies, royal processions, folk entertainers — authentic Rajasthani grandeur for your big day.',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80',
    href: '/portfolio',
    badge: 'Signature',
  },
  {
    title: 'Corporate & Social Events',
    desc: 'Anniversaries, engagements, product launches — we bring the same Wedding Gurukul magic to every occasion.',
    image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&q=80',
    href: '/contact',
  },
]

export default function ServicesGrid() {
  return (
    <section className="section-padding px-6 bg-cream-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="section-label">What We Offer</span>
          <div className="gold-divider my-4">
            <span className="ornament">✦</span>
          </div>
          <h2 className="font-cormorant text-4xl lg:text-5xl xl:text-6xl text-charcoal-900 mt-4 mb-4">
            Services Crafted for<br />
            <em className="text-gold-500">Every Celebration</em>
          </h2>
          <p className="font-dm-sans text-charcoal-600 max-w-xl mx-auto text-sm leading-relaxed">
            From the first consultation to the final farewell — we handle every element with care, creativity and precision.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group relative overflow-hidden bg-white shadow-card hover:shadow-luxury transition-all duration-400 hover:-translate-y-1"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-108"
                  sizes="400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/20 to-transparent" />
                {service.badge && (
                  <div className="absolute top-4 left-4 bg-gold-500 text-white font-dm-sans text-[10px] px-3 py-1 tracking-widest uppercase">
                    {service.badge}
                  </div>
                )}
                <h3 className="absolute bottom-4 left-4 right-4 font-cormorant text-xl text-white leading-tight">
                  {service.title}
                </h3>
              </div>
              <div className="p-5">
                <p className="font-dm-sans text-sm text-charcoal-600 leading-relaxed mb-4">{service.desc}</p>
                <span className="flex items-center gap-2 text-gold-500 font-dm-sans text-xs font-semibold tracking-wide group-hover:gap-3 transition-all">
                  Explore <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

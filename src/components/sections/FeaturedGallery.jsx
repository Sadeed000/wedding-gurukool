'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const galleryImages = [
  { src: '/static-image/hom4.jpeg', alt: 'Royal palace wedding reception', big: true },
  { src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=85', alt: 'Garden ceremony setup' },
  { src: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=85', alt: 'Floral mandap decor' },
  { src: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&q=85', alt: 'Grand reception hall' },
  { src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=85', alt: 'Bridal portrait session' },
  { src: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=600&q=85', alt: 'Mandap ceremony' },
]

export default function FeaturedGallery() {
  return (
    <section className="section-padding px-6 bg-cream-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start justify-between mb-12 gap-6">
          <div>
            <span className="section-label">Portfolio</span>
            <div className="gold-divider justify-start my-4">
              <span className="ornament">✦</span>
            </div>
            <h2 className="font-cormorant text-4xl lg:text-5xl text-charcoal-900 mt-2">
              Moments We've<br />
              <em className="text-gold-500">Crafted with Love</em>
            </h2>
          </div>
          <div className="lg:max-w-xs">
            <p className="font-dm-sans text-charcoal-600 mb-6 leading-relaxed">
              Each wedding is a unique canvas. Explore our portfolio of spectacular celebrations across palaces, resorts and heritage venues throughout India.
            </p>
            <Link href="/portfolio" className="btn-outline-gold">
              View Full Portfolio <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* Mosaic grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 grid-rows-2 gap-3 h-[500px] lg:h-[620px]">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className={`relative overflow-hidden group cursor-pointer ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes={i === 0 ? '(max-width: 1024px) 50vw, 600px' : '(max-width: 1024px) 50vw, 300px'}
              />
              <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/30 transition-all duration-400" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="font-dm-sans text-white text-xs">{img.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

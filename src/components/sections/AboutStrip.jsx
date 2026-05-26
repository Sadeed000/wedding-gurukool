'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

const points = [
  'Boutique personalised service for every couple',
  'In-house design, floral & logistics teams',
  'Trusted vendor network across 60+ venues',
  'End-to-end planning: concept to execution',
]

export default function AboutStrip() {
  return (
  <section className="section-padding px-6 bg-white overflow-hidden">
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      {/* Left: images mosaic */}
      <div className="relative">
        <div className="grid grid-cols-2 gap-3">
          {/* Big Left Image */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-charcoal-50">
            <Image
              src="/static-image/hom1.jpeg"
              alt="Wedding ceremony"
              fill
              priority
              quality={100}
              className="object-cover object-center hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 45vw, 360px"
            />
          </div>

          {/* Right Images */}
          <div className="flex flex-col gap-3">
            <div className="relative aspect-square overflow-hidden rounded-sm bg-charcoal-50">
              <Image
                src="/static-image/hom2.jpeg"
                alt="Floral arrangement"
                fill
                quality={100}
                className="object-cover object-center hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 45vw, 260px"
              />
            </div>

            <div className="relative aspect-square overflow-hidden rounded-sm bg-charcoal-50">
              <Image
                src="/static-image/hom3.jpeg"
                alt="Palace venue"
                fill
                quality={100}
                className="object-cover object-center hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 45vw, 260px"
              />
            </div>
          </div>
        </div>

        {/* Gold badge */}
        <div className="absolute -bottom-6 -right-4 lg:-right-8 bg-gold-500 text-white p-6 shadow-gold-lg text-center hidden sm:block">
          <div className="font-cormorant text-4xl font-bold leading-none">
            11+
          </div>
          <div className="font-dm-sans text-xs tracking-widest uppercase mt-1">
            Years of
            <br />
            Excellence
          </div>
        </div>
      </div>

      {/* Right: copy */}
      <div>
        <span className="section-label">About Wedding Gurukul</span>

        <div className="gold-divider justify-start my-4">
          <span className="ornament">✦</span>
        </div>

        <h2 className="font-cormorant text-4xl lg:text-5xl xl:text-6xl text-charcoal-900 mt-2 mb-6 leading-tight">
          India's Most Trusted
          <br />
          <em className="text-gold-500">Wedding Creators</em>
        </h2>

        <p className="font-dm-sans text-charcoal-600 leading-relaxed mb-6">
          Born in the royal heart of Rajasthan, Wedding Gurukul has spent 11+
          years turning love stories into legendary celebrations. We blend deep
          cultural roots with contemporary luxury to craft weddings that feel
          timeless, personal, and absolutely spectacular.
        </p>

        <p className="font-dm-sans text-charcoal-600 leading-relaxed mb-8">
          From the first consultation to the last dance, our passionate team of
          designers, coordinators and artisans are by your side — ensuring every
          detail is flawlessly executed.
        </p>

        <ul className="space-y-3 mb-10">
          {points.map((pt) => (
            <li
              key={pt}
              className="flex items-center gap-3 font-dm-sans text-sm text-charcoal-700"
            >
              <CheckCircle2 size={17} className="text-gold-500 shrink-0" />
              {pt}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-4">
          <Link href="/about" className="btn-gold">
            Our Story <ArrowRight size={15} />
          </Link>

          <Link href="/contact" className="btn-outline-gold">
            Free Consultation
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getStoryCoverImage, weddingStories, weddingWallBanner } from '@/data/wedding-stories'

export const metadata: Metadata = {
  title: 'The Wedding Wall – Wedding at Leela Palace, Alila Fort & Devi Ratn',
  description:
    'Real wedding stories from Wedding Gurukuls — Leela Palace Jaipur, Alila Fort Bishangarh, Devi Ratn and more.',
}

export default function WeddingWallPage() {
  return (
    <>
      {/* Page banner */}
      <section className="relative h-[45vh] min-h-[320px] overflow-hidden">
        <Image
          src={weddingWallBanner}
          alt="The Wedding Wall"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-charcoal-900/50" />
        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <h1 className="font-cormorant text-5xl lg:text-7xl text-white text-center">The Wedding Wall</h1>
        </div>
      </section>

      {/* Stories — Konark-style cards */}
      <section className="section-padding px-6 bg-cream-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
            {weddingStories.map((story) => (
              <article key={story.slug} className="group bg-white shadow-sm border border-gold-100/80 overflow-hidden">
                <Link href={`/wedding-wall/${story.slug}`} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-charcoal-100">
                    <Image
                      src={getStoryCoverImage(story.slug)}
                      alt={story.coupleNames}
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </Link>

                <div className="p-8 lg:p-10">
                  <h3 className="font-cormorant text-3xl lg:text-4xl text-charcoal-900 mb-3">
                    <Link href={`/wedding-wall/${story.slug}`} className="hover:text-gold-600 transition-colors">
                      {story.coupleNames}
                    </Link>
                  </h3>

                  <ul className="mb-5 space-y-1">
                    <li className="font-dm-sans text-sm text-gold-600 flex items-center gap-2">
                      <span className="text-gold-400">•</span> {story.venue}
                    </li>
                  </ul>

                  <p className="font-dm-sans text-sm text-charcoal-600 leading-relaxed mb-6">{story.teaser}</p>

                  <Link
                    href={`/wedding-wall/${story.slug}`}
                    className="inline-flex items-center gap-2 font-dm-sans text-sm font-medium text-gold-600 tracking-wider uppercase hover:text-gold-700 transition-colors"
                  >
                    Read More <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-white text-center border-t border-gold-100">
        <h2 className="font-cormorant text-4xl text-charcoal-900 mb-4">Ready to Write Your Story?</h2>
        <p className="font-dm-sans text-charcoal-600 mb-8 max-w-md mx-auto">
          Plan your dream wedding with Wedding Gurukuls — Jaipur&apos;s trusted wedding designers.
        </p>
        <Link href="/contact" className="btn-gold">
          Let&apos;s Connect <ArrowRight size={16} />
        </Link>
      </section>
    </>
  )
}

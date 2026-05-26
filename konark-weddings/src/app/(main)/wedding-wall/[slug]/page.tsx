import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, MapPin, Heart } from 'lucide-react'
import { getAllWeddingSlugs, getStoryHeroImage, getWeddingStory } from '@/data/wedding-stories'

export function generateStaticParams() {
  return getAllWeddingSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const story = getWeddingStory(params.slug)
  if (!story) return { title: 'Story Not Found' }
  return {
    title: `${story.coupleNames} – ${story.venue} | Wedding Gurukuls`,
    description: story.teaser,
  }
}

export default function WeddingStoryPage({ params }: { params: { slug: string } }) {
  const story = getWeddingStory(params.slug)
  if (!story) notFound()

  const heroImage = getStoryHeroImage(story.slug)

  return (
    <>
      {/* Hero */}
      <section className="relative h-[65vh] min-h-[480px] overflow-hidden bg-charcoal-950">
        <Image
          src={heroImage}
          alt={`${story.coupleNames} wedding at ${story.venue}`}
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/25 to-charcoal-900/75" />
        <div className="relative z-10 h-full flex items-end pb-16 px-6">
          <div className="max-w-4xl mx-auto w-full text-center">
            <h1 className="font-cormorant text-4xl lg:text-6xl text-white mb-4">{story.coupleNames}</h1>
            <p className="font-cormorant text-xl lg:text-2xl text-gold-300 italic mb-4 max-w-3xl mx-auto">
              {story.title}
            </p>
            <p className="flex items-center justify-center gap-2 text-white/70 font-dm-sans text-sm">
              <MapPin size={14} className="text-gold-400" /> {story.venue}
            </p>
          </div>
        </div>
      </section>

      {/* Story content */}
      <section className="section-padding px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/wedding-wall"
            className="inline-flex items-center gap-2 text-gold-500 font-dm-sans text-sm mb-10 hover:text-gold-600 transition-colors"
          >
            <ArrowLeft size={14} /> Back to The Wedding Wall
          </Link>

          <div className="prose-luxury" dangerouslySetInnerHTML={{ __html: story.content }} />

          {story.credits && (
            <div className="mt-12 pt-8 border-t border-gold-100">
              <h3 className="font-cormorant text-2xl text-charcoal-900 mb-4">Credit Roll</h3>
              <div
                className="font-dm-sans text-sm text-charcoal-600 leading-relaxed space-y-2"
                dangerouslySetInnerHTML={{ __html: story.credits }}
              />
            </div>
          )}
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 px-6 bg-cream-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-cormorant text-3xl text-charcoal-900 text-center mb-10">
            Wedding <em className="text-gold-500">Gallery</em>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {story.gallery.map((img, i) => (
              <div
                key={i}
                className="relative aspect-[4/3] overflow-hidden bg-white shadow-sm group"
              >
                <Image
                  src={img.url}
                  alt={img.alt}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-charcoal-900 text-center">
        <Heart size={32} className="text-gold-400 mx-auto mb-6" />
        <h2 className="font-cormorant text-4xl text-white mb-4">Inspired by This Story?</h2>
        <p className="font-dm-sans text-white/60 mb-8 max-w-md mx-auto">
          Let&apos;s plan your own unforgettable celebration with Wedding Gurukuls.
        </p>
        <Link href="/contact" className="btn-gold">
          Let&apos;s Connect <ArrowRight size={16} />
        </Link>
      </section>
    </>
  )
}

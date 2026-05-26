'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Heart } from 'lucide-react'
import { getStoryCoverImage, weddingStories } from '@/data/wedding-stories'

const stories = weddingStories.slice(0, 4)

export default function FeaturedStories() {
  return (
    <section className="section-padding px-6 bg-charcoal-900 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #c9922a 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="section-label text-gold-400">The Wedding Wall</span>
          <div className="gold-divider my-4">
            <span className="ornament text-gold-400">✦</span>
          </div>
          <h2 className="font-cormorant text-4xl lg:text-5xl xl:text-6xl text-white mt-4 mb-5">
            Stories of Forever
          </h2>
          <p className="font-dm-sans text-white/55 max-w-xl mx-auto text-sm leading-relaxed">
            Real celebrations at Leela Palace, Alila Fort, Devi Ratn and more — crafted by Wedding Gurukuls.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stories.map((story) => (
            <Link
              href={`/wedding-wall/${story.slug}`}
              key={story.slug}
              className="group block card-hover"
            >
              <div className="relative overflow-hidden aspect-[3/4] bg-charcoal-800">
                <Image
                  src={getStoryCoverImage(story.slug)}
                  alt={story.coupleNames}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/95 via-charcoal-900/30 to-transparent" />

                <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Heart size={16} className="text-gold-400 fill-gold-400" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="font-dm-sans text-[10px] text-gold-300 tracking-wider uppercase mb-1 line-clamp-1">
                    {story.venue}
                  </p>
                  <h3 className="font-cormorant text-xl text-white mb-2">{story.coupleNames}</h3>
                  <p className="font-dm-sans text-xs text-white/60 line-clamp-2 mb-3">{story.teaser}</p>
                  <div className="flex items-center gap-2 text-gold-400 font-dm-sans text-[10px] font-medium tracking-wider uppercase group-hover:gap-3 transition-all">
                    Read More <ArrowRight size={11} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/wedding-wall"
            className="btn-outline-gold border-gold-400 text-gold-400 hover:bg-gold-500 hover:border-gold-500 hover:text-white"
          >
            Explore All Stories <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}

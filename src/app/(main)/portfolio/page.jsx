'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, Loader2 } from 'lucide-react'

function getImageSrc(src) {
  if (!src || typeof src !== 'string') return ''

  let cleanSrc = src.trim()

  if (!cleanSrc) return ''

  if (cleanSrc.startsWith('http://') || cleanSrc.startsWith('https://')) {
    return cleanSrc
  }

  cleanSrc = cleanSrc.replace(/^public\//, '')
  cleanSrc = cleanSrc.replace(/^\/public\//, '/')
  cleanSrc = cleanSrc.replace(/^\/?home\/.*?\/public\//, '/')

  if (!cleanSrc.startsWith('/')) {
    cleanSrc = `/${cleanSrc}`
  }

  return cleanSrc
}

export default function PortfolioPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    async function loadPortfolio() {
      setLoading(true)

      try {
        const res = await fetch('/api/portfolio?limit=30', {
          cache: 'no-store',
        })

        if (!res.ok) {
          setItems([])
          return
        }

        const data = await res.json()
        const dynamicItems = Array.isArray(data?.items) ? data.items : []

        setItems(dynamicItems)
      } catch (error) {
        console.error('Portfolio fetch error:', error)
        setItems([])
      } finally {
        setLoading(false)
      }
    }

    loadPortfolio()
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="relative w-screen h-[50vh] min-h-[390px] overflow-hidden left-1/2 -translate-x-1/2">
        <Image
          src="https://images.unsplash.com/photo-1745573673270-f33e2c69e8b4?q=90&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0"
          alt="Portfolio"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-charcoal-900/65" />

        <div className="relative z-10 h-full flex items-end pb-20 px-6 pt-28 md:pt-32">
          <div className="max-w-7xl mx-auto w-full">
            <span className="section-label text-gold">Our Portfolio</span>

            <h1 className="font-cormorant text-5xl lg:text-7xl text-white mt-3">
              Gallery of Dreams
            </h1>

            <p className="font-dm-sans text-white/60 mt-3 max-w-lg">
              A curated look at the celebrations we've had the honour of crafting across India.
            </p>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section-padding px-4 sm:px-6 bg-cream-50">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-32 gap-3 text-charcoal-400">
              <Loader2 size={24} className="animate-spin text-gold-400" />
              <span className="font-dm-sans text-sm">Loading portfolio…</span>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-24 bg-white shadow-card">
              <p className="font-cormorant text-3xl text-charcoal-700">
                No portfolio items are listed
              </p>
              <p className="font-dm-sans text-charcoal-500 mt-3">
                Please add portfolio items from admin panel.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {items.map((item, index) => {
                const imageSrc = getImageSrc(item.featuredImage)

                return (
                  <article
                    key={String(item._id || item.slug || index)}
                    className="group bg-white shadow-card overflow-hidden transition-all duration-300 hover:shadow-luxury"
                  >
                    <button
                      type="button"
                      onClick={() => setLightbox(index)}
                      className="relative block w-full aspect-[4/3] overflow-hidden bg-cream-100 text-left"
                    >
                      {imageSrc ? (
                        <Image
                          src={imageSrc}
                          alt={item.title || item.venue || 'Portfolio Item'}
                          fill
                          unoptimized
                          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-cream-100">
                          <span className="font-dm-sans text-sm text-charcoal-400">
                            No image uploaded
                          </span>
                        </div>
                      )}

                      {Array.isArray(item.style) && item.style[0] && (
                        <div className="absolute top-4 left-4 bg-white/90 text-charcoal-800 font-dm-sans text-[10px] px-2.5 py-1 tracking-wide uppercase">
                          {item.style[0]}
                        </div>
                      )}
                    </button>

                    <div className="p-5 min-h-[120px]">
                      <h3 className="font-cormorant text-xl text-charcoal-900 mb-2">
                        {item.title || item.venue || 'Portfolio Item'}
                      </h3>

                      {item.description ? (
                        <p className="font-dm-sans text-sm text-charcoal-500 leading-relaxed line-clamp-2">
                          {item.description}
                        </p>
                      ) : item.venue || item.location ? (
                        <p className="font-dm-sans text-sm text-charcoal-500 leading-relaxed line-clamp-2">
                          {[item.venue, item.location].filter(Boolean).join(' · ')}
                        </p>
                      ) : null}
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && items[lightbox] && (
        <div
          className="fixed inset-0 bg-charcoal-900/96 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            className="absolute top-6 right-6 text-white/60 hover:text-white"
            onClick={() => setLightbox(null)}
          >
            <X size={28} />
          </button>

          <div
            className="relative max-w-4xl w-full"
            onClick={(event) => event.stopPropagation()}
          >
            {getImageSrc(items[lightbox]?.featuredImage) ? (
              <Image
                src={getImageSrc(items[lightbox]?.featuredImage)}
                alt={items[lightbox]?.title || 'Portfolio Item'}
                width={1200}
                height={800}
                unoptimized
                className="object-contain max-h-[80vh] w-auto mx-auto"
              />
            ) : (
              <div className="flex h-[50vh] items-center justify-center bg-white/10">
                <span className="font-dm-sans text-white/60 text-sm">
                  No image uploaded
                </span>
              </div>
            )}

            <div className="text-center mt-4">
              <p className="font-cormorant text-xl text-white">
                {items[lightbox]?.title || items[lightbox]?.venue}
              </p>

              {(items[lightbox]?.venue || items[lightbox]?.location) && (
                <p className="font-dm-sans text-sm text-gold-300">
                  {[items[lightbox]?.venue, items[lightbox]?.location]
                    .filter(Boolean)
                    .join(' · ')}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
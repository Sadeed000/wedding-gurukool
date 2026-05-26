'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Filter, X, Loader2, MapPin, Calendar } from 'lucide-react'

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80'

const STATIC_ITEMS = [
  { _id: '1', slug: 'lake-palace-extravaganza', title: 'Lake Palace Extravaganza', description: 'A grand palace wedding blending Rajput heritage with contemporary luxury.', venue: 'The Oberoi Udaivilas', location: 'Udaipur', style: ['Royal'], venueType: 'Palace', featuredImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80' },
  { _id: '2', slug: 'coastal-blossom-wedding', title: 'Coastal Blossom Wedding', description: 'A barefoot beachside ceremony with free-spirited boho elegance.', venue: 'W Goa', location: 'Goa', style: ['Beach', 'Boho'], venueType: 'Beach', featuredImage: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80' },
  { _id: '3', slug: 'regal-pink-city', title: 'Regal Pink City Celebration', description: 'A majestic celebration in the historic heart of Jaipur.', venue: 'Samode Palace', location: 'Jaipur', style: ['Royal', 'Heritage'], venueType: 'Palace', featuredImage: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&q=80' },
  { _id: '4', slug: 'garden-bloom-ceremony', title: 'Garden Bloom Ceremony', description: 'Lush florals, open skies, and timeless love in Delhi\'s finest garden hotel.', venue: 'The Lodhi', location: 'Delhi', style: ['Garden', 'Modern'], venueType: 'Hotel', featuredImage: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&q=80' },
  { _id: '5', slug: 'heritage-fort-nuptials', title: 'Heritage Fort Nuptials', description: 'A royal celebration within the towering walls of Jodhpur\'s iconic fort.', venue: 'Mehrangarh Fort', location: 'Jodhpur', style: ['Heritage', 'Royal'], venueType: 'Heritage', featuredImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80' },
  { _id: '6', slug: 'mountain-mist-romance', title: 'Mountain Mist Romance', description: 'An intimate Himalayan celebration where love meets the clouds.', venue: 'Wildflower Hall', location: 'Shimla', style: ['Destination'], venueType: 'Resort', featuredImage: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80' },
  { _id: '7', slug: 'minimalist-modern-vows', title: 'Minimalist Modern Vows', description: 'Clean lines, curated details, and a contemporary aesthetic in royal Jodhpur.', venue: 'RAAS Jodhpur', location: 'Jodhpur', style: ['Modern'], venueType: 'Heritage', featuredImage: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=800&q=80' },
  { _id: '8', slug: 'romantic-lake-house', title: 'Romantic Lake House Wedding', description: 'An island palace fairytale on the shimmering waters of Udaipur.', venue: 'Taj Lake Palace', location: 'Udaipur', style: ['Royal', 'Traditional'], venueType: 'Palace', featuredImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80' },
  { _id: '9', slug: 'golden-dusk-celebration', title: 'Golden Dusk Celebration', description: 'A warm, golden-hued reception where tradition and love intertwined beautifully.', venue: 'Suján Rajmahal', location: 'Jaipur', style: ['Traditional'], venueType: 'Heritage', featuredImage: 'https://images.unsplash.com/photo-1549417229-aa67d3263c09?w=800&q=80' },
]

const STYLES = ['All', 'Royal', 'Beach', 'Boho', 'Garden', 'Heritage', 'Destination', 'Modern', 'Traditional']
const VENUE_TYPES = ['All', 'Palace', 'Beach', 'Hotel', 'Heritage', 'Resort']
const LOCATIONS = ['All', 'Udaipur', 'Goa', 'Jaipur', 'Delhi', 'Jodhpur', 'Shimla']

export default function PortfolioPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [styleFilter, setStyleFilter] = useState('All')
  const [venueFilter, setVenueFilter] = useState('All')
  const [locationFilter, setLocationFilter] = useState('All')
  const [showFilters, setShowFilters] = useState(false)
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const res = await fetch('/api/portfolio?limit=30')
        const data = await res.json()
        setItems(data.items && data.items.length > 0 ? data.items : STATIC_ITEMS)
      } catch {
        setItems(STATIC_ITEMS)
      }
      setLoading(false)
    }
    load()
  }, [])

  const filtered = items.filter(item => {
    const styles = Array.isArray(item.style) ? item.style : [item.style]
    return (
      (styleFilter === 'All' || styles.includes(styleFilter)) &&
      (venueFilter === 'All' || item.venueType === venueFilter) &&
      (locationFilter === 'All' || item.location === locationFilter)
    )
  })

  const hasFilters = styleFilter !== 'All' || venueFilter !== 'All' || locationFilter !== 'All'
  const clear = () => { setStyleFilter('All'); setVenueFilter('All'); setLocationFilter('All') }

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

      {/* Filters */}
      {/* <section className="py-6 px-6 bg-white border-b border-gold-100 sticky top-[73px] z-30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <button onClick={() => setShowFilters(!showFilters)} className={`lg:hidden flex items-center gap-2 px-4 py-2 border font-dm-sans text-sm transition-colors ${showFilters ? 'border-gold-500 text-gold-500' : 'border-gold-200 text-charcoal-600'}`}>
              <Filter size={14} /> Filters {hasFilters && '•'}
            </button>
            <div className={`w-full lg:flex flex-wrap gap-6 ${showFilters ? 'flex' : 'hidden lg:flex'}`}>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-dm-sans text-xs text-charcoal-500 uppercase tracking-wider">Style:</span>
                {STYLES.map(s => <button key={s} onClick={() => setStyleFilter(s)} className={`px-3 py-1.5 font-dm-sans text-xs transition-all ${styleFilter === s ? 'bg-gold-500 text-white' : 'border border-gold-200 text-charcoal-600 hover:border-gold-400'}`}>{s}</button>)}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-dm-sans text-xs text-charcoal-500 uppercase tracking-wider">Location:</span>
                {LOCATIONS.map(l => <button key={l} onClick={() => setLocationFilter(l)} className={`px-3 py-1.5 font-dm-sans text-xs transition-all ${locationFilter === l ? 'bg-gold-500 text-white' : 'border border-gold-200 text-charcoal-600 hover:border-gold-400'}`}>{l}</button>)}
              </div>
              {hasFilters && <button onClick={clear} className="flex items-center gap-1 text-charcoal-400 font-dm-sans text-xs hover:text-gold-500 transition-colors"><X size={12} /> Clear</button>}
            </div>
            <div className="ml-auto font-dm-sans text-sm text-charcoal-500 hidden lg:block">{filtered.length} results</div>
          </div>
        </div>
      </section> */}

      {/* Grid */}
{/* Grid */}
<section className="section-padding px-4 sm:px-6 bg-cream-50">
  <div className="max-w-6xl mx-auto">
    {loading ? (
      <div className="flex items-center justify-center py-32 gap-3 text-charcoal-400">
        <Loader2 size={24} className="animate-spin text-gold-400" />
        <span className="font-dm-sans text-sm">Loading portfolio…</span>
      </div>
    ) : filtered.length === 0 ? (
      <div className="text-center py-20">
        <p className="font-cormorant text-3xl text-charcoal-600 mb-4">
          No results found
        </p>
        <button onClick={clear} className="btn-outline-gold">
          Clear Filters
        </button>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {filtered.map((item) => (
          <article
            key={item._id || item.slug}
            className="group bg-white shadow-card overflow-hidden transition-all duration-300 hover:shadow-luxury"
          >
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-cream-100">
              <Image
                src={item.featuredImage || FALLBACK_IMG}
                alt={item.title}
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {Array.isArray(item.style) && item.style[0] && (
                <div className="absolute top-4 left-4 bg-white/90 text-charcoal-800 font-dm-sans text-[10px] px-2.5 py-1 tracking-wide uppercase">
                  {item.style[0]}
                </div>
              )}
            </div>

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
        ))}
      </div>
    )}
  </div>
</section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 bg-charcoal-900/96 z-50 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 text-white/60 hover:text-white"><X size={28} /></button>
          <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <Image src={filtered[lightbox]?.featuredImage || FALLBACK_IMG} alt={filtered[lightbox]?.title || ''} width={1200} height={800} className="object-contain max-h-[80vh] w-auto mx-auto" />
            <div className="text-center mt-4">
              <p className="font-cormorant text-xl text-white">{filtered[lightbox]?.title}</p>
              <p className="font-dm-sans text-sm text-gold-300">{filtered[lightbox]?.venue} · {filtered[lightbox]?.location}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

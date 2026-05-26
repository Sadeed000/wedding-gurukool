'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Users, ArrowRight, Search, Loader2, Flame } from 'lucide-react'

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80'

const STATIC_VENUES = [
  { _id: '1', slug: 'oberoi-udaivilas-udaipur', name: 'The Oberoi Udaivilas', city: 'Udaipur', state: 'Rajasthan', venueType: 'Palace Hotel', capacity: { min: 50, max: 600 }, featuredImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80', highlights: ['Lake Pichola views', 'Marble pavilions', 'Royal gardens'], trending: true, priceRange: '₹15L–₹50L+' },
  { _id: '2', slug: 'samode-palace-jaipur', name: 'Samode Palace', city: 'Jaipur', state: 'Rajasthan', venueType: 'Heritage Palace', capacity: { min: 100, max: 1200 }, featuredImage: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&q=80', highlights: ['Historic architecture', 'Grand durbar halls', 'Rooftop ceremonies'], trending: true, priceRange: '₹10L–₹40L' },
  { _id: '3', slug: 'the-leela-goa', name: 'The Leela Goa', city: 'Cavelossim', state: 'Goa', venueType: 'Beach Resort', capacity: { min: 50, max: 700 }, featuredImage: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80', highlights: ['Private beach', 'Riverside lawns', 'Golden sunsets'], trending: false, priceRange: '₹8L–₹30L' },
  { _id: '4', slug: 'the-lodhi-delhi', name: 'The Lodhi Hotel', city: 'New Delhi', state: 'Delhi', venueType: 'Luxury Hotel', capacity: { min: 50, max: 1000 }, featuredImage: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&q=80', highlights: ['Heritage gardens', 'Grand ballrooms', 'City views'], trending: true, priceRange: '₹12L–₹45L' },
  { _id: '5', slug: 'wildflower-hall-shimla', name: 'Wildflower Hall', city: 'Shimla', state: 'Himachal Pradesh', venueType: 'Mountain Resort', capacity: { min: 30, max: 250 }, featuredImage: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80', highlights: ['Himalayan views', 'Pine forest', 'Intimate ceremonies'], trending: false, priceRange: '₹6L–₹20L' },
  { _id: '6', slug: 'taj-lake-palace-udaipur', name: 'Taj Lake Palace', city: 'Udaipur', state: 'Rajasthan', venueType: 'Heritage Hotel', capacity: { min: 30, max: 350 }, featuredImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', highlights: ['Island palace', 'Lake Pichola access', 'Sunset views'], trending: true, priceRange: '₹12L–₹40L' },
]

const CITIES = ['All', 'Udaipur', 'Jaipur', 'Goa', 'New Delhi', 'Shimla']
const TYPES = ['All', 'Palace Hotel', 'Heritage Palace', 'Beach Resort', 'Luxury Hotel', 'Mountain Resort', 'Heritage Hotel']

export default function VenuesPage() {
  const [venues, setVenues] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [cityFilter, setCityFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const [tab, setTab] = useState('all')

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const res = await fetch('/api/venues')
        const data = await res.json()
        setVenues(data.venues && data.venues.length > 0 ? data.venues : STATIC_VENUES)
      } catch {
        setVenues(STATIC_VENUES)
      }
      setLoading(false)
    }
    load()
  }, [])

  const filtered = venues.filter(v => {
    const matchSearch = !search || v.name.toLowerCase().includes(search.toLowerCase()) || v.city.toLowerCase().includes(search.toLowerCase()) || v.state?.toLowerCase().includes(search.toLowerCase())
    const matchCity = cityFilter === 'All' || v.city === cityFilter
    const matchType = typeFilter === 'All' || v.venueType === typeFilter
    const matchTab = tab === 'all' || (tab === 'trending' && v.trending)
    return matchSearch && matchCity && matchType && matchTab
  })

  return (
    <>
      {/* Hero */}
<section className="relative w-screen h-[55vh] min-h-[420px] overflow-hidden left-1/2 -translate-x-1/2">
  <Image
    src="https://plus.unsplash.com/premium_photo-1674498529225-0cabebf0d08e?w=1920&auto=format&fit=crop&q=90"
    alt="Venues"
    fill
    priority
    quality={90}
    sizes="100vw"
    className="object-cover object-center"
  />

  <div className="absolute inset-0 bg-charcoal-900/60" />

<div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 gap-6 pt-24 md:pt-28">
      <h1 className="font-cormorant text-5xl lg:text-7xl text-white">
      Find Your Perfect Venue
    </h1>

    <p className="font-dm-sans text-white/80 max-w-xl">
      Explore India's most exquisite wedding venues — handpicked and trusted by Wedding Gurukul.
    </p>

    <div className="relative max-w-xl w-full mt-2">
      <Search
        size={20}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-charcoal-500"
      />

      <input
        type="text"
        placeholder="Search by venue name or city..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && setSearch(searchInput)}
        className="w-full pl-14 pr-5 py-5 bg-white font-dm-sans text-sm text-charcoal-800 placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-gold-400"
      />
    </div>
  </div>
</section>

      {/* Filters */}
      <section className="py-5 px-6 bg-white border-b border-gold-100 sticky top-[73px] z-30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-4">
          <div className="flex border border-gold-200">
            {[['all', 'All Venues'], ['trending', '🔥 Trending']].map(([val, label]) => (
              <button key={val} onClick={() => setTab(val)} className={`px-5 py-2 font-dm-sans text-sm capitalize transition-colors ${tab === val ? 'bg-gold-500 text-white' : 'text-charcoal-600 hover:text-gold-500'}`}>{label}</button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="font-dm-sans text-xs text-charcoal-500 self-center">City:</span>
            {CITIES.map(c => <button key={c} onClick={() => setCityFilter(c)} className={`px-3 py-1.5 font-dm-sans text-xs transition-all ${cityFilter === c ? 'bg-gold-500 text-white' : 'border border-gold-200 text-charcoal-600 hover:border-gold-400'}`}>{c}</button>)}
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="section-padding px-6 bg-cream-50">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-32 gap-3"><Loader2 size={24} className="animate-spin text-gold-400" /><span className="font-dm-sans text-sm text-charcoal-400">Loading venues…</span></div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20"><p className="font-cormorant text-3xl text-charcoal-600">No venues found</p><p className="font-dm-sans text-charcoal-500 mt-3">Try adjusting your filters</p></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map(venue => (
                <div key={venue._id || venue.slug} className="bg-white shadow-card group hover:shadow-luxury transition-all duration-400 hover:-translate-y-1">
                  <div className="relative h-64 overflow-hidden">
                    <Image src={venue.featuredImage || FALLBACK_IMG} alt={venue.name} fill className="object-cover transition-transform duration-600 group-hover:scale-108" sizes="400px" />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/40 to-transparent" />
                    {venue.trending && (
                      <div className="absolute top-4 left-4 flex items-center gap-1 bg-gold-500 text-white font-dm-sans text-[10px] px-2.5 py-1 tracking-widest uppercase">
                        <Flame size={10} /> Trending
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-white/90 text-charcoal-800 font-dm-sans text-xs px-3 py-1">{venue.venueType}</div>
                    {venue.priceRange && (
                      <div className="absolute bottom-4 right-4 bg-charcoal-900/70 text-gold-300 font-dm-sans text-xs px-3 py-1 backdrop-blur-sm">{venue.priceRange}</div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-cormorant text-xl text-charcoal-900 mb-2">{venue.name}</h3>
                    <div className="flex items-center gap-1 text-charcoal-500 font-dm-sans text-sm mb-3"><MapPin size={12} /> {venue.city}, {venue.state}</div>
                    <div className="flex items-center gap-1 text-charcoal-500 font-dm-sans text-xs mb-4"><Users size={12} /> {venue.capacity?.min || 50}–{venue.capacity?.max || 500} guests</div>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {(venue.highlights || []).slice(0, 3).map(h => <span key={h} className="px-2 py-1 bg-gold-50 text-gold-600 font-dm-sans text-xs">{h}</span>)}
                    </div>
                   <div className="flex items-center gap-3">
<Link
  href={`/venues/${venue.slug}`}
  className="flex flex-1 items-center justify-center border border-[#c9922a] bg-[#c9922a] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-white hover:text-[#c9922a]"
>
  View Details
</Link>

  <Link href="/contact" className="btn-outline-gold text-xs py-2 px-4">
    Get Quote
  </Link>
</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 px-6 bg-charcoal-900 text-center">
        <h2 className="font-cormorant text-4xl text-white mb-4">Can't Find the Perfect Venue?</h2>
        <p className="font-dm-sans text-white/60 max-w-md mx-auto mb-8">Our venue specialists have exclusive access to over 200 properties across India.</p>
        <Link href="/contact" className="btn-gold">Talk to Our Venue Experts <ArrowRight size={16} /></Link>
      </section>
    </>
  )
}

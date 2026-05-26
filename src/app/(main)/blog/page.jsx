'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Calendar, Search, Loader2 } from 'lucide-react'

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80'
const CATEGORY_COLORS = {
  'Decor': 'bg-rose-50 text-rose-600',
  'Planning Tips': 'bg-emerald-50 text-emerald-600',
  'Venue Spotlight': 'bg-amber-50 text-amber-600',
  'Real Weddings': 'bg-purple-50 text-purple-600',
  'Trends': 'bg-blue-50 text-blue-600',
  'Food & Cuisine': 'bg-orange-50 text-orange-600',
}

// Fallback static posts shown when DB is empty
const STATIC_POSTS = [
  { _id: '1', slug: 'spring-wedding-decor-trends', title: 'Spring Blossoms & Golden Hours: Wedding Decor Trends 2025', excerpt: 'From dried botanicals to maximalist floral arches, discover the decor stories defining weddings this year.', featuredImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80', category: 'Decor', author: 'Wedding Gurukul Team', createdAt: '2025-03-15', featured: true },
  { _id: '2', slug: 'destination-wedding-guide-india', title: 'The Complete Guide to Planning a Destination Wedding in India', excerpt: 'From logistics to vendor selection, everything you need before saying I do in a dream location.', featuredImage: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&q=80', category: 'Planning Tips', author: 'Mandeep Agarwal', createdAt: '2025-02-20', featured: false },
  { _id: '3', slug: 'udaipur-palace-wedding-venues', title: 'Udaipur\'s Most Iconic Palace Wedding Venues', excerpt: 'Set against shimmering lakes and royal backdrops — a guide to Udaipur\'s finest wedding venues.', featuredImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80', category: 'Venue Spotlight', author: 'Priya Sharma', createdAt: '2025-01-10', featured: false },
  { _id: '4', slug: 'rajasthani-wedding-traditions', title: 'The Rich Traditions of a Rajasthani Wedding', excerpt: 'A deep dive into the vibrant rituals, colourful ceremonies, and timeless customs of Rajasthani weddings.', featuredImage: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80', category: 'Real Weddings', author: 'Wedding Gurukul Team', createdAt: '2024-12-05', featured: false },
  { _id: '5', slug: 'wedding-decor-trends-2025', title: '2025 Wedding Decor Trends Redefining Indian Celebrations', excerpt: 'Organic textures, maximalist florals, and sustainable luxury — the trends shaping weddings this year.', featuredImage: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80', category: 'Trends', author: 'Himish Agarwal', createdAt: '2024-11-20', featured: false },
]

export default function BlogPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')

  const categories = ['All', 'Decor', 'Planning Tips', 'Venue Spotlight', 'Real Weddings', 'Trends', 'Food & Cuisine']

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const params = new URLSearchParams({ limit: '12' })
        if (category !== 'All') params.set('category', category)
        if (search) params.set('search', search)

        const res = await fetch(`/api/blogs?${params}`)
        const data = await res.json()
        // Use API data if available, else fallback
        const raw = data.posts && data.posts.length > 0 ? data.posts : STATIC_POSTS
        const filtered = raw.filter(p =>
          (category === 'All' || p.category === category) &&
          (!search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase()))
        )
        setPosts(filtered)
      } catch {
        // Filter static posts client-side on error
        const filtered = STATIC_POSTS.filter(p =>
          (category === 'All' || p.category === category) &&
          (!search || p.title.toLowerCase().includes(search.toLowerCase()))
        )
        setPosts(filtered)
      }
      setLoading(false)
    }
    load()
  }, [category, search])

  const featured = posts.find(p => p.featured)
  const rest = posts.filter(p => !p.featured)

  function formatDate(d) {
    if (!d) return ''
    return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  return (
    <>
      {/* Hero */}
      <section className="relative h-[45vh] min-h-[420px] overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&q=80" alt="Blog" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/50 to-charcoal-900/80" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 gap-5">
          <span className="section-label text-gold">Inspiration & Insights</span>
          <h1 className="font-cormorant text-5xl lg:text-7xl text-white">The Wedding Gurukul Blog</h1>
          <p className="font-dm-sans text-white/70 max-w-md">Tips, trends, real weddings & venue spotlights from India's leading wedding experts.</p>
          {/* Search */}
          <div className="relative max-w-md w-full mt-2">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-400" />
            <input type="text" placeholder="Search blogs…" value={searchInput} onChange={e => setSearchInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && setSearch(searchInput)}
              className="w-full pl-11 pr-4 py-3 bg-white font-dm-sans text-sm text-charcoal-800 placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-gold-400" />
          </div>
        </div>
      </section>

      {/* Categories */}
      <div className="py-4 px-6 bg-white border-b border-gold-100 sticky top-[73px] z-30">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2">
          {categories.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 font-dm-sans text-xs font-medium border transition-all ${category === cat ? 'bg-gold-500 text-white border-gold-500' : 'border-gold-200 text-charcoal-600 hover:border-gold-400 hover:text-gold-500'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <section className="section-padding px-6 bg-cream-50">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-32 gap-3 text-charcoal-400">
              <Loader2 size={24} className="animate-spin text-gold-400" />
              <span className="font-dm-sans text-sm">Loading stories…</span>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-cormorant text-3xl text-charcoal-600 mb-3">No posts found</p>
              <button onClick={() => { setCategory('All'); setSearch(''); setSearchInput('') }} className="btn-outline-gold">Clear Filters</button>
            </div>
          ) : (
            <>
              {/* Featured post */}
              {featured && (
                <Link href={`/blog/${featured.slug}`} className="group block mb-16 lg:grid lg:grid-cols-2 items-center bg-white shadow-card hover:shadow-luxury transition-shadow duration-400">
                  <div className="relative h-72 lg:h-full min-h-[360px] overflow-hidden">
                    <Image src={featured.featuredImage || FALLBACK_IMG} alt={featured.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute top-4 left-4 bg-gold-500 text-white font-dm-sans text-[10px] px-3 py-1 tracking-widest uppercase">Featured</div>
                  </div>
                  <div className="p-8 lg:p-12">
                    <span className={`inline-block px-3 py-1 font-dm-sans text-xs rounded-sm mb-5 ${CATEGORY_COLORS[featured.category] || 'bg-gold-50 text-gold-600'}`}>{featured.category}</span>
                    <h2 className="font-cormorant text-3xl lg:text-4xl text-charcoal-900 mb-4 group-hover:text-gold-600 transition-colors">{featured.title}</h2>
                    <p className="font-dm-sans text-charcoal-600 leading-relaxed mb-6">{featured.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="font-dm-sans text-xs text-charcoal-500">By {featured.author} · {formatDate(featured.createdAt)}</div>
                      <span className="flex items-center gap-2 text-gold-500 font-dm-sans text-sm font-medium group-hover:gap-3 transition-all">Read More <ArrowRight size={14} /></span>
                    </div>
                  </div>
                </Link>
              )}

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {rest.map(post => (
                  <Link key={post._id || post.slug} href={`/blog/${post.slug}`} className="group bg-white shadow-card card-hover block">
                    <div className="relative h-52 overflow-hidden">
                      <Image src={post.featuredImage || FALLBACK_IMG} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="400px" />
                      <div className={`absolute top-4 left-4 px-3 py-1 font-dm-sans text-[10px] rounded-sm ${CATEGORY_COLORS[post.category] || 'bg-gold-50 text-gold-600'}`}>{post.category}</div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-cormorant text-xl text-charcoal-900 mb-3 group-hover:text-gold-600 transition-colors line-clamp-2">{post.title}</h3>
                      <p className="font-dm-sans text-sm text-charcoal-600 leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between border-t border-gold-50 pt-4">
                        <div className="flex items-center gap-2 font-dm-sans text-xs text-charcoal-400"><Calendar size={11} /> {formatDate(post.createdAt)}</div>
                        <span className="flex items-center gap-1 text-gold-500 font-dm-sans text-xs font-medium">Read <ArrowRight size={11} /></span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}

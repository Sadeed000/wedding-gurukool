'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Calendar, Search, Loader2 } from 'lucide-react'

const CATEGORY_COLORS = {
  Decor: 'bg-rose-50 text-rose-600',
  'Planning Tips': 'bg-emerald-50 text-emerald-600',
  'Venue Spotlight': 'bg-amber-50 text-amber-600',
  'Real Weddings': 'bg-purple-50 text-purple-600',
  Trends: 'bg-blue-50 text-blue-600',
  'Food & Cuisine': 'bg-orange-50 text-orange-600',
}

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

export default function BlogPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    async function load() {
      setLoading(true)

      try {
        const params = new URLSearchParams({ limit: '12' })

        if (category !== 'All') params.set('category', category)
        if (search) params.set('search', search)

        const res = await fetch(`/api/blogs?${params.toString()}`, {
          cache: 'no-store',
        })

        if (!res.ok) {
          setPosts([])
          return
        }

        const data = await res.json()
        const dynamicPosts = Array.isArray(data?.posts) ? data.posts : []

        const filtered = dynamicPosts.filter((post) => {
          const title = post.title || ''
          const excerpt = post.excerpt || ''

          return (
            (category === 'All' || post.category === category) &&
            (!search ||
              title.toLowerCase().includes(search.toLowerCase()) ||
              excerpt.toLowerCase().includes(search.toLowerCase()))
          )
        })

        setPosts(filtered)
      } catch (error) {
        console.error('Blog fetch error:', error)
        setPosts([])
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [category, search])

  const categories = [
    'All',
    ...Array.from(new Set(posts.map((post) => post.category).filter(Boolean))),
  ]

  const featured = posts.find((post) => post.featured)
  const rest = featured
    ? posts.filter(
        (post) =>
          String(post._id || post.slug) !== String(featured._id || featured.slug)
      )
    : posts

  function formatDate(d) {
    if (!d) return ''

    const date = new Date(d)
    if (Number.isNaN(date.getTime())) return ''

    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  function clearFilters() {
    setCategory('All')
    setSearch('')
    setSearchInput('')
  }

  return (
    <>
      {/* Hero */}
      <section className="relative h-[45vh] min-h-[420px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&q=80"
          alt="Blog"
          fill
          unoptimized
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/50 to-charcoal-900/80" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 gap-5">
          <span className="section-label text-gold">Inspiration & Insights</span>
          <h1 className="font-cormorant text-5xl lg:text-7xl text-white">
            The Wedding Gurukul Blog
          </h1>
          <p className="font-dm-sans text-white/70 max-w-md">
            Tips, trends, real weddings & venue spotlights from India's leading wedding experts.
          </p>

          {/* Search */}
          <div className="relative max-w-md w-full mt-2">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-400"
            />
            <input
              type="text"
              placeholder="Search blogs…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && setSearch(searchInput)}
              className="w-full pl-11 pr-4 py-3 bg-white font-dm-sans text-sm text-charcoal-800 placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-gold-400"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <div className="py-4 px-6 bg-white border-b border-gold-100 sticky top-[73px] z-30">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 font-dm-sans text-xs font-medium border transition-all ${
                category === cat
                  ? 'bg-gold-500 text-white border-gold-500'
                  : 'border-gold-200 text-charcoal-600 hover:border-gold-400 hover:text-gold-500'
              }`}
            >
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
            <div className="text-center py-24 bg-white shadow-card">
              <p className="font-cormorant text-3xl text-charcoal-700 mb-3">
                No blogs are listed
              </p>
              <p className="font-dm-sans text-charcoal-500 mb-5">
                Please add blogs from admin panel.
              </p>
              <button onClick={clearFilters} className="btn-outline-gold">
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              {/* Featured post */}
              {featured && (
                <Link
                  href={`/blog/${featured.slug}`}
                  className="group block mb-16 lg:grid lg:grid-cols-2 items-center bg-white shadow-card hover:shadow-luxury transition-shadow duration-400"
                >
                  <div className="relative h-72 lg:h-full min-h-[360px] overflow-hidden bg-cream-100">
                    {getImageSrc(featured.featuredImage) ? (
                      <Image
                        src={getImageSrc(featured.featuredImage)}
                        alt={featured.title || 'Blog'}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-cream-100">
                        <span className="font-dm-sans text-sm text-charcoal-400">
                          No image uploaded
                        </span>
                      </div>
                    )}

                    <div className="absolute top-4 left-4 bg-gold-500 text-white font-dm-sans text-[10px] px-3 py-1 tracking-widest uppercase">
                      Featured
                    </div>
                  </div>

                  <div className="p-8 lg:p-12">
                    {featured.category && (
                      <span
                        className={`inline-block px-3 py-1 font-dm-sans text-xs rounded-sm mb-5 ${
                          CATEGORY_COLORS[featured.category] ||
                          'bg-gold-50 text-gold-600'
                        }`}
                      >
                        {featured.category}
                      </span>
                    )}

                    <h2 className="font-cormorant text-3xl lg:text-4xl text-charcoal-900 mb-4 group-hover:text-gold-600 transition-colors">
                      {featured.title}
                    </h2>

                    {featured.excerpt && (
                      <p className="font-dm-sans text-charcoal-600 leading-relaxed mb-6">
                        {featured.excerpt}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="font-dm-sans text-xs text-charcoal-500">
                        {featured.author ? `By ${featured.author}` : ''}
                        {featured.author && featured.createdAt ? ' · ' : ''}
                        {formatDate(featured.createdAt)}
                      </div>
                      <span className="flex items-center gap-2 text-gold-500 font-dm-sans text-sm font-medium group-hover:gap-3 transition-all">
                        Read More <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              )}

              {/* Grid heading */}
              {rest.length > 0 && (
                <div className="flex items-end justify-between mb-8">
                  <div>
                    <span className="section-label text-gold">Latest Stories</span>
                    <h2 className="font-cormorant text-3xl lg:text-4xl text-charcoal-900 mt-1">
                      Fresh from the Journal
                    </h2>
                  </div>
                  <span className="hidden sm:block font-dm-sans text-xs text-charcoal-400">
                    {rest.length} {rest.length === 1 ? 'article' : 'articles'}
                  </span>
                </div>
              )}

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {rest.map((post) => {
                  const imageSrc = getImageSrc(post.featuredImage)
                  const authorName =
                    typeof post.author === 'object' && post.author !== null
                      ? post.author.name
                      : post.author

                  return (
                    <Link
                      key={String(post._id || post.slug)}
                      href={`/blog/${post.slug}`}
                      className="group bg-white shadow-card card-hover rounded-xl overflow-hidden block"
                    >
                      <div className="relative h-52 overflow-hidden bg-cream-100">
                        {imageSrc ? (
                          <Image
                            src={imageSrc}
                            alt={post.title || 'Blog'}
                            fill
                            unoptimized
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="400px"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-cream-100">
                            <span className="font-dm-sans text-sm text-charcoal-400">
                              No image uploaded
                            </span>
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/45 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {post.category && (
                          <div
                            className={`absolute top-4 left-4 px-3 py-1 font-dm-sans text-[10px] rounded-full backdrop-blur-sm ${
                              CATEGORY_COLORS[post.category] ||
                              'bg-gold-50 text-gold-600'
                            }`}
                          >
                            {post.category}
                          </div>
                        )}
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-2 font-dm-sans text-xs text-charcoal-400 mb-3">
                          <Calendar size={11} /> {formatDate(post.createdAt)}
                        </div>

                        <h3 className="font-cormorant text-xl text-charcoal-900 mb-3 group-hover:text-gold-600 transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        {post.excerpt && (
                          <p className="font-dm-sans text-sm text-charcoal-600 leading-relaxed mb-5 line-clamp-3">
                            {post.excerpt}
                          </p>
                        )}

                        <div className="flex items-center justify-between border-t border-gold-50 pt-4">
                          <div className="flex items-center gap-2">
                            {authorName && (
                              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gold-500 text-white font-dm-sans text-[10px] font-semibold uppercase">
                                {authorName.trim().charAt(0)}
                              </span>
                            )}
                            <span className="font-dm-sans text-xs text-charcoal-500 line-clamp-1">
                              {authorName || 'Wedding Gurukul'}
                            </span>
                          </div>
                          <span className="flex items-center gap-1 text-gold-500 font-dm-sans text-xs font-medium group-hover:gap-2 transition-all">
                            Read <ArrowRight size={11} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}
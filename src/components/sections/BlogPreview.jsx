'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar } from 'lucide-react'

const STATIC = [
  { slug: 'spring-wedding-decor-trends', title: 'Spring Blossoms & Golden Hours: Wedding Decor Trends 2025', excerpt: 'From dried botanicals to maximalist floral arches — the design stories defining weddings this year.', category: 'Decor', author: 'Wedding Gurukul Team', createdAt: '2025-03-15', featuredImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80' },
  { slug: 'destination-wedding-guide-india', title: 'The Complete Guide to Planning a Destination Wedding in India', excerpt: 'From logistics to vendor selection — everything you need to know before saying I do abroad.', category: 'Planning Tips', author: 'Mandeep Agarwal', createdAt: '2025-02-20', featuredImage: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&q=80' },
  { slug: 'rajasthani-wedding-traditions', title: 'The Rich Traditions of a Rajasthani Wedding Celebration', excerpt: 'A deep dive into the vibrant rituals, colourful ceremonies and timeless customs of Rajasthani weddings.', category: 'Real Weddings', author: 'Priya Sharma', createdAt: '2024-12-05', featuredImage: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80' },
]

const CATEGORY_COLORS = {
  'Decor': 'bg-rose-50 text-rose-600',
  'Planning Tips': 'bg-emerald-50 text-emerald-600',
  'Real Weddings': 'bg-purple-50 text-purple-600',
  'Trends': 'bg-blue-50 text-blue-600',
  'Venue Spotlight': 'bg-amber-50 text-amber-600',
}

function formatDate(d) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function BlogPreview() {
  const [posts, setPosts] = useState(STATIC)

  useEffect(() => {
    fetch('/api/blogs?limit=3&featured=true')
      .then(r => r.json())
      .then(data => { if (data.posts?.length) setPosts(data.posts.slice(0, 3)) })
      .catch(() => {})
  }, [])

  return (
    <section className="section-padding px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start justify-between mb-12 gap-6">
          <div>
            <span className="section-label">Latest From Us</span>
            <div className="gold-divider justify-start my-4">
              <span className="ornament">✦</span>
            </div>
            <h2 className="font-cormorant text-4xl lg:text-5xl text-charcoal-900 mt-2">
              Tips, Trends &<br />
              <em className="text-gold-500">Wedding Inspiration</em>
            </h2>
          </div>
          <div className="flex items-end">
            <Link href="/blog" className="btn-outline-gold">
              All Articles <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {posts.map((post, i) => (
            <Link
              key={post.slug || post._id}
              href={`/blog/${post.slug}`}
              className="group bg-white border border-gold-100 hover:border-gold-300 hover:shadow-luxury transition-all duration-400 hover:-translate-y-1"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={post.featuredImage || 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80'}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-600 group-hover:scale-108"
                  sizes="400px"
                />
                <div className={`absolute top-4 left-4 px-3 py-1 font-dm-sans text-[10px] rounded-sm ${CATEGORY_COLORS[post.category] || 'bg-gold-50 text-gold-600'}`}>
                  {post.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-cormorant text-xl text-charcoal-900 mb-3 group-hover:text-gold-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="font-dm-sans text-sm text-charcoal-600 leading-relaxed mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between border-t border-gold-50 pt-4">
                  <div className="flex items-center gap-2 font-dm-sans text-xs text-charcoal-400">
                    <Calendar size={11} /> {formatDate(post.createdAt)}
                  </div>
                  <span className="flex items-center gap-1 text-gold-500 font-dm-sans text-xs font-medium group-hover:gap-2 transition-all">
                    Read <ArrowRight size={11} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

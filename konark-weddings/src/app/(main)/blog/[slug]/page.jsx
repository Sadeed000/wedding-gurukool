import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Calendar, User, Tag, Eye } from 'lucide-react'

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&q=85'

// Static fallback content for demo
const STATIC_CONTENT = {
  'spring-wedding-decor-trends': {
    title: 'Spring Blossoms & Golden Hours: Wedding Decor Trends 2025',
    excerpt: 'From dried botanicals to maximalist floral arches, discover the decor stories defining weddings this year.',
    featuredImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&q=85',
    category: 'Decor',
    author: 'Wedding Gurukul Team',
    createdAt: '2025-03-15',
    tags: ['Decor', 'Trends', 'Florals', '2025'],
    content: `<p>Spring 2025 is ushering in a new era of wedding design — one that marries the raw beauty of nature with the opulence of luxury. At Wedding Gurukul, we've spent 18+ years watching trends evolve, and this year's aesthetic landscape is our most exciting yet.</p><h2>1. Maximalist Floral Arches</h2><p>Go big or go home. Floral arches have evolved from simple backdrops into full-blown architectural installations — think 10-foot archways dripping in garden roses, peonies, and hanging wisteria that transforms a mandap into a garden in bloom.</p><h2>2. Earthy, Organic Textures</h2><p>Rattan, dried pampas grass, terracotta vessels, and woven jute runners are bringing warmth and groundedness to receptions. Paired with candlelight, the effect is deeply romantic and undeniably chic.</p><h2>3. Sustainable Luxury</h2><p>Our couples are increasingly asking for locally-sourced florals, reusable decor elements, and zero-waste arrangements. Sustainability and splendor are no longer opposites — they're partners.</p><h2>4. Monochromatic Palettes with a Twist</h2><p>All-white, all-blush, or all-terracotta schemes unified by texture variation — then punctuated by a single bold accent like cobalt blue or emerald green. Sophisticated, memorable, and photograph beautifully.</p>`,
    metaTitle: 'Spring Wedding Decor Trends 2025 | Wedding Gurukul Blog',
    metaDescription: 'Discover the top wedding decor trends for spring 2025 — florals, textures, and sustainable luxury.',
  },
}

async function getPost(slug) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_SITE_URL
      ? `${process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')}/api/blogs/${slug}`
      : `/api/blogs/${slug}`
    const res = await fetch(apiUrl, { next: { revalidate: 60 } })
    if (!res.ok) return null
    const post = await res.json()
    return post && typeof post === 'object' ? post : null
  } catch {
    return null
  }
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug) || STATIC_CONTENT[params.slug]
  if (!post) return { title: 'Blog Post Not Found' }
  return {
    title: post.metaTitle || post.title + ' | Wedding Gurukul',
    description: post.metaDescription || post.excerpt,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.featuredImage || FALLBACK_IMG }],
      publishedTime: post.createdAt,
      authors: [post.author],
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.excerpt },
  }
}

export default async function BlogPostPage({ params }) {
  const post = await getPost(params.slug) || STATIC_CONTENT[params.slug]
  if (!post) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage || FALLBACK_IMG,
    author: { '@type': 'Person', name: post.author },
    publisher: { '@type': 'Organization', name: 'Wedding Gurukul', logo: { '@type': 'ImageObject', url: '/images/logo.png' } },
    datePublished: post.createdAt,
    dateModified: post.updatedAt || post.createdAt,
  }

  function formatDate(d) {
    if (!d) return ''
    return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  function normalizeContent(raw) {
    if (!raw) return ''
    // if content already contains HTML tags, assume it's intended HTML
    if (/<[a-z][\s\S]*>/i.test(raw)) return raw

    // Convert plain-text line breaks into paragraphs and <br/>
    return raw
      .split(/\n{2,}/g)
      .map(para => `<p>${para.trim().replace(/\n/g, '<br/>')}</p>`)
      .join('')
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative h-[65vh] min-h-[420px] overflow-hidden">
        <Image src={post.featuredImage || FALLBACK_IMG} alt={post.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/10 via-charcoal-900/40 to-charcoal-900/90" />
        <div className="relative z-10 h-full flex items-end pb-16 px-6">
          <div className="max-w-3xl mx-auto w-full">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 font-dm-sans text-xs text-white/50 mb-5">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-gold transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-white/70 line-clamp-1">{post.title}</span>
            </nav>
            <span className="inline-block px-3 py-1 bg-gold-500 text-white font-dm-sans text-xs tracking-widest uppercase mb-4">{post.category}</span>
            <h1 className="font-cormorant text-4xl lg:text-5xl text-white mb-5 leading-tight">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-5 text-white/60 font-dm-sans text-sm">
              <span className="flex items-center gap-2"><User size={13} /> {post.author}</span>
              <span className="flex items-center gap-2"><Calendar size={13} /> {formatDate(post.createdAt)}</span>
              {/* {post.views > 0 && <span className="flex items-center gap-2"><Eye size={13} /> {post.views} views</span>} */}
            </div>
          </div>
        </div>
      </section>

      {/* Article */}
      <section className="section-padding px-6 bg-cream-50">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gold-500 font-dm-sans text-sm mb-10 hover:text-gold-600 transition-colors">
            <ArrowLeft size={14} /> Back to Blog
          </Link>

          {/* Excerpt callout */}
          {post.excerpt && (
            <p className="font-cormorant text-xl text-charcoal-700 italic border-l-4 border-gold-400 pl-5 mb-10 leading-relaxed">{post.excerpt}</p>
          )}

          {/* Multiple images */}
          {post.images && post.images.length > 0 && (
            <div className="grid grid-cols-2 gap-3 mb-10">
              {post.images.slice(0, 4).map((img, i) => (
                <div key={i} className="relative aspect-video overflow-hidden rounded-sm">
                  <Image src={img.url} alt={img.alt || post.title} fill className="object-cover" sizes="400px" />
                </div>
              ))}
            </div>
          )}

          {post.content ? (
            <div className="prose-luxury" dangerouslySetInnerHTML={{ __html: normalizeContent(post.content) }} />
          ) : (
            <p className="font-dm-sans text-charcoal-600 leading-relaxed">This blog post has no content available.</p>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gold-100">
              <div className="flex flex-wrap items-center gap-3">
                <Tag size={14} className="text-gold-400" />
                {post.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gold-50 text-gold-600 font-dm-sans text-xs border border-gold-100">{tag}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      {/* CTA */}
      <section className="py-20 px-6 bg-charcoal-900 text-center">
        <p className="section-label text-gold mb-3">Start Your Journey</p>
        <h2 className="font-cormorant text-4xl text-white mb-4">Ready to Plan Your Wedding?</h2>
        <p className="font-dm-sans text-white/60 max-w-md mx-auto mb-8">Let our team bring your vision to life with the same care and creativity you've just read about.</p>
       <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
  <Link
    href="/contact"
    className="btn-gold !text-white hover:!text-white"
  >
    Book a Free Consultation <ArrowRight size={16} />
  </Link>

  <Link
    href="/portfolio"
    className="border border-white/30 !text-white hover:!text-white px-8 py-3 font-dm-sans text-sm hover:bg-white/5 transition-colors"
  >
    View Our Work
  </Link>
</div>
      </section>
    </>
  )
}

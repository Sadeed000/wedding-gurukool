import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Calendar, User, Tag } from 'lucide-react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

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

async function getPost(slug) {
  try {
    const baseUrl = 'https://weddinggurukul.com'

    const res = await fetch(`${baseUrl}/api/blogs/${slug}`, {
      cache: 'no-store',
    })

    if (!res.ok) return null

    const data = await res.json()
    return data.post || data.blog || data
  } catch (error) {
    console.error('Blog fetch error:', error)
    return null
  }
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug)

  if (!post) {
    return {
      title: 'Blog Post Not Found | Wedding Gurukul',
      description: 'Blog post not found.',
    }
  }

  const ogImage = getImageSrc(post.featuredImage)

  return {
    title: post.metaTitle || `${post.title} | Wedding Gurukul`,
    description: post.metaDescription || post.excerpt || '',
    openGraph: {
      type: 'article',
      title: post.title || 'Wedding Gurukul Blog',
      description: post.excerpt || '',
      images: ogImage ? [{ url: ogImage }] : [],
      publishedTime: post.createdAt,
      authors: post.author ? [post.author] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title || 'Wedding Gurukul Blog',
      description: post.excerpt || '',
      images: ogImage ? [ogImage] : [],
    },
  }
}

export default async function BlogPostPage({ params }) {
  const post = await getPost(params.slug)

  if (!post) notFound()

  const heroImage = getImageSrc(post.featuredImage)

  const galleryImages = Array.isArray(post.images)
    ? post.images.filter((img) => getImageSrc(img?.url))
    : []

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title || '',
    description: post.excerpt || '',
    image: heroImage || undefined,
    author: {
      '@type': 'Person',
      name: post.author || 'Wedding Gurukul',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Wedding Gurukul',
      logo: {
        '@type': 'ImageObject',
        url: 'https://weddinggurukul.com/images/logo.png',
      },
    },
    datePublished: post.createdAt || undefined,
    dateModified: post.updatedAt || post.createdAt || undefined,
  }

  function formatDate(d) {
    if (!d) return ''

    const date = new Date(d)
    if (Number.isNaN(date.getTime())) return ''

    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  function normalizeContent(raw) {
    if (!raw) return ''

    if (/<[a-z][\s\S]*>/i.test(raw)) return raw

    return raw
      .split(/\n{2,}/g)
      .map((para) => `<p>${para.trim().replace(/\n/g, '<br/>')}</p>`)
      .join('')
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative h-[65vh] min-h-[420px] overflow-hidden bg-charcoal-900">
        {heroImage ? (
          <Image
            src={heroImage}
            alt={post.title || 'Blog'}
            fill
            priority
            unoptimized
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-charcoal-800">
            <span className="font-dm-sans text-white/60 text-sm">
              No image uploaded
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/10 via-charcoal-900/40 to-charcoal-900/90" />

        <div className="relative z-10 h-full flex items-end pb-16 px-6">
          <div className="max-w-3xl mx-auto w-full">
            <nav className="flex items-center gap-2 font-dm-sans text-xs text-white/50 mb-5">
              <Link href="/" className="hover:text-gold transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-gold transition-colors">
                Blog
              </Link>
              <span>/</span>
              <span className="text-white/70 line-clamp-1">{post.title}</span>
            </nav>

            {post.category && (
              <span className="inline-block px-3 py-1 bg-gold-500 text-white font-dm-sans text-xs tracking-widest uppercase mb-4">
                {post.category}
              </span>
            )}

            <h1 className="font-cormorant text-4xl lg:text-5xl text-white mb-5 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-5 text-white/60 font-dm-sans text-sm">
              {post.author && (
                <span className="flex items-center gap-2">
                  <User size={13} /> {post.author}
                </span>
              )}

              {post.createdAt && (
                <span className="flex items-center gap-2">
                  <Calendar size={13} /> {formatDate(post.createdAt)}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Article */}
      <section className="section-padding px-6 bg-cream-50">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gold-500 font-dm-sans text-sm mb-10 hover:text-gold-600 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Blog
          </Link>

          {post.excerpt && (
            <p className="font-cormorant text-xl text-charcoal-700 italic border-l-4 border-gold-400 pl-5 mb-10 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {galleryImages.length > 0 && (
            <div className="grid grid-cols-2 gap-3 mb-10">
              {galleryImages.slice(0, 4).map((img, i) => (
                <div
                  key={`${img.url}-${i}`}
                  className="relative aspect-video overflow-hidden rounded-sm bg-cream-100"
                >
                  <Image
                    src={getImageSrc(img.url)}
                    alt={img.alt || post.title || 'Blog Image'}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="400px"
                  />
                </div>
              ))}
            </div>
          )}

          {post.content ? (
            <div
              className="prose-luxury"
              dangerouslySetInnerHTML={{ __html: normalizeContent(post.content) }}
            />
          ) : (
            <p className="font-dm-sans text-charcoal-600 leading-relaxed">
              This blog post has no content available.
            </p>
          )}

          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gold-100">
              <div className="flex flex-wrap items-center gap-3">
                <Tag size={14} className="text-gold-400" />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gold-50 text-gold-600 font-dm-sans text-xs border border-gold-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-charcoal-900 text-center">
        <p className="section-label text-gold mb-3">Start Your Journey</p>

        <h2 className="font-cormorant text-4xl text-white mb-4">
          Ready to Plan Your Wedding?
        </h2>

        <p className="font-dm-sans text-white/60 max-w-md mx-auto mb-8">
          Let our team bring your vision to life with the same care and creativity you've just read about.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact" className="btn-gold !text-white hover:!text-white">
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
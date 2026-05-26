import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, Calendar, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=85'

const STATIC_PORTFOLIOS = {
  'lake-palace-extravaganza': {
    title: 'Lake Palace Extravaganza', description: 'A grand palace wedding blending Rajput heritage with contemporary luxury. Set against the shimmering waters of Lake Pichola, every moment was an artwork.',
    content: '<p>This extraordinary wedding unfolded over three magical days at the iconic Oberoi Udaivilas. The couple envisioned a celebration that honored their Rajasthani roots while embracing modern elegance — and that is exactly what we delivered.</p><p>The mandap was constructed using hand-carved white marble pillars draped in 10,000 fresh marigolds and jasmine strings. The evening reception transformed the lakeside lawns into a golden wonderland of diyas, lanterns, and floating flower arrangements on the lake itself.</p><h2>Key Highlights</h2><p>The sangeet night featured a custom-designed stage backdrop with 2,000 individually hand-folded origami cranes in ivory and gold. The mehendi function in the royal garden was styled with Rajasthani folk art motifs and colourful tents.</p>',
    venue: 'The Oberoi Udaivilas', location: 'Udaipur, Rajasthan', eventDate: '2024-12-15',
    style: ['Royal', 'Traditional'], venueType: 'Palace Hotel',
    featuredImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&q=85',
    images: [
      { url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80', alt: 'Ceremony setup' },
      { url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80', alt: 'Reception' },
      { url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&q=80', alt: 'Mandap decor' },
    ],
    metaTitle: 'Lake Palace Extravaganza Portfolio | Wedding Gurukul',
    metaDescription: 'A royal Udaipur palace wedding crafted by Wedding Gurukul at The Oberoi Udaivilas.',
  },
}

async function getPortfolio(slug) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/portfolio/${slug}`, { next: { revalidate: 60 } })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export async function generateMetadata({ params }) {
  const item = await getPortfolio(params.slug) || STATIC_PORTFOLIOS[params.slug]
  if (!item) return { title: 'Portfolio Not Found' }
  return {
    title: item.metaTitle || item.title + ' | Wedding Gurukul',
    description: item.metaDescription || item.description,
    openGraph: { title: item.title, description: item.description, images: [{ url: item.featuredImage || FALLBACK_IMG }] },
  }
}

export default async function PortfolioDetailPage({ params }) {
  const item = await getPortfolio(params.slug) || STATIC_PORTFOLIOS[params.slug]
  if (!item) notFound()

  function formatDate(d) {
    if (!d) return ''
    return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  return (
    <>
      {/* Hero */}
      <section className="relative h-[65vh] min-h-[440px] overflow-hidden">
        <Image src={item.featuredImage || FALLBACK_IMG} alt={item.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/20 via-charcoal-900/30 to-charcoal-900/85" />
        <div className="relative z-10 h-full flex items-end pb-16 px-6">
          <div className="max-w-7xl mx-auto w-full">
            <nav className="flex items-center gap-2 font-dm-sans text-xs text-white/50 mb-5">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <span>/</span>
              <Link href="/portfolio" className="hover:text-gold transition-colors">Portfolio</Link>
              <span>/</span>
              <span className="text-white/70">{item.title}</span>
            </nav>
            <div className="flex flex-wrap gap-2 mb-4">
              {(Array.isArray(item.style) ? item.style : [item.style]).map(s => (
                <span key={s} className="bg-gold-500 text-white font-dm-sans text-xs px-3 py-1 tracking-widest uppercase">{s}</span>
              ))}
            </div>
            <h1 className="font-cormorant text-4xl lg:text-6xl text-white mb-4">{item.title}</h1>
            <div className="flex flex-wrap items-center gap-5 text-white/70 font-dm-sans text-sm">
              <span className="flex items-center gap-2"><MapPin size={14} /> {item.venue} · {item.location}</span>
              {item.eventDate && <span className="flex items-center gap-2"><Calendar size={14} /> {formatDate(item.eventDate)}</span>}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding px-6 bg-cream-50">
        <div className="max-w-7xl mx-auto">
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-gold-500 font-dm-sans text-sm mb-10 hover:text-gold-600 transition-colors">
            <ArrowLeft size={14} /> Back to Portfolio
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
                {item.description ? (
                <p className="font-cormorant text-2xl text-charcoal-700 italic leading-relaxed mb-8 border-l-4 border-gold-400 pl-5">{item.description}</p>
              ) : null}
              {item.content ? <div className="prose-luxury" dangerouslySetInnerHTML={{ __html: item.content }} /> : null}

              {/* Gallery grid */}
              {item.images && item.images.length > 0 && (
                <div className="mt-10">
                  <h2 className="font-cormorant text-2xl text-charcoal-900 mb-6">Gallery</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {item.images.map((img, i) => (
                      <div key={i} className={`relative overflow-hidden rounded-sm ${i === 0 ? 'col-span-2 aspect-video' : 'aspect-square'}`}>
                        <Image src={img.url} alt={img.alt || item.title} fill className="object-cover hover:scale-105 transition-transform duration-500" sizes="500px" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-white shadow-card p-8 sticky top-28">
                <h3 className="font-cormorant text-2xl text-charcoal-900 mb-6">Wedding Details</h3>
                <div className="space-y-4 mb-8">
                  {item.venue ? <div className="flex gap-3"><span className="font-dm-sans text-xs text-charcoal-400 uppercase tracking-wider w-20 shrink-0 pt-0.5">Venue</span><span className="font-dm-sans text-sm text-charcoal-700">{item.venue}</span></div> : null}
                  {item.location ? <div className="flex gap-3"><span className="font-dm-sans text-xs text-charcoal-400 uppercase tracking-wider w-20 shrink-0 pt-0.5">Location</span><span className="font-dm-sans text-sm text-charcoal-700">{item.location}</span></div> : null}
                  {item.eventDate && <div className="flex gap-3"><span className="font-dm-sans text-xs text-charcoal-400 uppercase tracking-wider w-20 shrink-0 pt-0.5">Date</span><span className="font-dm-sans text-sm text-charcoal-700">{formatDate(item.eventDate)}</span></div>}
                  {item.venueType ? <div className="flex gap-3"><span className="font-dm-sans text-xs text-charcoal-400 uppercase tracking-wider w-20 shrink-0 pt-0.5">Type</span><span className="font-dm-sans text-sm text-charcoal-700">{item.venueType}</span></div> : null}
                  {item.style && Array.isArray(item.style) && item.style.length > 0 ? <div className="flex gap-3"><span className="font-dm-sans text-xs text-charcoal-400 uppercase tracking-wider w-20 shrink-0 pt-0.5">Style</span><span className="font-dm-sans text-sm text-charcoal-700">{item.style.join(', ')}</span></div> : null}
                </div>
                <div className="border-t border-gold-100 pt-6 space-y-3">
                  <Link href="/contact" className="btn-gold w-full justify-center text-sm">Plan a Similar Wedding <ArrowRight size={14} /></Link>
                  <Link href="/portfolio" className="btn-outline-gold w-full justify-center text-sm">View More Work</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-charcoal-900 text-center">
        <h2 className="font-cormorant text-4xl text-white mb-4">Inspired by What You See?</h2>
        <p className="font-dm-sans text-white/60 max-w-md mx-auto mb-8">Let us craft a celebration that's uniquely yours. Contact our team to begin your journey.</p>
        <Link href="/contact" className="btn-gold">Book a Consultation <ArrowRight size={16} /></Link>
      </section>
    </>
  )
}

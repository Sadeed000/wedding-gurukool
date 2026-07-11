import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  MapPin,
  Users,
  Phone,
  Mail,
  CheckCircle,
  Star,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react'

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

async function getVenue(slug) {
  try {
    const baseUrl = 'https://weddinggurukul.com'

    const res = await fetch(`${baseUrl}/api/venues/${slug}`, {
      cache: 'no-store',
    })

    if (!res.ok) return null

    const data = await res.json()
    return data.venue || data
  } catch (error) {
    console.error('Venue fetch error:', error)
    return null
  }
}

export async function generateMetadata({ params }) {
  const venue = await getVenue(params.slug)

  if (!venue) {
    return {
      title: 'Venue Not Found | Wedding Gurukul',
      description: 'Venue not found.',
    }
  }

  const ogImage = getImageSrc(venue.featuredImage)

  return {
    title: venue.metaTitle || `${venue.name} Wedding Venue | Wedding Gurukul`,
    description: venue.metaDescription || venue.description || '',
    openGraph: {
      title: venue.name,
      description: venue.description || '',
      images: ogImage ? [{ url: ogImage }] : [],
    },
  }
}

export default async function VenueDetailPage({ params }) {
  const venue = await getVenue(params.slug)

  if (!venue) notFound()

  const heroImage = getImageSrc(venue.featuredImage)
  const galleryImages = Array.isArray(venue.images)
    ? venue.images.filter((img) => getImageSrc(img?.url))
    : []

  const marqueeImages = [
    ...galleryImages,
    ...galleryImages,
    ...galleryImages,
    ...galleryImages,
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative h-[65vh] min-h-[640px] overflow-hidden bg-charcoal-900">
        {heroImage ? (
          <Image
            src={heroImage}
            alt={venue.name || 'Venue'}
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

        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/20 to-charcoal-900/80" />

        <div className="relative z-10 h-full flex items-end pb-16 px-6">
          <div className="max-w-7xl mx-auto w-full">
            <nav className="flex items-center gap-2 font-dm-sans text-xs text-white/50 mb-5">
              <Link href="/" className="hover:text-gold transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/venues" className="hover:text-gold transition-colors">
                Venues
              </Link>
              <span>/</span>
              <span className="text-white/70">{venue.name}</span>
            </nav>

            {venue.venueType && (
              <span className="inline-block px-3 py-1 bg-gold-500/20 border border-gold-400/50 text-gold-300 font-dm-sans text-xs tracking-widest uppercase mb-4">
                {venue.venueType}
              </span>
            )}

            <h1 className="font-cormorant text-5xl lg:text-7xl text-white mb-4">
              {venue.name}
            </h1>

            <div className="flex flex-wrap items-center gap-5 text-white/70 font-dm-sans text-sm">
              <span className="flex items-center gap-2">
                <MapPin size={14} /> {venue.city}, {venue.state}
              </span>

              <span className="flex items-center gap-2">
                <Users size={14} /> {venue.capacity?.min || 50}–
                {venue.capacity?.max || 500} guests
              </span>

              {venue.priceRange && (
                <span className="bg-gold-500/20 border border-gold-400/30 text-gold-300 px-3 py-1 text-xs">
                  {venue.priceRange}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Gallery thumbnails */}
        {galleryImages.length > 0 && (
          <div className="absolute bottom-6 right-6 flex gap-2 z-10">
            {galleryImages.slice(0, 3).map((img, i) => (
              <div
                key={`${img.url}-${i}`}
                className="w-16 h-12 relative overflow-hidden border-2 border-white/30 hover:border-gold transition-colors"
              >
                <Image
                  src={getImageSrc(img.url)}
                  alt={img.alt || venue.name || 'Venue'}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="64px"
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Main content */}
      <section className="section-padding px-6 bg-cream-50">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/venues"
            className="inline-flex items-center gap-2 text-gold-500 font-dm-sans text-sm mb-10 hover:text-gold-600 transition-colors"
          >
            <ArrowLeft size={14} /> All Venues
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              {venue.description && (
                <div>
                  <h2 className="font-cormorant text-3xl text-charcoal-900 mb-4">
                    About the Venue
                  </h2>
                  <p className="font-dm-sans text-charcoal-600 leading-relaxed text-lg">
                    {venue.description}
                  </p>
                </div>
              )}

              {venue.highlights?.length > 0 && (
                <div>
                  <h2 className="font-cormorant text-2xl text-charcoal-900 mb-5">
                    Venue Highlights
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {venue.highlights.map((highlight) => (
                      <div
                        key={highlight}
                        className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-card"
                      >
                        <Star size={15} className="text-gold-400 shrink-0" />
                        <span className="font-dm-sans text-sm text-charcoal-700">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {venue.whyChoose?.length > 0 && (
                <div>
                  <h2 className="font-cormorant text-2xl text-charcoal-900 mb-5">
                    Why Choose This Venue
                  </h2>
                  <div className="space-y-3">
                    {venue.whyChoose.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <CheckCircle
                          size={16}
                          className="text-gold-500 shrink-0 mt-0.5"
                        />
                        <span className="font-dm-sans text-sm text-charcoal-600">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {venue.amenities?.length > 0 && (
                <div>
                  <h2 className="font-cormorant text-2xl text-charcoal-900 mb-5">
                    Amenities
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {venue.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="bg-white border border-gold-100 text-charcoal-600 font-dm-sans text-sm px-4 py-2"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-4">
                {venue.indoorAvailable && (
                  <div className="flex items-center gap-2 bg-white px-5 py-3 shadow-card">
                    <CheckCircle size={16} className="text-gold-500" />
                    <span className="font-dm-sans text-sm text-charcoal-700">
                      Indoor Available
                    </span>
                  </div>
                )}

                {venue.outdoorAvailable && (
                  <div className="flex items-center gap-2 bg-white px-5 py-3 shadow-card">
                    <CheckCircle size={16} className="text-gold-500" />
                    <span className="font-dm-sans text-sm text-charcoal-700">
                      Outdoor Available
                    </span>
                  </div>
                )}
              </div>

              {venue.nearbyAttractions?.length > 0 && (
                <div>
                  <h2 className="font-cormorant text-2xl text-charcoal-900 mb-5">
                    Nearby Attractions
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {venue.nearbyAttractions.map((item) => (
                      <span
                        key={item}
                        className="flex items-center gap-2 bg-cream-100 border border-cream-300 text-charcoal-600 font-dm-sans text-sm px-4 py-2"
                      >
                        <MapPin size={12} className="text-gold-400" /> {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Enquiry Sidebar */}
            <div>
              <div className="bg-white shadow-luxury p-8 sticky top-28">
                <h3 className="font-cormorant text-2xl text-charcoal-900 mb-2">
                  Plan Your Wedding Here
                </h3>
                <p className="font-dm-sans text-charcoal-500 text-sm mb-7">
                  Get a personalised quote from our venue specialists.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex justify-between py-3 border-b border-gold-50">
                    <span className="font-dm-sans text-xs text-charcoal-400 uppercase tracking-wider">
                      Capacity
                    </span>
                    <span className="font-dm-sans text-sm text-charcoal-700 font-medium">
                      {venue.capacity?.min || 50}–{venue.capacity?.max || 500} guests
                    </span>
                  </div>

                  {venue.priceRange && (
                    <div className="flex justify-between py-3 border-b border-gold-50">
                      <span className="font-dm-sans text-xs text-charcoal-400 uppercase tracking-wider">
                        Price Range
                      </span>
                      <span className="font-dm-sans text-sm text-gold-600 font-medium">
                        {venue.priceRange}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between py-3 border-b border-gold-50">
                    <span className="font-dm-sans text-xs text-charcoal-400 uppercase tracking-wider">
                      Location
                    </span>
                    <span className="font-dm-sans text-sm text-charcoal-700">
                      {venue.city}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/contact?venue=${encodeURIComponent(venue.name)}`}
                  className="btn-gold w-full justify-center mb-4"
                >
                  Request a Quote <ArrowRight size={15} />
                </Link>

                <Link href="/contact" className="btn-outline-gold w-full justify-center text-sm">
                  Book a Site Visit
                </Link>

                <div className="mt-7 pt-7 border-t border-gold-100 space-y-3">
                  <a
                    href="tel:+919782667589"
                    className="flex items-center gap-3 text-charcoal-600 hover:text-gold-500 transition-colors font-dm-sans text-sm"
                  >
                    <Phone size={15} className="text-gold-400" /> +91 9782667589
                  </a>

                  <a
                    href="mailto:weddinggurukuljpr@gmail.com"
                    className="flex items-center gap-3 text-charcoal-600 hover:text-gold-500 transition-colors font-dm-sans text-sm"
                  >
                    <Mail size={15} className="text-gold-400" /> weddinggurukuljpr@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {galleryImages.length > 0 && (
            <div className="mt-16 w-full overflow-hidden">
              <h2 className="font-cormorant text-3xl text-charcoal-900 mb-6">
                Gallery
              </h2>

              <div className="relative -mx-6 overflow-hidden px-6">
                <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-cream-50 to-transparent" />
                <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-cream-50 to-transparent" />

                <div className="venue-gallery-marquee flex w-max gap-6">
                  {marqueeImages.map((img, i) => (
                    <div
                      key={`${img.url}-${i}`}
                      className="relative h-72 w-[78vw] shrink-0 overflow-hidden bg-cream-100 shadow-lg sm:w-[44vw] lg:h-80 lg:w-[31rem]"
                    >
                      <Image
                        src={getImageSrc(img.url)}
                        alt={img.alt || venue.name}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-700 hover:scale-105"
                        sizes="(max-width: 640px) 78vw, (max-width: 1024px) 44vw, 31rem"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-charcoal-900 text-center">
        <h2 className="font-cormorant text-4xl text-white mb-4">
          Ready to Create Magic at {venue.name}?
        </h2>

        <p className="font-dm-sans text-white/60 max-w-md mx-auto mb-8">
          Let our team of venue specialists and wedding planners craft your perfect celebration.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact" className="btn-gold">
            Book Consultation <ArrowRight size={16} />
          </Link>

          <Link
            href="/portfolio"
            className="border border-white/30 text-white px-8 py-3 font-dm-sans text-sm hover:bg-white/5 transition-colors"
          >
            View Our Work
          </Link>
        </div>
      </section>
    </>
  )
}
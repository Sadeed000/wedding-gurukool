import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Award, Heart, Users, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Who We Are',
  description: 'Meet the passionate team behind Wedding Gurukuls — 18+ years crafting spectacular celebrations across India with creativity, elegance and meticulous attention to detail.',
}

const teamMembers = [
  {
    name: 'Mrs. Mandeep Agarwal',
    role: 'Founder & Creative Director',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
    bio: 'With over 18 years in luxury event management, Mrs. Agarwal brings an unparalleled artistic sensibility to every celebration. Her innate sense of beauty and deep understanding of cultural nuances has made Wedding Gurukuls synonymous with excellence.',
  },
  {
    name: 'Mr. Himish Agarwal',
    role: 'CEO & Operations Director',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80',
    bio: 'Mr. Agarwal oversees the seamless execution of every event, ensuring that the team\'s creative vision is flawlessly delivered. His meticulous planning and vendor relationships across India and beyond ensure every celebration runs perfectly.',
  },
  {
    name: 'Priya Sharma',
    role: 'Lead Decor Designer',
    image: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=600&q=80',
    bio: 'Priya\'s eye for color, texture, and spatial design transforms venues into breathtaking tableaux. From intimate ceremonies to grand ballroom galas, her design language is both timeless and contemporary.',
  },
  {
    name: 'Rahul Khanna',
    role: 'Destination Wedding Specialist',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    bio: 'With experience coordinating weddings at over 50 luxury properties across India and internationally, Rahul\'s expertise in logistics and local partnerships makes destination dreams a smooth reality.',
  },
]

const values = [
  { icon: Heart, title: 'Passion', desc: 'Every celebration is personal. We pour our hearts into making your story extraordinary.' },
  { icon: Award, title: 'Excellence', desc: '18+ years of delivering nothing short of perfection at every milestone.' },
  { icon: Users, title: 'Partnership', desc: 'We listen, collaborate, and guide — your vision is always at the center.' },
  { icon: Globe, title: 'Reach', desc: '200+ destinations, one consistent promise: spectacular, seamless celebrations.' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
<section className="relative w-screen h-[60vh] min-h-[430px] overflow-hidden left-1/2 -translate-x-1/2">
  <Image
    src="https://images.unsplash.com/photo-1744891470493-44321ef136a2?q=90&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0"
    alt="Wedding Gurukul team"
    fill
    priority
    quality={90}
    sizes="100vw"
    className="object-cover object-center"
  />

  <div className="absolute inset-0 bg-charcoal-900/60" />

  <div className="relative z-10 h-full flex items-end px-6 pb-20 pt-28 md:pt-32">
    <div className="max-w-7xl mx-auto w-full">
      <span className="section-label text-gold-400">Our Story</span>

      <h1 className="font-cormorant text-5xl lg:text-7xl text-white mt-3">
        Who We Are
      </h1>
    </div>
  </div>
</section>
      {/* Mission */}
      <section className="section-padding px-6 bg-cream-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="section-label">Our Mission</span>
            <div className="gold-divider justify-start my-4"><span className="ornament">✦</span></div>
            <h2 className="font-cormorant text-4xl lg:text-5xl text-charcoal-900 mt-4 mb-6">
              Turning Visions Into<br />
              <em className="text-gold-500">Timeless Memories</em>
            </h2>
            <p className="font-dm-sans text-charcoal-600 leading-relaxed mb-4">
              Founded in 2006 by Mrs. Mandeep Agarwal, Wedding Gurukuls began with a single, unwavering belief: that every couple deserves a celebration as unique and beautiful as their love story.
            </p>
            <p className="font-dm-sans text-charcoal-600 leading-relaxed mb-4">
              What started as a boutique decor studio in Jaipur has grown into one of India's most celebrated luxury wedding management companies, with a portfolio spanning 550+ weddings across 200+ destinations — from the shimmering lakes of Udaipur to the golden beaches of Goa.
            </p>
            <p className="font-dm-sans text-charcoal-600 leading-relaxed mb-8">
              Our philosophy is simple: listen deeply, create boldly, execute flawlessly. We don't just manage events — we craft experiences that live in the hearts of every guest, forever.
            </p>
            <Link href="/contact" className="btn-gold">
              Start Your Journey <ArrowRight size={16} />
            </Link>
          </div>

          <div className="relative">
            <div className="relative h-[500px]">
              <Image
                src="/static-image/about2.webp"
                alt="Wedding Gurukuls work"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-gold-500 text-white p-8 shadow-gold-lg">
              <p className="font-cormorant text-5xl font-bold">18+</p>
              <p className="font-dm-sans text-sm tracking-widest uppercase">Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding px-6 bg-charcoal-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="section-label text-gold-400">What Drives Us</span>
            <h2 className="font-cormorant text-4xl lg:text-5xl text-white mt-4">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group p-8 border border-white/10 hover:border-gold-400 transition-all duration-300 hover:-translate-y-2 text-center">
                <div className="w-14 h-14 mx-auto flex items-center justify-center border border-gold-400/40 mb-6 group-hover:bg-gold-400 transition-colors">
                  <Icon size={22} className="text-gold-400 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-cormorant text-xl text-white mb-3">{title}</h3>
                <p className="font-dm-sans text-sm text-white/50 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding px-6 bg-cream-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="section-label">The People Behind the Magic</span>
            <div className="gold-divider my-4"><span className="ornament">✦</span></div>
            <h2 className="font-cormorant text-4xl lg:text-5xl text-charcoal-900 mt-4">
              Meet Our <em className="text-gold-500">Leadership Team</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="group card-hover">
                <div className="relative h-72 overflow-hidden mb-5">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-2">
                  <h3 className="font-cormorant text-xl text-charcoal-900 mb-1">{member.name}</h3>
                  <p className="font-dm-sans text-xs text-gold-500 tracking-wider uppercase mb-3">{member.role}</p>
                  <p className="font-dm-sans text-sm text-charcoal-600 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats banner */}
      <section className="bg-gold-500 py-14 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { n: '550+', l: 'Weddings Celebrated' },
            { n: '200+', l: 'Destinations' },
            { n: '18+', l: 'Years Experience' },
            { n: '50+', l: 'Venue Partners' },
          ].map(({ n, l }) => (
            <div key={l}>
              <p className="font-cormorant text-5xl font-bold text-white">{n}</p>
              <p className="font-dm-sans text-xs tracking-[0.2em] uppercase text-white/70 mt-1">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-cream-50 text-center">
        <span className="section-label">Begin Your Story</span>
        <h2 className="font-cormorant text-4xl lg:text-5xl text-charcoal-900 mt-4 mb-6">
          Ready to Start Planning?
        </h2>
        <p className="font-dm-sans text-charcoal-600 max-w-md mx-auto mb-8">
          Reach out and let's begin crafting your perfect celebration together.
        </p>
        <Link href="/contact" className="btn-gold">Book a Consultation <ArrowRight size={16} /></Link>
      </section>
    </>
  )
}

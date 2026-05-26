'use client'
import { Trophy, Star, Award, Medal } from 'lucide-react'

const awards = [
  {
    icon: Trophy,
    title: 'Best Wedding Planner',
    body: 'Wedding Industry Awards India',
    year: '2024',
  },
  {
    icon: Star,
    title: 'Top 10 Event Companies',
    body: 'Rajasthan Business Excellence',
    year: '2023',
  },
  {
    icon: Award,
    title: 'Luxury Wedding Brand',
    body: 'India Luxury Summit',
    year: '2022',
  },
  {
    icon: Medal,
    title: 'Customer Excellence',
    body: 'WeddingWire Couple Choice',
    year: '2024',
  },
]

const partners = [
  'The Oberoi Group', 'Taj Hotels', 'ITC Hotels', 'RAAS Hotels', 'Suján Luxury', 'Aman Resorts',
]

export default function AwardsSection() {
  return (
    <section className="section-padding px-6 bg-cream-50">
      <div className="max-w-7xl mx-auto">
        {/* Awards row */}
        <div className="text-center mb-14">
          <span className="section-label">Recognition</span>
          <div className="gold-divider my-4">
            <span className="ornament">✦</span>
          </div>
          <h2 className="font-cormorant text-4xl lg:text-5xl text-charcoal-900 mt-4 mb-4">
            Recognised for<br />
            <em className="text-gold-500">Excellence in Weddings</em>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {awards.map(({ icon: Icon, title, body, year }) => (
            <div
              key={title}
              className="bg-white border border-gold-100 p-7 text-center group hover:border-gold-400 hover:shadow-luxury transition-all duration-400 hover:-translate-y-1"
            >
              <div className="w-14 h-14 mx-auto flex items-center justify-center bg-gold-50 group-hover:bg-gold-500 transition-colors duration-300 mb-5">
                <Icon size={24} className="text-gold-500 group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="font-cormorant text-xl text-charcoal-900 mb-2">{title}</div>
              <div className="font-dm-sans text-xs text-charcoal-500 mb-2">{body}</div>
              <div className="font-dm-sans text-xs font-bold text-gold-500">{year}</div>
            </div>
          ))}
        </div>

        {/* Partners strip */}
        <div className="border-t border-gold-100 pt-12">
          <p className="text-center font-dm-sans text-xs text-charcoal-400 uppercase tracking-widest mb-8">
            Trusted by India's finest hospitality brands
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {partners.map(partner => (
              <span key={partner} className="font-cormorant text-xl text-charcoal-400 hover:text-gold-500 transition-colors cursor-default">
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

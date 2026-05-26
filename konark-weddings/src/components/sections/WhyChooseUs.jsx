'use client'
import { Award, Heart, Globe, Users, Star, Shield } from 'lucide-react'

const reasons = [
  { icon: Award, title: '18+ Years of Excellence', desc: "Nearly two decades crafting India's most iconic weddings — our experience and execution are unmatched." },
  { icon: Heart, title: 'Deeply Personal Approach', desc: 'We listen first. Every wedding is built around your unique love story, personality and vision.' },
  { icon: Globe, title: '200+ Destinations', desc: "From Rajasthan's palaces to Goa's beaches — we orchestrate dream weddings all across India." },
  { icon: Users, title: 'Full-Service In-House Team', desc: 'Designers, florists, coordinators, logistics — one team, one seamless experience from start to finish.' },
  { icon: Star, title: '550+ Celebrations', desc: 'A legacy of spectacular celebrations, each one a testament to our passion for perfection and detail.' },
  { icon: Shield, title: 'Trusted by Top Families', desc: 'Families of distinction choose Wedding Gurukul for our discretion, expertise, and flawless execution.' },
]

export default function WhyChooseUs() {
  return (
    <section className="section-padding px-6 bg-charcoal-900 relative overflow-hidden">
      {/* Subtle grid bg */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(to right, #c9922a 1px, transparent 1px), linear-gradient(to bottom, #c9922a 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <span className="section-label text-gold-400">Why Choose Us</span>
          <div className="gold-divider my-4">
            <span className="ornament text-gold-400">✦</span>
          </div>
          <h2 className="font-cormorant text-4xl lg:text-5xl xl:text-6xl text-white mt-4 mb-4">
            Crafting Legends,<br />
            <em className="text-gold-400">One Wedding at a Time</em>
          </h2>
          <p className="font-dm-sans text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
            We don't just plan weddings. We craft experiences that stay with your guests for a lifetime.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group p-7 border border-white/6 hover:border-gold-500/40 bg-white/2 hover:bg-white/5 transition-all duration-400 cursor-default"
            >
              <div className="w-13 h-13 w-12 h-12 flex items-center justify-center border border-gold-500/30 mb-6 group-hover:bg-gold-500 group-hover:border-gold-500 transition-all duration-300">
                <Icon size={22} className="text-gold-400 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-cormorant text-xl text-white mb-3">{title}</h3>
              <p className="font-dm-sans text-sm text-white/50 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

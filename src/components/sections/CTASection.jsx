'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Phone, CalendarCheck, MessageCircle } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="relative min-h-[400px] lg:min-h-[580px] overflow-hidden flex items-center">
      <Image
        src="https://images.unsplash.com/photo-1651667772985-04c34f3ef853?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Luxury wedding celebration"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/96 via-charcoal-900/75 to-charcoal-900/30" />

      {/* Decorative diagonal lines */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #c9922a 0px, #c9922a 1px, transparent 1px, transparent 40px)' }} />

      <div className="relative z-10 w-full px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <span className="section-label text-gold-400">Begin Your Journey</span>
            <div className="gold-divider justify-start my-5">
              <span className="ornament text-gold-400">✦</span>
            </div>
            <h2 className="font-cormorant text-5xl lg:text-6xl xl:text-7xl text-white mt-4 mb-6 leading-tight">
              Let's Create Your<br />
              <em className="text-gold-300">Dream Wedding</em>
            </h2>
            <p className="font-dm-sans text-white/65 text-base lg:text-lg mb-10 max-w-lg leading-relaxed">
              Your love story deserves a celebration as spectacular as the two of you. Our team is ready to craft your perfect day — from concept to the last dance.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4 mb-8">
              <Link
                href="/contact"
                className="group flex items-center gap-2 bg-gold-500 text-white px-8 py-4 font-dm-sans font-semibold text-sm tracking-wide hover:bg-gold-400 transition-colors shadow-gold-lg"
              >
                <CalendarCheck size={16} />
                Book Free Consultation
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+919782667589"
                className="flex items-center gap-2 border border-white/40 text-white px-8 py-4 font-dm-sans font-semibold text-sm tracking-wide hover:bg-white hover:text-charcoal-900 transition-all duration-300"
              >
                <Phone size={15} /> +91 9782667589
              </a>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 text-white/40 font-dm-sans text-xs">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                Free initial consultation
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                No hidden charges
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                11+ years of trust
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

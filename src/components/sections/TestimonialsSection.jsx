'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    name: 'Priya & Rahul Sharma',
    location: 'Delhi',
    rating: 5,
    text: "Wedding Gurukul turned our dream Udaipur wedding into pure magic. Every single detail was perfect — the florals, the lighting, the coordination. Our guests are still talking about it months later.",
    event: 'Udaipur Palace Wedding',
    image: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=100&q=80',
  },
  {
    name: 'Ananya & Vikram Mehta',
    location: 'Mumbai',
    rating: 5,
    text: "The team was incredibly professional and deeply creative. Our Jaipur heritage wedding felt like stepping into a royal fairy tale. The mandap alone deserved an award.",
    event: 'Jaipur Heritage Wedding',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80',
  },
  {
    name: 'Riya & Arjun Kapoor',
    location: 'Bangalore',
    rating: 5,
    text: "From our mehendi to the reception — every function was crafted with love. The attention to detail, the warmth of the team, and flawless execution made our Goa wedding absolutely magical.",
    event: 'Goa Beach Wedding',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
  },
  {
    name: 'Simran & Dev Malhotra',
    location: 'Chandigarh',
    rating: 5,
    text: "We trusted Wedding Gurukul completely and they exceeded every single expectation. 400 guests, three venues, one seamless experience. I would choose them a thousand times over.",
    event: 'Shimla Mountain Wedding',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80',
  },
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)

  const go = (dir) => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      setCurrent(p => (p + dir + testimonials.length) % testimonials.length)
      setAnimating(false)
    }, 300)
  }

  useEffect(() => {
    const t = setInterval(() => go(1), 6000)
    return () => clearInterval(t)
  }, [])

  const t = testimonials[current]

  return (
    <section className="section-padding px-6 bg-charcoal-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(45deg, #c9922a 1px, transparent 1px), linear-gradient(-45deg, #c9922a 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="section-label text-gold-400">Testimonials</span>
          <div className="gold-divider my-4">
            <span className="ornament text-gold-400">✦</span>
          </div>
          <h2 className="font-cormorant text-4xl lg:text-5xl text-white mt-4">
            Words from Our<br />
            <em className="text-gold-400">Beloved Couples</em>
          </h2>
        </div>

        {/* Card */}
        <div
          className="bg-white/5 border border-white/8 backdrop-blur-sm p-10 lg:p-14 text-center transition-all duration-300"
          style={{ opacity: animating ? 0 : 1, transform: animating ? 'translateY(10px)' : 'translateY(0)' }}
        >
          <Quote size={42} className="text-gold-400/40 mx-auto mb-6" />

          <div className="flex justify-center mb-5 gap-1">
            {Array(t.rating).fill(0).map((_, i) => (
              <Star key={i} size={16} className="text-gold-400 fill-gold-400" />
            ))}
          </div>

          <blockquote className="font-cormorant text-2xl lg:text-3xl text-white/90 italic leading-relaxed mb-8 max-w-3xl mx-auto">
            "{t.text}"
          </blockquote>

          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gold-400/30">
              <Image src={t.image} alt={t.name} width={48} height={48} className="object-cover" />
            </div>
            <div className="text-left">
              <p className="font-dm-sans font-semibold text-white text-sm">{t.name}</p>
              <p className="font-dm-sans text-xs text-gold-400 mt-0.5">{t.event} · {t.location}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => go(-1)}
            className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:border-gold-400 hover:text-gold-400 transition-all"
          >
            <ChevronLeft size={18} />
          </button>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${i === current ? 'w-8 h-2 bg-gold-400' : 'w-2 h-2 bg-white/20 hover:bg-white/40'}`}
            />
          ))}
          <button
            onClick={() => go(1)}
            className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:border-gold-400 hover:text-gold-400 transition-all"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}

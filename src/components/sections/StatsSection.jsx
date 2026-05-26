'use client'
import { useEffect, useState, useRef } from 'react'

const stats = [
  { number: 18, suffix: '+', label: 'Years of Excellence', desc: 'Crafting perfection since 2006' },
  { number: 550, suffix: '+', label: 'Weddings Crafted', desc: 'Each one a unique masterpiece' },
  { number: 200, suffix: '+', label: 'Destinations', desc: 'Across all of India' },
  { number: 50, suffix: '+', label: 'Trusted Venues', desc: 'Handpicked & vetted by us' },
]

function Counter({ target, suffix, duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = Date.now()
        const tick = () => {
          const elapsed = Date.now() - start
          const progress = Math.min(elapsed / duration, 1)
          const ease = 1 - Math.pow(1 - progress, 3)
          setCount(Math.floor(ease * target))
          if (progress < 1) requestAnimationFrame(tick)
          else setCount(target)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.3 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  )
}

export default function StatsSection() {
  return (
    <section className="bg-gold-500 py-14 px-6 relative overflow-hidden">
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/20">
          {stats.map(({ number, suffix, label, desc }) => (
            <div key={label} className="text-center lg:px-8">
              <div className="font-cormorant text-5xl lg:text-6xl xl:text-7xl text-white font-bold leading-none mb-2">
                <Counter target={number} suffix={suffix} />
              </div>
              <div className="font-dm-sans text-sm font-semibold text-white tracking-wide mb-1">{label}</div>
              <div className="font-dm-sans text-xs text-white/65">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

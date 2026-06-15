'use client'
import { useEffect, useState } from 'react'
import { List } from 'lucide-react'

export default function TableOfContents({ items = [] }) {
  const [activeId, setActiveId] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!items.length) return
    const headings = items
      .map((it) => document.getElementById(it.id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    )

    headings.forEach((h) => observer.observe(h))
    return () => observer.disconnect()
  }, [items])

  function handleClick(e, id) {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 90
      window.scrollTo({ top: y, behavior: 'smooth' })
      setActiveId(id)
      setOpen(false)
    }
  }

  if (!items.length) return null

  return (
    <nav className="font-dm-sans" aria-label="Table of contents">
      <button
        onClick={() => setOpen((o) => !o)
        }
        className="lg:hidden flex items-center justify-between w-full px-4 py-3 bg-white border border-gold-100 rounded-lg text-sm font-medium text-charcoal-700 mb-3"
      >
        <span className="flex items-center gap-2"><List size={15} className="text-gold-500" /> Table of Contents</span>
        <span className={`transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>

      <div className={`${open ? 'block' : 'hidden'} lg:block bg-white lg:bg-transparent border lg:border-0 border-gold-100 rounded-lg lg:rounded-none p-4 lg:p-0 mb-6 lg:mb-0`}>
        <p className="hidden lg:flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-gold-600 mb-4">
          <List size={14} /> On this page
        </p>
        <ul className="space-y-1 lg:border-l lg:border-gold-100">
          {items.map((it) => (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                onClick={(e) => handleClick(e, it.id)}
                className={`block py-1.5 text-sm leading-snug transition-colors lg:-ml-px lg:border-l-2 lg:pl-4 ${
                  it.level === 3 ? 'lg:pl-7 text-[13px]' : ''
                } ${
                  activeId === it.id
                    ? 'lg:border-gold-500 text-gold-600 font-medium'
                    : 'lg:border-transparent text-charcoal-500 hover:text-gold-600'
                }`}
              >
                {it.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

import Link from 'next/link'
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin, Youtube } from 'lucide-react'

const footerLinks = {
  company: [
    { href: '/about', label: 'Who We Are' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/wedding-wall', label: 'Wedding Wall' },
    { href: '/venues', label: 'Venues Guide' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: "Let's Connect" },
  ],
  services: [
    { href: '/portfolio?style=Royal', label: 'Royal Weddings' },
    { href: '/portfolio?style=Destination', label: 'Destination Weddings' },
    { href: '/portfolio?style=Traditional', label: 'Traditional Ceremonies' },
    { href: '/portfolio?style=Modern', label: 'Modern Celebrations' },
    { href: '/venues', label: 'Venue Selection' },
    { href: '/contact', label: 'Custom Packages' },
  ],
}

const socialLinks = [
  { Icon: Instagram, href: 'https://instagram.com/weddinggurukul', label: 'Instagram' },
  // { Icon: Facebook, href: 'https://facebook.com/weddinggurukul', label: 'Facebook' },
  // { Icon: Linkedin, href: 'https://linkedin.com/company/weddinggurukul', label: 'LinkedIn' },
  // { Icon: Youtube, href: 'https://youtube.com/@weddinggurukul', label: 'YouTube' },
]

export default function Footer() {
  return (
    <footer className="bg-charcoal-900 text-white">
      {/* Top CTA strip */}
      <div className="bg-gold-600 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-cormorant text-xl text-white font-medium text-center sm:text-left">
            Begin your forever. Let us craft your perfect celebration.
          </p>
          <Link
            href="/contact"
            className="flex-shrink-0 px-8 py-3 bg-white text-gold-600 font-dm-sans text-sm font-semibold tracking-widest uppercase hover:bg-cream-100 transition-colors"
          >
            Book Consultation
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <p className="font-cormorant text-3xl font-bold text-white tracking-wide">Wedding Gurukul</p>
              <p className="font-dm-sans text-xs tracking-[0.3em] uppercase text-gold-400 -mt-1">Weddings</p>
            </div>
            <p className="font-dm-sans text-sm text-white/60 leading-relaxed mb-6">
              Crafting spectacular celebrations with 18+ years of expertise and a passion for perfection. Your dream wedding, meticulously brought to life.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center border border-white/20 text-white/60 hover:border-gold-400 hover:text-gold-400 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-dm-sans text-xs font-semibold tracking-[0.25em] uppercase text-gold-400 mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-dm-sans text-sm text-white/60 hover:text-gold-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-dm-sans text-xs font-semibold tracking-[0.25em] uppercase text-gold-400 mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-dm-sans text-sm text-white/60 hover:text-gold-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-dm-sans text-xs font-semibold tracking-[0.25em] uppercase text-gold-400 mb-6">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+917417416461" className="flex items-start gap-3 group">
                  <Phone size={15} className="mt-0.5 text-gold-400 flex-shrink-0" />
                  <span className="font-dm-sans text-sm text-white/60 group-hover:text-gold-400 transition-colors">+91 7417416461</span>
                </a>
              </li>
              <li>
                <a href="mailto:dhakadp992@gmail.com" className="flex items-start gap-3 group">
                  <Mail size={15} className="mt-0.5 text-gold-400 flex-shrink-0" />
                  <span className="font-dm-sans text-sm text-white/60 group-hover:text-gold-400 transition-colors">dhakadp992@gmail.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <MapPin size={15} className="mt-0.5 text-gold-400 flex-shrink-0" />
                  <span className="font-dm-sans text-sm text-white/60">Jaipur, Rajasthan, India</span>
                </div>
              </li>
            </ul>
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="font-dm-sans text-xs text-gold-400 mb-2 tracking-wider uppercase">Office Hours</p>
              <p className="font-dm-sans text-sm text-white/60">Mon – Sat: 10 AM – 7 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 px-6 lg:px-12 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-dm-sans text-xs text-white/40">
            © {new Date().getFullYear()} Wedding Gurukul. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="font-dm-sans text-xs text-white/40 hover:text-gold-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="font-dm-sans text-xs text-white/40 hover:text-gold-400 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

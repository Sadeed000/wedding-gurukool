'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Linkedin,
  Send,
  CheckCircle,
} from 'lucide-react'
import toast from 'react-hot-toast'

type ContactForm = {
  name: string
  email: string
  phone: string
  eventDate: string
  venue: string
  message: string
}

type FieldProps = {
  name: keyof ContactForm
  label: string
  type?: string
  placeholder?: string
  required?: boolean
  as?: 'input' | 'textarea'
  value: string
  error?: string
  onChange: (name: keyof ContactForm, value: string) => void
}

function Field({
  name,
  label,
  type = 'text',
  placeholder,
  required = false,
  as = 'input',
  value,
  error,
  onChange,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="font-dm-sans text-xs font-semibold tracking-wider uppercase text-charcoal-600 mb-2 block"
      >
        {label} {required && <span className="text-gold-500">*</span>}
      </label>

      {as === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          placeholder={placeholder}
          rows={5}
          className={`input-luxury resize-none ${
            error ? 'border-red-300' : ''
          }`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          placeholder={placeholder}
          className={`input-luxury ${error ? 'border-red-300' : ''}`}
        />
      )}

      {error && (
        <p className="font-dm-sans text-xs text-red-400 mt-1">
          {error}
        </p>
      )}
    </div>
  )
}

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    venue: '',
    message: '',
  })

  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (name: keyof ContactForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))

    // remove error while typing
    setErrors((prev) => {
      if (!prev[name]) return prev
      const updated = { ...prev }
      delete updated[name]
      return updated
    })
  }

  const validate = () => {
    const e: Record<string, string> = {}

    if (!form.name.trim()) {
      e.name = 'Name is required'
    }

    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      e.email = 'Valid email required'
    }

    if (!form.phone.match(/^\+?[\d\s\-()]{8,}$/)) {
      e.phone = 'Valid phone number required'
    }

    if (!form.message.trim()) {
      e.message = 'Please include a message'
    }

    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validate()) return

    setLoading(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setSent(true)
        toast.success('Your message has been sent!')

        setForm({
          name: '',
          email: '',
          phone: '',
          eventDate: '',
          venue: '',
          message: '',
        })
      } else {
        toast.error('Something went wrong. Please try again.')
      }
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Hero */}
{/* Hero */}
<section className="relative w-screen h-[45vh] min-h-[360px] overflow-hidden left-1/2 -translate-x-1/2">
  <Image
    src="https://images.unsplash.com/photo-1653821355736-0c2598d0a63e?q=90&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0"
    alt="Contact"
    fill
    priority
    quality={90}
    sizes="100vw"
    className="object-cover object-center"
  />

  <div className="absolute inset-0 bg-charcoal-900/65" />

  <div className="relative z-10 h-full flex items-end pb-16 px-6 pt-28 md:pt-32">
    <div className="max-w-7xl mx-auto w-full">
      <span className="section-label text-gold-400">
        Get In Touch
      </span>

      <h1 className="font-cormorant text-5xl lg:text-7xl text-white mt-3">
        Let's Connect
      </h1>
    </div>
  </div>
</section>
      <section className="section-padding px-6 bg-cream-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Info */}
          <div>
            <span className="section-label">Reach Out</span>

            <div className="gold-divider justify-start my-4">
              <span className="ornament">✦</span>
            </div>

            <h2 className="font-cormorant text-4xl text-charcoal-900 mt-4 mb-6">
              We'd Love to Hear
              <br />
              <em className="text-gold-500">
                About Your Dream Wedding
              </em>
            </h2>

            <p className="font-dm-sans text-charcoal-600 leading-relaxed mb-10">
              Whether you're just beginning to plan or looking to finalize
              specific details, our team is here to guide you. Fill in the form
              or reach out directly — we typically respond within 24 hours.
            </p>

            <div className="space-y-6 mb-10">
              <a href="tel:+917417416461" className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-gold-50 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500 transition-colors">
                  <Phone
                    size={18}
                    className="text-gold-500 group-hover:text-white transition-colors"
                  />
                </div>

                <div>
                  <p className="font-dm-sans text-xs font-semibold tracking-wider uppercase text-charcoal-500 mb-1">
                    Phone
                  </p>
                  <p className="font-cormorant text-xl text-charcoal-900 group-hover:text-gold-500 transition-colors">
                    +91 7417416461
                  </p>
                </div>
              </a>

              <a
                href="mailto:weddinggurukul@gmail.com"
                className="flex items-start gap-4 group"
              >
                <div className="w-12 h-12 bg-gold-50 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500 transition-colors">
                  <Mail
                    size={18}
                    className="text-gold-500 group-hover:text-white transition-colors"
                  />
                </div>

                <div>
                  <p className="font-dm-sans text-xs font-semibold tracking-wider uppercase text-charcoal-500 mb-1">
                    Email
                  </p>
                  <p className="font-cormorant text-xl text-charcoal-900 group-hover:text-gold-500 transition-colors">
                    dhakadp992@gmail.com
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold-50 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-gold-500" />
                </div>

                <div>
                  <p className="font-dm-sans text-xs font-semibold tracking-wider uppercase text-charcoal-500 mb-1">
                    Office
                  </p>
                  <p className="font-cormorant text-xl text-charcoal-900">
                    Jaipur, Rajasthan, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold-50 flex items-center justify-center flex-shrink-0">
                  <Clock size={18} className="text-gold-500" />
                </div>

                <div>
                  <p className="font-dm-sans text-xs font-semibold tracking-wider uppercase text-charcoal-500 mb-1">
                    Office Hours
                  </p>
                  <p className="font-cormorant text-xl text-charcoal-900">
                    Mon – Sat: 10 AM – 7 PM IST
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="font-dm-sans text-xs font-semibold tracking-wider uppercase text-charcoal-500 mb-4">
                Follow Us
              </p>

              <div className="flex items-center gap-3">
                {[
                  { Icon: Instagram, href: '#', label: 'Instagram' },
                  // { Icon: Facebook, href: '#', label: 'Facebook' },
                  // { Icon: Linkedin, href: '#', label: 'LinkedIn' },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-11 h-11 border border-gold-200 flex items-center justify-center text-charcoal-500 hover:border-gold-500 hover:text-gold-500 transition-all"
                  >
                    <Icon size={17} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="bg-white shadow-luxury border border-gold-100 p-8 lg:p-10">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <CheckCircle size={48} className="text-gold-500 mb-6" />

                <h3 className="font-cormorant text-3xl text-charcoal-900 mb-4">
                  Thank You!
                </h3>

                <p className="font-dm-sans text-charcoal-600 max-w-sm">
                  Your enquiry has been received. Our team will get back to you
                  within 24 hours with personalised recommendations.
                </p>
              </div>
            ) : (
              <>
                <h3 className="font-cormorant text-2xl text-charcoal-900 mb-8">
                  Send Us a Message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Field
                      name="name"
                      label="Full Name"
                      placeholder="Your full name"
                      required
                      value={form.name}
                      error={errors.name}
                      onChange={handleChange}
                    />

                    <Field
                      name="email"
                      label="Email Address"
                      type="email"
                      placeholder="your@email.com"
                      required
                      value={form.email}
                      error={errors.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Field
                      name="phone"
                      label="Phone Number"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      required
                      value={form.phone}
                      error={errors.phone}
                      onChange={handleChange}
                    />

                    <Field
                      name="eventDate"
                      label="Tentative Event Date"
                      type="date"
                      value={form.eventDate}
                      error={errors.eventDate}
                      onChange={handleChange}
                    />
                  </div>

                  <Field
                    name="venue"
                    label="Preferred Venue / Destination"
                    placeholder="e.g. Udaipur, Goa, or specific venue"
                    value={form.venue}
                    error={errors.venue}
                    onChange={handleChange}
                  />

                  <Field
                    name="message"
                    label="Your Message"
                    as="textarea"
                    placeholder="Tell us about your dream wedding…"
                    required
                    value={form.message}
                    error={errors.message}
                    onChange={handleChange}
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-gold w-full justify-center relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Sending…
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 relative z-10">
                        Send Enquiry <Send size={15} />
                      </span>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-80 bg-charcoal-200 relative overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d228131.29443898826!2d75.71867!3d26.88511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Wedding Gurukuls Office Location"
        />
      </section>
    </>
  )
}
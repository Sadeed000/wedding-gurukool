'use client'
import { Compass, Palette, Sparkles, CheckCircle } from 'lucide-react'

const steps = [
  {
    icon: Compass,
    step: '01',
    title: 'Discover & Plan',
    description: 'We begin with a deep consultation to understand your vision, preferences, and dreams. Every detail is documented to form the perfect foundation for your celebration.',
  },
  {
    icon: Palette,
    step: '02',
    title: 'Design & Conceptualise',
    description: 'Our creative team develops a bespoke concept — mood boards, colour palettes, floral schemes, and decor themes uniquely tailored to your love story.',
  },
  {
    icon: Sparkles,
    step: '03',
    title: 'Create & Produce',
    description: 'Skilled artisans and curated vendors bring the design to life. From grand mandaps to intimate centrepieces, every element is crafted with precision and passion.',
  },
  {
    icon: CheckCircle,
    step: '04',
    title: 'Execute & Celebrate',
    description: 'On your special day, our team orchestrates every moment flawlessly — so you can be fully present, creating memories that last a lifetime.',
  },
]

export default function ServicesProcess() {
  return (
    <section className="section-padding bg-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="section-label">Our Process</span>
          <div className="gold-divider my-4">
            <span className="ornament">✦</span>
          </div>
          <h2 className="font-cormorant text-4xl lg:text-5xl xl:text-6xl text-charcoal-900 mt-4 mb-5">
            How We Craft Your<br />
            <em className="text-gold-500">Perfect Celebration</em>
          </h2>
          <p className="font-dm-sans text-charcoal-600 max-w-xl mx-auto text-sm leading-relaxed">
            From the first spark of an idea to the last dance of the evening — our meticulous four-stage process ensures every celebration exceeds expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={step.step} className="relative group">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-11 left-[65%] right-0 h-px bg-gradient-to-r from-gold-300 to-transparent z-0" />
                )}
                <div className="relative z-10 p-8 bg-cream-50 border border-gold-100 hover:border-gold-400 transition-all duration-400 hover:shadow-luxury group-hover:-translate-y-2 h-full">
                  {/* Step number */}
                  <span className="font-cormorant text-7xl font-bold text-gold-100 absolute top-3 right-4 select-none group-hover:text-gold-200 transition-colors leading-none">
                    {step.step}
                  </span>

                  {/* Icon */}
                  <div className="w-14 h-14 flex items-center justify-center bg-gold-50 mb-6 group-hover:bg-gold-500 transition-colors duration-300">
                    <Icon size={24} className="text-gold-500 group-hover:text-white transition-colors duration-300" />
                  </div>

                  <h3 className="font-cormorant text-xl text-charcoal-900 mb-3">{step.title}</h3>
                  <p className="font-dm-sans text-sm text-charcoal-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

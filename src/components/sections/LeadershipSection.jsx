'use client'

export default function LeadershipSection() {
  return (
    <section className="section-padding px-6 bg-cream-50 overflow-hidden font-dm-sans">
      <div className="max-w-7xl mx-auto relative">
        {/* Background Flower Pattern */}
        <div className="absolute right-0 top-24 opacity-[0.06] pointer-events-none hidden lg:block">
          <img
            src="/images/floral-bg.png"
            alt=""
            className="w-[680px]"
          />
        </div>

        {/* Heading */}
        <div className="text-center mb-16 relative z-10">
          <span className="section-label">Leadership</span>

          <div className="gold-divider my-4">
            <span className="ornament">✦</span>
          </div>

          <h2 className="font-cormorant text-4xl lg:text-5xl text-charcoal-900 mt-4 ">
            Company Leadership Team<br />
            {/* <em className="text-gold-500 ">Team</em> */}
          </h2>
        </div>

        {/* Founder Content */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10 lg:gap-14 items-start">
          {/* Image */}
          <div className="flex justify-center lg:justify-start">
            {/* <div className="w-44 h-44 lg:w-48 lg:h-48 rounded-full border-2 border-dotted border-gold-400 p-1.5">
              <img
                src="/images/pradeep-dhakad.jpg"
                alt="Pradeep Dhakad"
                className="w-full h-full rounded-full object-cover"
              />
            </div> */}
          </div>

          {/* Text */}
          <div className="text-center lg:text-left">
            <h3 className="font-cormorant text-3xl lg:text-4xl text-gold-500 mb-2">
              Pradeep Dhakad
            </h3>

            <h4 className="text-base lg:text-lg font-bold text-charcoal-900 mb-6">
              Founder
            </h4>

            <p className="text-base lg:text-lg italic text-charcoal-700 leading-relaxed mb-6">
              Wedding Gurukul: Where elite craftsmanship meets flawless wedding
              design.
            </p>

            <p className="text-base lg:text-lg text-charcoal-900 leading-8 max-w-5xl">
              Backed by an 11-year legacy of industry expertise, Pradeep Dhakad
              stands at the forefront of luxury event design. As a science
              graduate from St. Wilfred&apos;s College, Jaipur, he infuses an
              analytical, detail-oriented approach into the creative world of
              luxury weddings. His refined leadership ensures that Wedding
              Gurukul consistently delivers high-end, bespoke experiences that
              pair seamless execution with unmatched sophistication.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
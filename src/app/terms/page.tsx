import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Terms of Service — Wedding Gurukuls' };

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-cream pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-serif text-charcoal mb-2">Terms of Service</h1>
        <p className="text-charcoal/50 text-sm mb-12">Last updated: May 2026</p>
        <div className="prose prose-lg max-w-none text-charcoal/70 space-y-8">
          <section>
            <h2 className="text-xl font-serif text-charcoal mb-3">1. Services</h2>
            <p>Wedding Gurukuls provides luxury wedding and event planning services. By engaging our services, you agree to these terms and conditions.</p>
          </section>
          <section>
            <h2 className="text-xl font-serif text-charcoal mb-3">2. Booking & Payments</h2>
            <p>A non-refundable booking deposit is required to confirm your event date. Payment schedules will be outlined in your service agreement. All prices are subject to GST as applicable.</p>
          </section>
          <section>
            <h2 className="text-xl font-serif text-charcoal mb-3">3. Cancellations</h2>
            <p>Cancellation policies vary based on the timing of cancellation relative to the event date. Please refer to your individual service agreement for specific terms.</p>
          </section>
          <section>
            <h2 className="text-xl font-serif text-charcoal mb-3">4. Intellectual Property</h2>
            <p>All content on this website, including photographs, text and design elements, is the property of Wedding Gurukuls and may not be used without written permission.</p>
          </section>
          <section>
            <h2 className="text-xl font-serif text-charcoal mb-3">5. Limitation of Liability</h2>
            <p>Wedding Gurukuls shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services or website.</p>
          </section>
          <section>
            <h2 className="text-xl font-serif text-charcoal mb-3">6. Contact</h2>
            <p>For any questions regarding these terms, contact us at <a href="mailto:weddinggurukual@gmail.com" className="text-gold hover:underline">weddinggurukual@gmail.com</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

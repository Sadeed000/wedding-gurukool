import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Privacy Policy — Wedding Gurukuls' };

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-cream pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-serif text-charcoal mb-2">Privacy Policy</h1>
        <p className="text-charcoal/50 text-sm mb-12">Last updated: May 2026</p>
        <div className="prose prose-lg max-w-none text-charcoal/70 space-y-8">
          <section>
            <h2 className="text-xl font-serif text-charcoal mb-3">1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you fill out our contact form, request a consultation, or otherwise communicate with us. This may include your name, email address, phone number, and event details.</p>
          </section>
          <section>
            <h2 className="text-xl font-serif text-charcoal mb-3">2. How We Use Your Information</h2>
            <p>We use the information we collect to respond to your enquiries, provide wedding planning services, send you updates about your event, and improve our services. We do not sell your personal information to third parties.</p>
          </section>
          <section>
            <h2 className="text-xl font-serif text-charcoal mb-3">3. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
          </section>
          <section>
            <h2 className="text-xl font-serif text-charcoal mb-3">4. Cookies</h2>
            <p>Our website uses cookies to enhance your browsing experience. You can control cookie settings through your browser preferences.</p>
          </section>
          <section>
            <h2 className="text-xl font-serif text-charcoal mb-3">5. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:weddinggurukuljpr@gmail.com" className="text-gold hover:underline">weddinggurukuljpr@gmail.com</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

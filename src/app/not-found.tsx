import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-serif text-gold/30 mb-4">404</div>
        <h1 className="text-3xl font-serif text-charcoal mb-4">Page Not Found</h1>
        <p className="text-charcoal/60 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-gold">Back to Home</Link>
          <Link href="/contact" className="border border-charcoal/20 text-charcoal px-8 py-3 rounded-full hover:bg-charcoal/5 transition-colors">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}

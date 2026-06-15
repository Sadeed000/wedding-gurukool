'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  LayoutDashboard,
  BookOpen,
  Image,
  MapPin,
  Star,
  Mail,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/posts', label: 'Blog Posts', icon: BookOpen },
  { href: '/admin/portfolio', label: 'Portfolio', icon: Image },
  { href: '/admin/venues', label: 'Venues', icon: MapPin },
  { href: '/admin/enquiries', label: 'Enquiries', icon: Mail },
  // { href: '/admin/testimonials', label: 'Testimonials', icon: Star },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Sign out, then redirect on the current host. We avoid NextAuth's built-in
  // callbackUrl redirect because it resolves against NEXTAUTH_URL, which can
  // point at a different port/host and break the redirect.
  async function handleSignOut() {
    await signOut({ redirect: false });
    window.location.href = '/admin/login';
  }

  if (pathname === '/admin/login') return <>{children}</>;

  return (
    <div className="min-h-screen bg-[#fbf6ec]">
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-[#211b18]">
        <div className="flex items-center gap-3">
          <button onClick={() => setMenuOpen(true)} className="p-2 text-[#fbf6ec]">
            <Menu size={20} />
          </button>
          <div>
            <h1 className="font-serif text-lg text-[#fbf6ec] leading-none">Wedding Gurukul</h1>
            <p className="text-[10px] text-[#d39a27] uppercase tracking-[0.28em]">Content</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleSignOut} className="text-sm text-[#fbf6ec]/80">Sign Out</button>
        </div>
      </div>

      <div className="lg:flex">
      {/* Sidebar (desktop) */}
      <aside className="hidden lg:flex w-72 bg-[#211b18] flex-col justify-between border-r border-[#d39a27]/20 min-h-screen">
        {/* Logo / Brand */}
        <div className="px-6 py-7 border-b border-white/10">
          <h1 className="font-serif text-2xl text-[#fbf6ec] leading-none">
            Wedding Gurukul
          </h1>
          <p className="mt-2 text-[11px] uppercase tracking-[0.28em] text-[#d39a27]">
            Content Management
          </p>
        </div>

        {/* Nav */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);

            return (
              <Link
              
                key={href}
                href={href}
                className={`relative flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-300 ${
                  active
                    ? 'bg-[#d39a27] text-white shadow-[0_12px_30px_rgba(211,154,39,0.28)]'
                    : 'text-[#fbf6ec]/60 hover:bg-[#261e1b] hover:text-[#fbf6ec]'
                }`}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-white/80" />
                )}

                <Icon
                  size={18}
                  className={active ? 'text-white' : 'text-[#d39a27]'}
                />

                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="px-4 py-5 border-t border-white/10 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium text-[#fbf6ec]/60 hover:bg-[#261e1b] hover:text-[#fbf6ec] transition-all"
          >
            <ExternalLink size={18} className="text-[#d39a27]" />
            View Site
          </a>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium text-[#fbf6ec]/60 hover:bg-red-500/10 hover:text-red-300 transition-all"
          >
            <LogOut size={18} className="text-red-300" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 bg-[#fbf6ec]">
        {children}
      </main>
      </div>

      {/* Mobile off-canvas sidebar */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMenuOpen(false)} />
          <aside className="relative w-72 h-full bg-[#211b18] p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="font-serif text-lg text-[#fbf6ec] leading-none">Wedding Gurukul</h1>
                <p className="text-[10px] text-[#d39a27] uppercase tracking-[0.28em]">Content Management</p>
              </div>
              <button onClick={() => setMenuOpen(false)} className="p-2 text-[#fbf6ec]"><X size={18} /></button>
            </div>

            <nav className="flex flex-col gap-2 overflow-y-auto">
              {navItems.map(({ href, label, icon: Icon }) => {
                const active = pathname === href || pathname.startsWith(`${href}/`)
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`relative flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-300 ${
                      active
                        ? 'bg-[#d39a27] text-white shadow-[0_12px_30px_rgba(211,154,39,0.28)]'
                        : 'text-[#fbf6ec]/60 hover:bg-[#261e1b] hover:text-[#fbf6ec]'
                    }`}
                  >
                    {active && (
                      <span className="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-white/80" />
                    )}
                    <Icon size={18} className={active ? 'text-white' : 'text-[#d39a27]'} />
                    <span>{label}</span>
                  </Link>
                )
              })}
            </nav>

            <div className="mt-6 space-y-2">
              <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium text-[#fbf6ec]/60 hover:bg-[#261e1b] hover:text-[#fbf6ec] transition-all">
                <ExternalLink size={18} className="text-[#d39a27]" /> View Site
              </a>
              <button onClick={handleSignOut} className="w-full flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium text-[#fbf6ec]/60 hover:bg-red-500/10 hover:text-red-300 transition-all">
                <LogOut size={18} className="text-red-300" /> Sign Out
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
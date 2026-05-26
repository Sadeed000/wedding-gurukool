'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Loader2 } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.ok) {
      router.push('/admin/dashboard');
      router.refresh();
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <main className="min-h-screen bg-[#fbf6ec] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-[#d39a27] text-xs tracking-[0.35em] uppercase mb-3">
            Admin Panel
          </p>

          <h1 className="font-serif text-4xl text-[#211b18] font-semibold">
            Konark Admin
          </h1>

          <div className="flex items-center justify-center gap-4 my-4">
            <span className="h-px w-14 bg-[#d39a27]/50" />
            <span className="text-[#d39a27]">✦</span>
            <span className="h-px w-14 bg-[#d39a27]/50" />
          </div>

          <p className="text-[#3f342c]/60 text-sm tracking-[0.25em] uppercase">
            Content Management
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-[#d39a27]/20 rounded-2xl shadow-[0_25px_80px_rgba(63,52,44,0.12)] p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-xs tracking-[0.22em] text-[#3f342c]/70 uppercase mb-2">
                Email
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d39a27]"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#fbf6ec] border border-[#eadcc1] rounded-xl pl-12 pr-4 py-3.5 text-[#211b18] placeholder-[#3f342c]/35 focus:outline-none focus:border-[#d39a27] focus:ring-4 focus:ring-[#d39a27]/10 transition-all"
                  placeholder="admin@konarkweddings.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs tracking-[0.22em] text-[#3f342c]/70 uppercase mb-2">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d39a27]"
                />

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#fbf6ec] border border-[#eadcc1] rounded-xl pl-12 pr-4 py-3.5 text-[#211b18] placeholder-[#3f342c]/35 focus:outline-none focus:border-[#d39a27] focus:ring-4 focus:ring-[#d39a27]/10 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 text-center">
                {error}
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#d39a27] text-white py-3.5 rounded-xl font-semibold tracking-[0.18em] uppercase hover:bg-[#b98119] shadow-lg shadow-[#d39a27]/25 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-[#3f342c]/45 mt-6">
          Secure access for Wedding Gurukuls content team
        </p>
      </div>
    </main>
  );
}
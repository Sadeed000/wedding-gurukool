 'use client'

import React, { useEffect, useState } from 'react'
import { BookOpen, Image, MapPin, Star, Mail } from 'lucide-react'
import Link from 'next/link'

type StatItem = { label: string; value: string; icon: any; color: string }

interface Enquiry {
  _id: string
  name: string
  email: string
  phone: string
  venue?: string
  message: string
  status: 'new' | 'read' | 'replied'
  createdAt: string
}

export default function DashboardPage() {
  const [stats, setStats] = useState<StatItem[]>([
    { label: 'Wedding Stories', value: '-', icon: BookOpen, color: 'bg-blue-50 text-blue-600' },
    { label: 'Portfolio Items', value: '-', icon: Image, color: 'bg-purple-50 text-purple-600' },
    { label: 'Venues Listed', value: '-', icon: MapPin, color: 'bg-green-50 text-green-600' },
    { label: 'Testimonials', value: '7', icon: Star, color: 'bg-yellow-50 text-yellow-600' },
    { label: 'New Enquiries', value: '-', icon: Mail, color: 'bg-red-50 text-red-600' },
  ])
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loadingEnquiries, setLoadingEnquiries] = useState(false)

  function formatDate(date: string | undefined) {
    if (!date) return '-'
    return new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  useEffect(() => {
    let mounted = true
    async function fetchStats() {
      try {
        const res = await fetch('/api/admin/stats')
        console.log("res",res)
        if (!res.ok) throw new Error('Failed to load stats')
        const data = await res.json()
        if (!mounted) return

        setStats((s) =>
          s.map((item) => {
            if (item.label === 'Portfolio Items') return { ...item, value: String(data.portfolios ?? data.portfolio ?? 0) }
            if (item.label === 'Venues Listed') return { ...item, value: String(data.venues ?? 0) }
            if (item.label === 'Wedding Stories') return { ...item, value: String(data.blogs ?? data.posts ?? 0) }
            if (item.label === 'New Enquiries') return { ...item, value: String(data.enquiries ?? 0) }
            return item
          })
        )
      } catch (err) {
        console.error('Stats fetch error', err)
      }
    }
    fetchStats()
    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    let mounted = true
    async function fetchEnquiries() {
      setLoadingEnquiries(true)
      try {
        const res = await fetch('/api/contact?limit=5')
        if (!res.ok) throw new Error('Failed to load enquiries')
        const data = await res.json()
        if (mounted) {
          setEnquiries(data.data || [])
        }
      } catch (err) {
        console.error('Enquiries fetch error', err)
      } finally {
        setLoadingEnquiries(false)
      }
    }
    fetchEnquiries()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className="p-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back. Here's what's happening.</p>
        </div>
        <Link
        href="/admin/enquiries"
          className="inline-flex items-center justify-center rounded-2xl bg-[#d39a27] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#d39a27]/20 transition hover:bg-[#bb8b1b]"
        >
          View all enquiries
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
              <Icon size={22} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{value}</div>
              <div className="text-sm text-gray-500">{label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Recent Enquiries</h2>
        {loadingEnquiries ? (
          <p className="text-sm text-gray-500">Loading enquiries...</p>
        ) : enquiries.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-3 text-gray-500 font-semibold">Name</th>
                    <th className="text-left px-4 py-3 text-gray-500 font-semibold">Email</th>
                    <th className="text-left px-4 py-3 text-gray-500 font-semibold">Phone</th>
                    <th className="text-left px-4 py-3 text-gray-500 font-semibold">Venue</th>
                    <th className="text-left px-4 py-3 text-gray-500 font-semibold">Status</th>
                    <th className="text-left px-4 py-3 text-gray-500 font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((enquiry) => (
                    <tr key={enquiry._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-800">{enquiry.name}</td>
                      <td className="px-4 py-3 text-gray-500 lowercase">{enquiry.email}</td>
                      <td className="px-4 py-3 text-gray-500">{enquiry.phone}</td>
                      <td className="px-4 py-3 text-gray-500">{enquiry.venue || '—'}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                            enquiry.status === 'new'
                              ? 'bg-red-100 text-red-700'
                              : enquiry.status === 'replied'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {enquiry.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{formatDate(enquiry.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <Link
                href="/admin/enquiries"
                className="inline-flex items-center justify-center rounded-2xl border border-[#d39a27] bg-white px-4 py-2 text-sm font-semibold text-[#b8860b] transition hover:bg-[#f8eddc]"
              >
                Show more enquiries
              </Link>
            </div>
          </>
        ) : (
          <p className="text-sm text-gray-500">No enquiries yet.</p>
        )}
      </div>
    </div>
  )
}

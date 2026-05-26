import Link from 'next/link'
import connectDB from '@/lib/mongodb'
import { ContactEnquiry } from '@/models/index'

export const dynamic = 'force-dynamic'

const PER_PAGE = 10

function formatDate(date: Date | string | undefined) {
  if (!date) return '-'
  const parsed = typeof date === 'string' ? new Date(date) : date
  return parsed.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

interface EnquiriesPageProps {
  searchParams?: {
    page?: string
  }
}

export default async function EnquiriesPage({ searchParams }: EnquiriesPageProps) {
  await connectDB()

  const page = Math.max(1, Number(searchParams?.page || '1'))
  const totalEnquiries = await ContactEnquiry.countDocuments()
  const totalPages = Math.max(1, Math.ceil(totalEnquiries / PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const enquiries = await ContactEnquiry.find()
    .sort({ createdAt: -1 })
    .skip((currentPage - 1) * PER_PAGE)
    .limit(PER_PAGE)
    .lean()

  const startItem = (currentPage - 1) * PER_PAGE + 1
  const endItem = Math.min(currentPage * PER_PAGE, totalEnquiries)

  return (
    <div className="p-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Enquiries</h1>
          <p className="text-gray-500 text-sm mt-1">All contact enquiries from the website.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center justify-center rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Back to dashboard
          </Link>
          <span className="inline-flex items-center rounded-2xl bg-[#d39a27]/10 px-4 py-3 text-sm font-semibold text-[#8b5c1a]">
            {totalEnquiries} enquiries
          </span>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-500">Showing {startItem}–{endItem} of {totalEnquiries}</p>
            <p className="text-xl font-semibold text-gray-800">Enquiry list</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-4 text-gray-500 font-semibold">Name</th>
                <th className="text-left px-6 py-4 text-gray-500 font-semibold">Email</th>
                <th className="text-left px-6 py-4 text-gray-500 font-semibold">Phone</th>
                <th className="text-left px-6 py-4 text-gray-500 font-semibold">Venue</th>
                                          <th className="text-left px-6 py-4 text-gray-500 font-semibold">Message</th>

                <th className="text-left px-6 py-4 text-gray-500 font-semibold">Date</th>
                
                <th className="text-left px-6 py-4 text-gray-500 font-semibold">Status</th>


              </tr>
            </thead>
            <tbody>
              {enquiries.map((enquiry) => (
                <tr key={enquiry._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-800">{enquiry.name}</td>
                  <td className="px-6 py-4 text-gray-500 lowercase">{enquiry.email}</td>
                  <td className="px-6 py-4 text-gray-500">{enquiry.phone}</td>
                  <td className="px-6 py-4 text-gray-500">{enquiry.venue || '—'}</td>
                  <td className="px-6 py-4 text-gray-500">{enquiry.message || '—'}</td>
                  <td className="px-6 py-4 text-gray-500">{formatDate(enquiry.eventDate || enquiry.createdAt)}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        enquiry.status === 'new'
                          ? 'bg-red-100 text-red-700'
                          : enquiry.status === 'replied'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {enquiry.status || 'new'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/admin/enquiries?page=${Math.max(currentPage - 1, 1)}`}
              className={`inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                currentPage === 1
                  ? 'cursor-not-allowed bg-gray-200 text-gray-400'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              Previous
            </Link>
            <Link
              href={`/admin/enquiries?page=${Math.min(currentPage + 1, totalPages)}`}
              className={`inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                currentPage === totalPages
                  ? 'cursor-not-allowed bg-gray-200 text-gray-400'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              Next
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  X,
  Loader2,
  Upload,
} from 'lucide-react'
import toast from 'react-hot-toast'
import ConfirmPopup from '@/components/ConfirmDeleteModal'

const EMPTY = {
  name: '',
  slug: '',
  city: '',
  state: '',
  venueType: '',
  description: '',
  highlights: '',
  whyChoose: '',
  nearbyAttractions: '',
  amenities: '',
  priceRange: '',
  capacity: { min: 50, max: 500 },
  indoorAvailable: true,
  outdoorAvailable: false,
  trending: false,
  featured: false,
  published: false,
  featuredImage: '',
  images: [],
  metaTitle: '',
  metaDescription: '',
}

const VENUE_TYPES = [
  'Palace Hotel',
  'Heritage Palace',
  'Beach Resort',
  'Luxury Hotel',
  'Mountain Resort',
  'Heritage Hotel',
  'Garden Venue',
  'Fort',
  'Haveli',
]

export default function AdminVenuesPage() {
  const [venues, setVenues] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [activeTab, setActiveTab] = useState('basic')

  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [deleting, setDeleting] = useState(false)

  async function load() {
    setLoading(true)

    try {
      const res = await fetch('/api/venues')
      const data = await res.json()
      setVenues(data.venues || [])
    } catch {
      toast.error('Failed to load')
    }

    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  function openEdit(v) {
    setForm({
      ...EMPTY,
      ...v,
      highlights: Array.isArray(v.highlights) ? v.highlights.join('\n') : '',
      amenities: Array.isArray(v.amenities) ? v.amenities.join(', ') : '',
      whyChoose: Array.isArray(v.whyChoose) ? v.whyChoose.join('\n') : '',
      nearbyAttractions: Array.isArray(v.nearbyAttractions)
        ? v.nearbyAttractions.join(', ')
        : '',
      images: v.images || [],
    })

    setEditId(v._id)
    setShowForm(true)
    setActiveTab('basic')
  }

  async function handleSave() {
    if (!form.name || !form.city) {
      return toast.error('Name and city are required')
    }

    setSaving(true)

    try {
      const payload = {
        ...form,
        highlights: form.highlights
          ? form.highlights
              .split('\n')
              .map(s => s.trim())
              .filter(Boolean)
          : [],
        amenities: form.amenities
          ? form.amenities
              .split(',')
              .map(s => s.trim())
              .filter(Boolean)
          : [],
        whyChoose: form.whyChoose
          ? form.whyChoose
              .split('\n')
              .map(s => s.trim())
              .filter(Boolean)
          : [],
        nearbyAttractions: form.nearbyAttractions
          ? form.nearbyAttractions
              .split(',')
              .map(s => s.trim())
              .filter(Boolean)
          : [],
        images: form.images || [],
      }

      const url = editId ? `/api/venues/${editId}` : '/api/venues'
      const method = editId ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Something went wrong')
      }

      toast.success(editId ? 'Venue updated!' : 'Venue added!')
      setShowForm(false)
      load()
    } catch (e) {
      toast.error(e.message || 'Failed to save')
    }

    setSaving(false)
  }

  function handleDelete(id) {
    setDeleteId(id)
    setConfirmOpen(true)
  }

  function closeDeletePopup() {
    if (deleting) return
    setConfirmOpen(false)
    setDeleteId(null)
  }

  async function confirmDeleteVenue() {
    if (!deleteId) return

    setDeleting(true)

    try {
      const res = await fetch(`/api/venues/${deleteId}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        throw new Error('Failed to delete')
      }

      toast.success('Venue deleted successfully')
      setConfirmOpen(false)
      setDeleteId(null)
      load()
    } catch {
      toast.error('Failed to delete venue')
    }

    setDeleting(false)
  }

  async function handleToggle(v) {
    try {
      const res = await fetch(`/api/venues/${v._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !v.published }),
      })

      if (!res.ok) {
        throw new Error('Failed')
      }

      toast.success('Updated')
      load()
    } catch {
      toast.error('Failed')
    }
  }

  async function handleUpload(e) {
    const file = e.target.files[0]

    if (!file) return

    setUploading(true)

    try {
      const fd = new FormData()
      fd.append('files', file)
      fd.append('folder', 'venues')

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: fd,
      })

      const data = await res.json()

      if (data.uploaded?.[0]) {
        set('featuredImage', data.uploaded[0].url)
        toast.success('Uploaded!')
      }
    } catch {
      toast.error('Upload failed')
    }

    setUploading(false)
  }

  async function handleGalleryUpload(e) {
    const files = Array.from(e.target.files || [])

    if (!files.length) return

    setUploading(true)

    try {
      const fd = new FormData()

      files.forEach(file => fd.append('files', file))
      fd.append('folder', 'venues')

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: fd,
      })

      const data = await res.json()

      if (data.uploaded?.length) {
        const gallery = data.uploaded.map(img => ({
          url: img.url,
          alt: img.alt || form.name || 'Venue image',
        }))

        set('images', [...(form.images || []), ...gallery])

        toast.success(
          data.uploaded.length === 1
            ? 'Gallery image uploaded!'
            : 'Gallery images uploaded!'
        )
      }
    } catch {
      toast.error('Upload failed')
    }

    setUploading(false)
    e.target.value = ''
  }

  const removeGalleryImage = index => {
    set(
      'images',
      (form.images || []).filter((_, i) => i !== index)
    )
  }

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const setCap = (k, v) =>
    setForm(f => ({
      ...f,
      capacity: {
        ...f.capacity,
        [k]: +v,
      },
    }))

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Venues</h1>
          <p className="mt-1 text-sm text-gray-500">
            {venues.length} venues listed
          </p>
        </div>

        <button
          onClick={() => {
            setForm({ ...EMPTY, images: [] })
            setEditId(null)
            setShowForm(true)
          }}
          className="flex items-center gap-2 rounded-full bg-[#c9922a] px-5 py-2.5 text-sm text-white transition-colors hover:bg-[#b8821f]"
        >
          <Plus size={16} />
          Add Venue
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <div className="my-6 w-full max-w-2xl rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {editId ? 'Edit Venue' : 'New Venue'}
              </h2>

              <button onClick={() => setShowForm(false)}>
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            <div className="flex border-b border-gray-100 px-6">
              {[
                ['basic', 'Basic'],
                ['details', 'Details & SEO'],
              ].map(([tab, label]) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? 'border-[#c9922a] text-[#c9922a]'
                      : 'border-transparent text-gray-500'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="max-h-[60vh] space-y-5 overflow-y-auto p-6">
              {activeTab === 'basic' && (
                <>
                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-500">
                      Cover Image
                    </label>

                    <div className="flex items-center gap-4">
                      {form.featuredImage && (
                        <img
                          src={form.featuredImage}
                          alt=""
                          className="h-16 w-20 shrink-0 rounded-lg object-cover"
                        />
                      )}

                      <label className="flex cursor-pointer items-center gap-2 rounded-lg border-2 border-dashed border-gray-200 px-4 py-3 text-sm text-gray-500 transition-colors hover:border-[#c9922a]">
                        {uploading ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Upload size={14} />
                        )}
                        Upload Cover

                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleUpload}
                          disabled={uploading}
                        />
                      </label>

                      <input
                        value={form.featuredImage}
                        onChange={e => set('featuredImage', e.target.value)}
                        placeholder="Or paste image URL"
                        className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#c9922a] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-500">
                      Gallery Images
                    </label>

                    <div className="mb-3 flex items-center gap-4">
                      <label className="flex cursor-pointer items-center gap-2 rounded-lg border-2 border-dashed border-gray-200 px-4 py-3 text-sm text-gray-500 transition-colors hover:border-[#c9922a]">
                        {uploading ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Upload size={14} />
                        )}
                        Add Gallery

                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={handleGalleryUpload}
                          disabled={uploading}
                        />
                      </label>

                      <span className="text-sm text-gray-500">
                        Upload one or more gallery images for this venue.
                      </span>
                    </div>

                    {form.images && form.images.length > 0 ? (
                      <div className="grid grid-cols-3 gap-2">
                        {form.images.map((img, idx) => (
                          <div
                            key={`${img.url}-${idx}`}
                            className="relative overflow-hidden rounded-lg border border-gray-200"
                          >
                            <img
                              src={img.url}
                              alt={img.alt || `Gallery ${idx + 1}`}
                              className="h-20 w-full object-cover"
                            />

                            <button
                              type="button"
                              onClick={() => removeGalleryImage(idx)}
                              className="absolute right-1 top-1 rounded-full bg-white/90 p-1 text-xs text-red-600"
                            >
                              x
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400">
                        No gallery images added yet.
                      </p>
                    )}
                  </div>

                  {[
                    ['Venue Name *', 'name'],
                    ['City *', 'city'],
                    ['State', 'state'],
                    ['Price Range', 'priceRange'],
                  ].map(([label, key]) => (
                    <div key={key}>
                      <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-gray-500">
                        {label}
                      </label>

                      <input
                        value={form[key]}
                        onChange={e => set(key, e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-[#c9922a] focus:outline-none"
                      />
                    </div>
                  ))}

                  <div>
                    <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-gray-500">
                      Venue Type
                    </label>

                    <select
                      value={form.venueType}
                      onChange={e => set('venueType', e.target.value)}
                      className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-[#c9922a] focus:outline-none"
                    >
                      <option value="">Select type</option>

                      {VENUE_TYPES.map(t => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-gray-500">
                        Min Capacity
                      </label>

                      <input
                        type="number"
                        value={form.capacity.min}
                        onChange={e => setCap('min', e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-[#c9922a] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-gray-500">
                        Max Capacity
                      </label>

                      <input
                        type="number"
                        value={form.capacity.max}
                        onChange={e => setCap('max', e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-[#c9922a] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-gray-500">
                      Description
                    </label>

                    <textarea
                      rows={4}
                      value={form.description}
                      onChange={e => set('description', e.target.value)}
                      className="w-full resize-none rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-[#c9922a] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-gray-500">
                      Highlights one per line
                    </label>

                    <textarea
                      rows={4}
                      value={form.highlights}
                      onChange={e => set('highlights', e.target.value)}
                      className="w-full resize-none rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-[#c9922a] focus:outline-none"
                      placeholder="Lake Pichola views&#10;Marble pavilions&#10;Royal gardens"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-gray-500">
                      Amenities comma-separated
                    </label>

                    <input
                      value={form.amenities}
                      onChange={e => set('amenities', e.target.value)}
                      className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-[#c9922a] focus:outline-none"
                      placeholder="Pool, Spa, Parking, Restaurant"
                    />
                  </div>

                  <div className="flex flex-wrap gap-5">
                    {[
                      ['indoorAvailable', 'Indoor'],
                      ['outdoorAvailable', 'Outdoor'],
                      ['trending', 'Trending'],
                      ['featured', 'Featured'],
                      ['published', 'Published'],
                    ].map(([k, label]) => (
                      <label
                        key={k}
                        className="flex cursor-pointer items-center gap-2"
                      >
                        <input
                          type="checkbox"
                          checked={form[k]}
                          onChange={e => set(k, e.target.checked)}
                          className="h-4 w-4 accent-[#c9922a]"
                        />

                        <span className="text-sm text-gray-700">{label}</span>
                      </label>
                    ))}
                  </div>
                </>
              )}

              {activeTab === 'details' && (
                <>
                  <div>
                    <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-gray-500">
                      Why Choose This Venue one per line
                    </label>

                    <textarea
                      rows={4}
                      value={form.whyChoose}
                      onChange={e => set('whyChoose', e.target.value)}
                      className="w-full resize-none rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-[#c9922a] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-gray-500">
                      Nearby Attractions comma-separated
                    </label>

                    <input
                      value={form.nearbyAttractions}
                      onChange={e => set('nearbyAttractions', e.target.value)}
                      className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-[#c9922a] focus:outline-none"
                    />
                  </div>

                  {[
                    ['SEO Title', 'metaTitle'],
                    ['SEO Description', 'metaDescription'],
                  ].map(([label, key]) => (
                    <div key={key}>
                      <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-gray-500">
                        {label}
                      </label>

                      {key === 'metaDescription' ? (
                        <textarea
                          rows={3}
                          value={form[key]}
                          onChange={e => set(key, e.target.value)}
                          className="w-full resize-none rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-[#c9922a] focus:outline-none"
                        />
                      ) : (
                        <input
                          value={form[key]}
                          onChange={e => set(key, e.target.value)}
                          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-[#c9922a] focus:outline-none"
                        />
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>

            <div className="flex gap-3 border-t border-gray-100 p-6">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#c9922a] py-2.5 text-sm text-white hover:bg-[#b8821f] disabled:opacity-50"
              >
                {saving && <Loader2 size={14} className="animate-spin" />}
                {saving ? 'Saving…' : 'Save Venue'}
              </button>

              <button
                onClick={() => setShowForm(false)}
                className="flex-1 rounded-full border border-gray-200 py-2.5 text-sm text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-[#c9922a]" />
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-100">
              <tr>
                {['Venue', 'City', 'Type', 'Capacity', 'Status', 'Actions'].map(
                  h => (
                    <th
                      key={h}
                      className="px-6 py-4 text-left font-medium text-gray-500"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {venues.map(v => (
                <tr
                  key={v._id}
                  className="border-b border-gray-50 transition-colors hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {v.name}
                  </td>

                  <td className="px-6 py-4 text-gray-600">{v.city}</td>

                  <td className="px-6 py-4 text-gray-500">{v.venueType}</td>

                  <td className="px-6 py-4 text-gray-500">
                    {v.capacity?.min}–{v.capacity?.max}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          v.published
                            ? 'bg-green-50 text-green-600'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {v.published ? 'Live' : 'Draft'}
                      </span>

                      {v.trending && (
                        <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-medium text-orange-600">
                          Trending
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      {/* <button
                        onClick={() => handleToggle(v)}
                        className="rounded-lg p-2 text-gray-400 transition-colors hover:text-[#c9922a]"
                      >
                        {v.published ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button> */}

                      <button
                        onClick={() => openEdit(v)}
                        className="rounded-lg p-2 text-gray-400 transition-colors hover:text-[#c9922a]"
                      >
                        <Pencil size={15} />
                      </button>

                      <button
                        onClick={() => handleDelete(v._id)}
                        className="rounded-lg p-2 text-gray-400 transition-colors hover:text-red-500"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {venues.length === 0 && (
            <div className="py-16 text-center text-gray-400">
              No venues yet. Add your first one!
            </div>
          )}
        </div>
      )}

      <ConfirmPopup
        open={confirmOpen}
        title="Delete Venue?"
        message="Are you sure you want to delete this venue? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleting}
        onCancel={closeDeletePopup}
        onConfirm={confirmDeleteVenue}
      />
    </div>
  )
}
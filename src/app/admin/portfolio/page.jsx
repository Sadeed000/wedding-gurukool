'use client'
import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Eye, EyeOff, X, Loader2, Upload } from 'lucide-react'
import toast from 'react-hot-toast'

const EMPTY = { title: '', slug: '', description: '', content: '', venue: '', location: '', eventDate: '', eventType: '', venueType: '', style: '', featured: false, published: false, featuredImage: '', images: [], metaTitle: '', metaDescription: '' }
const EVENT_TYPES = ['Wedding', 'Sangeet', 'Mehendi', 'Reception', 'Destination Wedding', 'Pre-Wedding', 'Engagement']

export default function AdminPortfolioPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  async function load() {
    setLoading(true)
    try {
      const res = await fetch('/api/portfolio?limit=50')
      const data = await res.json()
      setItems(data.items || [])
    } catch { toast.error('Failed to load') }
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  function openEdit(item) {
    setForm({
      ...EMPTY,
      ...item,
      style: Array.isArray(item.style) ? item.style.join(', ') : item.style || '',
      eventDate: item.eventDate ? new Date(item.eventDate).toISOString().split('T')[0] : '',
      images: item.images || [],
    })
    setEditId(item._id); setShowForm(true)
  }

  async function handleSave() {
    if (!form.featuredImage && !(form.images && form.images.length > 0)) return toast.error('Please upload at least one image')
    setSaving(true)
    try {
      const payload = {
        ...form,
        title: form.title.trim() || 'Portfolio Item',
        venue: form.venue.trim(),
        location: form.location.trim(),
        description: form.description.trim(),
        content: form.content.trim(),
        style: form.style ? form.style.split(',').map(s => s.trim()).filter(Boolean) : [],
        images: form.images || [],
        slug: form.slug || (form.title ? form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : `portfolio-${Date.now()}`),
      }
      const url = editId ? `/api/portfolio/${editId}` : '/api/portfolio'
      const res = await fetch(url, { method: editId ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!res.ok) throw new Error((await res.json()).error)
      toast.success(editId ? 'Updated!' : 'Created!'); setShowForm(false); load()
    } catch (e) { toast.error(e.message) }
    setSaving(false)
  }

  async function handleDelete(id) {
    if (!confirm('Delete?')) return
    try { await fetch(`/api/portfolio/${id}`, { method: 'DELETE' }); toast.success('Deleted'); load() }
    catch { toast.error('Failed') }
  }

  async function handleToggle(item) {
    try { await fetch(`/api/portfolio/${item._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ published: !item.published }) }); load() }
    catch { toast.error('Failed') }
  }

  async function handleUpload(e) {
    const file = e.target.files[0]; if (!file) return
    setUploading(true)
    try {
      const fd = new FormData(); fd.append('files', file); fd.append('folder', 'portfolios')
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.uploaded?.[0]) { set('featuredImage', data.uploaded[0].url); toast.success('Uploaded!') }
    } catch { toast.error('Upload failed') }
    setUploading(false)
  }

  async function handleGalleryUpload(e) {
    const file = e.target.files[0]; if (!file) return
    setUploading(true)
    try {
      const fd = new FormData(); fd.append('files', file); fd.append('folder', 'portfolios')
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.uploaded?.[0]) {
        set('images', [...(form.images || []), { url: data.uploaded[0].url, alt: data.uploaded[0].alt || form.title || 'Portfolio image' }])
        toast.success('Gallery image uploaded!')
      }
    } catch { toast.error('Upload failed') }
    setUploading(false)
  }

  const removeGalleryImage = (index) => {
    set('images', (form.images || []).filter((_, i) => i !== index))
  }

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-2xl font-semibold text-gray-800">Portfolio</h1><p className="text-gray-500 text-sm mt-1">{items.length} items</p></div>
        <button onClick={() => { setForm(EMPTY); setEditId(null); setShowForm(true) }} className="flex items-center gap-2 bg-[#c9922a] text-white px-5 py-2.5 rounded-full text-sm hover:bg-[#b8821f]">
          <Plus size={16} /> Add Portfolio
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl my-6">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800">{editId ? 'Edit Portfolio' : 'New Portfolio Item'}</h2>
              <button onClick={() => setShowForm(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="p-6 max-h-[65vh] overflow-y-auto space-y-4">
              {/* Cover Image */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Cover Image</label>
                <div className="flex items-center gap-4">
                  {form.featuredImage && <img src={form.featuredImage} alt="" className="w-20 h-16 object-cover rounded-lg shrink-0" />}
                  <label className="flex items-center gap-2 cursor-pointer border-2 border-dashed border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-500 hover:border-[#c9922a] transition-colors">
                    {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />} Upload
                    <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
                  </label>
                  {/* <input value={form.featuredImage} onChange={e => set('featuredImage', e.target.value)} placeholder="Or paste URL" className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#c9922a]" /> */}
                </div>
              </div>

              {/* <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Gallery Images</label>
                <div className="flex items-center gap-4 mb-3">
                  <label className="flex items-center gap-2 cursor-pointer border-2 border-dashed border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-500 hover:border-[#c9922a] transition-colors">
                    {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />} Add
                    <input type="file" accept="image/*" className="hidden" onChange={handleGalleryUpload} disabled={uploading} />
                  </label>
                  <span className="text-sm text-gray-500">Add gallery images for the public portfolio item.</span>
                </div>
                {form.images && form.images.length > 0 ? (
                  <div className="grid grid-cols-3 gap-2">
                    {form.images.map((img, idx) => (
                      <div key={idx} className="relative rounded-lg overflow-hidden border border-gray-200">
                        <img src={img.url} alt={img.alt || `Gallery ${idx + 1}`} className="w-full h-20 object-cover" />
                        <button type="button" onClick={() => removeGalleryImage(idx)} className="absolute top-1 right-1 bg-white/90 rounded-full p-1 text-xs text-red-600">×</button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">No gallery images added yet.</p>
                )}
              </div> */}

               {[['Title', 'title'], ['Slug', 'slug']].map(([label, key]) => (
                <div key={key}><label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">{label}</label><input value={form[key]} onChange={e => set(key, e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9922a]" /></div>
              ))} 

              {/* <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Event Date</label><input type="date" value={form.eventDate} onChange={e => set('eventDate', e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9922a]" /></div>
                <div><label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Event Type</label>
                  <select value={form.eventType} onChange={e => set('eventType', e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9922a]">
                    <option value="">Select</option>{EVENT_TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div> */}

              {/* <div><label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Style (comma-separated)</label><input value={form.style} onChange={e => set('style', e.target.value)} placeholder="Royal, Traditional, Modern" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9922a]" /></div> */}
              <div><label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Description</label><textarea rows={3} value={form.description} onChange={e => set('description', e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9922a] resize-none" /></div>
              {/* <div><label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">SEO Title</label><input value={form.metaTitle} onChange={e => set('metaTitle', e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9922a]" /></div>
              <div><label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">SEO Description</label><textarea rows={2} value={form.metaDescription} onChange={e => set('metaDescription', e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9922a] resize-none" /></div> */}

              <div className="flex gap-5">
                {[['published', 'Published'], ['featured', 'Featured']].map(([k, label]) => (
                  <label key={k} className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form[k]} onChange={e => set(k, e.target.checked)} className="accent-[#c9922a] w-4 h-4" /><span className="text-sm text-gray-700">{label}</span></label>
                ))}
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-gray-100">
              <button onClick={handleSave} disabled={saving} className="flex-1 flex items-center justify-center gap-2 bg-[#c9922a] text-white py-2.5 rounded-full text-sm disabled:opacity-50">
                {saving && <Loader2 size={14} className="animate-spin" />} {saving ? 'Saving…' : 'Save'}
              </button>
              <button onClick={() => setShowForm(false)} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-full text-sm hover:bg-gray-50">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {loading ? <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#c9922a]" /></div> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(item => (
            <div key={item._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-44 bg-gray-100">
                {item.featuredImage && <img src={item.featuredImage} alt={item.title} className="w-full h-full object-cover" />}
                <div className="absolute top-3 right-3 flex gap-2">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${item.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{item.published ? 'Live' : 'Draft'}</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-gray-800 text-sm mb-1 truncate">{item.title}</h3>
                <p className="text-gray-500 text-xs mb-1">{item.venue} · {item.location}</p>
                {item.style && <div className="flex flex-wrap gap-1 mb-3">{(Array.isArray(item.style) ? item.style : [item.style]).map(s => <span key={s} className="text-[10px] bg-[#c9922a]/10 text-[#c9922a] px-2 py-0.5 rounded-full">{s}</span>)}</div>}
                <div className="flex gap-2 pt-3 border-t border-gray-50">
                  {/* <button onClick={() => handleToggle(item)} className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#c9922a] transition-colors">{item.published ? <EyeOff size={13} /> : <Eye size={13} />}</button> */}
                  <button onClick={() => openEdit(item)} className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#c9922a] transition-colors"><Pencil size={13} /> Edit</button>
                  <button onClick={() => handleDelete(item._id)} className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={13} /> Delete</button>
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && <div className="col-span-3 text-center py-16 text-gray-400">No portfolio items yet.</div>}
        </div>
      )}
    </div>
  )
}

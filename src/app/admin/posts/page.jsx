'use client'
import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Eye, EyeOff, Star, Upload, X, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import RichTextEditor from '@/components/admin/RichTextEditor'

const EMPTY = { title: '', slug: '', excerpt: '', content: '', category: 'Decor', author: 'Wedding Gurukul', tags: '', published: false, featured: false, metaTitle: '', metaDescription: '', metaKeywords: '', featuredImage: '' }
const CATEGORIES = ['Decor', 'Planning Tips', 'Venue Spotlight', 'Real Weddings', 'Trends', 'Food & Cuisine', 'Travel', 'Behind the Scenes']

export default function AdminBlogsPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [activeTab, setActiveTab] = useState('basic')

  async function load() {
    setLoading(true)
    try {
      const res = await fetch('/api/blogs?limit=100&all=true', { cache: 'no-store' })
      const data = await res.json()
      setPosts(data.posts || [])
    } catch { toast.error('Failed to load posts') }
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  function openNew() { setForm(EMPTY); setEditId(null); setShowForm(true); setActiveTab('basic') }

  async function openEdit(post) {
    // fetch the full post (including `content`) to ensure editor loads the content
    let full = post
    try {
      const res = await fetch(`/api/blogs/${post._id}`)
      if (res.ok) full = await res.json()
    } catch (err) {
      // fallback to provided post
    }

    const authorValue = typeof full.author === 'object' && full.author !== null ? full.author.name || '' : full.author || ''
    setForm({ ...EMPTY, ...full, author: authorValue, tags: Array.isArray(full.tags) ? full.tags.join(', ') : full.tags || '' })
    setEditId(full._id)
    setShowForm(true)
    setActiveTab('basic')
  }

  async function handleSave() {
    if (!form.title || !form.excerpt || !form.category) return toast.error('Title, excerpt, and category are required')
    setSaving(true)
    try {
      const payload = { ...form, tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [], slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') }
      const url = editId ? `/api/blogs/${editId}` : '/api/blogs'
      const method = editId ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!res.ok) throw new Error((await res.json()).error)
      toast.success(editId ? 'Post updated!' : 'Post created!')
      setShowForm(false)
      load()
    } catch (e) { toast.error(e.message) }
    setSaving(false)
  }

  async function handleDelete(id) {
    if (!confirm('Delete this post?')) return
    try {
      await fetch(`/api/blogs/${id}`, { method: 'DELETE' })
      toast.success('Post deleted')
      load()
    } catch { toast.error('Failed to delete') }
  }

  async function handleToggle(post) {
    try {
      await fetch(`/api/blogs/${post._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ published: !post.published }) })
      toast.success(post.published ? 'Post unpublished' : 'Post published!')
      load()
    } catch { toast.error('Failed to update') }
  }

  async function handleUpload(e) {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('files', file)
      fd.append('folder', 'blogs')
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.uploaded && data.uploaded[0]) {
        setForm(f => ({ ...f, featuredImage: data.uploaded[0].url }))
        toast.success('Image uploaded!')
      }
    } catch { toast.error('Upload failed') }
    setUploading(false)
  }

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Blog Posts</h1>
          <p className="text-gray-500 text-sm mt-1">{posts.length} posts</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-[#c9922a] text-white px-5 py-2.5 rounded-full text-sm hover:bg-[#b8821f] transition-colors">
          <Plus size={16} /> New Post
        </button>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-4xl shadow-xl my-6">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800">{editId ? 'Edit Post' : 'New Blog Post'}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-100 px-6">
              {[['basic', 'Basic Info'], ['content', 'Content'], ['seo', 'SEO & Tags']].map(([tab, label]) => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 font-dm-sans text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? 'border-[#c9922a] text-[#c9922a]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                  {label}
                </button>
              ))}
            </div>

            <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
              {activeTab === 'basic' && (
                <>
                  {/* Featured Image */}
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Featured Image</label>
                    <div className="flex items-start gap-4">
                      {form.featuredImage && (
                        <div className="relative w-24 h-20 rounded-lg overflow-hidden shrink-0">
                          <img src={form.featuredImage} alt="" className="w-full h-full object-cover" />
                          <button onClick={() => set('featuredImage', '')} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5"><X size={10} /></button>
                        </div>
                      )}
                      <label className="flex items-center gap-2 cursor-pointer border-2 border-dashed border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-500 hover:border-[#c9922a] hover:text-[#c9922a] transition-colors">
                        {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                        {uploading ? 'Uploading…' : 'Upload Image'}
                        <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
                      </label>
                      {/* <span className="text-xs text-gray-400 self-center">or paste URL:</span>
                      <input value={form.featuredImage} onChange={e => set('featuredImage', e.target.value)} placeholder="https://…" className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#c9922a]" /> */}
                    </div>
                  </div>

                  {[['Title *', 'title', 'text'], ['Slug (auto-generated if empty)', 'slug', 'text'], ['Excerpt *', 'excerpt', 'textarea'], ['Author', 'author', 'text']].map(([label, key, type]) => (
                    <div key={key}>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">{label}</label>
                      {type === 'textarea'
                        ? <textarea rows={3} value={form[key]} onChange={e => set(key, e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9922a] resize-none" />
                        : <input type={type} value={form[key]} onChange={e => set(key, e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9922a]" />
                      }
                    </div>
                  ))}

                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Category *</label>
                    <select value={form.category} onChange={e => set('category', e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9922a]">
                      {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>

                  <div className="flex gap-6">
                    {[['published', 'Published'], ['featured', 'Featured']].map(([k, label]) => (
                      <label key={k} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={form[k]} onChange={e => set(k, e.target.checked)} className="accent-[#c9922a] w-4 h-4" />
                        <span className="text-sm text-gray-700">{label}</span>
                      </label>
                    ))}
                  </div>
                </>
              )}

              {activeTab === 'content' && (
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Blog Content</label>
                  <RichTextEditor value={form.content} onChange={v => set('content', v)} />
                  <p className="text-xs text-gray-400 mt-2">
                    Use the toolbar to add headings, <strong>highlights</strong>, interlinks/backlinks, tables, images & more.
                    Headings (H2/H3) automatically build the Table of Contents shown to readers. Toggle the eye icon for raw HTML.
                  </p>
                </div>
              )}

              {activeTab === 'seo' && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Tags (comma-separated)</label>
                    <input value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="Wedding, Decor, Rajasthan" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9922a]" />
                  </div>
                  {[['SEO Title', 'metaTitle'], ['SEO Description', 'metaDescription'], ['SEO Keywords', 'metaKeywords']].map(([label, key]) => (
                    <div key={key}>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">{label}</label>
                      {key === 'metaDescription'
                        ? <textarea rows={3} value={form[key]} onChange={e => set(key, e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9922a] resize-none" />
                        : <input value={form[key]} onChange={e => set(key, e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9922a]" />
                      }
                    </div>
                  ))}
                </>
              )}
            </div>

            <div className="flex gap-3 p-6 border-t border-gray-100">
              <button onClick={handleSave} disabled={saving} className="flex-1 flex items-center justify-center gap-2 bg-[#c9922a] text-white py-2.5 rounded-full text-sm hover:bg-[#b8821f] transition-colors disabled:opacity-50">
                {saving && <Loader2 size={14} className="animate-spin" />} {saving ? 'Saving…' : editId ? 'Update Post' : 'Publish Post'}
              </button>
              <button onClick={() => setShowForm(false)} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-full text-sm hover:bg-gray-50 transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 size={24} className="animate-spin text-[#c9922a]" /></div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg mb-2">No blog posts yet</p>
          <p className="text-sm">Create your first post to get started</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-100">
              <tr>{['Title', 'Category', 'Author', 'Status', 'Actions'].map(h => <th key={h} className="text-left px-6 py-4 text-gray-500 font-medium">{h}</th>)}</tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-800 max-w-xs">
                    <div className="truncate">{post.title}</div>
                    {post.featured && <span className="text-[10px] bg-yellow-50 text-yellow-600 px-2 py-0.5 rounded-full">Featured</span>}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{post.category}</td>
                  <td className="px-6 py-4 text-gray-500">{typeof post.author === 'object' && post.author !== null ? post.author.name || 'Unknown' : post.author || 'Unknown'}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${post.published ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                      {post.published ? 'Live' : 'Draft'}
                    </span>
                  </td>
                  {/* <td className="px-6 py-4 text-gray-500">{post.views || 0}</td> */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      {/* <button onClick={() => handleToggle(post)} title={post.published ? 'Unpublish' : 'Publish'} className="p-2 text-gray-400 hover:text-[#c9922a] hover:bg-[#c9922a]/5 rounded-lg transition-colors">
                        {post.published ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button> */}
                      <button onClick={() => openEdit(post)} className="p-2 text-gray-400 hover:text-[#c9922a] hover:bg-[#c9922a]/5 rounded-lg transition-colors"><Pencil size={15} /></button>
                      <button onClick={() => handleDelete(post._id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

import { useState, useEffect } from 'react'
import api from '../../api/axios'
import PageLoader from '../../components/ui/PageLoader'

const EMPTY = { title: '', excerpt: '', content: '', thumbnail: '', tags: '', status: 'draft' }

export default function AdminBlogs() {
  const [blogs,       setBlogs]       = useState([])
  const [loading,     setLoading]     = useState(true)
  const [initialLoad, setInitialLoad] = useState(true)
  const [modal,   setModal]   = useState(false)
  const [editing, setEditing] = useState(null)
  const [form,    setForm]    = useState(EMPTY)
  const [saving,  setSaving]  = useState(false)
  const [error,   setError]   = useState(null)

  const load = () => {
    setLoading(true)
    api.get('/admin/blogs').then(r => setBlogs(r.data)).catch(() => {}).finally(() => { setLoading(false); setInitialLoad(false) })
  }
  useEffect(load, [])

  if (initialLoad && loading) return <p className="min-h-screen flex items-center justify-center" >Loading…</p>

  const open = (b = null) => {
    setEditing(b)
    setForm(b ? { title: b.title, excerpt: b.excerpt || '', content: b.content || '', thumbnail: b.thumbnail || '', tags: (b.tags || []).join(', '), status: b.status } : EMPTY)
    setError(null); setModal(true)
  }
  const close = () => { setModal(false); setEditing(null) }

  const submit = async e => {
    e.preventDefault(); setSaving(true); setError(null)
    try {
      const payload = { ...form, tags: form.tags.split(',').map(s => s.trim()).filter(Boolean) }
      if (editing) await api.put(`/admin/blogs/${editing._id}`, payload)
      else         await api.post('/admin/blogs', payload)
      close(); load()
    } catch (err) { setError(err.message || 'Failed to save') }
    finally { setSaving(false) }
  }

  const del = async (id) => {
    if (!confirm('Delete this blog post?')) return
    await api.delete(`/admin/blogs/${id}`).catch(() => {})
    load()
  }

  const set = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">Blog Posts</h1>
        <button onClick={() => open()} className="btn-primary">+ New Post</button>
      </div>

      {loading ? (
        <p className="text-gray-400 text-sm text-center py-10">Loading…</p>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Title</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 hidden md:table-cell">Author</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 hidden md:table-cell">Date</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {blogs.map(b => (
                <tr key={b._id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-xs text-gray-900">{b.title}</p>
                    {b.excerpt && <p className="text-xs text-gray-400 truncate max-w-xs">{b.excerpt}</p>}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500 hidden md:table-cell">{b.author?.name || '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${b.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400 hidden md:table-cell">
                    {b.publishedAt ? new Date(b.publishedAt).toLocaleDateString() : new Date(b.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => open(b)} className="text-xs text-blue-600 hover:underline mr-3">Edit</button>
                    <button onClick={() => del(b._id)} className="text-xs text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {blogs.length === 0 && <p className="text-center py-10 text-gray-400 text-sm">No blog posts yet.</p>}
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl my-8 shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">{editing ? 'Edit Post' : 'New Blog Post'}</h2>
              <button onClick={close} className="text-gray-400 hover:text-gray-700 text-xl">✕</button>
            </div>
            <form onSubmit={submit} className="p-6 space-y-4">
              {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">{error}</div>}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Title *</label>
                <input name="title" value={form.title} onChange={set} required className="input-field" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Excerpt</label>
                <textarea name="excerpt" value={form.excerpt} onChange={set} rows={2} className="input-field resize-none" placeholder="Short summary shown on listing page…" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Content (HTML allowed)</label>
                <textarea name="content" value={form.content} onChange={set} rows={10} className="input-field resize-none font-mono text-xs" placeholder="<p>Your blog content here…</p>" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Thumbnail URL</label>
                <input name="thumbnail" value={form.thumbnail} onChange={set} className="input-field" placeholder="https://…" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Tags (comma separated)</label>
                <input name="tags" value={form.tags} onChange={set} className="input-field" placeholder="React, JavaScript, Career" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
                <select name="status" value={form.status} onChange={set} className="input-field w-auto">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
                  {saving ? 'Saving…' : editing ? 'Update Post' : 'Create Post'}
                </button>
                <button type="button" onClick={close} className="text-sm text-gray-500 hover:text-gray-800 px-4">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

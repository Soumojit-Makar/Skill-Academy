import { useState, useEffect } from 'react'
import api from '../../api/axios'

const EMPTY = {
  title: '', tagline: '', description: '', duration: '', mode: 'Offline',
  level: 'Beginner', thumbnail: '', isActive: true, isFeatured: false,
  highlights: '', tools: '', category: '',
}

export default function AdminCourses() {
  const [courses,    setCourses]    = useState([])
  const [categories, setCategories] = useState([])
  const [loading,    setLoading]    = useState(true)
  const [modal,      setModal]      = useState(false)
  const [editing,    setEditing]    = useState(null)
  const [form,       setForm]       = useState(EMPTY)
  const [saving,     setSaving]     = useState(false)
  const [error,      setError]      = useState(null)

  const load = async () => {
    setLoading(true)
    const [c, cats] = await Promise.all([
      api.get('/admin/courses').catch(() => ({ data: [] })),
      api.get('/admin/categories').catch(() => ({ data: [] })),
    ])
    setCourses(c.data || [])
    setCategories(cats.data || [])
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  const openCreate = () => {
    setEditing(null); setForm(EMPTY); setError(null); setModal(true)
  }
  const openEdit = (c) => {
    setEditing(c)
    setForm({
      ...EMPTY, ...c,
      category:   c.category?._id || c.category || '',
      highlights: (c.highlights || []).join('\n'),
      tools:      (c.tools || []).join(', '),
    })
    setError(null); setModal(true)
  }
  const closeModal = () => { setModal(false); setEditing(null) }

  const submit = async e => {
    e.preventDefault()
    setSaving(true); setError(null)
    try {
      const payload = {
        ...form,
        highlights: form.highlights.split('\n').map(s => s.trim()).filter(Boolean),
        tools:      form.tools.split(',').map(s => s.trim()).filter(Boolean),
        category:   form.category || undefined,
      }
      if (editing) {
        await api.put(`/admin/courses/${editing._id}`, payload)
      } else {
        await api.post('/admin/courses', payload)
      }
      closeModal(); load()
    } catch (err) {
      setError(err.message || 'Failed to save')
    } finally { setSaving(false) }
  }

  const deleteCourse = async (id) => {
    if (!confirm('Delete this course?')) return
    await api.delete(`/admin/courses/${id}`).catch(() => {})
    load()
  }

  const set = e => setForm(p => ({ ...p, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">Courses</h1>
        <button onClick={openCreate} className="btn-primary">+ Add Course</button>
      </div>

      {loading ? (
        <div className="text-gray-400 text-sm py-10 text-center">Loading…</div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Title</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 hidden md:table-cell">Level</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {courses.map(c => (
                <tr key={c._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900 text-xs">{c.title}</p>
                    {c.isFeatured && <span className="text-xs text-yellow-600">⭐ Featured</span>}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500 hidden md:table-cell">{c.category?.name || '—'}</td>
                  <td className="px-4 py-3 text-xs text-gray-500 hidden md:table-cell">{c.level}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {c.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => openEdit(c)} className="text-xs text-blue-600 hover:underline mr-3">Edit</button>
                    <button onClick={() => deleteCourse(c._id)} className="text-xs text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {courses.length === 0 && (
            <p className="text-center py-10 text-gray-400 text-sm">No courses yet. Add one!</p>
          )}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl my-8 shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">{editing ? 'Edit Course' : 'New Course'}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-700 text-xl">✕</button>
            </div>
            <form onSubmit={submit} className="p-6 space-y-4">
              {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">{error}</div>}
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Title *</label>
                  <input name="title" value={form.title} onChange={set} required className="input-field" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Tagline</label>
                  <input name="tagline" value={form.tagline} onChange={set} className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
                  <select name="category" value={form.category} onChange={set} className="input-field">
                    <option value="">Select…</option>
                    {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Duration</label>
                  <input name="duration" value={form.duration} onChange={set} className="input-field" placeholder="e.g. 3 Months" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Level</label>
                  <select name="level" value={form.level} onChange={set} className="input-field">
                    {['Beginner','Intermediate','Advanced'].map(l => <option key={l}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Mode</label>
                  <select name="mode" value={form.mode} onChange={set} className="input-field">
                    {['Online','Offline','Hybrid'].map(m => <option key={m}>{m}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Thumbnail URL</label>
                  <input name="thumbnail" value={form.thumbnail} onChange={set} className="input-field" placeholder="https://…" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                  <textarea name="description" value={form.description} onChange={set} rows={3} className="input-field resize-none" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Highlights (one per line)</label>
                  <textarea name="highlights" value={form.highlights} onChange={set} rows={3} className="input-field resize-none" placeholder="You'll learn React&#10;Work with real APIs&#10;Build 5 projects" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Tools & Technologies (comma separated)</label>
                  <input name="tools" value={form.tools} onChange={set} className="input-field" placeholder="React, Node.js, MongoDB" />
                </div>
                <div className="flex items-center gap-5">
                  <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input type="checkbox" name="isActive" checked={form.isActive} onChange={set} className="rounded" />
                    Active
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={set} className="rounded" />
                    Featured
                  </label>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
                  {saving ? 'Saving…' : editing ? 'Update Course' : 'Create Course'}
                </button>
                <button type="button" onClick={closeModal} className="text-sm text-gray-500 hover:text-gray-800 px-4">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

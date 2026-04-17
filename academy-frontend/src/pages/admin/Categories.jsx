import { useState, useEffect } from 'react'
import api from '../../api/axios'

// ─── Generic CRUD table hook ────────────────────────────────────
function useCRUD(endpoint) {
  const [items,   setItems]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  const load = () => {
    setLoading(true)
    api.get(endpoint).then(r => setItems(r.data)).catch(() => {}).finally(() => setLoading(false))
  }
  useEffect(load, [endpoint])

  const create = async (data) => { await api.post(endpoint, data);  load() }
  const update = async (id, data) => { await api.put(`${endpoint}/${id}`, data); load() }
  const remove = async (id) => { if (!confirm('Delete?')) return; await api.delete(`${endpoint}/${id}`); load() }

  return { items, loading, error, load, create, update, remove }
}

// ─── Simple modal helper ─────────────────────────────────────────
function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-lg my-8 shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-xl">✕</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────
export function AdminCategories() {
  const { items, loading, create, update, remove } = useCRUD('/admin/categories')
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name: '', icon: '', isActive: true })

  const open = (item = null) => {
    setEditing(item)
    setForm(item ? { name: item.name, icon: item.icon || '', isActive: item.isActive } : { name: '', icon: '', isActive: true })
    setModal(true)
  }
  const submit = async e => {
    e.preventDefault()
    if (editing) await update(editing._id, form); else await create(form)
    setModal(false)
  }
  const set = e => setForm(p => ({ ...p, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">Categories</h1>
        <button onClick={() => open()} className="btn-primary">+ Add Category</button>
      </div>
      {loading ? <p className="text-gray-400 text-sm">Loading…</p> : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b"><tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Name</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Slug</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Status</th>
              <th className="px-4 py-3" />
            </tr></thead>
            <tbody>
              {items.map(i => (
                <tr key={i._id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-xs">{i.icon} {i.name}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{i.slug}</td>
                  <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full ${i.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{i.isActive ? 'Active' : 'Inactive'}</span></td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => open(i)} className="text-xs text-blue-600 hover:underline mr-3">Edit</button>
                    <button onClick={() => remove(i._id)} className="text-xs text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {items.length === 0 && <p className="text-center py-8 text-gray-400 text-sm">No categories yet.</p>}
        </div>
      )}
      {modal && (
        <Modal title={editing ? 'Edit Category' : 'New Category'} onClose={() => setModal(false)}>
          <form onSubmit={submit} className="space-y-4">
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Name *</label>
              <input name="name" value={form.name} onChange={set} required className="input-field" /></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Icon (emoji)</label>
              <input name="icon" value={form.icon} onChange={set} className="input-field" placeholder="💻" /></div>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" name="isActive" checked={form.isActive} onChange={set} />Active
            </label>
            <button type="submit" className="btn-primary">{editing ? 'Update' : 'Create'}</button>
          </form>
        </Modal>
      )}
    </div>
  )
}
export default AdminCategories

// ────────────────────────────────────────────────────────────────
export function AdminFAQs() {
  const { items, loading, create, update, remove } = useCRUD('/admin/faqs')
  const [modal, setModal]   = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ question: '', answer: '', category: 'General', isActive: true, sortOrder: 0 })

  const open = (item = null) => {
    setEditing(item)
    setForm(item ? { question: item.question, answer: item.answer, category: item.category || 'General', isActive: item.isActive, sortOrder: item.sortOrder || 0 } : { question: '', answer: '', category: 'General', isActive: true, sortOrder: 0 })
    setModal(true)
  }
  const submit = async e => {
    e.preventDefault()
    if (editing) await update(editing._id, form); else await create(form)
    setModal(false)
  }
  const set = e => setForm(p => ({ ...p, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">FAQs</h1>
        <button onClick={() => open()} className="btn-primary">+ Add FAQ</button>
      </div>
      {loading ? <p className="text-gray-400 text-sm">Loading…</p> : (
        <div className="space-y-2">
          {items.map(i => (
            <div key={i._id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="font-medium text-sm text-gray-900 mb-1">{i.question}</p>
                <p className="text-xs text-gray-500 line-clamp-2">{i.answer}</p>
                <span className="text-xs text-blue-500 mt-1 inline-block">{i.category}</span>
              </div>
              <div className="flex gap-3 shrink-0">
                <button onClick={() => open(i)} className="text-xs text-blue-600 hover:underline">Edit</button>
                <button onClick={() => remove(i._id)} className="text-xs text-red-500 hover:underline">Delete</button>
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="text-gray-400 text-sm text-center py-10">No FAQs yet.</p>}
        </div>
      )}
      {modal && (
        <Modal title={editing ? 'Edit FAQ' : 'New FAQ'} onClose={() => setModal(false)}>
          <form onSubmit={submit} className="space-y-4">
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Question *</label>
              <input name="question" value={form.question} onChange={set} required className="input-field" /></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Answer *</label>
              <textarea name="answer" value={form.answer} onChange={set} required rows={4} className="input-field resize-none" /></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
              <input name="category" value={form.category} onChange={set} className="input-field" placeholder="General" /></div>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" name="isActive" checked={form.isActive} onChange={set} />Active
            </label>
            <button type="submit" className="btn-primary">{editing ? 'Update' : 'Create'}</button>
          </form>
        </Modal>
      )}
    </div>
  )
}

// ────────────────────────────────────────────────────────────────
export function AdminTestimonials() {
  const { items, loading, create, update, remove } = useCRUD('/admin/testimonials')
  const [modal, setModal]   = useState(false)
  const [editing, setEditing] = useState(null)
  const EMPTY = { name: '', role: '', course: '', content: '', rating: 5, isApproved: false }
  const [form, setForm] = useState(EMPTY)

  const open = (item = null) => {
    setEditing(item)
    setForm(item ? { name: item.name, role: item.role || '', course: item.course || '', content: item.content, rating: item.rating || 5, isApproved: item.isApproved } : EMPTY)
    setModal(true)
  }
  const submit = async e => {
    e.preventDefault()
    if (editing) await update(editing._id, form); else await create(form)
    setModal(false)
  }
  const set = e => setForm(p => ({ ...p, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">Testimonials</h1>
        <button onClick={() => open()} className="btn-primary">+ Add Testimonial</button>
      </div>
      {loading ? <p className="text-gray-400 text-sm">Loading…</p> : (
        <div className="grid md:grid-cols-2 gap-4">
          {items.map(i => (
            <div key={i._id} className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-sm text-gray-900">{i.name}</p>
                  <p className="text-xs text-gray-400">{i.role} {i.course ? `· ${i.course}` : ''}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${i.isApproved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {i.isApproved ? 'Approved' : 'Pending'}
                </span>
              </div>
              <div className="text-yellow-400 text-xs mb-2">{'★'.repeat(i.rating || 5)}</div>
              <p className="text-xs text-gray-600 line-clamp-3 mb-3">"{i.content}"</p>
              <div className="flex gap-3">
                <button onClick={() => open(i)} className="text-xs text-blue-600 hover:underline">Edit</button>
                <button onClick={() => remove(i._id)} className="text-xs text-red-500 hover:underline">Delete</button>
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="text-gray-400 text-sm col-span-2 text-center py-10">No testimonials yet.</p>}
        </div>
      )}
      {modal && (
        <Modal title={editing ? 'Edit Testimonial' : 'New Testimonial'} onClose={() => setModal(false)}>
          <form onSubmit={submit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Name *</label>
                <input name="name" value={form.name} onChange={set} required className="input-field" /></div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Role</label>
                <input name="role" value={form.role} onChange={set} className="input-field" placeholder="e.g. Software Engineer" /></div>
            </div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Course</label>
              <input name="course" value={form.course} onChange={set} className="input-field" placeholder="e.g. Full Stack Development" /></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Testimonial *</label>
              <textarea name="content" value={form.content} onChange={set} required rows={4} className="input-field resize-none" /></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Rating</label>
              <select name="rating" value={form.rating} onChange={set} className="input-field w-auto">
                {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} ★</option>)}
              </select>
            </div>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" name="isApproved" checked={form.isApproved} onChange={set} />Approve (shows on site)
            </label>
            <button type="submit" className="btn-primary">{editing ? 'Update' : 'Create'}</button>
          </form>
        </Modal>
      )}
    </div>
  )
}

// ────────────────────────────────────────────────────────────────
export function AdminGallery() {
  const { items, loading, create, remove } = useCRUD('/admin/gallery')
  const [modal, setModal] = useState(false)
  const [form, setForm]   = useState({ imageUrl: '', title: '', category: '', isActive: true })

  const set = e => setForm(p => ({ ...p, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))
  const submit = async e => {
    e.preventDefault()
    await create(form)
    setModal(false); setForm({ imageUrl: '', title: '', category: '', isActive: true })
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">Gallery</h1>
        <button onClick={() => setModal(true)} className="btn-primary">+ Add Image</button>
      </div>
      {loading ? <p className="text-gray-400 text-sm">Loading…</p> : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map(i => (
            <div key={i._id} className="relative group rounded-xl overflow-hidden border border-gray-100">
              <img src={i.imageUrl} alt={i.title} className="w-full aspect-square object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                {i.title && <p className="text-white text-xs text-center">{i.title}</p>}
                <button onClick={() => remove(i._id)} className="text-red-300 text-xs hover:text-white">Delete</button>
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="text-gray-400 text-sm col-span-4 text-center py-10">No gallery images yet.</p>}
        </div>
      )}
      {modal && (
        <Modal title="Add Gallery Image" onClose={() => setModal(false)}>
          <form onSubmit={submit} className="space-y-4">
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Image URL *</label>
              <input name="imageUrl" value={form.imageUrl} onChange={set} required className="input-field" placeholder="https://…" /></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
              <input name="title" value={form.title} onChange={set} className="input-field" /></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
              <input name="category" value={form.category} onChange={set} className="input-field" placeholder="e.g. Campus, Events" /></div>
            <button type="submit" className="btn-primary">Add Image</button>
          </form>
        </Modal>
      )}
    </div>
  )
}

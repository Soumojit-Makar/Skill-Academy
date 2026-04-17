import { useState } from 'react'
import api from '../../api/axios'

export default function EnquiryForm({ courseId, courseName, source = 'home', onSuccess, dark = false }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', message: '',
    courseId: courseId || '', courseName: courseName || '',
  })
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)
  const [success, setSuccess] = useState(false)

  const set = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    setLoading(true); setError(null)
    try {
      await api.post('/enquiries', { ...form, source })
      setSuccess(true)
      onSuccess?.()
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally { setLoading(false) }
  }

  if (success) return (
    <div className="text-center py-6">
      <div className="text-5xl mb-3">✅</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">Enquiry Received!</h3>
      <p className="text-gray-500 text-sm">Check your email. We'll call you within 24 hours.</p>
    </div>
  )

  const inputCls = `w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
    dark ? 'bg-slate-800 border-slate-600 text-white placeholder-slate-400' : 'bg-white border-gray-200 text-gray-900'
  }`
  const labelCls = `block text-xs font-medium mb-1 ${dark ? 'text-slate-300' : 'text-gray-600'}`

  return (
    <form onSubmit={submit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-2.5 text-sm">{error}</div>
      )}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelCls}>Full Name *</label>
          <input name="name" value={form.name} onChange={set} required placeholder="Your name" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Phone *</label>
          <input name="phone" value={form.phone} onChange={set} required placeholder="+91 98765..." className={inputCls} />
        </div>
      </div>
      <div>
        <label className={labelCls}>Email *</label>
        <input type="email" name="email" value={form.email} onChange={set} required placeholder="you@email.com" className={inputCls} />
      </div>
      {!courseId && (
        <div>
          <label className={labelCls}>Course Interest</label>
          <input name="courseName" value={form.courseName} onChange={set} placeholder="Which course interests you?" className={inputCls} />
        </div>
      )}
      <div>
        <label className={labelCls}>Message</label>
        <textarea name="message" value={form.message} onChange={set} rows={3}
          placeholder="Tell us your goals or questions..." className={`${inputCls} resize-none`} />
      </div>
      <button type="submit" disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition-colors text-sm">
        {loading ? 'Sending…' : 'Get Free Counselling →'}
      </button>
      <p className="text-xs text-center text-gray-400">No spam. 100% confidential.</p>
    </form>
  )
}

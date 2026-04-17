import { useState, useEffect } from 'react'
import api from '../../api/axios'

export default function AdminSettings() {
  const [form, setForm] = useState({
    siteName: '', tagline: '', phone: '', email: '', address: '',
    adminNotificationEmail: '',
    socialLinks: { facebook: '', instagram: '', linkedin: '', youtube: '' },
    seo: { defaultTitle: '', defaultDescription: '', googleAnalyticsId: '' },
  })
  const [loading, setLoading] = useState(true)
  const [saving,  setSaving]  = useState(false)
  const [saved,   setSaved]   = useState(false)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    api.get('/admin/settings').then(r => {
      if (r.data) setForm(prev => ({ ...prev, ...r.data }))
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const set = (path, val) => {
    const keys = path.split('.')
    setForm(p => {
      const updated = { ...p }
      if (keys.length === 1) { updated[keys[0]] = val }
      else { updated[keys[0]] = { ...(updated[keys[0]] || {}), [keys[1]]: val } }
      return updated
    })
  }

  const submit = async e => {
    e.preventDefault(); setSaving(true); setError(null); setSaved(false)
    try {
      await api.put('/admin/settings', form)
      setSaved(true); setTimeout(() => setSaved(false), 2500)
    } catch (err) { setError(err.message || 'Failed to save') }
    finally { setSaving(false) }
  }

  if (loading) return <div className="p-8 text-gray-400 text-sm">Loading…</div>

  const Field = ({ label, name, type = 'text', placeholder }) => (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <input
        type={type}
        value={(name.includes('.') ? name.split('.').reduce((o, k) => o?.[k], form) : form[name]) || ''}
        onChange={e => set(name, e.target.value)}
        placeholder={placeholder}
        className="input-field"
      />
    </div>
  )

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-xl font-bold text-gray-900 mb-6">Site Settings</h1>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm mb-5">{error}</div>}
      {saved && <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-3 text-sm mb-5">✓ Settings saved successfully!</div>}

      <form onSubmit={submit} className="space-y-8">
        {/* General */}
        <section>
          <h2 className="text-sm font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-100">General</h2>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Site Name" name="siteName" placeholder="Academy" />
            <Field label="Tagline" name="tagline" placeholder="Learn. Grow. Succeed." />
            <Field label="Phone" name="phone" placeholder="+91 98765 43210" />
            <Field label="Contact Email" name="email" placeholder="hello@academy.com" />
            <div className="col-span-2">
              <Field label="Address" name="address" placeholder="123 Tech Park, Your City" />
            </div>
            <div className="col-span-2">
              <Field label="Admin Notification Email" name="adminNotificationEmail" placeholder="admin@academy.com" />
            </div>
          </div>
        </section>

        {/* Social */}
        <section>
          <h2 className="text-sm font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-100">Social Links</h2>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Facebook" name="socialLinks.facebook" placeholder="https://facebook.com/…" />
            <Field label="Instagram" name="socialLinks.instagram" placeholder="https://instagram.com/…" />
            <Field label="LinkedIn" name="socialLinks.linkedin" placeholder="https://linkedin.com/…" />
            <Field label="YouTube" name="socialLinks.youtube" placeholder="https://youtube.com/…" />
          </div>
        </section>

        {/* SEO */}
        <section>
          <h2 className="text-sm font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-100">SEO</h2>
          <div className="space-y-4">
            <Field label="Default Meta Title" name="seo.defaultTitle" placeholder="Academy — IT & Professional Training" />
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Default Meta Description</label>
              <textarea
                value={form.seo?.defaultDescription || ''}
                onChange={e => set('seo.defaultDescription', e.target.value)}
                rows={2}
                className="input-field resize-none"
                placeholder="Career-focused IT training with placement support."
              />
            </div>
            <Field label="Google Analytics ID" name="seo.googleAnalyticsId" placeholder="G-XXXXXXXXXX" />
          </div>
        </section>

        <div className="pt-2">
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50 px-8">
            {saving ? 'Saving…' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  )
}

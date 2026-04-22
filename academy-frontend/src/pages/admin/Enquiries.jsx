import { useState, useEffect, useCallback } from 'react'
import api from '../../api/axios'
import PageLoader from '../../components/ui/PageLoader'

const STATUS_OPTIONS = ['New','Contacted','Interested','Follow-up','Converted','Closed']
const QUALITY_BADGE = {
  Hot:  'bg-red-100 text-red-700',
  Warm: 'bg-yellow-100 text-yellow-700',
  Cold: 'bg-blue-100 text-blue-700',
}
const STATUS_BADGE = {
  New:        'bg-purple-100 text-purple-700',
  Contacted:  'bg-blue-100 text-blue-700',
  Interested: 'bg-yellow-100 text-yellow-700',
  'Follow-up':'bg-orange-100 text-orange-700',
  Converted:  'bg-green-100 text-green-700',
  Closed:     'bg-gray-100 text-gray-500',
}

export default function AdminEnquiries() {
  const [enquiries,   setEnquiries]   = useState([])
  const [selected,    setSelected]    = useState(null)
  const [total,       setTotal]       = useState(0)
  const [loading,     setLoading]     = useState(true)
  const [initialLoad, setInitialLoad] = useState(true)
  const [filter,      setFilter]      = useState({ status: '', search: '', page: 1 })

  const fetchEnquiries = useCallback(async () => {
    setLoading(true)
    try {
      const p = new URLSearchParams()
      if (filter.status) p.set('status', filter.status)
      if (filter.search) p.set('search', filter.search)
      p.set('page', filter.page)
      p.set('limit', 25)
      const res = await api.get(`/admin/enquiries?${p}`)
      setEnquiries(res.data)
      setTotal(res.total)
    } catch {}
    finally { setLoading(false); setInitialLoad(false) }
  }, [filter])

  useEffect(() => { fetchEnquiries() }, [fetchEnquiries])

   if (initialLoad && loading) return <p className="min-h-screen flex items-center justify-center" >Loading…</p>

  const updateStatus = async (id, status) => {
    await api.patch(`/admin/enquiries/${id}`, { status })
    fetchEnquiries()
    setSelected(p => p?._id === id ? { ...p, status } : p)
  }

  const exportCSV = () => {
    window.open(`${import.meta.env.VITE_API_URL}/admin/enquiries/export`, '_blank')
  }

  return (
    <div className="flex h-full overflow-hidden">
      {/* ── LEFT LIST ── */}
      <div className="w-full lg:w-96 border-r border-gray-100 flex flex-col bg-white shrink-0">
        <div className="p-4 border-b border-gray-100 space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 text-sm">Enquiries ({total})</h2>
            <button onClick={exportCSV} className="text-xs text-blue-600 hover:underline font-medium">
              ↓ Export CSV
            </button>
          </div>
          <input
            placeholder="Search name, email, phone…"
            value={filter.search}
            onChange={e => setFilter(p => ({ ...p, search: e.target.value, page: 1 }))}
            className="input-field text-xs py-2"
          />
          <select
            value={filter.status}
            onChange={e => setFilter(p => ({ ...p, status: e.target.value, page: 1 }))}
            className="input-field text-xs py-2 w-full"
          >
            <option value="">All Statuses</option>
            {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-6 text-center text-gray-400 text-sm">Loading…</div>
          ) : enquiries.length === 0 ? (
            <div className="p-6 text-center text-gray-400 text-sm">No enquiries found</div>
          ) : enquiries.map(e => (
            <button
              key={e._id}
              onClick={() => setSelected(e)}
              className={`w-full text-left px-4 py-3.5 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                selected?._id === e._id ? 'bg-blue-50 border-l-2 border-l-blue-600' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-gray-900 text-xs truncate mr-2">{e.name}</span>
                {e.aiSummary?.leadQuality && (
                  <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full shrink-0 ${QUALITY_BADGE[e.aiSummary.leadQuality]}`}>
                    {e.aiSummary.leadQuality}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400 truncate mb-1">{e.email}</p>
              <p className="text-xs text-gray-500 mb-1.5">{e.courseName || 'General enquiry'}</p>
              <div className="flex items-center justify-between">
                <span className={`text-xs px-1.5 py-0.5 rounded ${STATUS_BADGE[e.status] || 'bg-gray-100 text-gray-500'}`}>
                  {e.status}
                </span>
                <span className="text-xs text-gray-400">{new Date(e.createdAt).toLocaleDateString()}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── RIGHT DETAIL ── */}
      <div className="flex-1 overflow-y-auto">
        {selected ? (
          <EnquiryDetail
            enquiry={selected}
            onStatusChange={updateStatus}
            onRefresh={fetchEnquiries}
          />
        ) : (
          <div className="hidden lg:flex h-full items-center justify-center flex-col gap-3 text-gray-300">
            <span className="text-6xl">📋</span>
            <p className="text-sm">Select an enquiry to view details</p>
          </div>
        )}
      </div>
    </div>
  )
}

function EnquiryDetail({ enquiry, onStatusChange, onRefresh }) {
  const [notes,   setNotes]   = useState(enquiry.counselorNotes || '')
  const [saving,  setSaving]  = useState(false)
  const [saved,   setSaved]   = useState(false)
  const [followUp, setFollowUp] = useState(enquiry.followUpDate?.slice(0, 10) || '')

  // sync when enquiry changes
  useEffect(() => {
    setNotes(enquiry.counselorNotes || '')
    setFollowUp(enquiry.followUpDate?.slice(0, 10) || '')
  }, [enquiry._id])

  const saveNotes = async () => {
    setSaving(true); setSaved(false)
    try {
      await api.patch(`/admin/enquiries/${enquiry._id}`, {
        counselorNotes: notes,
        followUpDate: followUp || undefined,
      })
      setSaved(true)
      onRefresh()
      setTimeout(() => setSaved(false), 2000)
    } catch {}
    finally { setSaving(false) }
  }

  return (
    <div className="p-6 space-y-5 max-w-2xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{enquiry.name}</h2>
          <p className="text-sm text-gray-500 mt-0.5">{enquiry.email} · {enquiry.phone}</p>
        </div>
        <select
          value={enquiry.status}
          onChange={e => onStatusChange(enquiry._id, e.target.value)}
          className="input-field w-auto text-sm py-2"
        >
          {['New','Contacted','Interested','Follow-up','Converted','Closed'].map(s =>
            <option key={s}>{s}</option>
          )}
        </select>
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          ['Course',  enquiry.courseName || '—'],
          ['Source',  enquiry.source],
          ['Lead',    enquiry.aiSummary?.leadQuality || '—'],
          ['Admin Mail',   enquiry.adminMailSent   ? '✅ Sent' : '❌ Pending'],
          ['Student Mail', enquiry.studentMailSent ? '✅ Sent' : '❌ Pending'],
          ['Received', new Date(enquiry.createdAt).toLocaleDateString()],
        ].map(([label, val]) => (
          <div key={label} className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-400 mb-0.5">{label}</p>
            <p className="text-sm font-medium text-gray-800 capitalize">{val}</p>
          </div>
        ))}
      </div>

      {/* Message */}
      {enquiry.message && (
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-1 font-medium">Student Message</p>
          <p className="text-sm text-gray-700 leading-relaxed">{enquiry.message}</p>
        </div>
      )}

      {/* AI Summary */}
      {enquiry.aiSummary && !enquiry.aiSummary.error && enquiry.aiSummary.studentIntent && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
          <h3 className="text-sm font-bold text-blue-800 mb-3 flex items-center gap-2">
            🤖 AI Lead Analysis
          </h3>
          <div className="space-y-3">
            {[
              ['Student Intent',     enquiry.aiSummary.studentIntent],
              ['Course Interest',    enquiry.aiSummary.courseInterest],
              ['Suggested Tone',     enquiry.aiSummary.suggestedTone],
              ['Recommended Action', enquiry.aiSummary.actionRecommendation],
            ].filter(([, v]) => v).map(([label, val]) => (
              <div key={label}>
                <p className="text-xs font-semibold text-blue-400 uppercase tracking-wide mb-0.5">{label}</p>
                <p className="text-sm text-blue-900">{val}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {enquiry.aiSummary?.error && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-xs text-orange-700">
          ⚠️ AI analysis failed: {enquiry.aiSummary.error}
        </div>
      )}

      {/* Counselor notes */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Counselor Notes</label>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          rows={4}
          className="input-field resize-none text-sm"
          placeholder="Add call notes, follow-up outcomes, or reminders…"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Follow-up Date</label>
        <input
          type="date"
          value={followUp}
          onChange={e => setFollowUp(e.target.value)}
          className="input-field w-auto"
        />
      </div>

      <button
        onClick={saveNotes}
        disabled={saving}
        className="btn-primary disabled:opacity-50"
      >
        {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Notes'}
      </button>
    </div>
  )
}

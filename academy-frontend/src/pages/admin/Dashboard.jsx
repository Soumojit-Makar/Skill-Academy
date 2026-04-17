import { useEffect, useState } from 'react'
import api from '../../api/axios'

const STATUS_COLORS = {
  New: 'bg-purple-100 text-purple-700',
  Contacted: 'bg-blue-100 text-blue-700',
  Interested: 'bg-yellow-100 text-yellow-700',
  'Follow-up': 'bg-orange-100 text-orange-700',
  Converted: 'bg-green-100 text-green-700',
  Closed: 'bg-gray-100 text-gray-500',
}
const QUALITY_COLORS = {
  Hot: 'bg-red-100 text-red-700',
  Warm: 'bg-yellow-100 text-yellow-700',
  Cold: 'bg-blue-100 text-blue-700',
}

export default function AdminDashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/admin/dashboard')
      .then(r => setData(r.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="p-8 flex items-center justify-center min-h-64 text-gray-400 text-sm">
      Loading dashboard…
    </div>
  )

  if (!data) return (
    <div className="p-8 text-red-500 text-sm">Failed to load dashboard. Check API connection.</div>
  )

  const { totalEnquiries, statusCounts, leadQualityCounts, courseWise, recent } = data

  const statusMap  = Object.fromEntries((statusCounts  || []).map(s => [s._id, s.count]))
  const qualityMap = Object.fromEntries((leadQualityCounts || []).map(s => [s._id, s.count]))

  return (
    <div className="p-6 max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-0.5">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Enquiries', value: totalEnquiries,           bg: 'bg-blue-50',   text: 'text-blue-700' },
          { label: 'New Today',       value: statusMap['New'] || 0,    bg: 'bg-purple-50', text: 'text-purple-700' },
          { label: 'Converted',       value: statusMap['Converted'] || 0, bg: 'bg-green-50', text: 'text-green-700' },
          { label: 'Hot Leads',       value: qualityMap['Hot'] || 0,   bg: 'bg-red-50',    text: 'text-red-700' },
        ].map(s => (
          <div key={s.label} className={`${s.bg} rounded-xl p-5`}>
            <p className={`text-xs font-medium ${s.text} opacity-70 mb-1`}>{s.label}</p>
            <p className={`text-3xl font-bold ${s.text}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Lead Funnel */}
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-5">Lead Funnel</h2>
          <div className="space-y-3">
            {['New','Contacted','Interested','Follow-up','Converted','Closed'].map(s => {
              const count = statusMap[s] || 0
              const pct   = totalEnquiries ? Math.round((count / totalEnquiries) * 100) : 0
              return (
                <div key={s} className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-24 shrink-0">{s}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-blue-500 h-2 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-xs font-medium text-gray-700 w-8 text-right">{count}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Lead Quality */}
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-5">Lead Quality</h2>
          <div className="space-y-3 mb-6">
            {['Hot','Warm','Cold'].map(q => {
              const count = qualityMap[q] || 0
              const pct   = totalEnquiries ? Math.round((count / totalEnquiries) * 100) : 0
              const bar   = { Hot: 'bg-red-400', Warm: 'bg-yellow-400', Cold: 'bg-blue-400' }
              return (
                <div key={q} className="flex items-center gap-3">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full w-14 text-center ${QUALITY_COLORS[q]}`}>{q}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div className={`${bar[q]} h-2 rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-xs font-medium text-gray-700 w-8 text-right">{count}</span>
                </div>
              )
            })}
          </div>

          <h2 className="text-sm font-semibold text-gray-900 mb-3">Top Courses by Leads</h2>
          <div className="space-y-1.5">
            {(courseWise || []).slice(0, 6).map(c => (
              <div key={c._id} className="flex items-center justify-between text-sm py-1">
                <span className="text-gray-600 truncate mr-3 text-xs">{c._id || 'Unspecified'}</span>
                <span className="font-semibold text-gray-800 shrink-0 text-xs">{c.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent enquiries */}
      <div className="bg-white border border-gray-100 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-900">Recent Enquiries</h2>
          <a href="/admin/enquiries" className="text-xs text-blue-600 hover:underline">View all →</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-medium text-gray-400 pb-2">Name</th>
                <th className="text-left text-xs font-medium text-gray-400 pb-2">Course</th>
                <th className="text-left text-xs font-medium text-gray-400 pb-2">Status</th>
                <th className="text-left text-xs font-medium text-gray-400 pb-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {(recent || []).map(e => (
                <tr key={e._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-2.5 font-medium text-gray-900 text-xs">{e.name}</td>
                  <td className="py-2.5 text-gray-500 text-xs">{e.courseName || 'General'}</td>
                  <td className="py-2.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[e.status] || 'bg-gray-100 text-gray-500'}`}>
                      {e.status}
                    </span>
                  </td>
                  <td className="py-2.5 text-gray-400 text-xs">{new Date(e.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

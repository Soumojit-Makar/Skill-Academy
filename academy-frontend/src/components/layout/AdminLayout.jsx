import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

const NAV = [
  { to: '/admin/dashboard',    label: 'Dashboard',     icon: '📊' },
  { to: '/admin/enquiries',    label: 'Enquiries',     icon: '📋' },
  { to: '/admin/courses',      label: 'Courses',       icon: '📚' },
  { to: '/admin/categories',   label: 'Categories',    icon: '🗂️' },
  { to: '/admin/blogs',        label: 'Blogs',         icon: '✍️' },
  { to: '/admin/testimonials', label: 'Testimonials',  icon: '⭐' },
  { to: '/admin/faqs',         label: 'FAQs',          icon: '❓' },
  { to: '/admin/gallery',      label: 'Gallery',       icon: '🖼️' },
  { to: '/admin/settings',     label: 'Settings',      icon: '⚙️' },
]

export default function AdminLayout() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = () => { logout(); navigate('/admin/login') }

  const Sidebar = () => (
    <aside className="w-56 bg-slate-900 text-white flex flex-col h-full">
      <div className="px-5 py-5 border-b border-slate-700">
        <p className="font-bold text-base">🎓 Academy CRM</p>
        <p className="text-slate-400 text-xs mt-0.5 capitalize">{user?.role}</p>
      </div>
      <nav className="flex-1 py-3 overflow-y-auto">
        {NAV.map(n => (
          <NavLink key={n.to} to={n.to}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <span className="text-base">{n.icon}</span>
            {n.label}
          </NavLink>
        ))}
      </nav>
      <div className="px-5 py-4 border-t border-slate-700">
        <p className="text-xs text-slate-400 truncate mb-1">{user?.name}</p>
        <p className="text-xs text-slate-500 truncate mb-2">{user?.email}</p>
        <button onClick={handleLogout}
          className="text-xs text-slate-400 hover:text-white transition-colors">
          Sign out →
        </button>
      </div>
    </aside>
  )

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-col shrink-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="flex flex-col shrink-0"><Sidebar /></div>
          <div className="flex-1 bg-black/50" onClick={() => setMobileOpen(false)} />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
          <button onClick={() => setMobileOpen(true)} className="text-gray-700 text-xl">☰</button>
          <p className="font-semibold text-sm text-gray-900">DigitalIndian Skillacademy CRM</p>
          <div />
        </div>
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const LINKS = [
  { to: '/',           label: 'Home' },
  { to: '/courses',    label: 'Courses' },
  { to: '/placements', label: 'Placements' },
  { to: '/blog',       label: 'Blog' },
  { to: '/gallery',    label: 'Gallery' },
  { to: '/about',      label: 'About' },
  { to: '/contact',    label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const dark = pathname === '/'

  return (
    <nav className={`sticky top-0 z-50 border-b ${dark ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className={`font-bold text-xl ${dark ? 'text-white' : 'text-gray-900'}`}>
          🎓 <span className="text-blue-500">DigitalIndian Skillacademy</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {LINKS.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-blue-500 bg-blue-50/10'
                    : dark ? 'text-slate-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`
              }
            >{l.label}</NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/contact" className="btn-primary text-xs">Free Counselling</Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(o => !o)}
          className={`md:hidden p-2 rounded ${dark ? 'text-white' : 'text-gray-700'}`}>
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className={`md:hidden border-t ${dark ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-100'}`}>
          {LINKS.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 text-sm font-medium border-b ${dark ? 'border-slate-700' : 'border-gray-50'} ${
                  isActive ? 'text-blue-500' : dark ? 'text-slate-300' : 'text-gray-700'
                }`
              }
            >{l.label}</NavLink>
          ))}
          <div className="p-4">
            <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary w-full text-center block">
              Free Counselling
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

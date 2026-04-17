import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <p className="font-bold text-white text-lg mb-3">🎓 Academy</p>
          <p className="text-sm leading-relaxed text-slate-400">
            Career-focused IT & professional training with placement support.
          </p>
        </div>
        <div>
          <p className="font-semibold text-white mb-3 text-sm">Courses</p>
          {['Full Stack Development','Data Analytics','Digital Marketing','UI/UX Design','AWS Cloud','AI Skills'].map(c => (
            <Link key={c} to="/courses" className="block text-sm text-slate-400 hover:text-white mb-1.5">{c}</Link>
          ))}
        </div>
        <div>
          <p className="font-semibold text-white mb-3 text-sm">Company</p>
          {[['About', '/about'],['Blog','/blog'],['Gallery','/gallery'],['Placements','/placements'],['Contact','/contact']].map(([l,h]) => (
            <Link key={l} to={h} className="block text-sm text-slate-400 hover:text-white mb-1.5">{l}</Link>
          ))}
        </div>
        <div>
          <p className="font-semibold text-white mb-3 text-sm">Contact</p>
          <p className="text-sm text-slate-400 mb-1.5">📞 +91 98765 43210</p>
          <p className="text-sm text-slate-400 mb-1.5">✉️ hello@academy.com</p>
          <p className="text-sm text-slate-400">📍 Your City, India</p>
          <div className="flex gap-3 mt-4">
            {['Facebook','Instagram','LinkedIn','YouTube'].map(s => (
              <a key={s} href="#" className="text-xs text-slate-500 hover:text-white transition-colors">{s[0]}</a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 px-4 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Academy. All rights reserved.
      </div>
    </footer>
  )
}

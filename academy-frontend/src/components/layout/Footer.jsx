import { Link } from "react-router-dom";
import LOGO from '../../assates/logo.png'
export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <p className="font-bold text-white text-lg mb-3">
            <img src={LOGO} alt="Logo" className="h-8 inline-block mr-2" />
            DigitalIndian Skillacademy
          </p>
          <p className="text-sm leading-relaxed text-slate-400">
            Career-focused IT & professional training with placement support.
          </p>
        </div>
        <div>
          <p className="font-semibold text-white mb-3 text-sm">Courses</p>
          {[
            "Full Stack Development",
            "Data Analytics",
            "Digital Marketing",
            "UI/UX Design",
            "AWS Cloud",
            "AI Skills",
          ].map((c) => (
            <Link
              key={c}
              to="/courses"
              className="block text-sm text-slate-400 hover:text-white mb-1.5"
            >
              {c}
            </Link>
          ))}
        </div>
        <div>
          <p className="font-semibold text-white mb-3 text-sm">Company</p>
          {[
            ["About", "/about"],
            ["Blog", "/blog"],
            ["Gallery", "/gallery"],
            ["Placements", "/placements"],
            ["Contact", "/contact"],
          ].map(([l, h]) => (
            <Link
              key={l}
              to={h}
              className="block text-sm text-slate-400 hover:text-white mb-1.5"
            >
              {l}
            </Link>
          ))}
        </div>
        <div>
          <p className="font-semibold text-white mb-3 text-sm">Contact</p>
          <p className="text-sm text-slate-400 mb-1.5">📞 9830640814 | 7908735132</p>
          <p className="text-sm text-slate-400 mb-1.5">
            ✉️ digitalindian.skillacademy@gmail.com
          </p>
          <p className="text-sm text-slate-400">
            📍 Digital Indian EN-9, Sector V,
            <br />   Salt Lake Kolkata,
            <br />   West Bengal India - 700091
          </p>
          <div className="flex gap-3 mt-4">
            {["Facebook", "Instagram", "LinkedIn", "YouTube"].map((s) => (
              <a
                key={s}
                href="#"
                className="text-xs text-slate-500 hover:text-white transition-colors"
              >
                {s[0]}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 px-4 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} DigitalIndian . All rights reserved.
      </div>
    </footer>
  );
}

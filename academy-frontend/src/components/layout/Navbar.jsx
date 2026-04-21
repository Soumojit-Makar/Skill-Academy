import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import LOGO from "../../assates/logo.png";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/courses", label: "Courses" },
  { to: "/placements", label: "Career" },
  { to: "/gallery", label: "Gallery" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const dark = pathname === "/";

  return (
    <nav className="sticky top-0 z-50 border-b bg-white border-gray-100">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-32">
        <Link
          to="/"
          className={`font-bold text-xl ${dark ? "text-white" : "text-gray-900"}`}
        >
          <img src={LOGO} alt="Logo" className="h-20 inline-block mr-2" />
          {/* <span className="text-blue-500">DigitalIndian Skillacademy</span> */}
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => {
            return (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                    isActive
                      ? "text-blue-500 bg-blue-50/10"
                      : "text-gray-600 hover:text-gray-900"
                  }`
                }
              >
                {l.label}
              </NavLink>
            );
          })}
        </div>

        {/* <div className="hidden md:flex items-center gap-3">
          <Link to="/contact" className="btn-primary text-xs">Free Counselling</Link>
        </div> */}

        <button
          onClick={() => setOpen((o) => !o)}
          className={`md:hidden p-2 rounded ${"text-gray-700"}`}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div
          className={`md:hidden border-t ${dark ? "bg-slate-900 border-slate-700" : "bg-white border-gray-100"}`}
        >
          {LINKS.map((l) => {
            const LinkIcon = l.icon;

            return (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 text-sm font-medium border-b flex items-center gap-2 ${
                    dark ? "border-slate-700" : "border-gray-50"
                  } ${
                    isActive
                      ? "text-blue-500"
                      : dark
                        ? "text-slate-300"
                        : "text-gray-700"
                  }`
                }
              >
                <LinkIcon size={18} />
                {l.label}
              </NavLink>
            );
          })}

          <div className="p-4">
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="btn-primary w-full text-center block"
            >
              Free Counselling
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

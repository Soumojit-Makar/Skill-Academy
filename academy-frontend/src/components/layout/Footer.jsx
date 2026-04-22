import { Link } from "react-router-dom";
import LOGO from '../../assates/logo.png'
import DIGITALINDIAN from '../../assates/digitalindan-logo.png'
import {Mail,Phone,MapIcon} from "lucide-react"
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="bg-slate-700 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 py-4 grid md:grid-cols-4 gap-8">
        <div>
          <p className="font-bold text-white text-lg mb-3">
            <img src={LOGO} alt="Logo" className="h-16 inline-block mr-2" />
          </p>
          <p className="text-sm leading-relaxed text-slate-400">
            A Unit of Digital Indian Business Solutions Pvt. Ltd
          </p>
           <p className="font-bold text-white text-lg mb-3">
            <img src={DIGITALINDIAN} alt="Digital Indian Logo" className="h-16 inline-block mr-2" />
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
          <p className="text-sm text-slate-400 mb-1.5"><Phone className="inline-block mr-1" size={16} color="white" /> 9830640814 | 7908735132</p>
          <p className="text-sm text-slate-400 mb-1.5">
            <Mail className="inline-block mr-1" size={16} color="white" />
             digitalindian.skillacademy@gmail.com
          </p>
          <p className="text-sm text-slate-400">
            <MapIcon className="inline-block mr-1" size={16} color="white" />
             Digital Indian EN-9, Sector V,Salt Lake Kolkata, West Bengal India - 700091
          </p>
          <div className="flex gap-3 mt-4">
              <a
                href="#"
                className="text-xs text-slate-500 hover:text-white transition-colors"
              >
                <FaFacebook size={16} />
              </a>
              <a
                href="#"
                className="text-xs text-slate-500 hover:text-white transition-colors"
              >
                <FaInstagram size={16} />
              </a>
              <a
                href="#"
                className="text-xs text-slate-500 hover:text-white transition-colors"
              >
                <FaLinkedin size={16} />
              </a>
              <a
                href="#"
                className="text-xs text-slate-500 hover:text-white transition-colors"
              >
                <FaYoutube size={16} />
              </a>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 px-4 py-2 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} DigitalIndian . All rights reserved.
      </div>
    </footer>
  );
}

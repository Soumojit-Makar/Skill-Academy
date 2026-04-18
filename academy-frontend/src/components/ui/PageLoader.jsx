/**
 * PageLoader — full-page loading screen shown while backend data is being fetched.
 * Usage:
 *   import PageLoader from '../components/ui/PageLoader'
 *   if (loading) return <PageLoader />
 *
 * Optional props:
 *   message  — override the default rotating tip texts
 *   label    — short label shown under the logo (default "Academy")
 */

const TIPS = [
  "Fetching your courses…",
  "Loading expert content…",
  "Preparing your dashboard…",
  "Almost there…",
];

import { useEffect, useState } from "react";
import logoSrc from "../../assates/logo-removebg.png";
export default function PageLoader({ message, label = "Digital Indian Skill Academy" }) {
  const [tipIndex, setTipIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (message) return; // don't rotate if caller provides a fixed message
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setTipIndex((i) => (i + 1) % TIPS.length);
        setFade(true);
      }, 300);
    }, 1800);
    return () => clearInterval(interval);
  }, [message]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');

        .pl-root {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0f172a 0%, #0c1e3e 50%, #0f172a 100%);
          font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
          overflow: hidden;
        }

        /* ── ambient glow blobs ── */
        .pl-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.18;
          animation: pl-drift 8s ease-in-out infinite alternate;
        }
        .pl-blob-1 {
          width: 380px; height: 380px;
          background: radial-gradient(circle, #3b82f6, transparent);
          top: -80px; left: -60px;
          animation-delay: 0s;
        }
        .pl-blob-2 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, #60a5fa, transparent);
          bottom: -60px; right: -40px;
          animation-delay: -4s;
        }
        .pl-blob-3 {
          width: 220px; height: 220px;
          background: radial-gradient(circle, #1d4ed8, transparent);
          top: 40%; left: 60%;
          animation-delay: -2s;
        }
        @keyframes pl-drift {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(30px, 20px) scale(1.12); }
        }

        /* ── grid overlay ── */
        .pl-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(59,130,246,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.07) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
        }

        /* ── logo mark ── */
        .pl-logo-wrap {
          position: relative;
          margin-bottom: 28px;
        }
        .pl-logo-ring {
          width: 80px; height: 80px;
          border-radius: 50%;
          border: 2px solid rgba(59,130,246,0.25);
          display: flex; align-items: center; justify-content: center;
          position: relative;
        }
        .pl-logo-ring::before {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 2px solid transparent;
          border-top-color: #3b82f6;
          border-right-color: #60a5fa;
          animation: pl-spin 1.4s linear infinite;
        }
        .pl-logo-ring::after {
          content: '';
          position: absolute;
          inset: -12px;
          border-radius: 50%;
          border: 1px solid transparent;
          border-bottom-color: rgba(59,130,246,0.35);
          animation: pl-spin 2.2s linear infinite reverse;
        }
        @keyframes pl-spin {
          to { transform: rotate(360deg); }
        }
        .pl-logo-inner {
          width: 54px; height: 54px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1e40af, #2563eb);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 24px rgba(59,130,246,0.4);
        }
        .pl-logo-letter {
          color: #fff;
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -1px;
          line-height: 1;
        }

        /* ── label ── */
        .pl-label {
          color: #e2e8f0;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 0.04em;
          margin-bottom: 6px;
        }
        .pl-sublabel {
          color: #64748b;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          margin-bottom: 36px;
        }

        /* ── progress bar ── */
        .pl-bar-track {
          width: 200px;
          height: 3px;
          border-radius: 999px;
          background: rgba(59,130,246,0.15);
          overflow: hidden;
          margin-bottom: 20px;
        }
        .pl-bar-fill {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, #2563eb, #60a5fa, #93c5fd);
          background-size: 200% 100%;
          animation: pl-shimmer 1.6s ease-in-out infinite;
          width: 45%;
        }
        @keyframes pl-shimmer {
          0%   { background-position: 200% center; width: 20%; }
          50%  { width: 70%; }
          100% { background-position: -200% center; width: 20%; }
        }

        /* ── rotating tip text ── */
        .pl-tip {
          color: #94a3b8;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.01em;
          transition: opacity 0.3s ease;
          min-height: 20px;
          text-align: center;
        }
        .pl-tip.hidden { opacity: 0; }
        .pl-tip.visible { opacity: 1; }

        /* ── dots ── */
        .pl-dots {
          display: flex; gap: 6px;
          margin-top: 24px;
        }
        .pl-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #3b82f6;
          animation: pl-bounce 1.2s ease-in-out infinite;
        }
        .pl-dot:nth-child(1) { animation-delay: 0s; }
        .pl-dot:nth-child(2) { animation-delay: 0.2s; }
        .pl-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes pl-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40%            { transform: translateY(-8px); opacity: 1; }
        }

        /* ── particles ── */
        .pl-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .pl-particle {
          position: absolute;
          width: 2px; height: 2px;
          border-radius: 50%;
          background: #60a5fa;
          opacity: 0;
          animation: pl-float var(--dur) ease-in-out infinite;
          animation-delay: var(--delay);
          left: var(--x);
          bottom: -10px;
        }
        @keyframes pl-float {
          0%   { transform: translateY(0) scale(0); opacity: 0; }
          10%  { opacity: 0.6; transform: translateY(-20px) scale(1); }
          90%  { opacity: 0.2; }
          100% { transform: translateY(-120vh) scale(0.3); opacity: 0; }
        }
      `}</style>

      <div className="pl-root">
        {/* Background layers */}
        <div className="pl-grid" />
        <div className="pl-blob pl-blob-1" />
        <div className="pl-blob pl-blob-2" />
        <div className="pl-blob pl-blob-3" />

        {/* Floating particles */}
        <div className="pl-particles">
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className="pl-particle"
              style={{
                "--x": `${Math.random() * 100}%`,
                "--dur": `${4 + Math.random() * 6}s`,
                "--delay": `${Math.random() * 6}s`,
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <div className="pl-logo-wrap">
          <div className="pl-logo-ring">
            <div className="pl-logo-inner">
              <span className="pl-logo-letter">
                <img src={logoSrc} alt="Logo" />
              </span>
            </div>
          </div>
        </div>

        <div className="pl-label">{label}</div>
        <div className="pl-sublabel">Learning Platform</div>

        <div className="pl-bar-track">
          <div className="pl-bar-fill" />
        </div>

        <div className={`pl-tip ${fade ? "visible" : "hidden"}`}>
          {message ?? TIPS[tipIndex]}
        </div>

        <div className="pl-dots">
          <div className="pl-dot" />
          <div className="pl-dot" />
          <div className="pl-dot" />
        </div>
      </div>
    </>
  );
}

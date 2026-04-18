import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import EnquiryForm from "../../components/forms/EnquiryForm";
import CourseCard from "../../components/sections/CourseCard";
import PageLoader from "../../components/ui/PageLoader";
import bannerImg from "../../assates/banner.png";
const BENEFITS = [
  {
    icon: "🎯",
    title: "Career-Focused Curriculum",
    desc: "Every course designed with industry requirements and real job roles in mind.",
  },
  {
    icon: "👨‍💼",
    title: "Expert Trainers",
    desc: "Learn from professionals with 10+ years of industry experience.",
  },
  {
    icon: "🏆",
    title: "95% Placement Rate",
    desc: "Our dedicated placement team connects you with top companies.",
  },
  {
    icon: "💻",
    title: "Hands-On Projects",
    desc: "Build a portfolio with real-world projects and live case studies.",
  },
  {
    icon: "📜",
    title: "Industry Certifications",
    desc: "Earn certifications recognized by leading tech companies.",
  },
  {
    icon: "🔄",
    title: "Lifetime Access",
    desc: "Access course materials and updates for life after enrollment.",
  },
];

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get("/courses?limit=8"),
      api.get("/testimonials"),
      api.get("/faqs"),
    ])
      .then(([c, t, f]) => {
        setCourses(c.data);
        setTestimonials(t.data);
        setFaqs(f.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PageLoader message="Loading your courses & content…" />;

  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `url(${bannerImg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-xs font-semibold tracking-widest text-blue-400 uppercase mb-5 bg-blue-400/10 border border-blue-400/20 px-3 py-1 rounded-full">
              IT & Professional Training
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-5">
              Launch Your Tech Career with{" "}
              <span className="text-blue-400">Confidence</span>
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-lg">
              Industry-driven programs in Full Stack, Cloud, Data Analytics, AI
              & more. Placement assistance guaranteed.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/courses"
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-7 py-3 rounded-lg transition-colors"
              >
                Browse Courses
              </Link>
              <Link
                to="/placements"
                className="border border-white/30 hover:bg-white/10 text-white px-7 py-3 rounded-lg transition-colors"
              >
                See Placements
              </Link>
            </div>
            <div className="flex gap-6 mt-10">
              {[
                ["5000+", "Students"],
                ["50+", "Courses"],
                ["95%", "Placed"],
              ].map(([n, l]) => (
                <div key={l}>
                  <p className="text-2xl font-bold text-white">{n}</p>
                  <p className="text-slate-400 text-xs">{l}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-7 shadow-2xl">
            <h3 className="text-gray-900 text-xl font-bold mb-1">
              Get Free Career Guidance
            </h3>
            <p className="text-gray-400 text-sm mb-5">
              Talk to our counselor — no commitment needed
            </p>
            <EnquiryForm source="home" />
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-sky-400 py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
          {[
            ["5000+", "Students Trained"],
            ["50+", "Industry Courses"],
            ["95%", "Placement Rate"],
            ["10+", "Years Experience"],
          ].map(([n, l]) => (
            <div key={l}>
              <p className="text-3xl font-bold">{n}</p>
              <p className="text-blue-50 text-sm mt-1">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── COURSES ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Popular Courses
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Career-aligned programs designed by industry experts.
            </p>
          </div>
          {courses.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {courses.map((c) => (
                <CourseCard key={c._id} course={c} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 py-12">Courses loading…</p>
          )}
          <div className="text-center mt-10">
            <Link to="/courses" className="btn-outline">
              View All Courses →
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Why Choose Academy?
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              We don't just teach — we build careers.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                className="p-6 rounded-xl border border-gray-100 hover:border-blue-100 hover:shadow-sm transition-all"
              >
                <div className="text-3xl mb-3">{b.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{b.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      {testimonials.length > 0 && (
        <section className="py-20 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
              Student Success Stories
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.slice(0, 3).map((t) => (
                <div
                  key={t._id}
                  className="bg-white rounded-xl p-6 border border-blue-100 shadow-sm"
                >
                  <div className="flex gap-0.5 text-yellow-400 mb-3 text-sm">
                    {"★".repeat(t.rating || 5)}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">
                    "{t.content}"
                  </p>
                  <div className="flex items-center gap-3 pt-3 border-t border-gray-50">
                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        {t.name}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {t.role} {t.course ? `· ${t.course}` : ""}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      {faqs.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
              Frequently Asked Questions
            </h2>
            <div className="space-y-2">
              {faqs.slice(0, 8).map((faq) => (
                <div
                  key={faq._id}
                  className="border border-gray-100 rounded-xl overflow-hidden"
                >
                  <button
                    className="w-full text-left px-5 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
                    onClick={() =>
                      setOpenFaq(openFaq === faq._id ? null : faq._id)
                    }
                  >
                    <span className="font-medium text-gray-900 text-sm pr-4">
                      {faq.question}
                    </span>
                    <span className="text-gray-400 text-lg shrink-0">
                      {openFaq === faq._id ? "−" : "+"}
                    </span>
                  </button>
                  {openFaq === faq._id && (
                    <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-50 bg-gray-50 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA BANNER ── */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 text-white text-center">
        <h2 className="text-3xl font-bold mb-3">
          Ready to Start Your Career Journey?
        </h2>
        <p className="text-blue-100 mb-7 max-w-xl mx-auto">
          Join 5000+ students who transformed their careers with Academy.
        </p>
        <Link
          to="/contact"
          className="bg-white text-blue-700 font-bold px-8 py-3.5 rounded-lg hover:bg-blue-50 transition-colors inline-block"
        >
          Enroll Today — It's Free to Start →
        </Link>
      </section>
    </div>
  );
}

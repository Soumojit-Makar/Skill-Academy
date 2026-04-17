import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../../api/axios'
import EnquiryForm from '../../components/forms/EnquiryForm'
import PageLoader from '../../components/ui/PageLoader'

export default function CourseDetail() {
  const { slug } = useParams()
  const [course, setCourse]   = useState(null)
  const [loading, setLoading] = useState(true)
  const [openMod, setOpenMod] = useState(0)

  useEffect(() => {
    setLoading(true)
    api.get(`/courses/${slug}`)
      .then(r => setCourse(r.data))
      .catch(() => setCourse(null))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <PageLoader message="Loading course details…" />
  if (!course)  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-2xl">😕</p>
      <p className="font-medium text-gray-700">Course not found</p>
      <Link to="/courses" className="btn-primary">Browse All Courses</Link>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            {course.category && (
              <span className="inline-block bg-blue-500/20 text-blue-300 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                {course.category.name}
              </span>
            )}
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">{course.title}</h1>
            {course.tagline && <p className="text-blue-100 text-lg mb-5">{course.tagline}</p>}
            <div className="flex flex-wrap gap-4 text-sm text-slate-300">
              {course.duration && <span>⏱ {course.duration}</span>}
              {course.level    && <span>📊 {course.level}</span>}
              {course.mode     && <span>💻 {course.mode}</span>}
              {course.placementSupport && <span>🏆 Placement Support</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-10">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          {course.description && (
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About This Course</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{course.description}</p>
            </div>
          )}

          {/* Highlights */}
          {course.highlights?.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">What You'll Learn</h2>
              <ul className="grid md:grid-cols-2 gap-3">
                {course.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-green-500 mt-0.5 shrink-0">✓</span>{h}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tools */}
          {course.tools?.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Tools & Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {course.tools.map((t, i) => (
                  <span key={i} className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-lg border border-blue-100">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Curriculum */}
          {course.curriculum?.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-5">Curriculum</h2>
              <div className="space-y-2">
                {course.curriculum.map((mod, i) => (
                  <div key={i} className="border border-gray-100 rounded-lg overflow-hidden">
                    <button className="w-full text-left px-5 py-3.5 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
                      onClick={() => setOpenMod(openMod === i ? -1 : i)}>
                      <div>
                        <span className="font-medium text-gray-900 text-sm">{mod.title}</span>
                        {mod.duration && <span className="text-xs text-gray-400 ml-2">{mod.duration}</span>}
                      </div>
                      <span className="text-gray-400">{openMod === i ? '−' : '+'}</span>
                    </button>
                    {openMod === i && mod.topics?.length > 0 && (
                      <ul className="px-5 py-3 space-y-1">
                        {mod.topics.map((t, j) => (
                          <li key={j} className="text-sm text-gray-600 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />{t}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* SIDEBAR — Enquiry */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Enroll in This Course</h3>
            <p className="text-sm text-gray-400 mb-5">Get a free counselling session</p>
            <EnquiryForm courseId={course._id} courseName={course.title} source="course" />
          </div>
        </div>
      </div>
    </div>
  )
}

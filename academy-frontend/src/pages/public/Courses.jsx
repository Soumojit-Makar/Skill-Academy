import { useState, useEffect } from 'react'
import api from '../../api/axios'
import CourseCard from '../../components/sections/CourseCard'
import PageLoader from '../../components/ui/PageLoader'

export default function Courses() {
  const [courses,    setCourses]    = useState([])
  const [categories, setCategories] = useState([])
  const [total,      setTotal]      = useState(0)
  const [pages,      setPages]      = useState(1)
  const [loading,    setLoading]    = useState(true)
  const [initialLoad, setInitialLoad] = useState(true)
  const [filter,     setFilter]     = useState({ search: '', category: '', level: '', page: 1 })

  useEffect(() => {
    api.get('/categories').then(r => setCategories(r.data)).catch(() => {})
  }, [])

  useEffect(() => {
    setLoading(true)
    const p = new URLSearchParams()
    if (filter.search)   p.set('search',   filter.search)
    if (filter.category) p.set('category', filter.category)
    if (filter.level)    p.set('level',    filter.level)
    p.set('page', filter.page)
    p.set('limit', 12)
    api.get(`/courses?${p}`).then(r => {
      setCourses(r.data); setTotal(r.total); setPages(r.pages)
    }).catch(() => {}).finally(() => { setLoading(false); setInitialLoad(false) })
  }, [filter])

  const setF = (key, val) => setFilter(p => ({ ...p, [key]: val, page: 1 }))

  if (initialLoad && loading) return <PageLoader message="Loading all courses…" />

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-900 to-blue-500 text-white py-12 text-center px-4">
        <h1 className="text-4xl font-bold mb-3">All Courses</h1>
        <p className="text-blue-200 max-w-lg mx-auto">Find the right program to advance your career.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8 bg-white p-4 rounded-xl border border-gray-100">
          <input
            placeholder="Search courses…"
            value={filter.search}
            onChange={e => setF('search', e.target.value)}
            className="input-field flex-1 min-w-[180px]"
          />
          <select value={filter.category} onChange={e => setF('category', e.target.value)}
            className="input-field w-auto">
            <option value="">All Categories</option>
            {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
          <select value={filter.level} onChange={e => setF('level', e.target.value)}
            className="input-field w-auto">
            <option value="">All Levels</option>
            {['Beginner','Intermediate','Advanced'].map(l => <option key={l}>{l}</option>)}
          </select>
          {(filter.search || filter.category || filter.level) && (
            <button onClick={() => setFilter({ search: '', category: '', level: '', page: 1 })}
              className="text-sm text-gray-500 hover:text-gray-800 px-3">
              Clear ✕
            </button>
          )}
        </div>

        <p className="text-sm text-gray-400 mb-6">{total} course{total !== 1 ? 's' : ''} found</p>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 h-64 animate-pulse" />
            ))}
          </div>
        ) : courses.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {courses.map(c => <CourseCard key={c._id} course={c} />)}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg font-medium">No courses found</p>
            <p className="text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            {[...Array(pages)].map((_, i) => (
              <button key={i} onClick={() => setFilter(p => ({ ...p, page: i + 1 }))}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                  filter.page === i + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300'
                }`}>
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

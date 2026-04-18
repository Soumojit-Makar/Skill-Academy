import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/axios'
import PageLoader from '../../components/ui/PageLoader'

export default function Blogs() {
  const [blogs,   setBlogs]   = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage]       = useState(1)
  const [total, setTotal]     = useState(0)
  const [initialLoad, setInitialLoad] = useState(true)

  useEffect(() => {
    setLoading(true)
    api.get(`/blogs?page=${page}&limit=9`)
      .then(r => { setBlogs(r.data); setTotal(r.total) })
      .catch(() => {})
      .finally(() => { setLoading(false); setInitialLoad(false) })
  }, [page])

  if (initialLoad && loading) return <PageLoader message="Fetching latest blog posts…" />

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-sky-900 to-blue-500 text-white py-12 text-center px-4">
        <h1 className="text-4xl font-bold mb-3">Blog</h1>
        <p className="text-blue-200">Insights on tech, careers, and industry trends.</p>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[...Array(6)].map((_,i) => <div key={i} className="bg-white rounded-xl h-72 animate-pulse border border-gray-100" />)}
          </div>
        ) : blogs.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {blogs.map(b => (
              <Link key={b._id} to={`/blog/${b.slug}`}
                className="group bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all overflow-hidden flex flex-col">
                {b.thumbnail && (
                  <div className="aspect-video overflow-hidden">
                    <img src={b.thumbnail} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                )}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {b.tags?.slice(0,2).map(t => (
                      <span key={t} className="bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded">{t}</span>
                    ))}
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">{b.title}</h3>
                  {b.excerpt && <p className="text-gray-500 text-sm leading-relaxed flex-1 line-clamp-2">{b.excerpt}</p>}
                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-gray-50 text-xs text-gray-400">
                    <span>{b.author?.name}</span>
                    <span>{b.publishedAt ? new Date(b.publishedAt).toLocaleDateString() : ''}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-4">📝</div>
            <p>No blog posts yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  )
}

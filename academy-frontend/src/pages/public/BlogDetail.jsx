import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../../api/axios'
// import PageLoader from '../../components/ui/PageLoader'

export default function BlogDetail() {
  const { slug } = useParams()
  const [blog, setBlog]     = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/blogs/${slug}`)
      .then(r => setBlog(r.data))
      .catch(() => setBlog(null))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <p className="min-h-screen flex items-center justify-center">Loading...</p>
  if (!blog)   return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-2xl">😕</p><p className="text-gray-700">Post not found</p>
      <Link to="/blog" className="btn-primary">Back to Blog</Link>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-sky-900 to-blue-500 text-white py-12 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <Link to="/blog" className="text-blue-300 text-sm hover:text-white mb-4 inline-block">← Back to Blog</Link>
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags?.map(t => <span key={t} className="bg-blue-500/20 text-blue-300 text-xs px-2 py-0.5 rounded">{t}</span>)}
          </div>
          <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
          <div className="flex items-center gap-3 text-blue-200 text-sm">
            <span>✍️ {blog.author?.name}</span>
            {blog.publishedAt && <span>· {new Date(blog.publishedAt).toLocaleDateString('en-IN', { year:'numeric',month:'long',day:'numeric' })}</span>}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        {blog.thumbnail && (
          <img src={blog.thumbnail} alt={blog.title}
            className="w-full rounded-xl mb-8 border border-gray-100 shadow-sm" />
        )}
        {blog.content ? (
          <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.content }} />
        ) : (
          <p className="text-gray-500 italic">Content coming soon…</p>
        )}
      </div>
    </div>
  )
}

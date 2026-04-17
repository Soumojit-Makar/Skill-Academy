import { useState, useEffect } from 'react'
import api from '../../api/axios'

export default function Gallery() {
  const [items,   setItems]   = useState([])
  const [loading, setLoading] = useState(true)
  const [preview, setPreview] = useState(null)

  useEffect(() => {
    api.get('/gallery').then(r => setItems(r.data)).catch(() => {}).finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white py-16 text-center px-4">
        <h1 className="text-4xl font-bold mb-3">Gallery</h1>
        <p className="text-blue-200">A glimpse of life at Academy.</p>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[...Array(8)].map((_,i) => <div key={i} className="aspect-square bg-gray-200 animate-pulse rounded-lg" />)}
          </div>
        ) : items.length > 0 ? (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
            {items.map(item => (
              <div key={item._id} className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-lg"
                onClick={() => setPreview(item)}>
                <img src={item.imageUrl} alt={item.title || 'Gallery'} className="w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                {item.title && (
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <p className="text-white text-xs font-medium">{item.title}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-4">🖼️</div>
            <p>Gallery coming soon!</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {preview && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setPreview(null)}>
          <button className="absolute top-4 right-4 text-white text-3xl">✕</button>
          <img src={preview.imageUrl} alt={preview.title} className="max-w-4xl max-h-screen object-contain rounded-lg" />
        </div>
      )}
    </div>
  )
}

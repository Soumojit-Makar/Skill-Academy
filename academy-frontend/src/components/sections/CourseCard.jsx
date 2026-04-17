import { Link } from 'react-router-dom'

const LEVEL = {
  Beginner:     'bg-green-100 text-green-700',
  Intermediate: 'bg-yellow-100 text-yellow-700',
  Advanced:     'bg-red-100 text-red-700',
}
const MODE = {
  Online:  'bg-blue-100 text-blue-700',
  Offline: 'bg-purple-100 text-purple-700',
  Hybrid:  'bg-orange-100 text-orange-700',
}

export default function CourseCard({ course }) {
  return (
    <Link to={`/courses/${course.slug}`}
      className="group bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col">
      <div className="aspect-video bg-gradient-to-br from-blue-700 to-blue-900 relative overflow-hidden">
        {course.thumbnail
          ? <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
          : <div className="w-full h-full flex items-center justify-center text-white/40 text-5xl font-black">
              {course.title[0]}
            </div>
        }
        {course.isFeatured && (
          <span className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded">
            ⭐ Featured
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex flex-wrap gap-1.5 mb-2">
          {course.level && <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${LEVEL[course.level]}`}>{course.level}</span>}
          {course.mode  && <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${MODE[course.mode]}`}>{course.mode}</span>}
        </div>
        <h3 className="font-semibold text-gray-900 text-sm leading-snug group-hover:text-blue-600 transition-colors mb-1">
          {course.title}
        </h3>
        {course.tagline && (
          <p className="text-xs text-gray-500 flex-1 leading-relaxed line-clamp-2">{course.tagline}</p>
        )}
        <div className="mt-3 flex items-center justify-between pt-3 border-t border-gray-50">
          <span className="text-xs text-gray-400">⏱ {course.duration || 'Flexible'}</span>
          <span className="text-xs font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform">
            Learn more →
          </span>
        </div>
      </div>
    </Link>
  )
}

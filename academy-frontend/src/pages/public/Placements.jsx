import { Link } from 'react-router-dom'

const COMPANIES = ['Google','Microsoft','Amazon','Wipro','Infosys','TCS','HCL','Capgemini','Cognizant','Accenture','IBM','Oracle']
const PLACED = [
  { name: 'Priya S.', role: 'Full Stack Developer', company: 'Wipro', package: '7.5 LPA', course: 'Full Stack Development' },
  { name: 'Rajan K.', role: 'Data Analyst', company: 'Infosys', package: '6.2 LPA', course: 'Data Analytics' },
  { name: 'Sneha M.', role: 'UI/UX Designer', company: 'Startex', package: '8 LPA', course: 'UI/UX Design' },
  { name: 'Arjun T.', role: 'Cloud Engineer', company: 'HCL', package: '9 LPA', course: 'AWS Cloud' },
  { name: 'Divya R.', role: 'Digital Marketer', company: 'MediaCorp', package: '5.5 LPA', course: 'Digital Marketing' },
  { name: 'Kiran P.', role: 'AI Engineer', company: 'TechMinds', package: '12 LPA', course: 'AI Skills' },
]

export default function Placements() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-sky-900 to-blue-500 text-white py-4 text-center px-4">
        <h1 className="text-4xl font-bold mb-3">Our Placement Record</h1>
        <p className="text-green-200 text-lg max-w-xl mx-auto">95% of our students land jobs within 3 months of completion.</p>
        <div className="flex justify-center gap-8 mt-10">
          {[['5000+','Students Placed'],['95%','Success Rate'],['₹12 LPA','Highest Package'],['300+','Hiring Partners']].map(([n,l]) => (
            <div key={l} className="text-center">
              <p className="text-2xl font-bold">{n}</p>
              <p className="text-green-200 text-xs mt-1">{l}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 space-y-16">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Our Hiring Partners</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {COMPANIES.map(c => (
              <span key={c} className="bg-white border border-gray-200 text-gray-700 font-medium px-5 py-2.5 rounded-lg text-sm shadow-sm">
                {c}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Recent Placements</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {PLACED.map(p => (
              <div key={p.name} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">
                    {p.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{p.name}</p>
                    <p className="text-xs text-gray-400">{p.course}</p>
                  </div>
                </div>
                <p className="font-medium text-gray-800 text-sm">{p.role}</p>
                <p className="text-gray-400 text-xs mb-2">{p.company}</p>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded">{p.package}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-600 rounded-2xl p-10 text-white text-center">
          <h2 className="text-2xl font-bold mb-3">Your Success Story Starts Here</h2>
          <p className="text-blue-100 mb-6">Enroll in a course and let our placement team do the rest.</p>
          <Link to="/contact" className="bg-white text-blue-700 font-bold px-8 py-3 rounded-lg inline-block hover:bg-blue-50 transition-colors">
            Get Started →
          </Link>
        </div>
      </div>
    </div>
  )
}

// About Page
import { Link } from "react-router-dom";
export default function About() {
  return (
    <div>
      <div className="bg-gradient-to-r from-sky-900 to-blue-500 text-white py-12 text-center px-4">
        <h1 className="text-4xl font-bold mb-4">
          About DigitalIndian Skillacademy
        </h1>
        <p className="text-blue-200 max-w-xl mx-auto text-lg">
          Empowering careers through industry-focused IT education since 2014.
        </p>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-16 space-y-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About Us</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Digital Indian Skill Academy is a premier training institute
              focused on building industry-ready professionals in cutting-edge
              technologies.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We specialize in Artificial Intelligence (AI), Machine Learning
              (ML), and other high-demand IT and digital skills to help
              students, professionals, and entrepreneurs succeed in today’s
              digital economy.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              DigitalIndian Skillacademy was founded with a single mission:
              bridge the gap between traditional education and industry demands.
              We provide career-ready skills through practical, hands-on
              training led by working professionals.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our curriculum is continuously updated to reflect the latest
              industry trends, tools, and technologies — ensuring every student
              graduates with skills that are relevant today.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Key Highlights
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Industry-focused curriculum Hands-on practical training Live
              projects & case studies Internship & placement assistance
              Experienced industry trainers Recognized certification programs
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              ["5000+", "Students Trained"],
              ["50+", "Courses"],
              ["95%", "Placement Rate"],
              ["10+", "Years Experience"],
            ].map(([n, l]) => (
              <div key={l} className="bg-blue-50 rounded-xl p-5 text-center">
                <p className="text-2xl font-bold text-blue-700">{n}</p>
                <p className="text-gray-500 text-xs mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🎯",
                title: "Career First",
                desc: "Every decision we make puts student career outcomes first.",
              },
              {
                icon: "🔬",
                title: "Practical Learning",
                desc: "Real projects, real tools, real industry exposure.",
              },
              {
                icon: "🤝",
                title: "Lifetime Support",
                desc: "We stay with you even after course completion.",
              },
            ].map((v) => (
              <div
                key={v.title}
                className="text-center p-6 border border-gray-100 rounded-xl"
              >
                <div className="text-4xl mb-3">{v.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-blue-600 rounded-2xl p-10 text-white text-center">
          <h2 className="text-2xl font-bold mb-3">
            Ready to Build Your Future?
          </h2>
          <p className="text-blue-100 mb-6">
            Join thousands of students who've transformed their careers.
          </p>
          <Link
            to="/courses"
            className="bg-white text-blue-700 font-bold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors inline-block"
          >
            Explore Courses →
          </Link>
        </div>
      </div>
    </div>
  );
}

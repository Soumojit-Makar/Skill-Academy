// About Page
import { Link } from "react-router-dom";
import ABOUT from "../../assates/about.png";
import Mission from "../../assates/mission.png";
import Atanu from "../../assates/A.png";
import Rimi from "../../assates/rimi.jpeg";
import Soumojit from "../../assates/soumojit.png";
import Suvosree from "../../assates/suvosree.png";

const team = [
  {
    index: 1,
    name: "Atanu M.",
    role: "Center Head",
    img: Atanu,
    bio: "Provides strategic leadership and oversees overall operations, driving business growth, organizational excellence, and high-impact GIS & IT solutions across multiple domains.",
  },
  {
    index: 2,
    name: "Rimi B.",
    role: "HR Manager",
    img: Rimi,
    bio: "Leads talent acquisition, employee engagement, and organizational development initiatives, fostering a high-performance culture aligned with business goals.",
  },
  {
    index: 3,
    name: "Soumojit M.",
    role: "IT Officer",
    img: Soumojit,
    bio: "Manages IT infrastructure, system security, and enterprise applications, ensuring seamless digital operations and scalable technology solutions.",
  },
  {
    index: 4,
    name: "Suvosree R.",
    role: "Training Officer",
    img: Suvosree,
    bio: "Designs and delivers industry-focused training programs, empowering learners with practical skills in GIS, IT, and emerging technologies.",
  },
];

export default function About() {
  return (
    <div>
      {/* HERO */}
      <div className="bg-gradient-to-r from-sky-900 to-blue-500 text-white py-12 text-center px-4">
        <h1 className="text-4xl font-bold mb-4">
          About DigitalIndian Skillacademy
        </h1>
        <p className="text-blue-200 max-w-xl mx-auto text-lg">
          Empowering careers through industry-focused IT education since 2014.
        </p>
      </div>
      {/* 🎥 YOUTUBE VIDEO SECTION */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Our Training Overview
        </h2>

        <div className="relative w-full max-w-5xl mx-auto aspect-video rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.youtube.com/embed/wMLLPUOw_ro"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-16 space-y-16">
        {/* ABOUT + MISSION */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* ABOUT */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About Us</h2>
            <div className="w-full h-64 mb-6">
              <img
                src={ABOUT}
                alt="About Us"
                className="w-full h-full object-cover rounded-lg shadow-sm"
              />
            </div>
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

          {/* MISSION */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <div className="w-full h-64 mb-6">
              <img
                src={Mission}
                alt="Our Mission"
                className="w-full h-full object-cover rounded-lg shadow-sm"
              />
            </div>
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

          {/* HIGHLIGHTS */}
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

          {/* STATS */}
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

        {/* TEAM */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Our Core Team
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(({ name, role, bio, img, index }) => (
              <div
                key={index}
                className="group relative rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {img ? (
                  <img
                    src={img}
                    alt={name}
                    className="w-60 h-48 object-cover group-hover:scale-110 transition duration-500"
                  />
                ) : (
                  <div className="h-48 flex items-center justify-center bg-blue-500 text-white text-4xl font-bold">
                    {name.charAt(0)}
                  </div>
                )}

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-center items-center text-center px-4 text-white">
                  <h3 className="font-semibold text-lg mb-1">{name}</h3>
                  <p className="text-blue-300 text-xs font-semibold mb-2">
                    {role}
                  </p>
                  <p className="text-white/80 text-xs leading-relaxed">{bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
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

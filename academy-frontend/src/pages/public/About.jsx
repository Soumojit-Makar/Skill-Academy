// About Page
import { Link } from "react-router-dom";
import ABOUT from "../../assates/about.png";
import Mission from "../../assates/mission.png";
import Atanu from '../../assates/A.png'
import Rimi from '../../assates/rimi.jpeg'
import Soumojit from '../../assates/soumojit.png'
import Suvosree from '../../assates/suvosree.png'
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
  }
];

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
            Our Core Team
          </h2>
         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {team.map(({ name, role, bio, img ,index}) => (
        <div
          key={index}
          className="group relative rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300"
        >
          {/* IMAGE / AVATAR */}
          {img ? (
            <img
              src={img}
              alt={name}
              className="w-60 h-48 object-cover group-hover:scale-110 transition duration-500"
            />
          ) : (
            <div className=" h-auto flex items-center justify-center bg-brand-500 text-white text-4xl font-bold">
              {name.charAt(0)}
            </div>
          )}

          {/* OVERLAY (HOVER) */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-center items-center text-center px-4 text-white">
            <h3 className="text-white font-semibold text-lg mb-1">
              {name}
            </h3>
            <p className="text-brand-300 text-xs font-semibold mb-2">
              {role}
            </p>
            <p className="text-white/80 text-xs leading-relaxed">
              {bio}
            </p>
          </div>
        </div>
      ))}
    </div>
        </div>
        {/* <div>
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Our Location
          </h2>
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3509.850985682433!2d88.4298909!3d22.57356!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275afb2b1cef1%3A0x181dda8377acf1d9!2sEn-9%20Roys%20It%20Park%2C%20EN%20Block%2C%20Sector%20V%2C%20Bidhannagar%2C%20Kolkata%2C%20West%20Bengal%20700091!5e1!3m2!1sen!2sin!4v1776840905282!5m2!1sen!2sin"
           width="100%"
  height="400"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  className="w-full rounded-xl shadow-sm"></iframe>
          </div> */}
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

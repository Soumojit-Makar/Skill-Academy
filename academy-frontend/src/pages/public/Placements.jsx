import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
// Partner logos
import Accenture from "../../assates/Accenture.png";
import Amazon from "../../assates/Amazon.png";
import Assocham from "../../assates/ASSOCHAM.png";
import AxisBank from "../../assates/Axis-Bank.png";
import BajaFinance from "../../assates/Baja-Finance.png";
import BandhanBank from "../../assates/bandhan-bank-logo.png";
import Capgemini from "../../assates/Capgemini.png";
import CII from "../../assates/CII.png";
import Citigroup from "../../assates/Citigroup.png";
import Cognizant from "../../assates/Cognizant.png";
import Deloitte from "../../assates/Deloitte.png";
import EY from "../../assates/EY.png";
import GoldmanSachs from "../../assates/Goldman-Sachs.png";
import Google from "../../assates/google-logo.png";
import HCL from "../../assates/HCL.png";
import HDFC from "../../assates/HDFC.png";
import HSBC from "../../assates/HSBC-Holdings.png";
import IBM from "../../assates/IBM.png";
import ICICI from "../../assates/ICICI-Bank.png";
import Infosys from "../../assates/Infosys_Logo.png";
import JioFinancial from "../../assates/Jio-Financial-Services.png";
import JPMorgan from "../../assates/JPMorgan-Chase.png";
import Kotak from "../../assates/Kotak-Mahindra-Bank-Limited.png";
import KPMG from "../../assates/KPMG.png";
import Microsoft from "../../assates/Microsoft.png";
import MorganStanley from "../../assates/Morgan-Stanley.png";
import NASSCOM from "../../assates/nasscom.png";
import Oracle from "../../assates/Oracle-logo.png";
import PcW from "../../assates/PwC.png";
import SkillIndia from "../../assates/skill-india.png";
import StartUpindian from "../../assates/Startupindian.png";
import TCS from "../../assates/TCS.png";
import TechMahindra from "../../assates/tech-mahindra.png";
import Wipro from "../../assates/Wipro-logo.png";
import Place from '../../assates/place.jpeg'
import AMIT from '../../assates/amit.png'
import Priya from '../../assates/priya.png'
import Rahul from '../../assates/rahul.png'
import Arjun from '../../assates/Arjun.jpg'
import Sneha from '../../assates/sneha.jpg'
import Neha from '../../assates/Neha.png'
const HERO_IMAGES = [
  {
    image: Accenture,
  },
  {
    image: Amazon,
  },
  {
    image: Assocham,
  },
  {
    image: Capgemini,
  },
  {
    image: CII,
  },
  {
    image: Cognizant,
  },
  {
    image: Google,
  },
  {
    image: HCL,
  },
  {
    image: IBM,
  },
  {
    image: Infosys,
  },
  {
    image: Microsoft,
  },
  {
    image: Oracle,
  },
  {
    image: TCS,
  },
  {
    image: Wipro,
  },
  {
    image: NASSCOM,
  },
  {
    image: SkillIndia,
  },
  {
    image: StartUpindian,
  },
  {
    image: AxisBank,
  },
  {
    image: BajaFinance,
  },
  {
    image: BandhanBank,
  },
  {
    image: Citigroup,
  },
  {
    image: Deloitte,
  },
  {
    image: EY,
  },
  {
    image: GoldmanSachs,
  },
  {
    image: HDFC,
  },
  {
    image: HSBC,
  },
  {
    image: ICICI,
  },
  {
    image: JioFinancial,
  },
  {
    image: JPMorgan,
  },
  {
    image: Kotak,
  },
  {
    image: KPMG,
  },
  {
    image: MorganStanley,
  },
  {
    image: PcW,
  },
  {
    image: TechMahindra,
  },
];
const PLACED = [
  { name: 'Amit Sharma', role: 'Software Engineer', company: 'TCS', location: 'Kolkata', package: '6.5 LPA', course: 'Full Stack Development' , image:AMIT},
  { name: 'Priya Verma', role: 'Frontend Developer', company: 'Infosys', location: 'Bangalore', package: '7.2 LPA', course: 'Web Development',image:Priya },
  { name: 'Rahul Das', role: 'Backend Developer', company: 'Wipro', location: 'Hyderabad', package: '6.8 LPA', course: 'Java Full Stack',image:Rahul },
  { name: 'Sneha Roy', role: 'UI/UX Designer', company: 'Accenture', location: 'Pune', package: '8.5 LPA', course: 'UI/UX Design', image:Sneha },
  { name: 'Arjun Mehta', role: 'Cloud Engineer', company: 'HCL', location: 'Noida', package: '9.2 LPA', course: 'AWS Cloud',image:Arjun },
  { name: 'Neha Singh', role: 'Data Analyst', company: 'Capgemini', location: 'Mumbai', package: '7.8 LPA', course: 'Data Analytics',image:Neha },
  
  { name: 'Karan Gupta', role: 'DevOps Engineer', company: 'Cognizant', location: 'Chennai', package: '10 LPA', course: 'DevOps' },
  { name: 'Anjali Patel', role: 'AI Engineer', company: 'IBM', location: 'Bangalore', package: '12 LPA', course: 'AI & ML' },
  { name: 'Rohit Kumar', role: 'Business Analyst', company: 'Deloitte', location: 'Gurgaon', package: '8 LPA', course: 'Business Analysis' },
  { name: 'Meera Nair', role: 'Cybersecurity Analyst', company: 'EY', location: 'Hyderabad', package: '9.5 LPA', course: 'Cybersecurity' },
  { name: 'Vikas Yadav', role: 'Full Stack Developer', company: 'JPMorgan', location: 'Mumbai', package: '14 LPA', course: 'Full Stack Development' },
  { name: 'Pooja Sharma', role: 'Software Engineer', company: 'Microsoft', location: 'Bangalore', package: '18 LPA', course: 'Advanced Programming' },
  // { name: 'Rakesh Gupta', role: 'System Engineer', company: 'Infosys', location: 'Pune', package: '6.3 LPA', course: 'IT Fundamentals' },
  // { name: 'Simran Kaur', role: 'QA Engineer', company: 'Wipro', location: 'Noida', package: '5.8 LPA', course: 'Software Testing' },
  // { name: 'Deepak Singh', role: 'Network Engineer', company: 'Tech Mahindra', location: 'Delhi', package: '6.9 LPA', course: 'Networking' },

  // { name: 'Ankit Jain', role: 'Backend Developer', company: 'Amazon', location: 'Hyderabad', package: '15 LPA', course: 'Backend Development' },
  // { name: 'Riya Sen', role: 'Frontend Developer', company: 'Google', location: 'Bangalore', package: '20 LPA', course: 'Frontend Development' },
  // { name: 'Manish Tiwari', role: 'Cloud Engineer', company: 'Oracle', location: 'Chennai', package: '11 LPA', course: 'Cloud Computing' },
  // { name: 'Kavita Mishra', role: 'Data Scientist', company: 'Flipkart', location: 'Bangalore', package: '13 LPA', course: 'Data Science' },
  // { name: 'Sandeep Roy', role: 'Software Engineer', company: 'Zoho', location: 'Chennai', package: '10.5 LPA', course: 'Full Stack Development' },

  // { name: 'Pritam Ghosh', role: 'Business Analyst', company: 'HDFC Bank', location: 'Kolkata', package: '7.5 LPA', course: 'Business Analytics' },
  // { name: 'Ayesha Khan', role: 'Finance Analyst', company: 'ICICI Bank', location: 'Mumbai', package: '8.2 LPA', course: 'Finance Management' },
  // { name: 'Rohini Das', role: 'HR Executive', company: 'PwC', location: 'Gurgaon', package: '6.7 LPA', course: 'HR Management' },
  // { name: 'Vivek Mishra', role: 'Consultant', company: 'KPMG', location: 'Bangalore', package: '9 LPA', course: 'Consulting' },
  // { name: 'Nikhil Verma', role: 'Risk Analyst', company: 'HSBC', location: 'Kolkata', package: '8.8 LPA', course: 'Finance & Risk' },
];
export default function Placements() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div
  className="py-12 text-center px-4 bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: `url(${Place})`,
  }}
>
        {/* <h1 className="text-4xl font-bold text-white  mb-3">Our Placement Record</h1> */}
        <p className="text-green-200 text-lg max-w-xl mx-auto">95% of our students land jobs within 3 months of completion.</p>
        <div className="flex justify-center gap-8 mt-10">
          {[['5000+','Students Placed'],['95%','Success Rate'],['₹12 LPA','Highest Package'],['300+','Hiring Partners']].map(([n,l]) => (
            <div key={l} className="text-center text-white">
              <p className="text-2xl font-bold">{n}</p>
              <p className="text-green-200 text-xs mt-1">{l}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 space-y-16">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Our Students Are Placed In</h2>
          
            <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={15}
            slidesPerView={1}
            loop={true}
            // navigation={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 12 },
            }}
            className="academyHeroSwiper"
          >
            {HERO_IMAGES.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="group justify-center overflow-hidden   shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="relative h-45 md:h-45 overflow-hidden">
                    <img
                      src={item.image}
                      alt={"IMG-" + index}
                      className="w-full h-full object-fill group-hover:scale-105 transition duration-500"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
         
        </div>

       <div>
  <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
    Recent Placements
  </h2>

  <div className="grid md:grid-cols-6 gap-2">
    {PLACED.map((p) => (
      <div
        key={p.name}
        className="relative group rounded-xl overflow-hidden shadow-sm border border-gray-100"
      >
        {/* IMAGE OR FALLBACK */}
        {p.image ? (
          <img
            src={p.image}
            alt={p.name}
            className="w-full h-64 object-cover"
          />
        ) : (
          <div className="w-full h-64 flex items-center justify-center bg-blue-100 text-blue-700 text-5xl font-bold">
            {p.name?.charAt(0).toUpperCase()}
          </div>
        )}

        {/* HOVER DETAILS */}
        <div className="absolute inset-0 bg-black/70 text-white flex flex-col justify-center items-center text-center px-4 opacity-0 group-hover:opacity-100 transition duration-300">
          
          <p className="font-semibold text-lg">{p.name}</p>
          <p className="text-sm text-gray-300">{p.course}</p>

          <p className="font-medium mt-2">{p.role}</p>
          <p className="text-sm text-gray-300">{p.company}</p>

          <span className="mt-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded">
            {p.package}
          </span>
        </div>
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

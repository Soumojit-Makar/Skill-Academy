import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {AnimatePresence,motion,useInView} from 'framer-motion'
import {ChevronRight ,ChevronLeft,ArrowRight} from 'lucide-react'
import CountUp from "react-countup";


import api from "../../api/axios";
import EnquiryForm from "../../components/forms/EnquiryForm";
import CourseCard from "../../components/sections/CourseCard";
import PageLoader from "../../components/ui/PageLoader";


// Slider
import bannerImg from "../../assates/banner.png";
import Slider1 from '../../assates/skillacademyslider1.png'
import Slider2 from '../../assates/skillacademyslider.png'
import Slider3 from '../../assates/skillacademyslider3.png'
import Slider4 from '../../assates/skillacademyslider4.png'


import Career from "../../assates/Career-Oriented.png";
import Trainers from "../../assates/Experienced-Trainers.png";
import Courses from "../../assates/Wide-Range-of-Courses.png";
import Practical from "../../assates/Practical-Training.png";
import Certification from "../../assates/Certification-Support.png";
import Guidance from "../../assates/Student-Guidance.png";

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
import TSSI from "../../assates/TSSi.png";
import UTKARSHA_BANGLA from "../../assates/utkarsha-bangla.png";


const BENEFITS = [
  {
    icon: Career,
    title: "Career-Oriented Learning",
    desc: "Programs designed to build practical skills for students, job seekers, and working professionals.",
  },
  {
    icon: Trainers,
    title: "Experienced Trainers",
    desc: "Learn from qualified mentors and industry professionals across multiple domains.",
  },
  {
    icon: Courses,
    title: "Wide Range of Courses",
    desc: "Explore IT, management, design, language, finance, vocational, and professional training programs.",
  },
  {
    icon: Practical,
    title: "Practical Training",
    desc: "Gain hands-on knowledge through projects, activities, workshops, and real-world practice.",
  },
  {
    icon: Certification,
    title: "Certification Support",
    desc: "Receive course completion certificates to strengthen your academic and career profile.",
  },
  {
    icon: Guidance,
    title: "Student Guidance",
    desc: "Get support with career counseling, skill development, and future learning pathways.",
  },
];

const HERO_IMAGES = [
  {
    image: Accenture,
  },
  {
    image: Amazon,
  },
  {
    image: Capgemini,
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
const ORG_IMAGES = [
  {
    image: Assocham,
  },
  {
    image: CII,
  },
  {
    image: NASSCOM,
  },
  {
    image: SkillIndia,
  },
  {
    image: TSSI,
  },
  {
    image: UTKARSHA_BANGLA,
  },
];
const heroSlides = [
  {
    id: 1,
    image: bannerImg,
    title: " Learn New Skills, Build Your Future with",
    highlight: "Confidence",
    primaryBtn: "Browse Courses",
    secondaryBtn: "See Placements",
    primaryLink: "/courses",
    secondaryLink: "/placements",
  },
  {
    id:2,
    image:Slider1,
    title:"",
    highlight:"",
    primaryBtn: "",
    secondaryBtn: "",
    primaryLink: "",
    secondaryLink: "",
  },
  {
    id:3,
    image:Slider2,
    title:"",
    highlight:"",
    primaryBtn: "",
    secondaryBtn: "",
    primaryLink: "",
    secondaryLink: "",
  },
  {
    id:4,
    image:Slider3,
    title:"",
    highlight:"",
    primaryBtn: "",
    secondaryBtn: "",
    primaryLink: "",
    secondaryLink: "",
  },
  {
    id:5,
    image:Slider4,
    title:"",
    highlight:"",
    primaryBtn: "",
    secondaryBtn: "",
    primaryLink: "",
    secondaryLink: "",
  },
];
export default function Home() {
  const [courses, setCourses] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    Promise.all([
      api.get("/courses?limit=8"),
      api.get("/testimonials"),
      api.get("/faqs"),
    ]).then(([c, t, f]) => {
        setCourses(c.data);
        setTestimonials(t.data);
        setFaqs(f.data);
      }).catch(() => {})
      .finally(() => setLoading(false));
  }, []);

 
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const activeSlide = heroSlides[currentSlide];
 if (loading) {
    return (
      <p className="min-h-screen flex items-center justify-center">
        Loading...
      </p>
    );
  }


  return (
    <div>
      {/* ── HERO ── */}
           <section className="relative pt-24 pb-2 md:pb-2 min-h-[520px] flex items-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${activeSlide.image})`,
            }}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </AnimatePresence>

        {/* Overlay */}
        {/* Overlay */}
        <div className="absolute inset-0 z-[1] bg-black/30" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-r " />

        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-6 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20    transition hover:bg-gray-700"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5 text-slate-100 " />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-6 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20  transition hover:bg-gray-700"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5 text-slate-100" />
        </button>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.55 }}
              >
                {/* <span className="mb-5 inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-md">
                  {activeSlide.badge}
                </span> */}

                <h1 className="mb-5 font-display text-4xl md:text-5xl font-bold leading-tight text-white drop-shadow-lg">
                  {activeSlide.title}
                  <br />
                  <span className="text-teal-300">{activeSlide.highlight}</span>
                </h1>

                {/* <p className="mb-8 max-w-xl text-lg leading-relaxed text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.6)]">
                  {activeSlide.description}
                </p> */}

               {activeSlide.primaryBtn && activeSlide.secondaryBtn &&( <div className="mb-10 flex flex-wrap gap-3">
                  <Link
                    to={activeSlide.primaryLink}
                    className="btn-primary px-7 py-3"
                  >
                    {activeSlide.primaryBtn} 
                  </Link>

                  <Link
                    to={activeSlide.secondaryLink}
                    className="rounded-xl border border-white/30 bg-white/10 px-7 py-3 text-white transition hover:bg-white/20"
                  >
                    {activeSlide.secondaryBtn}
                  </Link>
                </div>)}

                {/* <div className="grid grid-cols-2 gap-6 border-t border-white/20 pt-8 sm:grid-cols-4">
                  {stats.map(({ val, suf, label }) => (
                    <div key={label}>
                      <p className="font-display text-3xl font-bold text-white">
                        <Counter end={val} suffix={suf} />
                      </p>
                      <p className="mt-1 text-xs text-white/80">{label}</p>
                    </div>
                  ))}
                </div> */}
              </motion.div>
            </AnimatePresence>

            <div className="hidden lg:block" />
          </div>

          {/* Dots */}
          <div className="mt-10 flex items-center justify-center gap-3">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "w-10 bg-white"
                    : "w-3 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
      {/* <section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `url(${bannerImg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-2 py-20 lg:py-20 grid lg:grid-cols-2 gap-6 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-5">
              Learn New Skills, Build Your Future with{" "}
              <span className="text-blue-400">Confidence</span>
            </h1>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/courses"
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-7 py-3 rounded-lg transition-colors"
              >
                Browse Courses
              </Link>
              <Link
                to="/placements"
                className="border border-white/30 hover:bg-white/10 text-white px-7 py-3 rounded-lg transition-colors"
              >
                See Placements
              </Link>
            </div>
          </div>
        </div>
      </section> */}

      {/* ── STATS BAR ── */}
      <section className="bg-sky-400 py-4">
        <div className="max-w-7xl mx-auto px-2 grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
          {[
            ["5000+", "Students Trained"],
            ["50+", "Industry Courses"],
            ["95%", "Placement Rate"],
            ["10+", "Years Experience"],
          ].map(([n, l]) => (
            <div key={l}>
              <p className="text-3xl font-bold">{n}</p>
              <p className="text-blue-50 text-sm mt-1">{l}</p>
            </div>
          ))}
        </div>
      </section>
      {/* ── HERO LOWER CAROUSEL ── */}
      <section className="bg-white py-6 mt-6 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          {/* <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Official Training Program Associations
          </h2> */}

          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            navigation={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 5 },
            }}
            className="academyHeroSwiper"
          >
            {ORG_IMAGES.map((item, index) => (
              <SwiperSlide key={index} className="flex justify-center">
                <div className="w-full max-w-[180px] h-[100px] flex items-center justify-center bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                  <img
                    src={item.image}
                    alt={"IMG-" + index}
                    className="max-h-[70px] max-w-[140px] object-contain transition duration-300 group-hover:scale-105"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      {/* ── COURSES ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Popular Courses
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Career-aligned programs designed by industry experts.
            </p>
          </div>

          {courses.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {courses.map((c) => (
                <CourseCard key={c._id} course={c} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 py-16">Courses loading…</p>
          )}

          <div className="text-center mt-2">
            <Link to="/courses" className="btn-outline">
              View All Courses →
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Why Choose Academy?
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              We don't just teach — we build careers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                className="rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="w-full h-48">
                  <img
                    src={b.icon}
                    alt={b.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 text-center">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    {b.title}
                  </h3>

                  <p className="text-sm text-gray-500 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      {testimonials.length > 0 && (
        <section className="py-5 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
              Student Success Stories
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.slice(0, 3).map((t) => (
                <div
                  key={t._id}
                  className="bg-white rounded-xl p-6 border border-blue-100 shadow-sm"
                >
                  <div className="flex gap-0.5 text-yellow-400 mb-3 text-sm">
                    {"★".repeat(t.rating || 5)}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">
                    "{t.content}"
                  </p>
                  <div className="flex items-center gap-3 pt-3 border-t border-gray-50">
                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        {t.name}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {t.role} {t.course ? `· ${t.course}` : ""}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      {faqs.length > 0 && (
        <section className="py-5 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
              Frequently Asked Questions
            </h2>
            <div className="space-y-2">
              {faqs.slice(0, 8).map((faq) => (
                <div
                  key={faq._id}
                  className="border border-gray-100 rounded-xl overflow-hidden"
                >
                  <button
                    className="w-full text-left px-5 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
                    onClick={() =>
                      setOpenFaq(openFaq === faq._id ? null : faq._id)
                    }
                  >
                    <span className="font-medium text-gray-900 text-sm pr-4">
                      {faq.question}
                    </span>
                    <span className="text-gray-400 text-lg shrink-0">
                      {openFaq === faq._id ? "−" : "+"}
                    </span>
                  </button>
                  {openFaq === faq._id && (
                    <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-50 bg-gray-50 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* ── HERO LOWER CAROUSEL ── */}
      <section className="bg-white py-6 mt-6 relative z-10">
  <div className="max-w-7xl mx-auto px-4">
    
    <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
      Our Students Are Placed In
    </h2>

    <Swiper
      modules={[Autoplay, Navigation]}
      spaceBetween={20}
      slidesPerView={1}
      loop={true}
      navigation={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      breakpoints={{
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 5 },
      }}
      className="academyHeroSwiper"
    >
      {HERO_IMAGES.map((item, index) => (
        <SwiperSlide key={index} className="flex justify-center">
          
          <div className="w-full max-w-[180px] h-[100px] flex items-center justify-center bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
            
            <img
              src={item.image}
              alt={"IMG-" + index}
              className="max-h-[70px] max-w-[140px] object-contain transition duration-300 group-hover:scale-105"
            />

          </div>

        </SwiperSlide>
      ))}
    </Swiper>

  </div>
</section>
      {/* ── CTA BANNER ── */}
      <section className="bg-gradient-to-r from-sky-300 to-sky-400 py-4 text-gray-800 text-center">
        <h2 className="text-3xl font-bold mb-3">
          Ready to Start Your Career Journey?
        </h2>
        <p className="text-blue-800 mb-7 max-w-xl mx-auto">
          Join 5000+ students who transformed their careers with Academy.
        </p>
        <Link
          to="/contact"
          className="bg-white text-blue-700 font-bold px-8 py-3.5 rounded-lg hover:bg-blue-50 transition-colors inline-block"
        >
          Enroll Today — It's Free to Start →
        </Link>
      </section>
    </div>
  );
}

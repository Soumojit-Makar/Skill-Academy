import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import PublicLayout   from './components/layout/PublicLayout'
import AdminLayout    from './components/layout/AdminLayout'
import Home           from './pages/public/Home'
import Courses        from './pages/public/Courses'
import CourseDetail   from './pages/public/CourseDetail'
import About          from './pages/public/About'
import Contact        from './pages/public/Contact'
import Blogs          from './pages/public/Blogs'
import BlogDetail     from './pages/public/BlogDetail'
import Gallery        from './pages/public/Gallery'
import Placements     from './pages/public/Placements'
import AdminLogin     from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
import AdminEnquiries from './pages/admin/Enquiries'
import AdminCourses   from './pages/admin/Courses'
import AdminBlogs     from './pages/admin/Blogs'
import AdminTestimonials from './pages/admin/Testimonials'
import AdminFAQs      from './pages/admin/FAQs'
import AdminGallery   from './pages/admin/Gallery'
import AdminSettings  from './pages/admin/Settings'
import AdminCategories from './pages/admin/Categories'

const Guard = ({ children }) => {
  const { token } = useAuthStore()
  return token ? children : <Navigate to="/admin/login" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route element={<PublicLayout />}>
          <Route path="/"               element={<Home />} />
          <Route path="/courses"        element={<Courses />} />
          <Route path="/courses/:slug"  element={<CourseDetail />} />
          <Route path="/about"          element={<About />} />
          <Route path="/contact"        element={<Contact />} />
          <Route path="/blog"           element={<Blogs />} />
          <Route path="/blog/:slug"     element={<BlogDetail />} />
          <Route path="/gallery"        element={<Gallery />} />
          <Route path="/placements"     element={<Placements />} />
        </Route>

        {/* Admin login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin panel */}
        <Route path="/admin" element={<Guard><AdminLayout /></Guard>}>
          <Route index                     element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard"          element={<AdminDashboard />} />
          <Route path="enquiries"          element={<AdminEnquiries />} />
          <Route path="courses"            element={<AdminCourses />} />
          <Route path="categories"         element={<AdminCategories />} />
          <Route path="blogs"              element={<AdminBlogs />} />
          <Route path="testimonials"       element={<AdminTestimonials />} />
          <Route path="faqs"               element={<AdminFAQs />} />
          <Route path="gallery"            element={<AdminGallery />} />
          <Route path="settings"           element={<AdminSettings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

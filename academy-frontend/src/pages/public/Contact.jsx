import EnquiryForm from "../../components/forms/EnquiryForm";
import {Mail,Phone,MapIcon} from "lucide-react"
export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-sky-900 to-blue-500 text-white py-12 text-center px-4">
        <h1 className="text-4xl font-bold mb-3">Contact Us</h1>
        <p className="text-blue-200">We'd love to hear from you. Let's talk!</p>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Send an Enquiry
          </h2>
          <div className="bg-white rounded-xl border border-gray-100 p-7 shadow-sm">
            <EnquiryForm source="contact" />
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Get in Touch</h2>
          {[
            { icon: Mail, label: "Phone", value: "9830640814 | 7908735132" },
            { icon: Phone, label: "Email", value: "digitalindian.skillacademy@gmail.com" },
            {
              icon: MapIcon,
              label: "Address",
              value: `Digital Indian EN-9, Sector V,
                      Salt Lake Kolkata,
                      West Bengal India - 700091`,
            },
            { icon: "⏰", label: "Hours", value: "Mon–Sun: 9 AM – 7 PM" },
          ].map((i) => (
            <div
              key={i.label}
              className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100"
            >
              <i.icon size={24} className="text-blue-500" />
              <div>
                <p className="text-xs text-gray-400 font-medium">{i.label}</p>
                <p className="text-gray-800 font-medium">{i.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

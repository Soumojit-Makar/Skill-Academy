import EnquiryForm from "../../components/forms/EnquiryForm";
import { Mail, Phone, MapIcon } from "lucide-react";
export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 pb-4">
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
            {
              icon: Phone,
              label: "Email",
              value: "digitalindian.skillacademy@gmail.com",
            },
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
       <div>
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8 p-2 border-b border-gray-200">
            Our Location
          </h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3509.850985682433!2d88.4298909!3d22.57356!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275afb2b1cef1%3A0x181dda8377acf1d9!2sEn-9%20Roys%20It%20Park%2C%20EN%20Block%2C%20Sector%20V%2C%20Bidhannagar%2C%20Kolkata%2C%20West%20Bengal%20700091!5e1!3m2!1sen!2sin!4v1776840905282!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full rounded-xl shadow-sm"
          ></iframe>
        </div>
    </div>
  );
}

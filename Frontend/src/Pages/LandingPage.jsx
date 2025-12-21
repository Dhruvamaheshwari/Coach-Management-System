/** @format */

import React, { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative text-slate-900"
      style={{
        backgroundImage:
          "url('https://www.shutterstock.com/image-vector/vector-high-speed-electric-train-260nw-2321709117.jpg')",
      }}
    >
      {/* White glass overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-4xl font-extrabold">
            Contact <span className="text-indigo-600">RailCoach</span>
          </h1>
          <p className="mt-3 text-slate-700 font-medium">
            Have questions or need support? We’re here to help.
          </p>
        </div>

        {/* Main Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="bg-white rounded-2xl shadow-md p-8 animate-slideUp">
            <h2 className="text-xl font-bold mb-4">Get in Touch</h2>

            <div className="space-y-4 text-slate-700">
              <p>
                <strong>Email:</strong> support@railcoach.com
              </p>
              <p>
                <strong>Phone:</strong> +91 98765 43210
              </p>
              <p>
                <strong>Office:</strong> Railway Operations HQ, India
              </p>
              <p className="text-sm text-slate-500">
                Our team usually responds within 24 hours.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-md p-8 animate-slideUp">
            <h2 className="text-xl font-bold mb-4">Send a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Animations */}
        <style>{`
          @keyframes floatUp { 
            from { transform: translateY(10px); opacity: 0 } 
            to { transform: translateY(0); opacity: 1 } 
          }
          .animate-fadeIn { 
            animation: floatUp 600ms ease-out both 
          }
          .animate-slideUp { 
            animation: floatUp 700ms ease-out both 
          }
        `}</style>
      </div>
    </div>
  );
}

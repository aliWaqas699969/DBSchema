import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMap,
  faRightLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Github, Twitter, Linkedin } from "lucide-react";
import React from "react";

export default function Contact() {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      )
      .then(
        () => {
          setLoading(false);
          setSuccess("✅ Message sent successfully!");
          formRef.current.reset();
        },
        (error) => {
          setLoading(false);
          setSuccess("❌ Something went wrong. Try again.");
          console.error("EmailJS error:", error);
        }
      );
  };

  return (
    <>
      <nav class="fixed w-full top-0 z-50 glass-effect">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <div class="flex items-center">
              <div class="flex ">
                <h1 class="text-2xl font-bold text-white">
                  <FontAwesomeIcon icon={faRightLeft} /> DBSchema
                </h1>
              </div>
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <a
                  href="/"
                  class="text-white hover:text-gray-200 px-3 py-2 text-sm font-medium"
                >
                  Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <section className="min-h-screen gradient-bg flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">
          {/* LEFT: Contact Info */}
          <div className="text-white space-y-8">
            <h2 className="text-4xl font-bold">Let’s Connect</h2>
            <p className="text-white/80 max-w-md">
              Reach out to us for collaborations, queries, or just a friendly
              chat. We’d love to hear from you!
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FontAwesomeIcon
                  icon={faMap}
                  className="w-6 h-6 text-purple-300"
                />
                <span className="text-white/90">
                  Pakistan, Code City, Islamabad
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="w-6 h-6 text-purple-300"
                />
                <span className="text-white/90">aliwaqas55488@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="w-6 h-6 text-purple-300"
                />
                <span className="text-white/90">+92 3231529432</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://github.com/aliWaqas699969?tab=overview&from=2023-12-01&to=2023-12-31"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
              >
                <Github />
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a
                href="https://x.com/Aliwaqas55488"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
              >
                <Twitter />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
              >
                <Linkedin />
              </a>
            </div>
          </div>

          {/* RIGHT: Contact Form */}
          <div className="glass-effect rounded-2xl shadow-xl p-10 text-white relative">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Get in Touch
            </h2>
            <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
              <div>
                <label className="block text-sm mb-2">Your Name</label>
                <input
                  type="text"
                  name="user_name"
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Email Address</label>
                <input
                  type="email"
                  name="user_email"
                  placeholder="john@example.com"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Message</label>
                <textarea
                  rows="5"
                  name="message"
                  placeholder="Write your message..."
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 transition text-white font-semibold shadow-lg disabled:opacity-50 cursor-pointer"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>

            {/* Status message */}
            {success && <p className="text-center mt-4 text-sm">{success}</p>}

            {/* Floating Elements */}
            <div className="absolute top-4 left-6 w-16 h-16 rounded-full bg-white/20 floating-animation"></div>
            <div className="absolute bottom-10 right-10 w-20 h-20 rounded-full bg-purple-400/30 floating-animation"></div>
          </div>
        </div>
      </section>
    </>
  );
}

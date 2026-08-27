import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Firebase SDK imports
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// React Toastify imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// React Icons
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaClock,
  FaMapMarkerAlt,
  FaInstagram,
  FaFacebookF,
  FaDirections,
} from "react-icons/fa";

import "../styles/ContactPage.css";
import heroBgImg from "../assets/abt_hero_banner.jpg";
import clinicImg from "../assets/clinic1.png";

gsap.registerPlugin(ScrollTrigger);

// 1. Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRoJkzdS1VIGTBeN8khJEroKO8zW2M3nE",
  authDomain: "browlicious-web.firebaseapp.com",
  projectId: "browlicious-web",
  storageBucket: "browlicious-web.firebasestorage.app",
  messagingSenderId: "1006855218065",
  appId: "1:1006855218065:web:3ccb3eff52bfb1b4627030",
  measurementId: "G-Y0J5SNE50W",
};

// Initialize Firebase safely
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function ContactPage({ isDarkMode = false, setIsDarkMode }) {
  const containerRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [charCount, setCharCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // GSAP Smooth Animations
  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // 1. Hero Title & Subtitle Letter-spacing Fade-in
      gsap.fromTo(
        ".contact-hero-title",
        { opacity: 0, y: 35, letterSpacing: "0.3em" },
        { opacity: 1, y: 0, letterSpacing: "0.22em", duration: 1.2, ease: "power3.out" }
      );

      gsap.fromTo(
        ".abt-hero-subtitle",
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 1, delay: 0.35, ease: "power2.out" }
      );

      // 2. Left Info Concierge Card Glide from Left
      gsap.fromTo(
        ".contact-info-card",
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-layout-grid",
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // 3. Right Form Card Glide from Right
      gsap.fromTo(
        ".contact-form-card",
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-layout-grid",
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // 4. Downside Dedicated Map Section Fade-Up
      gsap.fromTo(
        ".contact-map-showcase-card",
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-map-showcase-section",
            start: "top 82%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Form Input Change Handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "message") {
      if (value.length <= 300) {
        setForm((prev) => ({ ...prev, [name]: value }));
        setCharCount(value.length);
      }
    } else if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "");
      if (digitsOnly.length <= 10) {
        setForm((prev) => ({ ...prev, [name]: digitsOnly }));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Form Validation
  const validate = () => {
    const newErrors = {};
    const phoneRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.name.trim()) {
      newErrors.name = "Full name is required";
      toast.error("Please enter your full name");
    } else if (form.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
      toast.error("Name is too short");
    }

    if (!form.email.trim()) {
      newErrors.email = "Email address is required";
      toast.error("Please provide an email address");
    } else if (!emailRegex.test(form.email.trim())) {
      newErrors.email = "Please enter a valid email address";
      toast.error("Invalid email address format");
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
      toast.error("Please enter your phone number");
    } else if (!phoneRegex.test(form.phone)) {
      newErrors.phone = "Enter a valid 10-digit mobile number";
      toast.error("Phone number must be 10 digits starting with 6, 7, 8, or 9");
    }

    if (!form.message.trim()) {
      newErrors.message = "Message details are required";
      toast.error("Please write your inquiry details");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler: Firebase Firestore + FormSubmit Email Dispatch
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    const toastId = toast.loading("Sending your message to Browlicious...");

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: `+91 ${form.phone.trim()}`,
      subject: form.subject,
      message: form.message.trim(),
      submittedAt: new Date().toISOString(),
    };

    try {
      // 1. Save to Firebase Firestore Database
      await addDoc(collection(db, "contacts"), {
        ...payload,
        createdAt: serverTimestamp(),
      });

      // 2. Send email notification via FormSubmit.co
      await fetch("https://formsubmit.co/ajax/hello@vayonixinfotech.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `New Contact Inquiry - ${form.name}`,
          ...payload,
        }),
      });

      toast.update(toastId, {
        render: "Thank you! Your message has been sent successfully. We will reach out shortly.",
        type: "success",
        isLoading: false,
        autoClose: 4500,
      });

      // Reset form
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: "",
      });
      setCharCount(0);
      setErrors({});
    } catch (error) {
      console.error("Error submitting contact inquiry: ", error);
      toast.update(toastId, {
        render: "Failed to send message. Please try again or call us directly.",
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`contact-page-wrapper ${isDarkMode ? "dark-theme" : "light-theme"}`}
      ref={containerRef}
    >
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDarkMode ? "dark" : "light"}
      />

      {/* Floating Theme Toggle Button */}
      {setIsDarkMode && (
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="theme-toggle-btn"
          aria-label="Toggle Theme"
        >
          {isDarkMode ? (
            <svg className="theme-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="4.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="4.22" x2="19.78" y2="5.64"></line>
            </svg>
          ) : (
            <svg className="theme-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          )}
        </button>
      )}

      {/* ============================================================
          1. HERO HEADER & SUB-BAR (MATCHING ABTPG AESTHETIC)
      ============================================================ */}
      <header className="abt-hero-section">
        <div
          className="abt-hero-banner"
          style={{ backgroundImage: `url(${heroBgImg})` }}
        >
          <div className="abt-hero-overlay"></div>
          <div className="abt-hero-inner">
            <h1 className="abt-hero-title contact-hero-title">
              CONNECT WITH BROWLICIOUS
            </h1>
          </div>
        </div>

        {/* Sub-Header Area on Clean Theme BG */}
        <div className="abt-hero-subbar">
          <div className="abt-subbar-tick-wrap" aria-hidden="true">
            <div className="abt-subbar-star-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
            </div>
            <div className="abt-subbar-line">
              <span className="line-shimmer"></span>
            </div>
            <div className="abt-subbar-dot"></div>
          </div>

          <nav className="abt-breadcrumbs" aria-label="Breadcrumbs">
            <Link to="/">Home</Link>
            <span className="abt-separator">&gt;</span>
            <span className="abt-current">Contact</span>
          </nav>
          <p className="abt-hero-subtitle">
            Let’s begin your journey toward effortlessly defined beauty. Reach out directly to our
            master specialists for personal consultations, studio visits, or treatment queries.
          </p>
        </div>
      </header>

      {/* ============================================================
          2. MASTER 2-COLUMN CONTACT STAGE
      ============================================================ */}
      <main className="contact-main-stage">
        <div className="contact-page-container">
          <div className="contact-layout-grid">
            
            {/* ============================================================
                LEFT COLUMN: STUDIO CONCIERGE CARD
            ============================================================ */}
            <div className="contact-info-card">
              
              <div className="info-card-top">
                {/* Clinic Lounge Banner Image */}
                <div className="clinic-banner-frame">
                  <img
                    src={clinicImg}
                    alt="Browlicious PMU Studio Reception & Lounge"
                    className="clinic-banner-img"
                  />
                  <div className="banner-overlay-tint"></div>
                  <span className="banner-studio-badge">★ ANNA NAGAR CLINIC</span>
                </div>

                {/* Need Help Header */}
                <div className="info-card-header">
                  <span className="help-eyebrow">DIRECT CONCIERGE</span>
                  <h3 className="help-title">Need Personal Advice?</h3>
                  <p className="help-subtitle">
                    Our master artists are available to guide you through customized brow mapping,
                    pigment shade matching, and aftercare expectations.
                  </p>
                </div>

                {/* Contact Items List */}
                <div className="contact-meta-list">
                  
                  {/* Call Us */}
                  <div className="contact-meta-row">
                    <div className="meta-icon-circle">
                      <FaPhoneAlt />
                    </div>
                    <div className="meta-row-content">
                      <span className="meta-row-label">Call Our Clinic</span>
                      <a href="tel:+918111643210" className="meta-row-value">
                        +91 81116 43210
                      </a>
                      <a href="tel:09710331111" className="meta-row-subvalue">
                        Alt: 097103 31111
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp Us */}
                  <div className="contact-meta-row">
                    <div className="meta-icon-circle whatsapp-icon-circle">
                      <FaWhatsapp />
                    </div>
                    <div className="meta-row-content">
                      <span className="meta-row-label">WhatsApp Concierge</span>
                      <a
                        href="https://api.whatsapp.com/send/?phone=919710331111&text=Hello%20Browlicious%20Team,%20I%20would%20like%20to%20inquire%20about%20your%20treatments&type=phone_number&app_absent=0"
                        target="_blank"
                        rel="noreferrer"
                        className="meta-row-value whatsapp-link"
                      >
                        Chat with our specialists &rarr;
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="contact-meta-row">
                    <div className="meta-icon-circle">
                      <FaEnvelope />
                    </div>
                    <div className="meta-row-content">
                      <span className="meta-row-label">Email Enquiries</span>
                      <a href="mailto:info@browlicious.com" className="meta-row-value">
                        info@browlicious.com
                      </a>
                    </div>
                  </div>

                  {/* Clinic Hours */}
                  <div className="contact-meta-row">
                    <div className="meta-icon-circle">
                      <FaClock />
                    </div>
                    <div className="meta-row-content">
                      <span className="meta-row-label">Clinic Hours</span>
                      <span className="meta-row-value">
                        Mon – Sat: 10:00 AM – 7:00 PM
                      </span>
                      <span className="meta-row-subvalue">
                        Sunday: By Prior Appointment
                      </span>
                    </div>
                  </div>

                  {/* Location Address */}
                  <div className="contact-meta-row">
                    <div className="meta-icon-circle">
                      <FaMapMarkerAlt />
                    </div>
                    <div className="meta-row-content">
                      <span className="meta-row-label">Studio Address</span>
                      <span className="meta-row-value">
                        Browlicious PMU Clinic &amp; Academy
                      </span>
                      <p className="meta-full-address">
                        First Floor, AA-117, 4th Ave, opp. Naturals Signature Salon,
                        AA Block, Shanthi Colony, Anna Nagar, Chennai, Tamil Nadu 600040
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Social Media Links */}
              <div className="contact-social-footer">
                <span className="social-footer-label">Follow Our Work:</span>
                <div className="social-icon-links">
                  <a
                    href="https://www.instagram.com/browlicious_permanent_makeup/"
                    target="_blank"
                    rel="noreferrer"
                    className="social-btn"
                    aria-label="Instagram"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="https://www.facebook.com/browliciouspermanentmakeup/"
                    target="_blank"
                    rel="noreferrer"
                    className="social-btn"
                    aria-label="Facebook"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    href="https://api.whatsapp.com/send/?phone=919710331111&text&type=phone_number&app_absent=0"
                    target="_blank"
                    rel="noreferrer"
                    className="social-btn"
                    aria-label="WhatsApp"
                  >
                    <FaWhatsapp />
                  </a>
                </div>
              </div>

            </div>

            {/* ============================================================
                RIGHT COLUMN: LUXURY GLASSMORPHISM INQUIRY FORM
            ============================================================ */}
            <div className="contact-form-card">
              
              <div className="form-card-header">
                <span className="form-eyebrow">MESSAGE OUR CONCIERGE</span>
                <h2 className="form-title">Get In Touch</h2>
                <p className="form-subtitle">
                  Fill in your details below and our lead PMU aesthetician will personally
                  review your request and get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="contact-actual-form">
                
                {/* Full Name */}
                <div className="form-group-item">
                  <label className="field-label">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Deepika Sundaram"
                    className={`field-input ${errors.name ? "has-error" : ""}`}
                  />
                  {errors.name && <span className="field-error-msg">{errors.name}</span>}
                </div>

                {/* Email Address */}
                <div className="form-group-item">
                  <label className="field-label">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="deepika@example.com"
                    className={`field-input ${errors.email ? "has-error" : ""}`}
                  />
                  {errors.email && <span className="field-error-msg">{errors.email}</span>}
                </div>

                {/* Phone Number with +91 */}
                <div className="form-group-item">
                  <label className="field-label">Phone Number *</label>
                  <div className="phone-input-combo">
                    <span className="country-tag">+91</span>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="98765 43210"
                      maxLength={10}
                      className={`field-input phone-box ${errors.phone ? "has-error" : ""}`}
                    />
                  </div>
                  {errors.phone && <span className="field-error-msg">{errors.phone}</span>}
                </div>

                {/* Service Interest */}
                <div className="form-group-item">
                  <label className="field-label">Treatment of Interest</label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="field-select"
                  >
                    <option value="Microblading">Microblading Master Artistry</option>
                    <option value="Combo Brows">Combo Nano Brows</option>
                    <option value="Ombre Brows">Ombre Powder Brows</option>
                    <option value="Lip Blushing">Aesthetic Lip Blushing</option>
                    <option value="Eyeliner Tattoo">Permanent Eyeliner &amp; Lash Line</option>
                    <option value="Brow Lamination">Keratin Brow Lamination &amp; Tint</option>
                    <option value="Scalp Micropigmentation">Scalp Micropigmentation (SMP)</option>
                    <option value="Hydra Facial">Medical Hydra Facial MD</option>
                    <option value="Skin Rejuvenation">Collagen Induction &amp; BB Glow</option>
                    <option value="Acne Scar Treatment">Acne Scar Resurfacing &amp; RF</option>
                    <option value="Academy Training Course">PMU Academy Master Certification</option>
                    <option value="General Inquiry">General Consultation &amp; Assessment</option>
                  </select>
                </div>

                {/* Message Details */}
                <div className="form-group-item flex-grow-message">
                  <div className="label-with-counter">
                    <label className="field-label">Your Message / Questions *</label>
                    <span className="char-count-pill">{charCount}/300</span>
                  </div>
                  <textarea
                    name="message"
                    rows="4"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your expectations, preferred consultation dates, or questions..."
                    maxLength={300}
                    className={`field-textarea ${errors.message ? "has-error" : ""}`}
                  />
                  {errors.message && <span className="field-error-msg">{errors.message}</span>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="contact-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span>Dispatching Message...</span>
                  ) : (
                    <>
                      <span>Send Inquiry Message</span>
                      <span className="btn-arrow-icon">&rarr;</span>
                    </>
                  )}
                </button>

              </form>

            </div>

          </div>
        </div>
      </main>

      {/* ============================================================
          3. DEDICATED SEPARATE LOCATION & MAP SHOWCASE SECTION
      ============================================================ */}
      <section className="contact-map-showcase-section">
        <div className="contact-page-container">
          <div className="contact-map-showcase-card">
            
            {/* Header with clinic address & quick actions */}
            <div className="map-showcase-header">
              <div className="map-header-text">
                <span className="map-showcase-eyebrow">STUDIO LOCATION &amp; NAVIGATION</span>
                <h2 className="map-showcase-title">Visit Our Anna Nagar Studio</h2>
                <p className="map-showcase-address">
                  📍 First Floor, AA-117, 4th Ave, opp. Naturals Signature Salon, AA Block, Shanthi Colony, Anna Nagar, Chennai, Tamil Nadu 600040
                </p>
              </div>

              <div className="map-header-actions">
                <a
                  href="https://maps.app.goo.gl/yJbv3pysWBLGZmUP6"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-map-get-directions"
                >
                  <FaDirections /> Get Directions on Google Maps
                </a>
                <a href="tel:+918111643210" className="btn-map-call">
                  <FaPhoneAlt /> Call Reception
                </a>
              </div>
            </div>

            {/* Interactive Wide Google Maps Frame */}
            <div className="map-iframe-wrapper">
              <iframe
                title="Browlicious Anna Nagar Clinic Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.1965902097034!2d80.2155005!3d13.0831788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265d656f0ae01%3A0x424da239c794397d!2sBrowlicious%20-%20Permanent%20Makeup%20Clinic%20%26%20Academy!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="380"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
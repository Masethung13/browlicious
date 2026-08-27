import React, { useState } from "react";
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

// Initialize Firebase (safely avoid duplicate initialization)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function ContactPage() {
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
      await fetch("https://formsubmit.co/ajax/bharathdws98424@gmail.com", {
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
    <div className="contact-page-wrapper">
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
        theme="light"
      />

      <div className="contact-page-container">
        
        {/* Page Top Banner Header */}
        <div className="contact-hero-header">
          <span className="contact-eyebrow">Connect With Our Studio</span>
          <h1 className="contact-main-title">
            Let’s Begin Your <em>Radiance</em> Journey
          </h1>
          <p className="contact-subtitle">
            Have questions about microblading, PMU treatments, or academy certifications?
            Our certified specialists are here to guide you with bespoke consultations.
          </p>
        </div>

        {/* Master 2-Column Grid */}
        <div className="contact-layout-grid">
          
          {/* ============================================================
              LEFT COLUMN: "NEED HELP?" CLINIC CARD WITH MAP
          ============================================================ */}
          <div className="contact-info-card">
            
            {/* Clinic Reception Banner Image */}
            <div className="clinic-banner-frame">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
                alt="Browlicious PMU Studio Interior"
                className="clinic-banner-img"
              />
              <div className="banner-gold-shimmer" />
            </div>

            {/* Need Help Heading */}
            <div className="info-card-header">
              <h3 className="help-title">NEED HELP?</h3>
              <p className="help-subtitle">
                Our experts are here to help you choose the right treatment.
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
                  <span className="meta-row-label">Call Us</span>
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
                  <span className="meta-row-label">WhatsApp Us</span>
                  <a
                    href="https://api.whatsapp.com/send/?phone=919710331111&text=Hello%20Browlicious%20Team,%20I%20would%20like%20to%20inquire%20about%20your%20treatments&type=phone_number&app_absent=0"
                    target="_blank"
                    rel="noreferrer"
                    className="meta-row-value whatsapp-link"
                  >
                    Chat with our team →
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="contact-meta-row">
                <div className="meta-icon-circle">
                  <FaEnvelope />
                </div>
                <div className="meta-row-content">
                  <span className="meta-row-label">Email</span>
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
                  <span className="meta-row-label">Location</span>
                  <span className="meta-row-value">
                    Browlicious PMU Clinic &amp; Academy, Chennai
                  </span>
                  <p className="meta-full-address">
                    First Floor, AA-117, 4th Ave, opp. Naturals Signature Salon,
                    AA Block, Shanthi Colony, Anna Nagar, Chennai, Tamil Nadu 600040
                  </p>
                </div>
              </div>

            </div>

            {/* Interactive Map Embed */}
            <div className="clinic-map-container">
              <iframe
                title="Browlicious Clinic Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.1965902097034!2d80.2155005!3d13.0831788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265d656f0ae01%3A0x424da239c794397d!2sBrowlicious%20-%20Permanent%20Makeup%20Clinic%20%26%20Academy!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="160"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

              <a
                href="https://maps.app.goo.gl/yJbv3pysWBLGZmUP6"
                target="_blank"
                rel="noreferrer"
                className="map-directions-btn"
              >
                <FaDirections /> Get Directions on Google Maps
              </a>
            </div>

            {/* Social Media Links */}
            <div className="contact-social-footer">
              <span className="social-footer-label">Follow Our Transformations:</span>
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
              RIGHT COLUMN: LUXURY GET IN TOUCH FORM
          ============================================================ */}
          <div className="contact-form-card">
            
            <div className="form-card-header">
              <span className="form-eyebrow">Message Our Concierge</span>
              <h2 className="form-title">Get In Touch</h2>
              <p className="form-subtitle">
                Fill in the details below and our lead aesthetician will personally
                respond within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              
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
                  <option value="Microblading">Microblading</option>
                  <option value="Combo Brows">Combo Brows</option>
                  <option value="Ombre Brows">Ombre Brows</option>
                  <option value="Lip Blushing">Lip Blushing</option>
                  <option value="Eyeliner Tattoo">Eyeliner Tattoo</option>
                  <option value="Brow Lamination">Brow Lamination</option>
                  <option value="Scalp Micropigmentation">Scalp Micropigmentation</option>
                  <option value="Skin Rejuvenation">Skin Rejuvenation</option>
                  <option value="Hydra Facial">Hydra Facial</option>
                  <option value="Acne Scar Treatment">Acne Scar Treatment</option>
                  <option value="Academy Training Course">PMU Academy Training Course</option>
                  <option value="General Inquiry">General Inquiry / Consultation</option>
                </select>
              </div>

              {/* Message Details */}
              <div className="form-group-item">
                <div className="label-with-counter">
                  <label className="field-label">Your Message / Questions *</label>
                  <span className="char-count-pill">{charCount}/300</span>
                </div>
                <textarea
                  name="message"
                  rows="4"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your expectations, preferred consultation dates, or skin goals..."
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
                    <span>Send Message</span>
                    <span className="btn-arrow-icon">→</span>
                  </>
                )}
              </button>

            </form>

          </div>

        </div>

      </div>
    </div>
  );
}
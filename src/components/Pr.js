import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/Pr.css";
import prBgImage from "../assets/pr-img.png";

gsap.registerPlugin(ScrollTrigger);

export default function Pr({ isDarkMode = false }) {
  const sectionRef = useRef(null);

  // GSAP ScrollTrigger Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Text Content Staggered Fade Up
      gsap.fromTo(
        ".pr-main-title",
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".pr-section-wrapper",
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(
        ".pr-description",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".pr-section-wrapper",
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // 2. Appointment Badge Zoom In & Rotate
      gsap.fromTo(
        ".pr-appointment-badge-wrapper",
        { opacity: 0, scale: 0.85, rotate: -8 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 1.1,
          delay: 0.35,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: ".pr-section-wrapper",
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      className={`pr-section-wrapper ${isDarkMode ? "dark-theme" : "light-theme"}`} 
      ref={sectionRef} 
      id="promo-banner"
      style={{ backgroundImage: `url(${prBgImage})` }}
    >
      {/* Background Luxury Dark/Light Overlay */}
      <div className="pr-section-overlay" />

      {/* Grid Content Container */}
      <div className="pr-section-container">
        
        {/* Left Column: Promotion Title and Subtext */}
        <div className="pr-content-left">
          <span className="pr-eyebrow-tag">ELEVATE YOUR AESTHETIC</span>
          <h2 className="pr-main-title">
            YOUR PMU ARTISTRY <br />
            <span className="pr-title-accent">JOURNEY BEGINS HERE</span>
          </h2>
          
          <p className="pr-description">
            Step into a world of refined precision where structural facial mapping, 
            custom hypoallergenic pigments, and master-level artistry converge in perfect balance. 
            Every procedure is crafted to restore symmetry, streamline your morning routine, 
            and awaken your natural, effortless elegance.
          </p>
        </div>

        {/* Right Column: Interactive Orbital Appointment Badge */}
        <div className="pr-content-right">
          <div className="pr-appointment-badge-wrapper">
            
            {/* Ambient Rotating Orbital Halo Ring */}
            <svg className="pr-orbital-ring-svg" viewBox="0 0 200 200">
              <circle 
                cx="100" 
                cy="100" 
                r="92" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.2" 
                strokeDasharray="6 8"
                className="orbital-dashed-circle"
              />
              <circle cx="100" cy="8" r="3" fill="currentColor" className="orbital-dot dot-top" />
              <circle cx="100" cy="192" r="3" fill="currentColor" className="orbital-dot dot-bottom" />
            </svg>

            {/* Main Interactive Circular Badge Link */}
            <a href="#book" className="pr-appointment-badge" aria-label="Book PMU Appointment">
              <div className="badge-hover-ripple" />
              <span className="badge-sub-label">Reserve Now</span>
              <span className="badge-text">Appointment</span>
              <div className="badge-arrow-line">
                <span className="badge-arrow-icon">→</span>
              </div>
            </a>

          </div>
        </div>

      </div>
    </section>
  );
}
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/AboutSection.css";
import aboutPmuArtist from "../assets/about-pmu-artist.jpg";
import aboutBrowCraft from "../assets/about-brow-craft.jpg";

gsap.registerPlugin(ScrollTrigger);

const STATS_DATA = [
  { value: 15, suffix: "k", label: "visitors" },
  { value: 10, suffix: "+", label: "years" },
  { value: 98, suffix: "%", label: "Positive Feedback" },
];

export default function AboutSection({ isDarkMode = false }) {
  const [counts, setCounts] = useState(STATS_DATA.map(() => 0));
  const sectionRef = useRef(null);
  const timerRef = useRef(null);

  // Function to run fresh counter animation
  const runCounter = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const duration = 1800; // 1.8 seconds
    const steps = 60;
    const intervalTime = duration / steps;
    let currentStep = 0;

    setCounts(STATS_DATA.map(() => 0));

    timerRef.current = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOutQuad = (t) => t * (2 - t);
      const easedProgress = easeOutQuad(progress);

      setCounts(
        STATS_DATA.map((stat) => Math.floor(easedProgress * stat.value))
      );

      if (currentStep >= steps) {
        setCounts(STATS_DATA.map((stat) => stat.value));
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }, intervalTime);
  };

  // GSAP ScrollTrigger animation for About elements & Counter
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Left Typography Content Staggered Fade Up
      gsap.fromTo(
        ".about-main-heading",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-content-column",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(
        ".about-description",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-content-column",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(
        ".about-btn-wrap",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.28,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-content-column",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(
        ".about-stat-item",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          delay: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-stats-row",
            start: "top 88%",
            toggleActions: "play none none none"
          }
        }
      );

      // 2. Right Layered Images Staggered Fade Up
      gsap.fromTo(
        ".primary-image-card",
        { opacity: 0, y: 60, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-images-column",
            start: "top 82%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(
        ".secondary-image-card",
        { opacity: 0, y: 80, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-images-column",
            start: "top 82%",
            toggleActions: "play none none none"
          }
        }
      );

      // 3. Counter Number Trigger - runs fresh every time on scroll
      ScrollTrigger.create({
        trigger: ".about-stats-row",
        start: "top 90%",
        onEnter: runCounter,
        onEnterBack: runCounter,
        onLeave: () => {
          if (timerRef.current) clearInterval(timerRef.current);
          setCounts(STATS_DATA.map(() => 0));
        },
        onLeaveBack: () => {
          if (timerRef.current) clearInterval(timerRef.current);
          setCounts(STATS_DATA.map(() => 0));
        }
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      ctx.revert();
    };
  }, []);

  return (
    <section 
      className={`about-section-wrapper ${isDarkMode ? "dark-theme" : "light-theme"}`} 
      ref={sectionRef} 
      id="about"
    >
      {/* Floating Botanical Background Illustration */}
      <div className="about-bg-floating-element">
        <img
          src="https://serava.casethemes.net/wp-content/uploads/2026/02/e81cca8c2b1dd27010897cdfc307998023423891-409x554.png"
          alt="Botanical element"
          className="floating-botanical-img"
          loading="lazy"
        />
      </div>

      <div className="about-section-container">
        
        {/* ============================================================
            LEFT COLUMN: Editorial Typography & Stats
        ============================================================ */}
        <div className="about-content-column">
          
          {/* Main Editorial Heading */}
          <h2 className="about-main-heading">
            <span className="heading-line">Embrace Wellness, Inner</span>
            <span className="heading-line">Peace, and the Beauty That</span>
            <span className="heading-line">Lasts Forever</span>
          </h2>

          {/* Description Paragraph */}
          <p className="about-description">
            At Serava Spa, we believe true beauty begins with balance — a harmony
            of body, mind, and spirit. Nestled in the heart of New York, our
            serene sanctuary offers bespoke treatments crafted to renew your skin,
            calm your senses, and restore your natural glow. Each visit is an
            invitation to unwind, reconnect, and rediscover your inner radiance.
          </p>

          {/* Rolling CTA Button */}
          <div className="about-btn-wrap">
            <a href="#story" className="about-story-btn">
              <span className="btn-text-normal">Discover Our Story</span>
              <span className="btn-text-hover">Discover Our Story</span>
            </a>
          </div>

          {/* Counters Row */}
          <div className="about-stats-row">
            {STATS_DATA.map((stat, index) => (
              <React.Fragment key={index}>
                <div className="about-stat-item">
                  <div className="stat-number-wrap">
                    <span className="stat-count-value">{counts[index]}</span>
                    <span className="stat-count-suffix">{stat.suffix}</span>
                  </div>
                  <div className="stat-item-divider" />
                  <span className="stat-item-title">{stat.label}</span>
                </div>
                {index < STATS_DATA.length - 1 && <div className="stat-col-divider" />}
              </React.Fragment>
            ))}
          </div>

        </div>

        {/* ============================================================
            RIGHT COLUMN: Layered Overlapping Images with Pinch Zoom
        ============================================================ */}
        <div className="about-images-column">
          <div className="layered-images-stage">
            
            {/* Primary Tall Portrait Image */}
            <div className="primary-image-card">
              <img
                src={aboutPmuArtist}
                alt="Browlicious Master PMU Artist Mapping Eyebrows"
                className="about-img-primary"
                loading="lazy"
              />
              <div className="image-lens-glow" />
            </div>

            {/* Overlapping Secondary Landscape Image */}
            <div className="secondary-image-card">
              <img
                src={aboutBrowCraft}
                alt="Browlicious Healed Microblading and Lip Blush Artistry"
                className="about-img-secondary"
                loading="lazy"
              />
              <div className="image-glass-glare" />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
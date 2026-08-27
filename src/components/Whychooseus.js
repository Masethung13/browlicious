import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/Whychooseus.css";

gsap.registerPlugin(ScrollTrigger);

// 6 Signature Cards Data tailored for Browlicious PMU Clinic & Academy
const FEATURE_DATA = [
  {
    id: 1,
    title: "Premium Natural\nIngredients Only",
    desc: "We use only the finest medical-grade pigments and organic soothing botanicals to protect your skin and elevate long-term retention.",
    svg: (
      <svg className="feature-line-svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        {/* Botanical leaf icon from reference */}
        <path d="M18 46C18 46 22 20 46 18C46 18 48 42 22 46C20 46 18 46 18 46Z" />
        <path d="M22 46L44 20" />
        <path d="M30 38C34 36 38 32 40 28" />
        <path d="M26 30C28 26 32 24 36 22" />
      </svg>
    )
  },
  {
    id: 2,
    title: "Tranquil Luxurious\nAtmosphere Always",
    desc: "Our serene sanctuary is thoughtfully designed with ambient warm lighting and private suites to gently calm your senses and restore inner peace.",
    svg: (
      <svg className="feature-line-svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        {/* Spa towel roll and flower */}
        <ellipse cx="32" cy="40" rx="16" ry="7" />
        <path d="M16 40C16 33 23 28 32 28C41 28 48 33 48 40" />
        <path d="M28 28C28 24 30 20 34 20C38 20 40 24 40 28" />
        <circle cx="44" cy="24" r="3" />
        <path d="M42 22C40 20 40 16 44 16C48 16 48 20 46 22" />
      </svg>
    )
  },
  {
    id: 3,
    title: "Personalized Wellness\nJourney Experience",
    desc: "Each treatment is meticulously tailored to your unique facial geometry, undertones, and aesthetic goals, creating timeless natural beauty.",
    svg: (
      <svg className="feature-line-svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        {/* Essential oil dropper & bottle */}
        <rect x="24" y="28" width="16" height="22" rx="4" />
        <path d="M28 28V24H36V28" />
        <path d="M32 16V24" />
        <path d="M30 16H34" />
        <path d="M40 18L44 14" />
        <path d="M44 22L48 18" />
      </svg>
    )
  },
  {
    id: 4,
    title: "Exclusive PMU\nSpecialization Only",
    desc: "We dedicate 100% of our mastery to permanent makeup and facial aesthetics, refining needle mapping and micro-pigmentation depth daily.",
    svg: (
      <svg className="feature-line-svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        {/* Precision microblading blade mapping */}
        <path d="M18 42C24 28 40 28 46 42" strokeDasharray="2 2" />
        <path d="M22 44C27 32 37 32 42 44" />
        <line x1="32" y1="18" x2="32" y2="34" />
        <circle cx="32" cy="34" r="1.5" fill="currentColor" />
      </svg>
    )
  },
  {
    id: 5,
    title: "Parastandard Hygiene\nProtocols Always",
    desc: "Our clinic strictly adheres to hospital-grade sanitation. All micro-needles are single-use, sterile, and unsealed directly in front of you.",
    svg: (
      <svg className="feature-line-svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        {/* Medical sanitation shield */}
        <path d="M32 16L46 22V36C46 45 32 50 32 50C32 50 18 45 18 36V22L32 16Z" />
        <circle cx="32" cy="33" r="5" />
        <path d="M32 28V38" />
        <path d="M27 33H37" />
      </svg>
    )
  },
  {
    id: 6,
    title: "Bespoke Pigment\nCustomization Blend",
    desc: "We custom-blend hypo-allergenic, mineral pigments that synchronize with your natural undertones for graceful, smudge-free retention.",
    svg: (
      <svg className="feature-line-svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        {/* Pigment droplet & palette blend */}
        <path d="M32 18C32 18 22 30 22 38C22 43.5 26.5 48 32 48C37.5 48 42 43.5 42 38C42 30 32 18 32 18Z" />
        <circle cx="32" cy="38" r="3" />
        <path d="M32 48V52" />
        <ellipse cx="32" cy="53" rx="8" ry="2" />
      </svg>
    )
  }
];

export default function WhyChooseUs({ isDarkMode = false }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const sectionRef = useRef(null);
  const sliderTrackRef = useRef(null);

  // Responsive Cards Per View Listener
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, FEATURE_DATA.length - cardsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  // GSAP ScrollTrigger Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title & Subtitle sequential scrollTrigger
      gsap.fromTo(
        ".why-main-title .why-line-text",
        { opacity: 0, y: 55 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".why-header-row",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(
        ".why-narrative-text",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".why-header-row",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(
        ".why-grid-stage",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".why-choose-us-section",
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Slide translation calculation (percentage per slide item)
  const itemWidthPercent = 100 / cardsPerView;
  const translateXValue = -(currentIndex * itemWidthPercent);

  return (
    <section 
      className={`why-choose-us-section ${isDarkMode ? "dark-theme" : "light-theme"}`} 
      ref={sectionRef} 
      id="why-us"
    >
      <div className="why-choose-container">
        
        {/* ============================================================
            HEADER BLOCK (Exact Layout Matching Reference)
        ============================================================ */}
        <div className="why-header-row">
          <div className="header-left-title">
            <h2 className="why-main-title">
              <div className="why-title-line">
                <span className="why-line-text">WHY CHOOSE <span className="title-accent-span">US</span></span>
              </div>
            </h2>
          </div>
          <div className="header-right-narrative">
            <p className="why-narrative-text">
              Where tranquility, care, and craftsmanship come together to create a truly restorative and deeply rejuvenating experience for your body and mind.
            </p>
          </div>
        </div>

        {/* Master Subtle Divider Line */}
        <div className="why-divider-line" />

        {/* ============================================================
            6-CARD SLIDER STAGE WITH OUTLINED ARROWS & PLUS DIVIDERS
        ============================================================ */}
        <div className="why-grid-stage">
          
          {/* Left Arrow Trigger */}
          <button 
            className="carousel-arrow-btn prev-arrow" 
            onClick={handlePrev}
            aria-label="Previous Cards"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="nav-arrow-svg">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>

          {/* Slider Window Frame */}
          <div className="why-slider-viewport">
            <div 
              className="why-slider-track" 
              ref={sliderTrackRef}
              style={{
                transform: `translateX(${translateXValue}%)`,
                transition: "transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)"
              }}
            >
              {FEATURE_DATA.map((feature, index) => (
                <div 
                  className="feature-slide-card" 
                  key={feature.id}
                  style={{ width: `${itemWidthPercent}%` }}
                >
                  <div className="feature-slide-inner">
                    
                    {/* Delicate Line-Art Illustration */}
                    <div className="feature-illustration-box">
                      {feature.svg}
                    </div>

                    {/* Stacked Serif Title */}
                    <h3 className="feature-slide-title">
                      {feature.title.split("\n").map((line, lIdx) => (
                        <span key={lIdx} className="title-text-line">{line}</span>
                      ))}
                    </h3>

                    {/* Narrative Description */}
                    <p className="feature-slide-desc">{feature.desc}</p>
                  </div>

                  {/* Plus Symbol Seam Divider for non-last items */}
                  {index < FEATURE_DATA.length - 1 && (
                    <div className="slide-seam-divider">
                      <span className="plus-symbol">+</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow Trigger */}
          <button 
            className="carousel-arrow-btn next-arrow" 
            onClick={handleNext}
            aria-label="Next Cards"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="nav-arrow-svg">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>

        </div>

        {/* Carousel Progress Dot Indicators */}
        <div className="why-pagination-dots">
          {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
            <button
              key={dotIdx}
              className={`pagination-dot ${currentIndex === dotIdx ? "active" : ""}`}
              onClick={() => setCurrentIndex(dotIdx)}
              aria-label={`Go to slide ${dotIdx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
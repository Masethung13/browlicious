import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/ServiceSection.css";
import bannerImg from "../assets/treatment_banner.jpg";
import microbladingImg from "../assets/MicrobladingBanner.jpg";
import scalpImg from "../assets/scalp_micropigmentation.jpg";
import lipImg from "../assets/lip_blushing.jpg";
import hydraImg from "../assets/hydra_facial.jpg";
import bbGlowImg from "../assets/bb_glow_treatment.jpg";
import wingedEyelinerImg from "../assets/winged_eyeliner_treatment.jpg";
import OmbreImg from "../assets/ombre.png";
import CombobrowImg from "../assets/ComboBrows.jpg";
import eyelinerImg from "../assets/Combo.jpg";
import eyetattoImg from "../assets/EyelinerTattoo.jpg";

gsap.registerPlugin(ScrollTrigger);

// 12 Signature Treatments Data with authentic image assets and specific SVG badge categories
const treatmentsData = [
  {
    id: "microblading",
    title: "Microblading",
    category: "BROWS",
    desc: "Natural hair-like strokes for perfect brows.",
    duration: "2 - 2.5 Hours",
    longevity: "1 - 2 Years",
    iconType: "blade",
    img: microbladingImg
  },
  {
    id: "combo-brows",
    title: "Combo Brows",
    category: "BROWS",
    desc: "Microblading + Shading for fuller, defined brows.",
    duration: "2.5 - 3 Hours",
    longevity: "1 - 2 Years",
    iconType: "combo",
    img: CombobrowImg
  },
  {
    id: "ombre-brows",
    title: "Ombre Brows",
    category: "BROWS",
    desc: "Soft powdered brows for a natural makeup look.",
    duration: "2 - 3 Hours",
    longevity: "1 - 2 Years",
    iconType: "powder",
    img: OmbreImg
  },
  {
    id: "brow-lamination",
    title: "Brow Lamination",
    category: "BROWS",
    desc: "Perfectly lifted and styled brows.",
    duration: "1 - 1.5 Hours",
    longevity: "4 - 6 Weeks",
    iconType: "spoolie",
    img: eyetattoImg
  },
  {
    id: "scalp-micropigmentation",
    title: "Scalp Micropigmentation",
    category: "SCALP",
    desc: "Natural look for hair restoration.",
    duration: "2 - 3 Hours",
    longevity: "2 - 5 Years",
    iconType: "scalp",
    img: scalpImg
  },
  {
    id: "lip-blushing",
    title: "Lip Blushing",
    category: "LIPS",
    desc: "Enhance natural lip color and shape.",
    duration: "2 - 2.5 Hours",
    longevity: "2 - 3 Years",
    iconType: "lips",
    img: lipImg
  },
  {
    id: "eyeliner-tattoo",
    title: "Eyeliner Tattoo",
    category: "EYES",
    desc: "Defined eyes that last beautifully.",
    duration: "1.5 - 2 Hours",
    longevity: "2 - 3 Years",
    iconType: "eye",
    img: eyelinerImg
  },
  {
    id: "skin-rejuvenation",
    title: "Skin Rejuvenation",
    category: "SKIN",
    desc: "Anti-aging and glow enhancement.",
    duration: "45 - 60 Mins",
    longevity: "Varies",
    iconType: "wand",
    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "hydra-facial",
    title: "Hydra Facial",
    category: "SKIN",
    desc: "Deep cleansing and hydration boost.",
    duration: "60 Mins",
    longevity: "3 - 4 Weeks",
    iconType: "droplet",
    img: hydraImg
  },
  {
    id: "acne-scar-treatment",
    title: "Acne Scar Treatment",
    category: "COSMETIC",
    desc: "Reduce acne scars and improve skin texture.",
    duration: "45 - 60 Mins",
    longevity: "Varies",
    iconType: "skin",
    img: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "bb-glow-treatment",
    title: "BB Glow Radiance",
    category: "SKIN",
    desc: "Semi-permanent foundation glow for a flawless complexion.",
    duration: "60 - 75 Mins",
    longevity: "4 - 6 Months",
    iconType: "droplet",
    img: bbGlowImg
  },
  {
    id: "permanent-eyeliner-wing",
    title: "Winged Eyeliner",
    category: "EYES",
    desc: "Smudge-proof customized eyeliner wing and lash contour.",
    duration: "1.5 - 2 Hours",
    longevity: "2 - 4 Years",
    iconType: "eye",
    img: wingedEyelinerImg
  }
];

const STATS_CONFIG = [
  { target: 10, suffix: "+", label: "Years Experience", isDecimal: false, icon: "badge" },
  { target: 5000, suffix: "+", label: "Happy Clients", isDecimal: false, icon: "clients" },
  { target: 15, suffix: "+", label: "Expert Doctors", isDecimal: false, icon: "doctors" },
  { target: 98, suffix: "%", label: "Satisfaction Rate", isDecimal: false, icon: "shield" },
  { target: 4.9, suffix: "/5", label: "Client Rating", isDecimal: true, icon: "rating" }
];

const FILTERS = ["ALL", "BROWS", "LIPS", "EYES", "SKIN", "SCALP", "PMU", "COSMETIC"];

// Helper to render treatment circular badge icons
function renderBadgeIcon(type) {
  switch (type) {
    case "blade":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="badge-svg-icon">
          <path d="m18 2 4 4-14 14H4v-4L18 2z" />
          <path d="m14.5 5.5 4 4" />
        </svg>
      );
    case "combo":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="badge-svg-icon">
          <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
          <line x1="16" y1="8" x2="2" y2="22" />
          <line x1="17.5" y1="15" x2="9" y2="15" />
        </svg>
      );
    case "powder":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="badge-svg-icon">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
        </svg>
      );
    case "spoolie":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="badge-svg-icon">
          <line x1="4" y1="20" x2="20" y2="4" />
          <line x1="14" y1="4" x2="20" y2="10" />
          <line x1="11" y1="7" x2="17" y2="13" />
          <line x1="8" y1="10" x2="14" y2="16" />
        </svg>
      );
    case "scalp":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="badge-svg-icon">
          <circle cx="12" cy="7" r="4" />
          <path d="M6 21v-2a6 6 0 0 1 12 0v2" />
          <line x1="12" y1="11" x2="12" y2="17" />
          <line x1="9" y1="14" x2="15" y2="14" />
        </svg>
      );
    case "lips":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="badge-svg-icon">
          <path d="M12 4C8 4 4 7 2 10c3 3 7 5 10 5s7-2 10-5c-2-3-6-6-10-6z" />
          <path d="M2 10c3 5 7 8 10 8s7-3 10-8" />
          <path d="M7 10c2.5 2 7.5 2 10 0" />
        </svg>
      );
    case "eye":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="badge-svg-icon">
          <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="3" />
          <path d="M19 8c2-2 3-2 3-2" />
        </svg>
      );
    case "wand":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="badge-svg-icon">
          <path d="m15 4-2 4 4-2-4 4 4 2-4-2 2 4" />
          <path d="m9 15-7 7" />
          <path d="m20 2-2 2" />
          <path d="m19 9 2 2" />
        </svg>
      );
    case "droplet":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="badge-svg-icon">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          <circle cx="12" cy="14" r="3" />
        </svg>
      );
    case "skin":
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="badge-svg-icon">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      );
  }
}

// Render Stat Icons
function renderStatIcon(icon) {
  switch (icon) {
    case "badge":
      return (
        <svg className="stat-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="6" />
          <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
        </svg>
      );
    case "clients":
      return (
        <svg className="stat-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "doctors":
      return (
        <svg className="stat-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="7" r="4" />
          <path d="M5.5 21v-2a6.5 6.5 0 0 1 13 0v2" />
          <line x1="12" y1="11" x2="12" y2="17" />
          <line x1="9" y1="14" x2="15" y2="14" />
        </svg>
      );
    case "shield":
      return (
        <svg className="stat-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "rating":
    default:
      return (
        <svg className="stat-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
        </svg>
      );
  }
}

export default function ServiceSection({ isDarkMode = false }) {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("Popular");
  const [statCounts, setStatCounts] = useState(STATS_CONFIG.map(() => 0));
  const sectionRef = useRef(null);
  const cardsGridRef = useRef(null);
  const timerRef = useRef(null);

  // Fresh counter animation function
  const runCounter = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const duration = 1800; // 1.8 seconds
    const steps = 60;
    const intervalTime = duration / steps;
    let currentStep = 0;

    setStatCounts(STATS_CONFIG.map(() => 0));

    timerRef.current = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOutQuad = (t) => t * (2 - t);
      const easedProgress = easeOutQuad(progress);

      setStatCounts(
        STATS_CONFIG.map((stat) => {
          if (stat.isDecimal) {
            return Number((easedProgress * stat.target).toFixed(1));
          }
          return Math.floor(easedProgress * stat.target);
        })
      );

      if (currentStep >= steps) {
        setStatCounts(STATS_CONFIG.map((stat) => stat.target));
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }, intervalTime);
  };

  // GSAP Master ScrollTrigger Animations for Section & Individual Cards
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Top Banner Headings Sequential Line-by-Line Scroll Trigger
      const titleLines = gsap.utils.toArray(".services-main-title .services-title-line .services-line-text");

      gsap.fromTo(
        ".services-eyebrow",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".services-left-content",
            start: "top 88%",
            toggleActions: "play none none none"
          }
        }
      );

      titleLines.forEach((line, index) => {
        gsap.fromTo(
          line,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: line,
              start: `top ${88 - index * 6}%`,
              end: `top ${58 - index * 6}%`,
              scrub: 1.2,
            },
          }
        );
      });

      gsap.fromTo(
        ".services-subtitle",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.25,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".services-subtitle",
            start: "top 88%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(
        ".practitioner-img-frame",
        { opacity: 0, y: 55, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".services-hero-banner",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      // 2. Toolbar Trigger
      gsap.fromTo(
        ".services-toolbar-row",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".services-toolbar-row",
            start: "top 90%",
            toggleActions: "play none none none"
          }
        }
      );

      // 3. Counter Animation on Scroll - Re-runs fresh every time
      ScrollTrigger.create({
        trigger: ".services-stats-card",
        start: "top 90%",
        onEnter: runCounter,
        onEnterBack: runCounter,
        onLeave: () => {
          if (timerRef.current) clearInterval(timerRef.current);
          setStatCounts(STATS_CONFIG.map(() => 0));
        },
        onLeaveBack: () => {
          if (timerRef.current) clearInterval(timerRef.current);
          setStatCounts(STATS_CONFIG.map(() => 0));
        }
      });

      // 4. Staggered ScrollTrigger for Each Card One by One
      const cardElements = sectionRef.current?.querySelectorAll(".treatment-card-item");
      if (cardElements && cardElements.length > 0) {
        gsap.utils.toArray(cardElements).forEach((card, index) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 50, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.85,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none none",
                once: true
              }
            }
          );
        });
      }

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      ctx.revert();
    };
  }, []);

  // Animate cards smoothly on filter change
  useEffect(() => {
    if (cardsGridRef.current) {
      const cards = cardsGridRef.current.querySelectorAll(".treatment-card-item");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.07,
          duration: 0.6,
          ease: "power2.out",
          overwrite: "auto"
        }
      );
    }
  }, [activeFilter]);

  // Filtering Logic
  const filteredTreatments = treatmentsData.filter((item) => {
    if (activeFilter === "ALL") return true;
    if (activeFilter === "PMU") return ["BROWS", "LIPS", "EYES", "SCALP"].includes(item.category);
    return item.category === activeFilter;
  });

  return (
    <section 
      className={`services-section-wrapper ${isDarkMode ? "dark-theme" : "light-theme"}`} 
      id="services" 
      ref={sectionRef}
    >
      
      {/* ============================================================
          TOP HERO & STATS BANNER
      ============================================================ */}
      <div className="services-hero-banner">
        <div className="services-banner-grid">
          
          {/* Left Column: Headings & Floating Stats Ribbon */}
          <div className="services-left-content">
            <span className="services-eyebrow">OUR SERVICES</span>
            <h2 className="services-main-title">
              <div className="services-title-line">
                <span className="services-line-text">Our Signature</span>
              </div>
              <div className="services-title-line">
                <span className="services-line-text services-title-accent">Treatments</span>
              </div>
            </h2>
            <p className="services-subtitle">
              Advanced cosmetic and permanent makeup solutions designed for your natural beauty.
            </p>
            
            {/* Stats Card Ribbon with Dynamic Counter Animation */}
            <div className="services-stats-card">
              {STATS_CONFIG.map((stat, idx) => (
                <div className="stat-card-item" key={stat.label}>
                  <div className="stat-icon-wrapper">
                    {renderStatIcon(stat.icon)}
                  </div>
                  <div className="stat-info-text">
                    <span className="stat-number-val">
                      {stat.isDecimal ? statCounts[idx].toFixed(1) : statCounts[idx]}
                      <span className="stat-suffix-mark">{stat.suffix}</span>
                    </span>
                    <span className="stat-label-text">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Practitioner Aesthetic Image with Pinch-In Zoom */}
          <div className="services-right-image-container">
            <div className="practitioner-img-frame">
              <img 
                src={bannerImg} 
                alt="Browlicious Specialist in uniform performing signature brow treatment" 
                className="services-practitioner-img"
              />
              <div className="img-glow-overlay" />
            </div>
          </div>

        </div>
      </div>

      {/* ============================================================
          FILTER TABS & SORT CONTROL BAR
      ============================================================ */}
      <div className="services-toolbar-row">
        
        {/* Category Pills */}
        <div className="services-filters-group">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              className={`filter-pill-btn ${activeFilter === filter ? "active" : ""}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Sort Dropdown Selector */}
        <div className="services-sort-wrapper">
          <svg className="sort-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <line x1="4" y1="21" x2="4" y2="14" />
            <line x1="4" y1="10" x2="4" y2="3" />
            <line x1="12" y1="21" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12" y2="3" />
            <line x1="20" y1="21" x2="20" y2="16" />
            <line x1="20" y1="12" x2="20" y2="3" />
            <line x1="1" y1="14" x2="7" y2="14" />
            <line x1="9" y1="8" x2="15" y2="8" />
            <line x1="17" y1="16" x2="23" y2="16" />
          </svg>
          
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)} 
            className="services-sort-dropdown"
          >
            <option value="Popular">Sort by: Popular</option>
            <option value="Newest">Sort by: Newest</option>
            <option value="Duration">Sort by: Duration</option>
          </select>
          
          <svg className="sort-chevron-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>

      </div>

      {/* ============================================================
          SIGNATURE TREATMENT CARDS GRID (5 COLUMNS)
      ============================================================ */}
      <div className="services-cards-grid" ref={cardsGridRef}>
        {filteredTreatments.map((treatment) => (
          <div 
            className="treatment-card-item" 
            key={treatment.id}
          >
            
            {/* Card Top Image & Overlapping Circular Badge with Advanced Pinch Zoom */}
            <div className="treatment-image-wrapper">
              <img 
                src={treatment.img} 
                alt={treatment.title} 
                className="treatment-img"
              />
              <div className="treatment-badge-circle" title={treatment.category}>
                {renderBadgeIcon(treatment.iconType)}
              </div>
              <div className="treatment-lens-flare" />
            </div>

            {/* Card Content Information */}
            <div className="treatment-info-wrapper">
              <h3 className="treatment-card-name">{treatment.title}</h3>
              <p className="treatment-card-desc">{treatment.desc}</p>
              
              {/* Duration and Retention Meta Row */}
              <div className="treatment-meta-info">
                <div className="meta-info-item">
                  <svg className="meta-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>{treatment.duration}</span>
                </div>
                
                <div className="meta-info-item">
                  <svg className="meta-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span>{treatment.longevity}</span>
                </div>
              </div>

              {/* View Details Action Button with Arrow */}
              <a href="#book" className="treatment-details-btn">
                <span>VIEW DETAILS</span>
                <span className="btn-arrow">→</span>
              </a>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}
import React, { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/Results.css";

// Hero & Sidebar Assets
import heroBgImg from "../assets/abt_hero_banner.jpg";
import resultsHeroBanner from "../assets/results_hero_banner.jpg";
import videoThumbImg from "../assets/pmu_client_portrait.jpg";

// Treatment Before / After Assets
import microbladingBefore from "../assets/Result/microblading_before.png";
import microbladingAfter from "../assets/Result/microblading_after.png";

import comboBrowsBefore from "../assets/Result/combo_brows_before.png";
import comboBrowsAfter from "../assets/Result/combo_brows_after.png";

import ombreBrowsBefore from "../assets/Result/ombre_brows_before.png";
import ombreBrowsAfter from "../assets/Result/ombre_brows_after.png";

import lipBlushingBefore from "../assets/Result/lip_blushing_before.png";
import lipBlushingAfter from "../assets/Result/lip_blushing_after.png";

import eyelinerBefore from "../assets/Result/Eye_liner_tattoo_before.png";
import eyelinerAfter from "../assets/Result/Eye_liner_tattoo_after.png";

import browLaminationBefore from "../assets/Result/Brow_lamination_before.png";
import browLaminationAfter from "../assets/Result/Brow_lamination_after.png";

import scalpBefore from "../assets/Result/micropigmentation_before.png";
import scalpAfter from "../assets/Result/micropigmentation_after.png";

import skinRejuvBefore from "../assets/Result/skin_rejuventation_before.png";
import skinRejuvAfter from "../assets/Result/skin_rejuventation_after.png";

import hydraFacialBefore from "../assets/Result/hydra_facial_before.png";
import hydraFacialAfter from "../assets/Result/hydra_facial_after.png";

import acneScarBefore from "../assets/Result/Acne_scar_treatment_before.png";
import acneScarAfter from "../assets/Result/Acne_scar_treatment_after.png";

// Assets for Process Timeline Section
import consultImg from "../assets/about-pmu-artist.jpg";
import mappingImg from "../assets/about-brow-craft.jpg";
import procedureImg from "../assets/pmu_treatment_suite.jpg";
import aftercareClientImg from "../assets/pmu_client_portrait.jpg";

gsap.registerPlugin(ScrollTrigger);

// Category Filter Tabs
const FILTER_CATEGORIES = [
  "ALL",
  "BROWS",
  "LIPS",
  "EYELINER",
  "SCALP",
  "SKIN",
  "PMU",
  "COSMETIC",
];

// Specialists List for Dropdown
const SPECIALISTS_LIST = [
  "All Specialists",
  "Dr. Ananya R.",
  "Priya Sharma",
  "Rahul Mehta",
  "Neha Sharma",
];

// All 10 Treatments Dataset
const RESULTS_DATA = [
  {
    id: 1,
    category: ["BROWS", "PMU"],
    title: "Microblading",
    desc: "Natural, fuller brows with hair-like strokes",
    specialist: "Dr. Ananya R.",
    date: "12 May 2024",
    timestamp: new Date("2024-05-12").getTime(),
    beforeImg: microbladingBefore,
    afterImg: microbladingAfter,
    fallbackBefore: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
    fallbackAfter: "https://images.unsplash.com/photo-1512290900672-1f551786c567?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    category: ["LIPS", "PMU"],
    title: "Lip Blushing",
    desc: "Enhance natural lip color and shape",
    specialist: "Priya Sharma",
    date: "08 Apr 2024",
    timestamp: new Date("2024-04-08").getTime(),
    beforeImg: lipBlushingBefore,
    afterImg: lipBlushingAfter,
    fallbackBefore: "https://images.unsplash.com/photo-1588515724527-074a7a56616c?auto=format&fit=crop&w=600&q=80",
    fallbackAfter: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    category: ["EYELINER", "PMU"],
    title: "Eyeliner Tattoo",
    desc: "Defined eyes that last beautifully",
    specialist: "Neha Sharma",
    date: "20 Apr 2024",
    timestamp: new Date("2024-04-20").getTime(),
    beforeImg: eyelinerBefore,
    afterImg: eyelinerAfter,
    fallbackBefore: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80",
    fallbackAfter: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    category: ["SCALP", "PMU"],
    title: "Scalp Micropigmentation",
    desc: "Natural look for hair restoration",
    specialist: "Rahul Mehta",
    date: "15 Apr 2024",
    timestamp: new Date("2024-04-15").getTime(),
    beforeImg: scalpBefore,
    afterImg: scalpAfter,
    fallbackBefore: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    fallbackAfter: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    category: ["BROWS", "PMU"],
    title: "Combo Brows",
    desc: "Microblading + Shading for fuller brows",
    specialist: "Dr. Ananya R.",
    date: "01 May 2024",
    timestamp: new Date("2024-05-01").getTime(),
    beforeImg: comboBrowsBefore,
    afterImg: comboBrowsAfter,
    fallbackBefore: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80",
    fallbackAfter: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    category: ["BROWS", "COSMETIC"],
    title: "Brow Lamination",
    desc: "Perfectly lifted and styled brows",
    specialist: "Priya Sharma",
    date: "18 Apr 2024",
    timestamp: new Date("2024-04-18").getTime(),
    beforeImg: browLaminationBefore,
    afterImg: browLaminationAfter,
    fallbackBefore: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=600&q=80",
    fallbackAfter: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 7,
    category: ["BROWS", "PMU"],
    title: "Ombre Brows",
    desc: "Soft powdered gradient mist effect with defined tail",
    specialist: "Dr. Ananya R.",
    date: "25 Apr 2024",
    timestamp: new Date("2024-04-25").getTime(),
    beforeImg: ombreBrowsBefore,
    afterImg: ombreBrowsAfter,
    fallbackBefore: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    fallbackAfter: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 8,
    category: ["SKIN", "COSMETIC"],
    title: "Skin Rejuvenation",
    desc: "Targeted collagen stimulation and glass skin radiance",
    specialist: "Dr. Ananya R.",
    date: "04 May 2024",
    timestamp: new Date("2024-05-04").getTime(),
    beforeImg: skinRejuvBefore,
    afterImg: skinRejuvAfter,
    fallbackBefore: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80",
    fallbackAfter: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 9,
    category: ["SKIN", "COSMETIC"],
    title: "Hydra Facial",
    desc: "Deep vacuum suction, lactic peel & vortex hydration",
    specialist: "Priya Sharma",
    date: "02 May 2024",
    timestamp: new Date("2024-05-02").getTime(),
    beforeImg: hydraFacialBefore,
    afterImg: hydraFacialAfter,
    fallbackBefore: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=600&q=80",
    fallbackAfter: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 10,
    category: ["SKIN", "COSMETIC"],
    title: "Acne Scar Treatment",
    desc: "Microneedling RF resurfacing for smooth, even skin texture",
    specialist: "Dr. Ananya R.",
    date: "28 Apr 2024",
    timestamp: new Date("2024-04-28").getTime(),
    beforeImg: acneScarBefore,
    afterImg: acneScarAfter,
    fallbackBefore: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80",
    fallbackAfter: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80",
  },
];

// ============================================================
// Animated Number Counter Component (Recounts on every scroll trigger)
// ============================================================
function AnimatedCounter({ end, duration = 1.8, suffix = "", decimals = 0 }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const el = countRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          let start = 0;
          setCount(0);
          const totalFrames = Math.round(duration * 60);
          let frame = 0;

          intervalRef.current = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = start + (end - start) * easeProgress;

            if (frame >= totalFrames) {
              setCount(end);
              clearInterval(intervalRef.current);
            } else {
              setCount(
                decimals > 0
                  ? parseFloat(current.toFixed(decimals))
                  : Math.floor(current)
              );
            }
          }, 1000 / 60);
        } else {
          // Reset count to 0 when scrolled out of view so it counts again on return
          if (intervalRef.current) clearInterval(intervalRef.current);
          setCount(0);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [end, duration, decimals]);

  return (
    <span ref={countRef}>
      {count}
      {suffix}
    </span>
  );
}

// ============================================================
// Interactive Before / After Image Split-Slider Component
// ============================================================
function BeforeAfterSlider({ beforeImg, afterImg, fallbackBefore, fallbackAfter, title }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  const handlePointerDown = () => setIsDragging(true);
  const handlePointerUp = () => setIsDragging(false);

  const handlePointerMove = (e) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) handleMove(e.touches[0].clientX);
  };

  return (
    <div
      className="ba-slider-container"
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerMove={handlePointerMove}
      onTouchMove={handleTouchMove}
    >
      {/* 1. After Image (Full Base Background) */}
      <img
        src={afterImg}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = fallbackAfter;
        }}
        alt={`${title} After Treatment`}
        className="ba-image after-img"
        loading="lazy"
        draggable="false"
      />
      <span className="ba-badge badge-after">AFTER</span>

      {/* 2. Before Image (Clipped overlay based on sliderPosition) */}
      <div
        className="ba-before-wrapper"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={beforeImg}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackBefore;
          }}
          alt={`${title} Before Treatment`}
          className="ba-image before-img"
          loading="lazy"
          draggable="false"
        />
        <span className="ba-badge badge-before">BEFORE</span>
      </div>

      {/* 3. Draggable Vertical Divider Line & Central Circular Handle */}
      <div className="ba-slider-divider" style={{ left: `${sliderPosition}%` }}>
        <div className="ba-handle-circle">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Main Results Page Component
// ============================================================
export default function Results({ isDarkMode = false, setIsDarkMode }) {
  const containerRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [selectedSpecialist, setSelectedSpecialist] = useState("All Specialists");
  const [sortBy, setSortBy] = useState("newest");
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Filter & Sort Logic
  const filteredData = RESULTS_DATA.filter((item) => {
    const matchesCategory =
      activeCategory === "ALL" || item.category.includes(activeCategory);
    const matchesSpecialist =
      selectedSpecialist === "All Specialists" ||
      item.specialist === selectedSpecialist;
    return matchesCategory && matchesSpecialist;
  }).sort((a, b) => {
    if (sortBy === "newest") return b.timestamp - a.timestamp;
    if (sortBy === "oldest") return a.timestamp - b.timestamp;
    return a.id - b.id;
  });

  // GSAP ScrollTrigger Sequence Fade-Up (Triggers Every Time On Scroll)
  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // 1. Top Hero Header Title Fade-In
      gsap.fromTo(
        ".results-top-hero-title",
        { opacity: 0, y: 35, letterSpacing: "0.3em" },
        { opacity: 1, y: 0, letterSpacing: "0.22em", duration: 1.1, ease: "power3.out" }
      );

      // 2. Timeline Dynamic Line Fill & Step Rows Animation
      gsap.fromTo(
        ".journey-timeline-fill",
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: ".journey-timeline-wrapper",
            start: "top 65%",
            end: "bottom 75%",
            scrub: 0.4,
          },
        }
      );

      gsap.utils.toArray(".journey-timeline-row").forEach((row) => {
        const leftCol = row.querySelector(".journey-col-left");
        const centerBadge = row.querySelector(".journey-step-badge");
        const rightCol = row.querySelector(".journey-col-right");

        if (leftCol) {
          gsap.fromTo(
            leftCol,
            { opacity: 0, x: -60 },
            {
              opacity: 1,
              x: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: row,
                start: "top 82%",
                toggleActions: "play reverse play reverse",
              },
            }
          );
        }

        if (centerBadge) {
          gsap.fromTo(
            centerBadge,
            { opacity: 0, scale: 0.5 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: "back.out(1.8)",
              scrollTrigger: {
                trigger: row,
                start: "top 78%",
                toggleActions: "play reverse play reverse",
                onEnter: () => centerBadge.classList.add("badge-active"),
                onLeaveBack: () => centerBadge.classList.remove("badge-active"),
              },
            }
          );
        }

        if (rightCol) {
          gsap.fromTo(
            rightCol,
            { opacity: 0, x: 60 },
            {
              opacity: 1,
              x: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: row,
                start: "top 82%",
                toggleActions: "play reverse play reverse",
              },
            }
          );
        }
      });

      // 3. Showcase Left Column Glide
      gsap.fromTo(
        ".results-hero-left",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".results-hero-grid",
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // 3. Showcase Right Image Glide
      gsap.fromTo(
        ".results-hero-right",
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".results-hero-grid",
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // 4. Staggered 4 Stats Strip Fade-Up
      gsap.fromTo(
        ".hero-stat-box",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".results-hero-stats-strip",
            start: "top 88%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // 5. Filter Controls Bar Fade-Up
      gsap.fromTo(
        ".results-filter-bar",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".results-filter-bar",
            start: "top 90%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // 6. Each Treatment Card Stagger Fade-Up One by One
      gsap.fromTo(
        ".result-treatment-card",
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".results-cards-grid",
            start: "top 88%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // 7. Sidebar Widgets Stagger Fade-Up
      gsap.fromTo(
        ".results-sidebar-widget",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.16,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".results-sidebar",
            start: "top 88%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      className={`results-template-wrapper ${
        isDarkMode ? "dark-theme" : "light-theme"
      }`}
      ref={containerRef}
    >
      {/* Floating Theme Toggle Button */}
      {setIsDarkMode && (
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="theme-toggle-btn"
          aria-label="Toggle Theme"
        >
          {isDarkMode ? (
            <svg
              className="theme-svg-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
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
            <svg
              className="theme-svg-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          )}
        </button>
      )}

      {/* ============================================================
          1. TOP LUXURY HERO BANNER & SUBBAR (MATCHING ABTPG AESTHETIC)
      ============================================================ */}
      <header className="abt-hero-section">
        <div
          className="abt-hero-banner"
          style={{ backgroundImage: `url(${heroBgImg})` }}
        >
          <div className="abt-hero-overlay"></div>
          <div className="abt-hero-inner">
            <h1 className="abt-hero-title results-top-hero-title">
              REAL PROCESS &amp; RESULTS
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
            <span className="abt-current">Results</span>
          </nav>
          <p className="abt-hero-subtitle">
            Witness authentic client transformations crafted with clinical precision,
            organic mineral pigments, and bespoke micro-pigmentation artistry.
          </p>
        </div>
      </header>

      {/* ============================================================
          2. OUR PROVEN PROCESS: THE BROWLICIOUS JOURNEY TIMELINE
      ============================================================ */}
      <section className="journey-process-section">
        <div className="journey-process-container">
          
          {/* Section Header */}
          <div className="journey-section-header">
            <span className="journey-section-eyebrow">OUR PROVEN PROCESS</span>
            <h2 className="journey-section-title">The Browlicious Journey</h2>
            <div className="journey-header-accent-dot"></div>
          </div>

          {/* Central Vertical Timeline */}
          <div className="journey-timeline-wrapper">
            <div className="journey-vertical-line" aria-hidden="true">
              <div className="journey-timeline-fill"></div>
            </div>

            {/* STEP 01: Consultation */}
            <div className="journey-timeline-row row-step-01">
              <div className="journey-col-left journey-img-pane">
                <div className="journey-img-card">
                  <img
                    src={consultImg}
                    alt="Consultation - Understanding You First"
                    className="journey-step-img"
                  />
                </div>
              </div>

              <div className="journey-col-center">
                <div className="journey-step-badge">
                  <span>01</span>
                  <div className="badge-stylus-icon" title="Precision Consultation">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                      <path d="M2 2l7.586 7.586"></path>
                      <circle cx="11" cy="11" r="2"></circle>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="journey-col-right journey-content-pane">
                <div className="journey-content-card">
                  <h3 className="journey-step-num-title">01 &mdash; Consultation</h3>
                  <h4 className="journey-step-headline">Understanding You First.</h4>
                  <p className="journey-step-desc">
                    Every Browlicious journey begins with a personal consultation. We listen to your goals,
                    understand your concerns and assess your features before recommending the right treatment.
                  </p>
                  <div className="journey-pills-row">
                    <span className="journey-feature-pill">🌸 Personal Goals</span>
                    <span className="journey-feature-pill">🔍 Feature Assessment</span>
                    <span className="journey-feature-pill">💬 Treatment Discussion</span>
                  </div>
                  <Link to="/book-appointment" className="journey-learn-more-link">
                    LEARN MORE &rarr;
                  </Link>
                </div>
              </div>
            </div>

            {/* STEP 02: Design & Mapping */}
            <div className="journey-timeline-row row-step-02">
              <div className="journey-col-left journey-content-pane">
                <div className="journey-content-card">
                  <h3 className="journey-step-num-title">02 &mdash; Design &amp; Mapping</h3>
                  <h4 className="journey-step-headline">Precision Before Procedure.</h4>
                  <p className="journey-step-desc">
                    Our specialists carefully map and design the treatment around your natural features,
                    facial proportions and desired result.
                  </p>
                  <div className="journey-pills-row">
                    <span className="journey-feature-pill">📐 Shape</span>
                    <span className="journey-feature-pill">⚖️ Symmetry</span>
                    <span className="journey-feature-pill">📏 Proportion</span>
                    <span className="journey-feature-pill">✏️ Personalized Design</span>
                  </div>
                  <Link to="/book-appointment" className="journey-learn-more-link">
                    LEARN MORE &rarr;
                  </Link>
                </div>
              </div>

              <div className="journey-col-center">
                <div className="journey-step-badge">
                  <span>02</span>
                </div>
              </div>

              <div className="journey-col-right journey-img-pane">
                <div className="journey-img-card">
                  <img
                    src={mappingImg}
                    alt="Design & Mapping - Precision Before Procedure"
                    className="journey-step-img"
                  />
                </div>
              </div>
            </div>

            {/* STEP 03: Precision Procedure */}
            <div className="journey-timeline-row row-step-03">
              <div className="journey-col-left journey-img-pane">
                <div className="journey-img-card">
                  <img
                    src={procedureImg}
                    alt="Precision Procedure - Where Expertise Meets Artistry"
                    className="journey-step-img"
                  />
                </div>
              </div>

              <div className="journey-col-center">
                <div className="journey-step-badge">
                  <span>03</span>
                </div>
              </div>

              <div className="journey-col-right journey-content-pane">
                <div className="journey-content-card">
                  <h3 className="journey-step-num-title">03 &mdash; Precision Procedure</h3>
                  <h4 className="journey-step-headline">Where Expertise Meets Artistry.</h4>
                  <p className="journey-step-desc">
                    Once the design is approved, our specialist performs the treatment using advanced
                    techniques, professional equipment and careful attention to detail.
                  </p>
                  <div className="journey-pills-row">
                    <span className="journey-feature-pill">🔬 Advanced Techniques</span>
                    <span className="journey-feature-pill">⚙️ Premium Equipment</span>
                    <span className="journey-feature-pill">🎨 Expert Artistry</span>
                  </div>
                  <Link to="/book-appointment" className="journey-learn-more-link">
                    LEARN MORE &rarr;
                  </Link>
                </div>
              </div>
            </div>

            {/* STEP 04: Healing & Aftercare */}
            <div className="journey-timeline-row row-step-04">
              <div className="journey-col-left journey-content-pane">
                <div className="journey-content-card">
                  <h3 className="journey-step-num-title">04 &mdash; Healing &amp; Aftercare</h3>
                  <h4 className="journey-step-headline">We Care Beyond Your Appointment.</h4>
                  <p className="journey-step-desc">
                    Proper healing is essential for beautiful, long-lasting results. We guide you
                    through aftercare and provide support throughout your healing journey.
                  </p>
                  <div className="journey-pills-row">
                    <span className="journey-feature-pill">📋 Aftercare Guidance</span>
                    <span className="journey-feature-pill">💖 Healing Support</span>
                    <span className="journey-feature-pill">⏱️ 24/7 Assistance</span>
                  </div>
                  <Link to="/book-appointment" className="journey-learn-more-link">
                    LEARN MORE &rarr;
                  </Link>
                </div>
              </div>

              <div className="journey-col-center">
                <div className="journey-step-badge">
                  <span>04</span>
                </div>
              </div>

              <div className="journey-col-right journey-img-pane">
                <div className="journey-aftercare-split-card">
                  <div className="aftercare-img-box">
                    <img
                      src={aftercareClientImg}
                      alt="Healing & Aftercare Support"
                      className="aftercare-client-img"
                    />
                  </div>
                  <div className="aftercare-checklist-box">
                    <h5 className="checklist-heading">AFTERCARE INCLUDES</h5>
                    <ul className="aftercare-checklist">
                      <li>
                        <span className="check-icon">✓</span>
                        <span>Detailed Aftercare Kit</span>
                      </li>
                      <li>
                        <span className="check-icon">✓</span>
                        <span>Step-by-Step Guidance</span>
                      </li>
                      <li>
                        <span className="check-icon">✓</span>
                        <span>Diet &amp; Lifestyle Tips</span>
                      </li>
                      <li>
                        <span className="check-icon">✓</span>
                        <span>WhatsApp Support</span>
                      </li>
                      <li>
                        <span className="check-icon">✓</span>
                        <span>Follow-up Check-ins</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 05: Your Transformation */}
            <div className="journey-timeline-row row-step-05">
              <div className="journey-col-left journey-img-pane">
                <div className="journey-transformation-dual-img">
                  <div className="dual-img-pane before-pane">
                    <img src={microbladingBefore} alt="Before Brow Transformation" />
                    <span className="dual-badge">BEFORE</span>
                  </div>
                  <div className="dual-img-pane after-pane">
                    <img src={microbladingAfter} alt="After Brow Transformation" />
                    <span className="dual-badge after-badge">AFTER</span>
                  </div>
                </div>
              </div>

              <div className="journey-col-center">
                <div className="journey-step-badge">
                  <span>05</span>
                </div>
              </div>

              <div className="journey-col-right journey-content-pane">
                <div className="journey-content-card">
                  <h3 className="journey-step-num-title">05 &mdash; Your Transformation</h3>
                  <h4 className="journey-step-headline">Natural Results. Lasting Confidence.</h4>
                  <p className="journey-step-desc">
                    The final step is the beginning of your transformation. Enjoy refined, natural
                    results that enhance your confidence and celebrate your unique beauty.
                  </p>
                  <div className="journey-pills-row">
                    <span className="journey-feature-pill">✨ Natural Results</span>
                    <span className="journey-feature-pill">💎 Long-Lasting Beauty</span>
                    <span className="journey-feature-pill">🌟 Confidence Boost</span>
                  </div>
                  <Link to="/book-appointment" className="journey-learn-more-link">
                    LEARN MORE &rarr;
                  </Link>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================
          3. SHOWCASE BANNER WITH ANIMATED COUNT-UP STATS
      ============================================================ */}
      <section className="results-hero-banner-section">
        <div className="results-hero-container">
          <div className="results-hero-grid">
            
            {/* Left Column: Heading, Subtitle & Animated Stat Counters */}
            <div className="results-hero-left">
              <span className="results-hero-eyebrow">REAL RESULTS</span>
              <h2 className="results-hero-title">
                Real Results.
                <br />
                <span className="hero-title-accent">Real Confidence.</span>
              </h2>
              <p className="results-hero-subtitle">
                Explore genuine transformations by our expert specialists. Your beauty,
                our passion.
              </p>

              {/* 4 Metrics Strip with Counting Number Functionality */}
              <div className="results-hero-stats-strip">
                <div className="hero-stat-box">
                  <div className="stat-icon-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div className="stat-info">
                    <span className="stat-value">
                      <AnimatedCounter end={5000} duration={2.2} suffix="+" />
                    </span>
                    <span className="stat-name">Happy Clients</span>
                  </div>
                </div>

                <div className="hero-stat-box">
                  <div className="stat-icon-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <circle cx="12" cy="8" r="7"></circle>
                      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                    </svg>
                  </div>
                  <div className="stat-info">
                    <span className="stat-value">
                      <AnimatedCounter end={10} duration={1.8} suffix="+" />
                    </span>
                    <span className="stat-name">Years Experience</span>
                  </div>
                </div>

                <div className="hero-stat-box">
                  <div className="stat-icon-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      <polyline points="9 12 11 14 15 10"></polyline>
                    </svg>
                  </div>
                  <div className="stat-info">
                    <span className="stat-value">
                      <AnimatedCounter end={98} duration={2} suffix="%" />
                    </span>
                    <span className="stat-name">Satisfaction Rate</span>
                  </div>
                </div>

                <div className="hero-stat-box">
                  <div className="stat-icon-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  </div>
                  <div className="stat-info">
                    <span className="stat-value">
                      <AnimatedCounter end={4.9} duration={1.8} decimals={1} suffix="/5" />
                    </span>
                    <span className="stat-name">Client Rating</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Banner Image */}
            <div className="results-hero-right">
              <div className="results-hero-img-wrap">
                <img
                  src={resultsHeroBanner}
                  alt="Browlicious Master PMU Artist at Work"
                  className="results-hero-img"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================
          3. FILTER TABS & DROPDOWN CONTROLS BAR
      ============================================================ */}
      <section className="results-filter-bar-section">
        <div className="results-filter-container">
          <div className="results-filter-bar">
            
            {/* Left Category Filter Pills */}
            <div className="results-filter-pills">
              {FILTER_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`category-pill-btn ${
                    activeCategory === cat ? "active" : ""
                  }`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Right Dropdown Selectors */}
            <div className="results-filter-dropdowns">
              {/* Specialist Selector */}
              <div className="dropdown-box">
                <svg className="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <select
                  value={selectedSpecialist}
                  onChange={(e) => setSelectedSpecialist(e.target.value)}
                  className="custom-select-ctrl"
                  aria-label="Filter by specialist"
                >
                  {SPECIALISTS_LIST.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Order Selector */}
              <div className="dropdown-box">
                <svg className="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="custom-select-ctrl"
                  aria-label="Sort order"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================
          4. MAIN BODY: 3-COLUMN CARDS GRID + RIGHT SIDEBAR
      ============================================================ */}
      <main className="results-main-body-section">
        <div className="results-layout-container">
          <div className="results-main-grid-layout">
            
            {/* Left: 3-Column Treatment Cards Grid */}
            <div className="results-cards-column">
              {filteredData.length === 0 ? (
                <div className="results-empty-card">
                  <h3>No transformations match your filter</h3>
                  <p>Try selecting a different category or specialist.</p>
                  <button
                    type="button"
                    className="btn-reset-filters"
                    onClick={() => {
                      setActiveCategory("ALL");
                      setSelectedSpecialist("All Specialists");
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="results-cards-grid">
                  {filteredData.map((item) => (
                    <article className="result-treatment-card" key={item.id}>
                      {/* Interactive Before/After Split Slider */}
                      <BeforeAfterSlider
                        beforeImg={item.beforeImg}
                        afterImg={item.afterImg}
                        fallbackBefore={item.fallbackBefore}
                        fallbackAfter={item.fallbackAfter}
                        title={item.title}
                      />

                      {/* Card Content Info */}
                      <div className="result-card-body">
                        <div className="result-title-row">
                          {/* Pink Circular Category Icon Badge */}
                          <div className="treatment-mini-badge">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
                              <path d="M8 12c1.5 2 6.5 2 8 0" />
                            </svg>
                          </div>

                          <div className="result-heading-box">
                            <h3 className="result-card-title">{item.title}</h3>
                            <p className="result-card-desc">{item.desc}</p>
                          </div>
                        </div>

                        {/* Specialist & Date Metadata */}
                        <div className="result-meta-row">
                          <span className="meta-item">
                            <strong className="meta-label">Specialist:</strong>{" "}
                            {item.specialist}
                          </span>
                          <span className="meta-item">
                            <strong className="meta-label">Date:</strong>{" "}
                            {item.date}
                          </span>
                        </div>

                        {/* Action Link to Book Appointment */}
                        <div className="result-action-footer">
                          <Link
                            to="/book-appointment"
                            className="view-case-study-link"
                          >
                            <span>View Case Study</span>
                            <span className="arrow-icon">&rarr;</span>
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Sidebar with Summary Card & Video Transformations */}
            <aside className="results-sidebar">
              
              {/* Widget 1: Transformation Gallery Summary Card */}
              <div className="results-sidebar-widget widget-summary-card">
                <h3 className="widget-title">Transformation Gallery</h3>
                <p className="widget-desc">
                  Browse real results from our happy clients and see the Browlicious difference.
                </p>

                <ul className="widget-stats-list">
                  <li className="widget-stat-row">
                    <span className="widget-stat-icon">👁️</span>
                    <span className="widget-stat-count">
                      <AnimatedCounter end={1000} duration={2} suffix="+" />
                    </span>
                    <span className="widget-stat-lbl">Brow Transformations</span>
                  </li>
                  <li className="widget-stat-row">
                    <span className="widget-stat-icon">👄</span>
                    <span className="widget-stat-count">
                      <AnimatedCounter end={800} duration={2} suffix="+" />
                    </span>
                    <span className="widget-stat-lbl">Lip Enhancements</span>
                  </li>
                  <li className="widget-stat-row">
                    <span className="widget-stat-icon">👁️</span>
                    <span className="widget-stat-count">
                      <AnimatedCounter end={600} duration={2} suffix="+" />
                    </span>
                    <span className="widget-stat-lbl">Eyeliner Tattoos</span>
                  </li>
                  <li className="widget-stat-row">
                    <span className="widget-stat-icon">💇</span>
                    <span className="widget-stat-count">
                      <AnimatedCounter end={400} duration={2} suffix="+" />
                    </span>
                    <span className="widget-stat-lbl">Scalp Treatments</span>
                  </li>
                  <li className="widget-stat-row">
                    <span className="widget-stat-icon">✨</span>
                    <span className="widget-stat-count">
                      <AnimatedCounter end={300} duration={2} suffix="+" />
                    </span>
                    <span className="widget-stat-lbl">Skin &amp; Other Treatments</span>
                  </li>
                </ul>

                <button
                  type="button"
                  className="btn-view-all-results"
                  onClick={() => {
                    setActiveCategory("ALL");
                    setSelectedSpecialist("All Specialists");
                    const el = document.querySelector(".results-filter-bar-section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  View All Results &rarr;
                </button>
              </div>

              {/* Widget 2: Video Transformations Card */}
              <div className="results-sidebar-widget widget-video-card">
                <h3 className="widget-title">Video Transformations</h3>
                <p className="widget-desc">
                  Watch real client transformations and hear their stories.
                </p>

                <div
                  className="video-thumb-container"
                  onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                >
                  <img
                    src={videoThumbImg}
                    alt="Browlicious Video Transformations"
                    className="video-thumb-img"
                  />
                  <div className="video-thumb-overlay"></div>
                  
                  <div className="play-button-circle">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </div>
                  <span className="play-video-caption">Play Video</span>
                </div>
              </div>

            </aside>

          </div>
        </div>
      </main>
    </div>
  );
}
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/Servicespg.css";

// Hero Banner & Clinic Assets
import heroBgImg from "../assets/abt_hero_banner.jpg";

// ============================================================
// Service Image Assets (2 Curated Images per Treatment)
// ============================================================
// 1. Microblading
import mb1 from "../assets/Services/microblading/microblading 1.png";
import mb2 from "../assets/Services/microblading/microblading 2.png";

// 2. Combo Brows
import cb1 from "../assets/Services/Combobrows/Combobrows 1.png";
import cbNano from "../assets/Services/Combobrows/combo nano brows.png";

// 3. Ombre Brows
import omb2 from "../assets/Services/ombere brows/ombere brows 2.png";
import omb3 from "../assets/Services/ombere brows/ombere brows 3.png";

// 4. Brow Lamination
import bl1 from "../assets/Services/brows lamination/brows lamination 1.png";
import bl2 from "../assets/Services/brows lamination/lamination 2.png";

// 5. Lip Blushing
import lip1 from "../assets/Services/lip blushing/lip blushing 1.png";
import lip3 from "../assets/Services/lip blushing/lip blushing 3.png";

// 6. Eyeliner Tattoo
import eye1 from "../assets/Services/Eyeliner Tattoo/Eyeliner Tattoo 1.png";
import eye5 from "../assets/Services/Eyeliner Tattoo/Eyeliner Tattoo 5.png";

// 7. Scalp Micropigmentation
import scalp1 from "../assets/Services/scalp pig/pigmentation 1.png";
import scalp2 from "../assets/Services/scalp pig/pigmentation 2.png";

// 8. Hydra Facial
import hydra1 from "../assets/Services/hydra facial/hydra facial.png";
import hydra3 from "../assets/Services/hydra facial/hydra facial 3.png";

// 9. Skin Rejuvenation
import skin1 from "../assets/Services/skin rejuvenation/skin rejuvenation 1.png";
import skin2 from "../assets/Services/skin rejuvenation/skin rejuvenation 2.png";

// 10. Acne Scar Treatment
import acne2 from "../assets/Services/acne scar treatment/acne scar treatment 2.png";
import acne3 from "../assets/Services/acne scar treatment/acne scar treatment 3.png";

gsap.registerPlugin(ScrollTrigger);

// Service Categories
const SERVICE_CATEGORIES = [
  "ALL",
  "BROWS",
  "LIPS",
  "EYES",
  "SCALP",
  "SKINCARE",
];

// 10 Comprehensive Master Treatments Dataset with Exactly 2 Curated Images for Auto-Slide Loop
const SERVICES_DATA = [
  {
    id: "microblading",
    title: "Microblading Master Artistry",
    subtitle: "Hyper-Realistic Hair-Stroke Eyebrow Architecture",
    category: "BROWS",
    desc: "Our signature precision technique creating ultra-fine, hair-like strokes tailored to your natural brow flow, bone contours, and facial symmetry.",
    duration: "2 - 2.5 Hours",
    longevity: "1 - 2 Years",
    painLevel: "Minimal (Dual Numbing)",
    downtime: "5 - 7 Days",
    tagPills: ["Golden Ratio Mapping", "Organic Pigments", "Free 6-Week Touchup"],
    images: [mb1, mb2],
    idealFor: "Sparse, over-plucked, or uneven brows desiring natural dimension.",
    pricing: "Rs. 14,999",
  },
  {
    id: "combo-brows",
    title: "Combo Nano Brows",
    subtitle: "Hybrid Fusion of Feather Strokes & Pixel Powder",
    category: "BROWS",
    desc: "The ultimate brow transformation combining feather microblading strokes at the head with smooth ombre mist shading along the arch and tail.",
    duration: "2.5 - 3 Hours",
    longevity: "1.5 - 2.5 Years",
    painLevel: "Minimal (Comfort Numbing)",
    downtime: "5 - 7 Days",
    tagPills: ["Hybrid Micro-Shading", "Tail Definition", "High Density"],
    images: [cb1, cbNano],
    idealFor: "Clients wanting the realism of hair strokes with the fullness of makeup.",
    pricing: "Rs. 16,999",
  },
  {
    id: "ombre-brows",
    title: "Ombre Powder Brows",
    subtitle: "Soft Airbrushed Powder Gradient Effect",
    category: "BROWS",
    desc: "A soft powdered makeup look created using digital micro-dotting technology that heals into a sheer, velvety gradient brow.",
    duration: "2 - 2.5 Hours",
    longevity: "2 - 3 Years",
    painLevel: "Very Low",
    downtime: "5 - 7 Days",
    tagPills: ["Velvet Finish", "Great for Oily Skin", "Zero Patchiness"],
    images: [omb2, omb3],
    idealFor: "All skin types, especially oily, sensitive, or mature skin.",
    pricing: "Rs. 15,499",
  },
  {
    id: "brow-lamination",
    title: "Keratin Brow Lamination & Tint",
    subtitle: "High-Fashion Feathered Lift & Conditioning",
    category: "BROWS",
    desc: "A non-invasive keratin restructuring treatment that redirects natural brow hairs upward for a fuller, brushed-up runway look.",
    duration: "45 - 60 Mins",
    longevity: "6 - 8 Weeks",
    painLevel: "Zero Pain",
    downtime: "None (Keep dry 24h)",
    tagPills: ["Keratin Infusion", "Custom Henna Tint", "Non-Invasive"],
    images: [bl1, bl2],
    idealFor: "Unruly, flat, or downward-growing natural brow hairs.",
    pricing: "Rs. 3,999",
  },
  {
    id: "lip-blushing",
    title: "Aesthetic Lip Blushing",
    subtitle: "Velvet Aquarelle Lip Tint & Symmetry Enhancement",
    category: "LIPS",
    desc: "Subtle pixel deposit of organic mineral pigments across the vermilion border to restore lost color, create symmetrical fullness, and neutralize cool tones.",
    duration: "2 - 2.5 Hours",
    longevity: "2 - 3 Years",
    painLevel: "Low to Moderate",
    downtime: "3 - 5 Days",
    tagPills: ["Dark Lip Neutralization", "Waterproof Tint", "Organic Rose Tones"],
    images: [lip1, lip3],
    idealFor: "Pale lips, uneven borders, or hyperpigmented lips desiring fresh color.",
    pricing: "Rs. 13,999",
  },
  {
    id: "eyeliner-tattoo",
    title: "Permanent Eyeliner & Lash Line",
    subtitle: "Smudge-Proof Definition & Eye Enhancement",
    category: "EYES",
    desc: "Ultra-fine carbon pigment precisely deposited along the lash line to make lashes look instantly denser, opening up and brightening the eyes.",
    duration: "1.5 - 2 Hours",
    longevity: "3 - 5 Years",
    painLevel: "Minimal (Specialized Eye Gel)",
    downtime: "2 - 4 Days",
    tagPills: ["Smudge Proof", "Lash Enhancement", "Medical Carbon Black"],
    images: [eye1, eye5],
    idealFor: "Active lifestyles, contact lens wearers, or anyone wanting defined eyes.",
    pricing: "Rs. 9,999",
  },
  {
    id: "scalp-micropigmentation",
    title: "Scalp Micropigmentation (SMP)",
    subtitle: "Non-Surgical Hair Follicle Density Replication",
    category: "SCALP",
    desc: "State-of-the-art scalp follicular replication providing the illusion of a full, clean buzz-cut or adding dense shadow to thinning hair areas.",
    duration: "2.5 - 4 Hours",
    longevity: "4 - 6 Years",
    painLevel: "Low to Moderate",
    downtime: "2 - 3 Days",
    tagPills: ["Hairline Restoration", "Density Boost", "Male & Female SMP"],
    images: [scalp1, scalp2],
    idealFor: "Receding hairlines, crown thinning, alopecia, or hair transplant scars.",
    pricing: "From Rs. 18,999",
  },
  {
    id: "hydra-facial",
    title: "Medical Hydra Facial MD",
    subtitle: "Deep Vortex Cleansing, Peeling & Hyaluronic Hydration",
    category: "SKINCARE",
    desc: "A 6-step medical-grade hydra-dermabrasion facial combining vortex suction, lactic acid exfoliation, antioxidant serum infusion, and LED light therapy.",
    duration: "60 Mins",
    longevity: "4 - 6 Weeks",
    painLevel: "Zero Pain (Relaxing)",
    downtime: "Instant Glow (Zero downtime)",
    tagPills: ["Vortex Deep Clean", "Blackhead Extraction", "Instant Red Carpet Glow"],
    images: [hydra1, hydra3],
    idealFor: "Congested pores, dull skin, dehydration, and uneven skin texture.",
    pricing: "Rs. 4,499",
  },
  {
    id: "skin-rejuvenation",
    title: "Collagen Induction & BB Glow",
    subtitle: "Porcelain Glass Skin Radiance & Micro-Needling",
    category: "SKINCARE",
    desc: "Targeted microneedling with bespoke peptide serums and semi-permanent organic mineral foundation for a luminous, poreless, glass-skin complexion.",
    duration: "60 - 75 Mins",
    longevity: "3 - 6 Months",
    painLevel: "Minimal (Topical Numbing)",
    downtime: "24 - 48 Hours",
    tagPills: ["Glass Skin Therapy", "Pore Minimization", "Peptide Infusion"],
    images: [skin1, skin2],
    idealFor: "Enlarged pores, uneven skin tone, fine lines, and sun damage.",
    pricing: "Rs. 6,999",
  },
  {
    id: "acne-scar-treatment",
    title: "Acne Scar Resurfacing & RF",
    subtitle: "Fractional Dermal Remodeling for Smooth Skin Texture",
    category: "SKINCARE",
    desc: "Advanced radio-frequency microneedling and subcision targeting deep rolling, boxcar, and ice-pick acne scars to stimulate new collagen restructuring.",
    duration: "75 - 90 Mins",
    longevity: "Permanent Structural Improvement",
    painLevel: "Low to Moderate",
    downtime: "2 - 4 Days",
    tagPills: ["RF Microneedling", "Subcision Therapy", "Scar Texture Smoothing"],
    images: [acne2, acne3],
    idealFor: "Pitted acne scarring, surgical scars, and uneven dermal texture.",
    pricing: "Rs. 8,999",
  },
];

// ============================================================
// 2-Image Auto-Slide Loop Component with Hover Pause & Indicators
// ============================================================
function AutoImageSlider({ images, alt, category, interval = 3400, isSpotlight = false }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!images || images.length <= 1 || isHovered) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images, interval, isHovered]);

  return (
    <div
      className={`auto-slider-container ${isSpotlight ? "spotlight-slider" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="slider-images-stack">
        {images.map((imgSrc, idx) => (
          <img
            key={idx}
            src={imgSrc}
            alt={`${alt} view ${idx + 1}`}
            className={`slider-slide-img ${idx === currentIndex ? "active-slide" : "inactive-slide"}`}
          />
        ))}
      </div>

      {category && (
        <span className="service-category-tag">{category}</span>
      )}

      {/* 2-Slide Loop Pill Indicator */}
      {images.length > 1 && (
        <div className="slider-indicator-bar">
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`slider-pill-dot ${idx === currentIndex ? "active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(idx);
              }}
              aria-label={`Switch to slide ${idx + 1}`}
            >
              <span className="dot-fill-anim"></span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Reusable Count-Up Component
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

export default function Servicespg({ isDarkMode = false, setIsDarkMode }) {
  const containerRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter Services
  const filteredServices = SERVICES_DATA.filter((service) => {
    const matchesCategory =
      activeCategory === "ALL" || service.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // GSAP Animations
  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // 1. Hero Header Letter Spacing
      gsap.fromTo(
        ".services-hero-title",
        { opacity: 0, y: 35, letterSpacing: "0.3em" },
        { opacity: 1, y: 0, letterSpacing: "0.22em", duration: 1.2, ease: "power3.out" }
      );

      // 2. Spotlight Banner Glide
      gsap.fromTo(
        ".services-spotlight-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".services-spotlight-section",
            start: "top 82%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // 3. Filter Controls Bar Fade-Up
      gsap.fromTo(
        ".services-filter-bar",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".services-filter-bar",
            start: "top 88%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // 4. Staggered Service Cards Fade-Up
      gsap.fromTo(
        ".service-premium-card",
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".services-cards-grid",
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // 5. Standards Cards Stagger
      gsap.fromTo(
        ".standard-pillar-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".services-standards-grid",
            start: "top 85%",
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
      className={`services-page-wrapper ${isDarkMode ? "dark-theme" : "light-theme"}`}
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
        <div className="abt-hero-banner" style={{ backgroundImage: `url(${heroBgImg})` }}>
          <div className="abt-hero-overlay"></div>
          <div className="abt-hero-inner">
            <h1 className="abt-hero-title services-hero-title">
              SIGNATURE CLINICAL SERVICES
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
            <span className="abt-current">Services</span>
          </nav>
          <p className="abt-hero-subtitle">
            Elevating natural beauty through bespoke PMU architecture, certified medical-grade sterilization,
            and organic hypoallergenic mineral pigments.
          </p>

          {/* 4 Counting Metrics Strip */}
          <div className="services-hero-stats-strip">
            <div className="hero-stat-card">
              <span className="hero-stat-icon">👥</span>
              <span className="hero-stat-num">
                <AnimatedCounter end={5000} duration={2.2} suffix="+" />
              </span>
              <span className="hero-stat-lbl">Happy Clients</span>
            </div>
            <div className="hero-stat-card">
              <span className="hero-stat-icon">🏆</span>
              <span className="hero-stat-num">
                <AnimatedCounter end={10} duration={1.8} suffix="+" />
              </span>
              <span className="hero-stat-lbl">Years Experience</span>
            </div>
            <div className="hero-stat-card">
              <span className="hero-stat-icon">✨</span>
              <span className="hero-stat-num">
                <AnimatedCounter end={10} duration={1.5} />
              </span>
              <span className="hero-stat-lbl">Signature Services</span>
            </div>
            <div className="hero-stat-card">
              <span className="hero-stat-icon">⭐</span>
              <span className="hero-stat-num">
                <AnimatedCounter end={99.8} duration={2} suffix="%" decimals={1} />
              </span>
              <span className="hero-stat-lbl">Satisfaction Rate</span>
            </div>
          </div>
        </div>
      </header>

      {/* ============================================================
          2. FEATURED SPOTLIGHT SHOWCASE (FLAGSHIP TREATMENT)
      ============================================================ */}
      <section className="services-spotlight-section">
        <div className="services-container">
          <div className="services-spotlight-card">
            <div className="spotlight-grid">
              
              {/* Left: 2-Image Auto-Slide Media */}
              <div className="spotlight-media-col">
                <div className="spotlight-slider-wrapper">
                  <AutoImageSlider
                    images={[mb1, mb2]}
                    alt="Browlicious Flagship Microblading Artistry"
                    isSpotlight={true}
                    interval={3600}
                  />
                  <span className="spotlight-badge">★ FLAGSHIP TREATMENT</span>
                </div>
              </div>

              {/* Right: Detailed Service Info */}
              <div className="spotlight-info-col">
                <span className="spotlight-eyebrow">SIGNATURE EXPERIENCE</span>
                <h2 className="spotlight-title">Precision Microblading Master Artistry</h2>
                <p className="spotlight-subtitle">
                  Hyper-Realistic Eyebrow Reconstruction &amp; Symmetry Architecture
                </p>
                <p className="spotlight-desc">
                  Each brow stroke is hand-drawn to mirror the fine diameter, curve, and growth direction
                  of your natural hairs. Perfected with 3D Golden Ratio mapping and tailored mineral pigments.
                </p>

                {/* Key Metrics Strip */}
                <div className="spotlight-metrics-row">
                  <div className="spotlight-metric-item">
                    <span className="metric-icon">⏱️</span>
                    <span className="metric-label">Duration</span>
                    <span className="metric-val">2 - 2.5 Hours</span>
                  </div>
                  <div className="spotlight-metric-item">
                    <span className="metric-icon">⏳</span>
                    <span className="metric-label">Longevity</span>
                    <span className="metric-val">1 - 2 Years</span>
                  </div>
                  <div className="spotlight-metric-item">
                    <span className="metric-icon">✨</span>
                    <span className="metric-label">Touchup</span>
                    <span className="metric-val">Included (6 Wks)</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="spotlight-actions-row">
                  <Link to="/book-appointment" className="btn-spotlight-book">
                    BOOK APPOINTMENT &rarr;
                  </Link>
                  <Link to="/process-results" className="btn-spotlight-results">
                    VIEW TRANSFORMATIONS
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          3. CATEGORY FILTERS & LIVE SEARCH BAR
      ============================================================ */}
      <section className="services-filter-section">
        <div className="services-container">
          <div className="services-filter-bar">
            
            {/* Left: Category Filter Pills */}
            <div className="services-filter-pills">
              {SERVICE_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`service-cat-btn ${
                    activeCategory === cat ? "active" : ""
                  }`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Right: Live Search Box */}
            <div className="services-search-box">
              <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search treatments (e.g., Lip Blush, Ombre, Hydra)..."
                className="search-input"
                aria-label="Search treatments"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery("")}
                >
                  &times;
                </button>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================
          4. MASTER TREATMENTS GRID (ALL 10 SERVICES)
      ============================================================ */}
      <main className="services-grid-section">
        <div className="services-container">
          
          <div className="services-grid-header">
            <h2 className="grid-section-title">All Clinical Treatments</h2>
            <span className="results-count-pill">
              Showing {filteredServices.length} Treatment{filteredServices.length === 1 ? "" : "s"}
            </span>
          </div>

          {filteredServices.length === 0 ? (
            <div className="services-empty-card">
              <h3>No treatments match "{searchQuery}"</h3>
              <p>Try searching for a different service or select another category.</p>
              <button
                type="button"
                className="btn-reset-filters"
                onClick={() => {
                  setActiveCategory("ALL");
                  setSearchQuery("");
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="services-cards-grid">
              {filteredServices.map((service) => (
                <article key={service.id} className="service-premium-card">
                  
                  {/* 2-Image Auto-Slide Media with Loop & Hover Effects */}
                  <div className="service-card-media">
                    <AutoImageSlider
                      images={service.images}
                      alt={service.title}
                      category={service.category}
                      interval={3400}
                    />
                  </div>

                  {/* Card Body Info */}
                  <div className="service-card-body">
                      <div className="service-header-row">
                        <h3 className="service-card-title">{service.title}</h3>
                        <p className="service-card-subtitle">{service.subtitle}</p>
                      </div>

                      <p className="service-card-desc">{service.desc}</p>

                      {/* Specs Badges */}
                      <div className="service-specs-strip">
                        <div className="spec-badge">
                          <span className="spec-icon">⏱️</span>
                          <span className="spec-val">{service.duration}</span>
                        </div>
                        <div className="spec-badge">
                          <span className="spec-icon">⏳</span>
                          <span className="spec-val">{service.longevity}</span>
                        </div>
                        <div className="spec-badge">
                          <span className="spec-icon">🛡️</span>
                          <span className="spec-val">{service.painLevel}</span>
                        </div>
                      </div>

                      {/* Tag Pills */}
                      <div className="service-pills-row">
                        {service.tagPills.map((pill, i) => (
                          <span key={i} className="service-feature-pill">
                            ✓ {pill}
                          </span>
                        ))}
                      </div>

                      {/* Footer Actions */}
                      <div className="service-card-footer">
                        <div className="service-price-box">
                          <span className="price-label">Session Starting</span>
                          <span className="price-val">{service.pricing}</span>
                        </div>

                        <Link
                          to="/book-appointment"
                          className="btn-book-service"
                        >
                          Book Now &rarr;
                        </Link>
                      </div>

                    </div>
                  </article>
                ))}
              </div>
            )}

        </div>
      </main>

      {/* ============================================================
          5. CLINICAL STANDARDS PHILOSOPHY (3 PILLARS LIKE ABTPG)
      ============================================================ */}
      <section className="services-standards-section">
        <div className="services-container">
          
          <div className="standards-header-box">
            <span className="standards-eyebrow">WHY BROWLICIOUS</span>
            <h2 className="standards-title">The Master Clinical Standard</h2>
            <div className="standards-accent-line"></div>
          </div>

          <div className="services-standards-grid">
            
            {/* Pillar 1 */}
            <div className="standard-pillar-card">
              <div className="pillar-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <polyline points="9 12 11 14 15 10"></polyline>
                </svg>
              </div>
              <h3 className="pillar-title">Medical-Grade Sterilization</h3>
              <p className="pillar-desc">
                Hospital-grade autoclave sterilization, 100% single-use disposable needle cartridges,
                and sterile surgical draping for complete peace of mind.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="standard-pillar-card">
              <div className="pillar-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                  <path d="M2 12h20"></path>
                </svg>
              </div>
              <h3 className="pillar-title">Organic Mineral Pigments</h3>
              <p className="pillar-desc">
                EU REACH-compliant pigments formulated with natural iron oxides and vegan minerals that
                heal true to tone without turning blue, red, or discolored.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="standard-pillar-card">
              <div className="pillar-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
              <h3 className="pillar-title">3D Golden Ratio Mapping</h3>
              <p className="pillar-desc">
                Every procedure begins with custom anatomical brow and lip mapping according to your unique
                facial bone architecture and natural muscle movements.
              </p>
            </div>

          </div>

        </div>
      </section>

     

     

    </div>
  );
}

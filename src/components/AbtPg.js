import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/AbtPg.css';
import pmuClinicImg from '../assets/clinic1.png';
import pmuClientImg from '../assets/pmu_client_portrait.jpg';
import pmuSuiteImg from '../assets/pmu_treatment_suite.jpg';
import heroBgImg from '../assets/abt_hero_banner.jpg';

gsap.registerPlugin(ScrollTrigger);

// Stylized Tulip Flower Bud SVG Icon matching reference
const TulipIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="abt-item-icon">
    <path d="M12 2C9.5 2 6 5.5 6 10c0 4.2 3.2 7.7 7.3 8v3h-2.6a1 1 0 1 0 0 2h6.6a1 1 0 1 0 0-2h-2.6v-3c4.1-.3 7.3-3.8 7.3-8 0-4.5-3.5-8-6-8zm-4 8c0-3.2 2.2-6 4-6 1.8 0 4 2.8 4 6 0 3.3-2.7 6-4 6-1.3 0-4-2.7-4-6z" />
  </svg>
);

// Authentic Luxury Circular Award Badges matching reference layout
const AwardBadge1 = () => (
  <svg width="86" height="86" viewBox="0 0 100 100" className="abt-award-badge" fill="none">
    <circle cx="50" cy="50" r="47" stroke="var(--theme-accent-pink)" strokeWidth="0.8" strokeDasharray="3,2" />
    <circle cx="50" cy="50" r="43" stroke="var(--theme-accent-pink)" strokeWidth="1.2" />
    <circle cx="50" cy="50" r="35" stroke="var(--theme-accent-pink)" strokeWidth="0.7" />
    {/* Ribbon Checkmark */}
    <path d="M42 50 L48 56 L59 42" stroke="var(--theme-text)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M38 65 L44 57 M62 65 L56 57" stroke="var(--theme-accent-pink)" strokeWidth="1.2" />
    <path id="topChoicePath" d="M 50,50 m -39,0 a 39,39 0 1,1 78,0 a 39,39 0 1,1 -78,0" fill="none" />
    <text fontSize="4.8" fill="var(--theme-accent-pink)" letterSpacing="1.2" fontFamily="serif">
      <textPath href="#topChoicePath" startOffset="50%" textAnchor="middle">
        • TOP CHOICE AWARD • MARK OF EXCELLENCE
      </textPath>
    </text>
  </svg>
);

const AwardBadge2 = () => (
  <svg width="86" height="86" viewBox="0 0 100 100" className="abt-award-badge" fill="none">
    <circle cx="50" cy="50" r="47" stroke="var(--theme-accent-pink)" strokeWidth="0.8" strokeDasharray="3,2" />
    <circle cx="50" cy="50" r="43" stroke="var(--theme-accent-pink)" strokeWidth="1.2" />
    {/* 3 Top Stars */}
    <text x="50" y="32" fill="var(--theme-accent-pink)" fontSize="6" textAnchor="middle">★★★</text>
    {/* Center Swan / Crest / PMU Symbol */}
    <path d="M44 48 C44 42, 50 42, 53 46 C56 50, 52 54, 46 54 L56 54" stroke="var(--theme-text)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    {/* Laurel Wreath */}
    <path d="M34 50 C34 60, 42 66, 50 67 C58 66, 66 60, 66 50" stroke="var(--theme-accent-pink)" strokeWidth="1" strokeDasharray="2,2" />
    <path id="globalAwardPath" d="M 50,50 m -39,0 a 39,39 0 1,1 78,0 a 39,39 0 1,1 -78,0" fill="none" />
    <text fontSize="4.8" fill="var(--theme-accent-pink)" letterSpacing="1.2" fontFamily="serif">
      <textPath href="#globalAwardPath" startOffset="50%" textAnchor="middle">
        • GLOBAL PMU EXCELLENCE • CHENNAI 2026
      </textPath>
    </text>
  </svg>
);

export default function AbtPg({ isDarkMode = false, setIsDarkMode }) {
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // 1. Hero Header Animation
      gsap.fromTo(
        ".abt-hero-title",
        { opacity: 0, y: 40, letterSpacing: "0.35em" },
        { opacity: 1, y: 0, letterSpacing: "0.22em", duration: 1.2, ease: "power3.out" }
      );

      gsap.fromTo(
        ".abt-hero-subbar",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.25, ease: "power2.out" }
      );

      // 2. Section 2 (Intro): Left Image Fades Right, Right Text Fades Left
      gsap.fromTo(
        ".abt-intro-image-pane",
        { opacity: 0, x: -70, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".abt-intro-section",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".abt-intro-text-inner",
        { opacity: 0, x: 70 },
        {
          opacity: 1,
          x: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".abt-intro-section",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".abt-intro-paragraphs p",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".abt-intro-paragraphs",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 3. Section 3 (What We Offer): Left Content Fades Right, Right Image Fades Left
      gsap.fromTo(
        ".abt-offers-main-col",
        { opacity: 0, x: -70 },
        {
          opacity: 1,
          x: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".abt-offers-section",
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".abt-offer-row",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".abt-offers-list",
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".abt-offers-image-pane",
        { opacity: 0, x: 70, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".abt-offers-section",
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 4. Section 4 (Testimonial): Left Portrait Fades Right, Right Quote Fades Left
      gsap.fromTo(
        ".abt-testimonial-image-panel",
        { opacity: 0, x: -70, scale: 0.93 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".abt-testimonial-section",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".abt-testimonial-content",
        { opacity: 0, x: 70 },
        {
          opacity: 1,
          x: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".abt-testimonial-section",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".abt-award-badge",
        { opacity: 0, scale: 0.6, rotate: -15 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".abt-testimonial-badges",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={`abt-page-wrapper ${isDarkMode ? "dark-theme" : "light-theme"}`} ref={containerRef}>
      
      {/* Floating Theme Toggle Button */}
      {setIsDarkMode && (
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)} 
          className="theme-toggle-btn"
          aria-label="Toggle Theme"
        >
          {isDarkMode ? (
            /* Sun Icon */
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
            /* Moon Icon */
            <svg className="theme-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          )}
        </button>
      )}

      {/* ============================================================
          1. HERO HEADER WITH AMBIENT BANNER & SUB-HEADER DESCRIPTION
      ============================================================ */}
      <header className="abt-hero-section">
        <div className="abt-hero-banner" style={{ backgroundImage: `url(${heroBgImg})` }}>
          <div className="abt-hero-overlay"></div>
          <div className="abt-hero-inner">
            <h1 className="abt-hero-title">ABOUT US</h1>
          </div>
        </div>

        {/* Sub-Header Area on Cream Background */}
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
            <span className="abt-current">About Us</span>
          </nav>
          <p className="abt-hero-subtitle">
            Step into South India’s premier Permanent Makeup sanctuary. Where mathematical facial symmetry meets 
            master cosmetic micro-pigmentation, crafting effortless, timeless beauty exclusively for you.
          </p>
        </div>
      </header>

      {/* ============================================================
          2. INTRO SECTION (FULL FLUSH LEFT MARBLE IMAGE & EDITORIAL RIGHT)
      ============================================================ */}
      <section className="abt-intro-section">
        <div className="abt-intro-split-layout">
          
          {/* Left Flush Image */}
          <div className="abt-intro-image-pane">
            <img 
              src={pmuClinicImg} 
              alt="Browlicious PMU Clinic treatment marble counter with sterile golden instruments" 
              className="abt-intro-image"
            />
          </div>

          {/* Right Text Column */}
          <div className="abt-intro-text-pane">
            <div className="abt-intro-text-inner">
              <h2 className="abt-section-title-large">
                EXCELLING IN PERMANENT MAKEUP ONLY IS OUR PASSION &amp; PURPOSE
              </h2>
              <div className="abt-intro-paragraphs">
                <p>
                  At Browlicious PMU Clinic &amp; Academy, we set the golden standard for aesthetic cosmetic 
                  micro-pigmentation in Chennai. Operating luxury flagship clinics in <strong>Anna Nagar</strong> and 
                  <strong> Kelambakkam</strong>, our master artists reject the generic, one-size-fits-all approach of multi-service salons. 
                  We are 100% dedicated to Permanent Makeup—combining medical-grade sterilization, German digital micro-needle 
                  technology, and certified hypoallergenic organic mineral pigments calibrated specifically for Indian skin tones.
                </p>
                <p>
                  Whether you are seeking hyper-realistic feathered microblading, color-correcting lip blush neutralization, 
                  or precision scalp micropigmentation, every treatment is an individualized masterpiece. We believe true PMU 
                  should never look artificial; it should seamlessly enhance your innate facial elegance and grant you 
                  waterproof, smudge-free confidence from the moment you wake up.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================
          3. WHAT WE OFFER SECTION (WITH RIGHT LUXURY TREATMENT SUITE IMAGE)
      ============================================================ */}
      <section className="abt-offers-section">
        <div className="abt-offers-layout">
          
          <div className="abt-offers-main-col">
            <div className="abt-offers-container">
              <h2 className="abt-section-title-medium">WHAT WE OFFER</h2>
              
              <div className="abt-offers-list">
                <div className="abt-offer-row">
                  <div className="abt-offer-title-col">
                    <TulipIcon />
                    <h3>Microblading &amp; Nanoblading</h3>
                  </div>
                  <div className="abt-offer-desc-col">
                    <p>Ultra-fine, hyper-realistic hair-like strokes tailored to your natural brow growth pattern for fuller, symmetrical, and undetectable brows that last up to 2 years.</p>
                  </div>
                </div>

                <div className="abt-offer-row">
                  <div className="abt-offer-title-col">
                    <TulipIcon />
                    <h3>Lip Blushing &amp; Neutralization</h3>
                  </div>
                  <div className="abt-offer-desc-col">
                    <p>Custom color-corrected mineral infusion that restores natural symmetry, defines vermilion borders, and delivers a healthy, youthful watercolor tint without daily lipstick.</p>
                  </div>
                </div>

                <div className="abt-offer-row">
                  <div className="abt-offer-title-col">
                    <TulipIcon />
                    <h3>Eyeliner &amp; Lash Line Tattoo</h3>
                  </div>
                  <div className="abt-offer-desc-col">
                    <p>Precision smudge-proof lash line enhancement and classic winged eyeliner that effortlessly opens and defines your eyes with permanent, zero-smudge depth.</p>
                  </div>
                </div>

                <div className="abt-offer-row">
                  <div className="abt-offer-title-col">
                    <TulipIcon />
                    <h3>Scalp Micropigmentation (SMP)</h3>
                  </div>
                  <div className="abt-offer-desc-col">
                    <p>Advanced micro-follicular replication technique designed to restore thinning hairlines, add crown density, and disguise scalp scars with natural hair follicle realism.</p>
                  </div>
                </div>

                <div className="abt-offer-row">
                  <div className="abt-offer-title-col">
                    <TulipIcon />
                    <h3>BB Glow &amp; Hydra Skin Radiance</h3>
                  </div>
                  <div className="abt-offer-desc-col">
                    <p>Semi-permanent cosmetic tint infusion with hyaluronic peptides and hydro-dermabrasion that evens skin tone, refines pores, and leaves a luminous porcelain glow.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Luxury Treatment Suite Image Pane */}
          <div className="abt-offers-image-pane">
            <img 
              src={pmuSuiteImg} 
              alt="Browlicious luxury aesthetic clinic and treatment suite with ambient lighting" 
              className="abt-offers-suite-img"
            />
          </div>

        </div>
      </section>

      {/* ============================================================
          4. TESTIMONIAL & AWARDS SECTION (EXACT REFERENCE REPLICATION)
      ============================================================ */}
      <section className="abt-testimonial-section">
        <div className="abt-testi-container">
          <div className="abt-testimonial-grid">
            
            {/* Left Portrait & Large Overlapping Subtle Quote Circle */}
            <div className="abt-testimonial-image-panel">
              <div className="abt-testi-img-wrap">
                <img 
                  src={pmuClientImg} 
                  alt="Ananya Krishnan - Browlicious PMU client" 
                  className="abt-testi-image"
                />
                <div className="abt-quote-large-circle" aria-hidden="true">
                  <span className="abt-quote-mark">”</span>
                </div>
              </div>
            </div>

            {/* Right Badges & Testimonial Quote */}
            <div className="abt-testimonial-content">
              <div className="abt-testimonial-badges">
                <AwardBadge1 />
                <AwardBadge2 />
              </div>
              
              <blockquote className="abt-testimonial-quote">
                “Browlicious is South India's undisputed master of PMU. Having struggled with sparse, uneven brows and two-toned lips, their specialist meticulously mapped my facial symmetry before creating the softest feathered microblade strokes and a stunning, natural lip blush tint. Waking up every morning with effortless, waterproof perfection is truly life-changing artistry!”
              </blockquote>
              
              <div className="abt-testimonial-author">
                <span className="abt-author-name">Ananya Krishnan</span>
                <span className="abt-author-dash">—</span>
                <span className="abt-author-role">Eyebrows &amp; Lip Blush Specialist</span>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
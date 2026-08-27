import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/Blogspg.css";
import heroBgImg from "../assets/abt_hero_banner.jpg";
import featuredPmuImg from "../assets/blog_featured_pmu.jpg";
import doctorImg from "../assets/blog_doctor_portrait.jpg";
import clinicImg from "../assets/clinic1.png";
import treatmentSuiteImg from "../assets/pmu_treatment_suite.jpg";

gsap.registerPlugin(ScrollTrigger);

// Blog Categories
const CATEGORIES = [
  "ALL",
  "PMU",
  "SKINCARE",
  "AFTERCARE",
  "BEAUTY",
  "CLINIC NEWS",
  "MEN'S GROOMING",
];

// 6 Featured Blog Articles Matching Reference
const BLOG_ARTICLES = [
  {
    id: 1,
    category: "PMU",
    title: "How to Maintain Perfect Brows",
    desc: "Simple expert-approved habits to keep your brows looking beautifully defined.",
    date: "May 12, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=600&q=80",
    tagColor: "var(--theme-accent-pink)",
  },
  {
    id: 2,
    category: "TREATMENTS",
    title: "Microblading vs Ombre Brows",
    desc: "Understand the difference between two of our most popular brow techniques and discover which may suit you best.",
    date: "May 08, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
    tagColor: "#8E24AA",
  },
  {
    id: 3,
    category: "AFTERCARE",
    title: "Lip Blushing Aftercare Tips",
    desc: "Everything you need to know to support a smooth healing process and beautiful results.",
    date: "May 04, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1588515724527-074a7a56616c?auto=format&fit=crop&w=600&q=80",
    tagColor: "#E91E63",
  },
  {
    id: 4,
    category: "MEN'S GROOMING",
    title: "Benefits of Scalp Micropigmentation",
    desc: "Discover how SMP can create the appearance of fuller, natural-looking hair.",
    date: "Apr 29, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=600&q=80",
    tagColor: "#4A148C",
  },
  {
    id: 5,
    category: "PMU",
    title: "Everything You Need to Know Before Your Treatment",
    desc: "A practical guide to preparing for your appointment with confidence.",
    date: "Apr 24, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80",
    tagColor: "var(--theme-accent-pink)",
  },
  {
    id: 6,
    category: "SKINCARE",
    title: "Skincare Routine for Healthy, Glowing Skin",
    desc: "Expert skincare habits that support healthy-looking skin before and after aesthetic treatments.",
    date: "Apr 19, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
    tagColor: "#7B1FA2",
  },
];

// Explore Beauty Topics List with Stylized Minimalist Icons
const BEAUTY_TOPICS = [
  {
    id: "brows",
    title: "Brows",
    desc: "Perfect brows, mapping, microblading and styling.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M2 12C6 7 18 7 22 12" strokeLinecap="round" />
        <path d="M6 10C9 8 15 8 18 10" strokeLinecap="round" />
        <circle cx="12" cy="15" r="3" />
      </svg>
    ),
  },
  {
    id: "lips",
    title: "Lips",
    desc: "Lip blushing, color selection and aftercare.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 12C7 8 10 9 12 11C14 9 17 8 20 12C17 16 7 16 4 12Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 12C8 13 16 13 20 12" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "skin",
    title: "Skin",
    desc: "Skincare, rejuvenation and healthy skin.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7C12 7 9 10 9 13C9 14.65 10.35 16 12 16C13.65 16 15 14.65 15 13C15 10 12 7 12 7Z" fill="currentColor" opacity="0.2" />
        <path d="M12 7C12 7 9 10 9 13C9 14.65 10.35 16 12 16C13.65 16 15 14.65 15 13C15 10 12 7 12 7Z" />
      </svg>
    ),
  },
  {
    id: "scalp",
    title: "Scalp",
    desc: "Scalp micropigmentation and men's grooming.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="9" r="6" />
        <path d="M6 21C6 17 9 15 12 15C15 15 18 17 18 21" strokeLinecap="round" />
        <circle cx="10" cy="8" r="0.8" fill="currentColor" />
        <circle cx="14" cy="8" r="0.8" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "aftercare",
    title: "Aftercare",
    desc: "Professional guidance for long-lasting results.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" />
        <path d="M9 12L11 14L15 10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "beauty",
    title: "Beauty",
    desc: "Expert beauty routines and advice.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 3C10 6 7 9 7 13C7 16 9 19 12 21C15 19 17 16 17 13C17 9 14 6 12 3Z" />
        <path d="M12 10V17M9 14H15" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function Blogspg({ isDarkMode = false, setIsDarkMode }) {
  const containerRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Filtered Articles based on Category & Search Query
  const filteredArticles = BLOG_ARTICLES.filter((article) => {
    const matchesCategory =
      activeCategory === "ALL" ||
      article.category.toUpperCase() === activeCategory.toUpperCase();
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // GSAP ScrollTrigger Animations Suite
  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // 1. Hero Header Animation
      gsap.fromTo(
        ".blog-hero-title",
        { opacity: 0, y: 40, letterSpacing: "0.35em" },
        { opacity: 1, y: 0, letterSpacing: "0.22em", duration: 1.2, ease: "power3.out" }
      );

      // 2. Featured Article Animation
      gsap.fromTo(
        ".blog-featured-img-pane",
        { opacity: 0, x: -70 },
        {
          opacity: 1,
          x: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".blog-featured-card",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".blog-featured-content",
        { opacity: 0, x: 70 },
        {
          opacity: 1,
          x: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".blog-featured-card",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 3. Category Filter Tabs Fade-Up
      gsap.fromTo(
        ".blog-filters-row",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".blog-filters-row",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 4. Latest Insights Cards Stagger Fade-Up
      gsap.fromTo(
        ".blog-article-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".blog-articles-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 5. Expertise Section: Left Doctor Portrait Fades Right, Center Fades Up, Right Fades Left
      gsap.fromTo(
        ".blog-expert-doctor-col",
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".blog-expertise-card",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".blog-expert-info-col",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".blog-expertise-card",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".blog-expert-stack-col",
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".blog-expertise-card",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 6. Explore Topics Cards Pop-in Stagger
      gsap.fromTo(
        ".blog-topic-card",
        { opacity: 0, y: 35, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          stagger: 0.09,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: ".blog-topics-grid",
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
    <div
      className={`blog-page-wrapper ${isDarkMode ? "dark-theme" : "light-theme"}`}
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
            /* Sun Icon */
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
            /* Moon Icon */
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
          1. HERO HEADER WITH AMBIENT BANNER & SUB-HEADER DESCRIPTION
      ============================================================ */}
      <header className="abt-hero-section">
        <div
          className="abt-hero-banner"
          style={{ backgroundImage: `url(${heroBgImg})` }}
        >
          <div className="abt-hero-overlay"></div>
          <div className="abt-hero-inner">
            <h1 className="abt-hero-title blog-hero-title">
              BEAUTY INSIGHTS &amp; BLOGS
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
            <span className="abt-current">Blogs</span>
          </nav>
          <p className="abt-hero-subtitle">
            Expert knowledge, practical advice, and clinical aftercare guidance
            curated by South India's premier PMU master artists.
          </p>
        </div>
      </header>

      {/* ============================================================
          2. MAIN CONTENT STAGE
      ============================================================ */}
      <main className="blog-main-stage">
        <div className="blog-container">

          {/* ============================================================
              ZONE 1: FEATURED ARTICLE SHOWCASE
          ============================================================ */}
          <section className="blog-featured-section">
            <div className="blog-featured-card">
              {/* Shimmer Ambient Glow */}
              <div className="card-shimmer-sweep" aria-hidden="true"></div>

              <div className="blog-featured-grid">
                <div className="blog-featured-img-pane">
                  <img
                    src={featuredPmuImg}
                    alt="Everything You Need to Know Before Your PMU Treatment"
                    className="blog-featured-img"
                  />
                </div>

                <div className="blog-featured-content">
                  <span className="blog-featured-tag">FEATURED ARTICLE</span>
                  <h2 className="blog-featured-title">
                    Everything You Need to Know Before Your PMU Treatment
                  </h2>
                  <p className="blog-featured-desc">
                    From consultation and preparation to healing and aftercare,
                    discover what to expect before your bespoke permanent makeup
                    appointment.
                  </p>

                  <div className="blog-featured-meta">
                    <span className="meta-item">📅 May 18, 2026</span>
                    <span className="meta-dot">•</span>
                    <span className="meta-item">8 min read</span>
                  </div>

                  <div className="blog-featured-action-row">
                    <span className="treatment-guide-badge">TREATMENT GUIDE</span>
                    <Link to="/book-appointment" className="btn-read-article-pill">
                      READ ARTICLE &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================================
              ZONE 2: CATEGORY FILTER TABS & SEARCH BAR
          ============================================================ */}
          <section className="blog-filters-section">
            <div className="blog-filters-row">
              <div className="blog-category-pills">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`blog-filter-btn ${
                      activeCategory === cat ? "active" : ""
                    }`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="blog-search-box">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="blog-search-input"
                />
                <svg
                  className="blog-search-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </div>
          </section>

          {/* ============================================================
              ZONE 3: LATEST BEAUTY INSIGHTS (6-CARD GRID)
          ============================================================ */}
          <section className="blog-insights-section">
            <div className="blog-section-header-wrap">
              <div className="blog-section-title-box">
                <h2 className="blog-section-title">Latest Beauty Insights</h2>
                <div className="blog-title-accent-bar"></div>
              </div>
              <p className="blog-section-subtext">
                Expert knowledge, practical advice and inspiration from the
                Browlicious team.
              </p>
            </div>

            {filteredArticles.length === 0 ? (
              <div className="blog-no-results">
                <h3>No articles found</h3>
                <p>Try searching for a different keyword or category.</p>
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
              <div className="blog-articles-grid">
                {filteredArticles.map((article) => (
                  <article key={article.id} className="blog-article-card">
                    {/* Shimmer Light Sweep */}
                    <div className="card-shimmer-sweep" aria-hidden="true"></div>

                    <div className="blog-card-img-wrap">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="blog-card-img"
                      />
                      <span
                        className="blog-card-badge"
                        style={{ backgroundColor: article.tagColor }}
                      >
                        {article.category}
                      </span>
                    </div>

                    <div className="blog-card-content">
                      <h3 className="blog-card-title">{article.title}</h3>
                      <p className="blog-card-desc">{article.desc}</p>

                      <div className="blog-card-footer">
                        <span className="blog-card-meta">
                          📅 {article.date} • {article.readTime}
                        </span>
                        <Link
                          to="/book-appointment"
                          className="blog-card-link"
                          aria-label={`Read ${article.title}`}
                        >
                          READ ARTICLE &rarr;
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* ============================================================
              ZONE 4: BEAUTY BACKED BY EXPERTISE (EXPERT SHOWCASE)
          ============================================================ */}
          <section className="blog-expertise-section">
            <div className="blog-expertise-card">
              {/* Shimmer Light Sweep */}
              <div className="card-shimmer-sweep" aria-hidden="true"></div>

              <div className="blog-expertise-grid">
                {/* Left: Doctor Portrait */}
                <div className="blog-expert-doctor-col">
                  <div className="blog-doctor-img-wrap">
                    <img
                      src={doctorImg}
                      alt="Dr. Priya Sharma - Lead PMU Specialist"
                      className="blog-doctor-img"
                    />
                  </div>
                </div>

                {/* Center: Info & Stats */}
                <div className="blog-expert-info-col">
                  <span className="blog-expert-eyebrow">FROM OUR EXPERTS</span>
                  <h2 className="blog-expert-title">
                    Beauty Backed by Expertise.
                  </h2>
                  <p className="blog-expert-desc">
                    Our specialists combine advanced techniques, professional
                    experience and personalized care to help every client achieve
                    natural-looking results.
                  </p>

                  <div className="blog-expert-stats-row">
                    <div className="expert-stat-item">
                      <span className="stat-icon">🏆</span>
                      <span className="stat-num">10+</span>
                      <span className="stat-lbl">Years Experience</span>
                    </div>
                    <div className="expert-stat-item">
                      <span className="stat-icon">👥</span>
                      <span className="stat-num">5000+</span>
                      <span className="stat-lbl">Happy Clients</span>
                    </div>
                    <div className="expert-stat-item">
                      <span className="stat-icon">🩺</span>
                      <span className="stat-num">15+</span>
                      <span className="stat-lbl">Expert Doctors</span>
                    </div>
                  </div>

                  <Link to="/about" className="btn-meet-specialists">
                    MEET OUR SPECIALISTS &rarr;
                  </Link>
                </div>

                {/* Right: Clinic Treatment Stack Images */}
                <div className="blog-expert-stack-col">
                  <div className="expert-stack-top">
                    <img
                      src={treatmentSuiteImg}
                      alt="PMU Procedure Suite"
                      className="expert-stack-img"
                    />
                  </div>
                  <div className="expert-stack-bottom">
                    <img
                      src={clinicImg}
                      alt="Browlicious Clinic Lounge"
                      className="expert-stack-img"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================================
              ZONE 5: EXPLORE BEAUTY TOPICS (CATEGORY ICON CARDS)
          ============================================================ */}
          <section className="blog-topics-section">
            <div className="blog-section-header-wrap center-header">
              <div className="blog-section-title-box">
                <h2 className="blog-section-title">Explore Beauty Topics</h2>
                <div className="blog-title-accent-bar"></div>
              </div>
            </div>

            <div className="blog-topics-grid">
              {BEAUTY_TOPICS.map((topic) => (
                <div
                  key={topic.id}
                  className="blog-topic-card"
                  onClick={() => {
                    if (topic.id === "brows") setActiveCategory("PMU");
                    else if (topic.id === "lips") setActiveCategory("PMU");
                    else if (topic.id === "skin") setActiveCategory("SKINCARE");
                    else if (topic.id === "scalp") setActiveCategory("MEN'S GROOMING");
                    else if (topic.id === "aftercare") setActiveCategory("AFTERCARE");
                    else setActiveCategory("BEAUTY");

                    const el = document.querySelector(".blog-insights-section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {/* Shimmer Light Sweep */}
                  <div className="card-shimmer-sweep" aria-hidden="true"></div>

                  <div className="blog-topic-icon-wrap">{topic.icon}</div>
                  <h3 className="blog-topic-title">{topic.title}</h3>
                  <p className="blog-topic-desc">{topic.desc}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

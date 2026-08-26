import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/Home.css";

gsap.registerPlugin(ScrollTrigger);

const BG_IMAGE_URL =
  "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=80";

const Home = () => {
  const containerRef = useRef(null);
  const pinWrapperRef = useRef(null);
  const morphImageRef = useRef(null);
  const targetSlotRef = useRef(null);
  const heroContentRef = useRef(null);
  const targetContentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const pinWrapper = pinWrapperRef.current;
      const morphImage = morphImageRef.current;
      const targetSlot = targetSlotRef.current;
      const heroContent = heroContentRef.current;
      const targetContent = targetContentRef.current;

      if (!pinWrapper || !morphImage || !targetSlot || !heroContent || !targetContent) return;

      // Function to calculate exact relative position with image shifted top: -50px
      const getTargetCoords = () => {
        const wrapperRect = pinWrapper.getBoundingClientRect();
        const slotRect = targetSlot.getBoundingClientRect();
        return {
          x: slotRect.left - wrapperRect.left,
          y: slotRect.top - wrapperRect.top - 50, // <-- ONLY image position shifted top: -50px
          width: targetSlot.offsetWidth,
          height: targetSlot.offsetHeight,
        };
      };

      // 1. Initial State
      gsap.set(morphImage, {
        top: 0,
        left: 0,
        x: 0,
        y: 0,
        width: "100%",
        height: "100%",
        borderRadius: "0px",
        position: "absolute",
        zIndex: 5,
      });

      gsap.set(targetContent, { opacity: 0, y: 50 });
      gsap.set(heroContent, { opacity: 1, y: 0 });

      // 2. Master Pinned Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinWrapper,
          start: "top top",
          end: "+=160%",
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // Step A: Fade out Hero text
      tl.to(
        heroContent,
        {
          opacity: 0,
          y: -40,
          duration: 0.3,
          ease: "power1.out",
        },
        0
      );

      // Step B: Fade in Target text
      tl.to(
        targetContent,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power1.inOut",
        },
        0.2
      );

      // Step C: Morph the background image directly into slot position with -50px top offset
      tl.to(
        morphImage,
        {
          x: () => getTargetCoords().x,
          y: () => getTargetCoords().y, // Targets slot with top: -50px offset
          width: () => getTargetCoords().width,
          height: () => getTargetCoords().height,
          borderRadius: "999px",
          boxShadow: "0 12px 35px rgba(0,0,0,0.18)",
          duration: 1,
          ease: "power2.inOut",
        },
        0
      );

      // Step D: Fade out dark overlay
      tl.to(
        ".image-dark-overlay",
        {
          opacity: 0,
          duration: 0.7,
          ease: "none",
        },
        0
      );

      ScrollTrigger.refresh();
    }, containerRef);

    const handleRefresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleRefresh);
    window.addEventListener("load", handleRefresh);

    return () => {
      window.removeEventListener("resize", handleRefresh);
      window.removeEventListener("load", handleRefresh);
      ctx.revert();
    };
  }, []);

  return (
    <main className="home-wrapper" ref={containerRef}>
      {/* ====================================================
          PINNED HERO -> TARGET TRANSITION CONTAINER
      ==================================================== */}
      <div className="pinned-showcase-wrapper" ref={pinWrapperRef}>
        {/* Morphing Image Box */}
        <div className="morph-image-box" ref={morphImageRef}>
          <div
            className="morph-image-bg"
            style={{ backgroundImage: `url(${BG_IMAGE_URL})` }}
          >
            <div className="image-dark-overlay" />
          </div>
        </div>

        {/* 1. Hero Content Layer */}
        <div className="hero-content-layer" ref={heroContentRef}>
          <span className="hero-badge">Serava Wellness &amp; Spa</span>
          <h1 className="hero-title">
            A modern WordPress theme <br />
            crafted for spas and <br />
            wellness centers.
          </h1>
          <p className="hero-desc">
            With curated spa sections and pages, you’ll have everything needed to
            build a calming, wellness-focused experience.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">6</span>
              <span className="stat-label">Home pages</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">20+</span>
              <span className="stat-label">Inner pages</span>
            </div>
          </div>
        </div>

        {/* 2. Target Headline Layer */}
        <div className="target-content-layer" ref={targetContentRef}>
          <div className="headline-wrapper">
            <h2 className="big-heading">
              <div className="heading-row">
                Beauty <em>and</em>
              </div>
              <div className="heading-row">Wellness</div>
              <div className="heading-row slot-row">
                {/* Normal natural slot container */}
                <div className="image-target-slot" ref={targetSlotRef}></div>
                <span className="text-word">Theme</span>
              </div>
            </h2>
            <p className="sub-text">for the natural healthy-looking face skin</p>
          </div>
        </div>
      </div>

      {/* ====================================================
          REST OF THE WEBSITE (Continuous Scrolling)
      ==================================================== */}
      <section className="features-section">
        <div className="features-container">
          <div className="feature-card">
            <div className="feature-icon">🌿</div>
            <h3>Get Free Addons</h3>
            <p>You will receive all plugins and addons included in this theme for free.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3>Clean &amp; Unique Design</h3>
            <p>The essential factors of the UI/UX design ensure an exquisite experience.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌐</div>
            <h3>Multi Language Support</h3>
            <p>Switching languages and translating your pages works seamlessly.</p>
          </div>
        </div>
      </section>

      <section className="more-content-section">
        <div className="more-content-box">
          <h2>Grow your business with eCommerce</h2>
          <p>
            WooCommerce – the most customizable platform for online wellness,
            spa bookings, and product shops.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Home;
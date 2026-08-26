import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bgImage1 from "../assets/microblading.png";
import bgImage2 from "../assets/treatment_banner.jpg";
import "../styles/Home.css";

gsap.registerPlugin(ScrollTrigger);

const Home = ({ isDarkMode: parentDarkMode, setIsDarkMode: parentSetIsDarkMode }) => {
  const containerRef = useRef(null);
  const pinWrapperRef = useRef(null);
  const morphImageRef = useRef(null);
  const targetSlotRef = useRef(null);
  const heroContentRef = useRef(null);
  const targetContentRef = useRef(null);

  // Theme State: Controlled by parent or fallback to local state
  const [localDarkMode, setLocalDarkMode] = useState(false);
  const isDarkMode = parentDarkMode !== undefined ? parentDarkMode : localDarkMode;
  const setIsDarkMode = parentSetIsDarkMode || setLocalDarkMode;

  // Background Slider Auto-Slide State (Loop Mode between 2 images)
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev === 0 ? 1 : 0));
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const pinWrapper = pinWrapperRef.current;
      const morphImage = morphImageRef.current;
      const targetSlot = targetSlotRef.current;
      const heroContent = heroContentRef.current;
      const targetContent = targetContentRef.current;

      if (!pinWrapper || !morphImage || !targetSlot || !heroContent || !targetContent) return;

      // Calculate relative position with image shifted top: -50px
      const getTargetCoords = () => {
        const wrapperRect = pinWrapper.getBoundingClientRect();
        const slotRect = targetSlot.getBoundingClientRect();
        return {
          x: slotRect.left - wrapperRect.left,
          y: slotRect.top - wrapperRect.top - 50,
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

      // Step C: Morph background image directly into target slot position with -50px offset
      tl.to(
        morphImage,
        {
          x: () => getTargetCoords().x,
          y: () => getTargetCoords().y,
          width: () => getTargetCoords().width,
          height: () => getTargetCoords().height,
          borderRadius: "999px",
          boxShadow: "0 12px 35px rgba(225,29,116,0.18)",
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
    <main className={`home-wrapper ${isDarkMode ? "dark-theme" : "light-theme"}`} ref={containerRef} id="home">
      
      {/* Floating Theme Toggle Button */}
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

      {/* ====================================================
          PINNED HERO -> TARGET TRANSITION CONTAINER
      ==================================================== */}
      <div className="pinned-showcase-wrapper" ref={pinWrapperRef}>
        {/* Morphing Image Box with 2-Image Auto Slider */}
        <div className="morph-image-box" ref={morphImageRef}>
          <div className="morph-image-bg">
            <div
              className={`hero-bg-slide ${currentBg === 0 ? "active" : ""}`}
              style={{ backgroundImage: `url(${bgImage1})` }}
            />
            <div
              className={`hero-bg-slide ${currentBg === 1 ? "active" : ""}`}
              style={{ backgroundImage: `url(${bgImage2})` }}
            />
            <div className="image-dark-overlay" />
          </div>
        </div>

        {/* 1. Hero Content Layer */}
        <div className="hero-content-layer" ref={heroContentRef}>
          <span className="hero-badge">Browlicious — PMU Clinic &amp; Academy</span>
          <h1 className="hero-title">
            Excelling in Permanent <br />
            Makeup ONLY is <br />
            our MISSION.
          </h1>
          <p className="hero-desc">
            Unlike most other providers who offer multiple beauty services, 
            we offer exclusive micro-procedures with superior quality and natural elegance.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">2</span>
              <span className="stat-label">Chennai Hubs (Anna Nagar &amp; Kelambakkam)</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">PMU Specialization</span>
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
              <div className="heading-row">Precision</div>
              <div className="heading-row slot-row">
                <div className="image-target-slot" ref={targetSlotRef}></div>
                <span className="text-word">Clinic</span>
              </div>
            </h2>
            <p className="sub-text">
              Permanent cosmetics offer you the long-lasting pleasure of effortless, natural elegance.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
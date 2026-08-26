import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/Home.css"; // Adjust path if your structure is different (e.g. '../styles/Home.css')

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const containerRef = useRef(null);
  const floatingImgRef = useRef(null);
  const targetSlotRef = useRef(null);
  const targetSectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const floatingImg = floatingImgRef.current;
      const targetSlot = targetSlotRef.current;
      const targetSection = targetSectionRef.current;

      if (!floatingImg || !targetSlot || !targetSection) return;

      // 1. Initial State for the Floating Image (in Hero section)
      const setInitialPosition = () => {
        gsap.set(floatingImg, {
          x: window.innerWidth * 0.55,
          y: window.innerHeight * 0.4,
          width: 320,
          height: 180,
        });
      };

      setInitialPosition();

      // 2. Animate to Target Slot inside the Heading on Scroll
      gsap.to(floatingImg, {
        scrollTrigger: {
          trigger: targetSection,
          start: "top 80%",      // starts when target section enters viewport
          end: "center center",  // docks when heading is centered
          scrub: 1,              // smooth scroll tracking
          invalidateOnRefresh: true,
        },
        x: () => targetSlot.getBoundingClientRect().left,
        y: () => targetSlot.getBoundingClientRect().top,
        width: () => targetSlot.offsetWidth,
        height: () => targetSlot.offsetHeight,
        borderRadius: "999px",
        ease: "power2.inOut",
      });
    }, containerRef);

    return () => ctx.revert(); // Clean up on unmount
  }, []);

  return (
    <main className="home-wrapper" ref={containerRef}>
      {/* 1. Floating Image (Fixed overlay that animates into place) */}
      <div className="morph-image-container" ref={floatingImgRef}>
        <div
          className="morph-image-inner"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80')`,
          }}
        />
      </div>

      {/* 2. Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            A modern theme <br />
            crafted for spas and <br />
            wellness centers.
          </h1>
          <p className="hero-desc">
            With curated spa sections and pages, you’ll have everything needed to
            build a calming, wellness-focused website.
          </p>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">6</span>
              <span className="stat-label">home pages</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">20+</span>
              <span className="stat-label">inner pages</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Target Section (Heading where image docks) */}
      <section className="target-section" ref={targetSectionRef}>
        <div className="headline-wrapper">
          <h2 className="big-heading">
            <span className="text-line">Beauty <em>and</em></span>
            <span className="text-line">Wellness</span>
            <span className="text-line inline-with-slot">
              {/* Target slot placeholder for floating image */}
              <span className="image-target-slot" ref={targetSlotRef}></span>
              <span className="text-word">Theme</span>
            </span>
          </h2>
          <p className="sub-text">for the natural healthy-looking face skin</p>
        </div>
      </section>

      {/* 4. Features / Content Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="feature-card">
            <h3>Get Free Addons</h3>
            <p>You will receive all plugins and addons included for free.</p>
          </div>
          <div className="feature-card">
            <h3>Clean & Unique Design</h3>
            <p>Essential UI/UX factors ensure a unique browsing experience.</p>
          </div>
          <div className="feature-card">
            <h3>Multi Language</h3>
            <p>Switching languages and translating your content is effortless.</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
import React, { useState, useRef, useCallback } from "react";
import "../styles/Results.css";

// 1. Local Image Imports from your assets/Result folder
// (Includes online fallback images so it renders immediately even before local images are placed)
import microbladingBefore from "../assets/Result/microblading_before.png";
import microbladingAfter from "../assets/Result/microblading_after.png";

import comboBrowsBefore from "../assets/Result/combo_brows_before.png";
import comboBrowsAfter from "../assets/Result/combo_brows_after.png";

import ombreBrowsBefore from "../assets/Result/combo_brows_before.png";
import ombreBrowsAfter from "../assets/Result/combo_brows_before.png";

import lipBlushingBefore from "../assets/Result/lip_blushing_before.png";
import lipBlushingAfter from "../assets/Result/lip_blushing_after.png";

import eyelinerBefore from "../assets/Result/Eye_liner_Tattoo_before.png";
import eyelinerAfter from "../assets/Result/Eye_liner_Tattoo_after.png";

import browLaminationBefore from "../assets/Result/brow_lamination_before.png";
import browLaminationAfter from "../assets/Result/brow_lamination_after.png";

import scalpBefore from "../assets/Result/micropigmentation_before.png";
import scalpAfter from "../assets/Result/micropigmentation_after.png";

import skinRejuvBefore from "../assets/Result/microblading_before.png";
import skinRejuvAfter from "../assets/Result/microblading_before.png";

import hydraFacialBefore from "../assets/Result/microblading_before.png";
import hydraFacialAfter from "../assets/Result/microblading_before.png";

import acneScarBefore from "../assets/Result/microblading_before.png";
import acneScarAfter from "../assets/Result/microblading_before.png";

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

// All 10 Treatments Dataset
const RESULTS_DATA = [
  {
    id: 1,
    category: ["BROWS", "PMU"],
    title: "Microblading",
    desc: "Natural, fuller brows with fine hair-like strokes",
    specialist: "Dr. Ananya R.",
    date: "12 May 2024",
    beforeImg: microbladingBefore,
    afterImg: microbladingAfter,
    fallbackBefore: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
    fallbackAfter: "https://images.unsplash.com/photo-1512290900672-1f551786c567?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    category: ["LIPS", "PMU"],
    title: "Lip Blushing",
    desc: "Enhance natural lip color, symmetry, and lush shape",
    specialist: "Priya Sharma",
    date: "08 Apr 2024",
    beforeImg: lipBlushingBefore,
    afterImg: lipBlushingAfter,
    fallbackBefore: "https://images.unsplash.com/photo-1588515724527-074a7a56616c?auto=format&fit=crop&w=600&q=80",
    fallbackAfter: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    category: ["EYELINER", "PMU"],
    title: "Eyeliner Tattoo",
    desc: "Defined lash line and subtle wing that lasts beautifully",
    specialist: "Neha Sharma",
    date: "20 Apr 2024",
    beforeImg: eyelinerBefore,
    afterImg: eyelinerAfter,
    fallbackBefore: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80",
    fallbackAfter: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    category: ["SCALP", "PMU"],
    title: "Scalp Micropigmentation",
    desc: "Natural look for hair restoration and follicle density",
    specialist: "Rahul Mehta",
    date: "15 Apr 2024",
    beforeImg: scalpBefore,
    afterImg: scalpAfter,
    fallbackBefore: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    fallbackAfter: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    category: ["BROWS", "PMU"],
    title: "Combo Brows",
    desc: "Microblading + Shading for defined, fuller arches",
    specialist: "Dr. Ananya R.",
    date: "01 May 2024",
    beforeImg: comboBrowsBefore,
    afterImg: comboBrowsAfter,
    fallbackBefore: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80",
    fallbackAfter: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    category: ["BROWS", "COSMETIC"],
    title: "Brow Lamination",
    desc: "Perfect lifted and styled fluffy brows with nourish tint",
    specialist: "Priya Sharma",
    date: "18 Apr 2024",
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
    beforeImg: acneScarBefore,
    afterImg: acneScarAfter,
    fallbackBefore: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80",
    fallbackAfter: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80",
  },
];

// ============================================================
// Interactive Before / After Image Split-Slider Component
// ============================================================
function BeforeAfterSlider({ beforeImg, afterImg, fallbackBefore, fallbackAfter, title }) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback(
    (clientX) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      let percentage = (x / rect.width) * 100;
      if (percentage < 0) percentage = 0;
      if (percentage > 100) percentage = 100;
      setSliderPosition(percentage);
    },
    []
  );

  const handlePointerDown = () => setIsDragging(true);
  const handlePointerUp = () => setIsDragging(false);

  const handlePointerMove = (e) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
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

      {/* 3. Draggable Vertical Divider Line & Knob */}
      <div
        className="ba-slider-divider"
        style={{ left: `${sliderPosition}%` }}
      >
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
export default function Results() {
  const [activeCategory, setActiveCategory] = useState("ALL");

  // Filter items based on active tab
  const filteredData = RESULTS_DATA.filter((item) => {
    if (activeCategory === "ALL") return true;
    return item.category.includes(activeCategory);
  });

  return (
    <div className="results-page-wrapper">
      <div className="results-inner-container">
        
        {/* Page Header */}
        <div className="results-header">
          <span className="results-eyebrow">Real Transformations</span>
          <h1 className="results-main-title">
            Clinical <em>Before &amp; After</em> Gallery
          </h1>
          <p className="results-subtitle">
            Explore authentic transformation results crafted with certified mineral pigments
            and advanced aesthetic mapping techniques.
          </p>
        </div>

        {/* Filter Tabs Bar */}
        <div className="results-filter-tabs-wrapper">
          <div className="results-filter-tabs">
            {FILTER_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`filter-pill-btn ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results 3-Column Grid */}
        <div className="results-cards-grid">
          {filteredData.map((item) => (
            <div className="result-treatment-card" key={item.id}>
              
              {/* Interactive Before/After Split Slider */}
              <BeforeAfterSlider
                beforeImg={item.beforeImg}
                afterImg={item.afterImg}
                fallbackBefore={item.fallbackBefore}
                fallbackAfter={item.fallbackAfter}
                title={item.title}
              />

              {/* Card Information Body */}
              <div className="result-card-body">
                <div className="result-title-row">
                  {/* Pink Circle Icon Badge */}
                  <div className="treatment-mini-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
                      <path d="M8 12c1.5 2 6.5 2 8 0" />
                    </svg>
                  </div>

                  <div>
                    <h3 className="result-card-title">{item.title}</h3>
                    <p className="result-card-desc">{item.desc}</p>
                  </div>
                </div>

                {/* Specialist & Date Metadata */}
                <div className="result-meta-row">
                  <span className="meta-item">
                    <strong className="meta-label">Specialist:</strong> {item.specialist}
                  </span>
                  <span className="meta-separator">•</span>
                  <span className="meta-item">
                    <strong className="meta-label">Date:</strong> {item.date}
                  </span>
                </div>

                {/* Action Link */}
                <div className="result-action-footer">
                  <a href="#case-study" className="view-case-study-link">
                    <span>View Case Study</span>
                    <span className="arrow-icon">→</span>
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
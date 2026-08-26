import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/BeautyJourney.css";

// 1. Import Assets from your assets folder
import treatment1 from "../assets/treatment1.png";
import treatment2 from "../assets/treatment2.png";
import specialist1 from "../assets/specialist1.png";
import specialist2 from "../assets/specialist2.png";
import data_time1 from "../assets/lip_blushing.jpg";
import data_time2 from "../assets/date_time2.png";
import your_details1 from "../assets/treatment_banner.jpg";
import your_details2 from "../assets/about-pmu-artist.jpg";
import confirm1 from "../assets/confirm1.png";
import confirm2 from "../assets/bb_glow_treatment.jpg";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    id: "01",
    label: "Treatment",
    titleMain: "Your Beauty Journey",
    titleAccent: "Starts Here.",
    desc: "Choose your treatment, preferred specialist and convenient appointment time. Our team will take care of the rest.",
    leftAsset: treatment1,
    rightAsset: treatment2,
  },
  {
    id: "02",
    label: "Specialist",
    titleMain: "Select Your Dedicated",
    titleAccent: "Master Specialist.",
    desc: "Browse our team of certified aesthetic practitioners, master aestheticians, and holistic therapists.",
    leftAsset: specialist1,
    rightAsset: specialist2,
  },
  {
    id: "03",
    label: "Date & Time",
    titleMain: "Choose Your Ideal",
    titleAccent: "Moment of Peace.",
    desc: "Select a date and customized time slot that seamlessly aligns with your schedule and daily rhythm.",
    leftAsset: data_time1,
    rightAsset: data_time2,
  },
  {
    id: "04",
    label: "Your Details",
    titleMain: "Personalize Your",
    titleAccent: "Care Ritual.",
    desc: "Provide your preferences, skin profile, and any bespoke aromatherapy touches you would like prepared.",
    leftAsset: your_details1,
    rightAsset: your_details2,
  },
  {
    id: "05",
    label: "Confirmation",
    titleMain: "Your Sanctuarial",
    titleAccent: "Session is Booked.",
    desc: "We look forward to welcoming you. A private suite with personalized botanicals will be prepared.",
    leftAsset: confirm1,
    rightAsset: confirm2,
  },
];

export default function BeautyJourney({ isDarkMode = false }) {
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const progressBarRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = triggerRef.current;
      const totalSteps = STEPS.length;

      // Master Pinned Scroll Timeline for Fullscreen
      const scrollTriggerInstance = ScrollTrigger.create({
        trigger: trigger,
        start: "top top",
        end: `+=${(totalSteps - 1) * 100}%`,
        pin: true,
        scrub: 0.6,
        snap: 1 / (totalSteps - 1),
        onUpdate: (self) => {
          const progress = self.progress;

          // Update Progress Bar Fill Width
          if (progressBarRef.current) {
            gsap.set(progressBarRef.current, {
              scaleX: progress,
              transformOrigin: "left center",
            });
          }

          // Calculate current step index (0 to 4)
          const currentIndex = Math.min(
            Math.round(progress * (totalSteps - 1)),
            totalSteps - 1
          );

          setActiveStep(currentIndex);
        },
      });

      return () => {
        if (scrollTriggerInstance) scrollTriggerInstance.kill();
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Jump directly to step on click (Warning fixed: unused 'st' removed)
  const handleStepClick = (index) => {
    const totalSteps = STEPS.length;
    const trigger = triggerRef.current;
    if (!trigger) return;

    const scrollDistance = (totalSteps - 1) * window.innerHeight;
    const targetScroll = trigger.offsetTop + (index / (totalSteps - 1)) * scrollDistance;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <div className={`journey-master-wrapper ${isDarkMode ? "dark-theme" : "light-theme"}`} ref={containerRef}>
      <section className="journey-pinned-section" ref={triggerRef}>
        
        {/* ============================================================
            LEFT COLUMN: Changing Asset (treatment1, specialist1, etc.)
        ============================================================ */}
        <div className="journey-left-asset-col">
          {STEPS.map((step, index) => (
            <div
              key={`left-${step.id}`}
              className={`asset-image-card ${activeStep === index ? "asset-active" : ""}`}
            >
              <img
                src={step.leftAsset}
                alt={`Step ${step.id} Left Asset`}
                className="journey-asset-img"
              />
              <div className="left-asset-gradient-mask" />
            </div>
          ))}
        </div>

        {/* ============================================================
            CENTER COLUMN: Stepper + Dynamic Text Copy
        ============================================================ */}
        <div className="journey-center-content-col">
          
          {/* Dynamic Titles & Description */}
          <div className="journey-text-block">
            {STEPS.map((step, index) => (
              <div
                key={`text-${step.id}`}
                className={`journey-text-slide ${
                  activeStep === index ? "text-active" : ""
                }`}
              >
                <h2 className="journey-main-title">
                  <span className="title-dark-part">{step.titleMain}</span>{" "}
                  <span className="title-pink-accent">{step.titleAccent}</span>
                </h2>
                <p className="journey-desc-text">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Stepper Timeline Bar */}
          <div className="journey-stepper-container">
            {/* Background Base Line */}
            <div className="stepper-track-base" />

            {/* Pink Active Progress Fill Line */}
            <div className="stepper-track-fill" ref={progressBarRef} />

            {/* 5 Step Nodes */}
            <div className="stepper-nodes-row">
              {STEPS.map((step, index) => {
                const isActive = activeStep === index;
                const isCompleted = activeStep >= index;

                return (
                  <div
                    key={`node-${step.id}`}
                    className={`stepper-node-item ${
                      isActive ? "node-active" : isCompleted ? "node-completed" : ""
                    }`}
                    onClick={() => handleStepClick(index)}
                  >
                    <div className="node-circle-badge">
                      <span className="node-number">{step.id}</span>
                    </div>
                    <span className="node-label-text">{step.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* ============================================================
            RIGHT COLUMN: Changing Asset (treatment2, specialist2, etc.)
        ============================================================ */}
        <div className="journey-right-asset-col">
          {STEPS.map((step, index) => (
            <div
              key={`right-${step.id}`}
              className={`asset-image-card ${activeStep === index ? "asset-active" : ""}`}
            >
              <img
                src={step.rightAsset}
                alt={`Step ${step.id} Right Asset`}
                className="journey-asset-img"
              />
              <div className="right-asset-gradient-mask" />
            </div>
          ))}
        </div>

      </section>
    </div>
  );
}
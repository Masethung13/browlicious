import React, { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaSearch,
  FaPhoneAlt,
  FaCalendarAlt,
  FaHeadset,
  FaHeart,
  FaShieldAlt,
  FaUserMd,
  FaVenusMars,
  FaCut,
  FaRegFileAlt,
  FaStar,
  FaUsers,
  FaAward,
  FaSmile,
} from "react-icons/fa";
import "../styles/FAQPage.css";
import heroBgImg from "../assets/abt_hero_banner.jpg";
import spotlight from "../assets/sp1.png";
import expert from "../assets/your_details1.png";
import eyes from "../assets/Result/Eye_liner_Tattoo_after.png";
import lip from "../assets/Result/lip_blushing_after.png";
import brow from "../assets/Result/combo_brows_after.png";
import scalp from "../assets/Result/micropigmentation_after.png";

gsap.registerPlugin(ScrollTrigger);

// 8 Curated Categories with 5 High-Impact Questions Each (40 Total FAQs)
const FAQ_DATABASE = [
  {
    id: "general",
    categoryNumber: "01",
    categoryName: "General Questions",
    shortName: "GENERAL",
    icon: <FaHeart />,
    questions: [
      {
        q: "Is Microblading and Permanent Makeup painful?",
        a: "Most clients describe the sensation as a light scratching with minimal discomfort. Prior to and during the procedure, we apply medical-grade topical anesthetic (lidocaine) to ensure you remain completely relaxed and comfortable throughout the session.",
      },
      {
        q: "How long does Semi-Permanent Makeup typically last?",
        a: "Results typically last between 1.5 to 3 years depending on your treatment, skin type (oilier skin tends to fade faster), metabolism, sun exposure, and adherence to aftercare instructions. Annual color refreshers are recommended.",
      },
      {
        q: "Who is a suitable candidate for Permanent Makeup?",
        a: "Anyone looking to enhance their facial symmetry, save daily makeup time, restore thinning brows, or improve lip/eyelash definition. Candidates must be in good health, not pregnant or nursing, and free from active skin infections.",
      },
      {
        q: "How should I prepare for my initial appointment?",
        a: "Avoid caffeine, alcohol, and blood-thinning medications for 48 hours prior. Stop using retinoids, AHAs/BHAs, and chemical peels 2 weeks before. Do not wax, tint, or laminate brows for at least 7 days prior.",
      },
      {
        q: "What is the typical healing process like?",
        a: "Healing takes approximately 4 to 6 weeks. The first 3–5 days look slightly darker and bolder. Days 5–10 involve light flaking. Weeks 2–3 may experience a 'ghosting' phase where pigment looks lighter, before true radiant color resurfaces by week 4.",
      },
    ],
  },
  {
    id: "treatments",
    categoryNumber: "02",
    categoryName: "Treatments",
    shortName: "TREATMENTS",
    icon: <FaCut />,
    questions: [
      {
        q: "What is the difference between Microblading, Combo Brows, and Ombre Brows?",
        a: "Microblading creates crisp, individual hair strokes ideal for normal-to-dry skin. Ombre Brows provides a soft, powdered makeup gradient look suited for all skin types including oily skin. Combo Brows blends hair strokes at the front with soft shading through the arch and tail for maximum density.",
      },
      {
        q: "How is the lip blushing pigment shade chosen?",
        a: "During consultation, our master specialist analyzes your natural lip undertones and custom-blends a shade matching your desired aesthetic—ranging from soft nude peach and rose petal to vibrant coral and berry tones.",
      },
      {
        q: "Will Eyeliner Tattoo damage my natural eyelashes or eyelids?",
        a: "No. The pigment is implanted strictly into the uppermost dermal layer along the lash line and does not touch the deeper hair follicles or ocular glands. The procedure is performed with extreme precision and protective ocular shields.",
      },
      {
        q: "How long does Brow Lamination last compared to Microblading?",
        a: "Brow Lamination is a non-invasive keratin restructuring treatment that sets natural hairs in place for 6 to 8 weeks. Microblading is a semi-permanent cosmetic tattoo that lasts 1.5 to 3 years.",
      },
      {
        q: "What needle depth is used for Scalp Micropigmentation (SMP)?",
        a: "SMP uses specialized micro-fine needles to deposit medical carbon pigment into the upper dermis at a controlled depth of 1.5mm to 2mm, perfectly replicating the look of natural follicle stubble without turning blue.",
      },
    ],
  },
  {
    id: "booking",
    categoryNumber: "03",
    categoryName: "Booking & Appointments",
    shortName: "BOOKING",
    icon: <FaCalendarAlt />,
    questions: [
      {
        q: "How far in advance should I book my appointment?",
        a: "We recommend booking 2 to 3 weeks in advance for weekdays, and 3 to 4 weeks in advance for weekend slots, as our master specialists have limited daily suite availability.",
      },
      {
        q: "What is your cancellation and rescheduling policy?",
        a: "We require at least 48 hours advance notice to reschedule or cancel your appointment without forfeiting your deposit. Rescheduling with 48+ hours notice is completely free.",
      },
      {
        q: "Is a prior consultation mandatory before booking treatment?",
        a: "Every appointment includes a comprehensive 30-minute consultation and facial mapping on the same day. However, if you have prior PMU from another artist or medical concerns, we offer free standalone video/in-clinic consultations.",
      },
      {
        q: "What payment methods are accepted at the clinic?",
        a: "We accept all major Credit/Debit Cards, UPI (Google Pay, PhonePe, Paytm), Net Banking, and flexible 0% interest EMI payment options on select cards.",
      },
      {
        q: "Are touch-up sessions included in the initial treatment price?",
        a: "Our signature packages clearly outline your initial session and 4–6 week perfecting touch-up. Please check your specific treatment package breakdown during booking.",
      },
    ],
  },
  {
    id: "preparation",
    categoryNumber: "04",
    categoryName: "Preparation",
    shortName: "PREPARATION",
    icon: <FaRegFileAlt />,
    questions: [
      {
        q: "What should I do before treatment (Pre-Care Guidelines)?",
        a: "Avoid caffeine and alcohol for 48 hours prior. Discontinue blood thinners (aspirin, ibuprofen, fish oil) 3 days before. Stop using Retin-A, AHAs, and chemical peels 14 days before. Do not wax or tint brows for at least 7 days before your appointment.",
      },
      {
        q: "Why must I avoid caffeine and alcohol before my appointment?",
        a: "Both caffeine and alcohol act as vasodilators and blood thinners. Consuming them within 24–48 hours can cause slight pinpoint bleeding during the procedure, which pushes pigment out and leads to patchy healed results.",
      },
      {
        q: "How long should I wait after Botox or Dermal Fillers before PMU?",
        a: "You must wait at least 3 to 4 weeks after receiving Botox, Dysport, or facial fillers in the forehead, brow, or lip area before getting permanent makeup so muscle position is fully stabilized.",
      },
      {
        q: "Should I wax or thread my eyebrows before microblading?",
        a: "Please do not wax, thread, or pluck your brows for at least 7 days before your appointment. We prefer seeing your natural hair growth pattern so we can design a shape that complements your natural features.",
      },
      {
        q: "I have a history of cold sores. What should I do before Lip Blushing?",
        a: "If you have ever had a cold sore (HSV-1), the needle stimulation can trigger an outbreak. You must obtain an anti-viral prescription (such as Valacyclovir or Acyclovir) from your doctor and start taking it 3 days before treatment.",
      },
    ],
  },
  {
    id: "healing",
    categoryNumber: "05",
    categoryName: "Healing & Aftercare",
    shortName: "HEALING & AFTERCARE",
    icon: <FaHeart />,
    questions: [
      {
        q: "What is the day-by-day healing process like?",
        a: "Days 1–3: Bold & dark color. Days 4–7: Light flaking and itching (do not pick!). Days 8–14: Ghosting phase (color appears lighter). Weeks 3–4: True color bloom returns. Week 5–6: Touch-up session locks in permanent perfection.",
      },
      {
        q: "What should I do when my brows start itching or flaking?",
        a: "Do not pick, scratch, peel, or pull at flaking skin under any circumstances! Picking will prematurely pull the implanted pigment out of the dermis, resulting in patchy holes or scarring. Apply a rice-grain amount of healing balm.",
      },
      {
        q: "What is the 'Ghosting' phase during PMU healing?",
        a: "Around Day 10–14, after flaking completes, the new baby skin over the pigment is opaque and milky, making the color look like it disappeared ('ghosting'). Over weeks 3 and 4, the skin turns translucent and the vibrant color resurfaces.",
      },
      {
        q: "How do I wash my face during the 10-day healing period?",
        a: "Wash around the treated area with gentle cleanser. For the treated zone, gently pat with a damp cotton pad using sterile water, and immediately pat dry with a clean tissue. Never submerge your face or let shower water blast directly.",
      },
      {
        q: "When can I start wearing foundation and eye makeup again?",
        a: "You can wear foundation on the rest of your face, but keep all makeup, skincare actives, and sunscreen at least 1 inch away from the healing PMU zone for a full 14 days until all micro-wounds are sealed.",
      },
    ],
  },
  {
    id: "safety",
    categoryNumber: "06",
    categoryName: "Safety & Hygiene",
    shortName: "SAFETY",
    icon: <FaShieldAlt />,
    questions: [
      {
        q: "Are the needles and blades single-use and sterile?",
        a: "Yes, 100%. We adhere to strict medical-grade hospital sterilization standards. Every needle, microblade, cartridge, and pigment cup is individually gamma-ray sterilized, vacuum-sealed, and opened in front of you before disposal in biohazard sharps containers.",
      },
      {
        q: "What ingredients are in your pigments? Are they safe?",
        a: "We exclusively use Swiss and German certified, medical-grade, vegan, cruelty-free mineral pigments. They are hypoallergenic, heavy metal-free, gamma-sterilized, and compliant with strict European REACH safety standards.",
      },
      {
        q: "Can I get Permanent Makeup if I am pregnant or breastfeeding?",
        a: "No. As a medical precaution, we do not perform PMU on pregnant or nursing mothers due to hormonal shifts affecting skin elasticity and pigment retention, as well as the use of topical lidocaine anesthetics.",
      },
      {
        q: "Is an MRI safe after getting permanent makeup?",
        a: "Yes. Our pigments are high-purity mineral formulations containing zero iron oxide or heavy metal contaminants that could interact with magnetic resonance imaging (MRI) fields.",
      },
      {
        q: "Are your specialists certified and licensed?",
        a: "Yes, all our aesthetic doctors and practitioners are certified by internationally accredited PMU academies across Europe, the USA, and Asia, holding active certifications in bloodborne pathogens and sterilization.",
      },
    ],
  },
  {
    id: "results",
    categoryNumber: "07",
    categoryName: "Results & Longevity",
    shortName: "RESULTS",
    icon: <FaAward />,
    questions: [
      {
        q: "How long do results last and when should I get a color refresh?",
        a: "Results typically last 1.5 to 3 years. We recommend a color booster session every 12 to 24 months to maintain vibrant color saturation, crisp stroke definition, and fresh symmetry as natural skin cell turnover occurs.",
      },
      {
        q: "Will my permanent makeup turn blue, green, or red over time?",
        a: "No. Color shifting in old tattoos was caused by low-grade carbon inks and heavy metals. We use advanced mineral pigments with stable organic/inorganic formulations that fade naturally on tone without shifting blue or red.",
      },
      {
        q: "Can I preview and approve the shape before the procedure begins?",
        a: "Yes, absolutely! We spend 30 to 45 minutes pre-drawing and measuring your brows or lips using golden ratio calipers and digital symmetry mapping. The needle never touches your skin until you are 100% in love with the preview.",
      },
      {
        q: "Will Microblading damage my existing natural eyebrow hair?",
        a: "Not at all. Microblading implants pigment between your natural hairs in the superficial dermis. It does not damage the underlying hair bulbs; in fact, many clients report enhanced hair stimulation from micro-circulation.",
      },
      {
        q: "How do I protect my healed results when in the sun?",
        a: "Once fully healed (after 4 weeks), apply a mineral-based SPF 50 sunscreen stick directly over your brows, lips, or scalp whenever you are exposed to direct sunlight to keep the color fresh.",
      },
    ],
  },
  {
    id: "men",
    categoryNumber: "08",
    categoryName: "Men's Treatments",
    shortName: "MEN'S TREATMENTS",
    icon: <FaVenusMars />,
    questions: [
      {
        q: "What is Scalp Micropigmentation (SMP) and how does it help men?",
        a: "SMP is a non-surgical solution for male pattern baldness, receding hairlines, and crown thinning. By replicating thousands of micro-follicles, it creates the sharp, clean appearance of a full head of shaved hair or adds density to thinning hair.",
      },
      {
        q: "How natural does Scalp Micropigmentation look up close?",
        a: "Our master artists use proprietary micro-fine needles and custom charcoal pigments matched to your exact hair follicle shade, resulting in a 3D textured follicle illusion that looks completely indistinguishable from real hair.",
      },
      {
        q: "Do you offer natural Microblading specifically designed for men?",
        a: "Yes! Men's Brow Grooming & Microblading is styled completely differently from women's brows. We follow a hyper-realistic, rugged, non-curated hair pattern that fills sparse gaps and restores masculine density without looking made up.",
      },
      {
        q: "How many sessions of Scalp Micropigmentation are needed?",
        a: "A complete SMP procedure requires 3 sessions spaced 10 to 14 days apart to gradually build layered density, adjust the hairline gradient, and achieve seamless natural depth.",
      },
      {
        q: "Can SMP cover surgical scars from hair transplants (FUT / FUE)?",
        a: "Yes, SMP is the gold standard for concealing linear strip scars (FUT) and dot scarring (FUE) from previous hair transplant surgeries, blending scar tissue seamlessly with surrounding hair.",
      },
    ],
  },
];

// Mapped Popular Questions linking directly to specific Category and Question index
const POPULAR_QUESTIONS = [
  {
    tag: "Is Microblading painful?",
    categoryIndex: 0, // 01 General Questions
    questionIndex: 0,
    categoryName: "General Questions",
  },
  {
    tag: "How long does it last?",
    categoryIndex: 0, // 01 General Questions
    questionIndex: 1,
    categoryName: "General Questions",
  },
  {
    tag: "What should I do before treatment?",
    categoryIndex: 3, // 04 Preparation
    questionIndex: 0,
    categoryName: "Preparation",
  },
  {
    tag: "What is the healing process?",
    categoryIndex: 4, // 05 Healing & Aftercare
    questionIndex: 0,
    categoryName: "Healing & Aftercare",
  },
];

// Fixed Treatment Cards: passed the image variables directly without curly braces
const TREATMENT_CARDS = [
  {
    title: "Brows",
    items: "Microblading • Combo Brows • Ombre Brows",
    img: brow,
    categoryTarget: 1,
  },
  {
    title: "Lips",
    items: "Lip Blushing • Lip Enhancement",
    img: lip,
    categoryTarget: 1,
  },
  {
    title: "Eyes",
    items: "Eyeliner Tattoo • Lash Enhancement",
    img: eyes,
    categoryTarget: 1,
  },
  {
    title: "Scalp",
    items: "Scalp Micropigmentation • Hairline Density",
    img: scalp,
    categoryTarget: 7,
  },
];

export default function FAQPage({ isDarkMode = false, setIsDarkMode }) {
  const containerRef = useRef(null);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [openAccordionIndex, setOpenAccordionIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedQuestionIndex, setHighlightedQuestionIndex] = useState(null);

  const accordionViewRef = useRef(null);

  // GSAP Smooth Entrance Animations
  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // 1. Hero Header Letter-Spacing Fade-in & Subtitle
      gsap.fromTo(
        ".faq-hero-title",
        { opacity: 0, y: 35, letterSpacing: "0.3em" },
        { opacity: 1, y: 0, letterSpacing: "0.22em", duration: 1.2, ease: "power3.out" }
      );

      gsap.fromTo(
        ".abt-hero-subtitle",
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 1, delay: 0.35, ease: "power2.out" }
      );

      // 2. Search Box Card Fade-Up
      gsap.fromTo(
        ".faq-search-box-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".faq-search-box-card",
            start: "top 88%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      // 3. Top Horizontal Tabs Fade-in
      gsap.fromTo(
        ".faq-horizontal-tabs-container",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".faq-horizontal-tabs-container",
            start: "top 90%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      // 4. Sidebar Glide from Left
      gsap.fromTo(
        ".faq-categories-sidebar",
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".faq-main-content-layout",
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      // 5. Accordion Pane Glide from Right
      gsap.fromTo(
        ".faq-accordion-pane",
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".faq-main-content-layout",
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      // 6. Treatment Cards Stagger
      gsap.fromTo(
        ".faq-treatment-feature-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".faq-treatment-cards-section",
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      // 7. Spotlight Banner Glide
      gsap.fromTo(
        ".faq-spotlight-banner-section",
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".faq-spotlight-banner-section",
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      // 8. Expert CTA Banner
      gsap.fromTo(
        ".faq-expert-cta-banner",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".faq-expert-cta-banner",
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      // 9. Bottom Stats Stagger
      gsap.fromTo(
        ".bottom-stat-unit",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".faq-bottom-stats-bar",
            start: "top 90%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      const refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

      return () => clearTimeout(refreshTimer);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Filtered Questions logic (Memoized)
  const filteredQuestions = useMemo(() => {
    if (!searchQuery.trim()) {
      return FAQ_DATABASE[activeCategoryIndex].questions;
    }

    const qLower = searchQuery.toLowerCase().trim();
    const results = [];

    FAQ_DATABASE.forEach((cat) => {
      cat.questions.forEach((item) => {
        if (
          item.q.toLowerCase().includes(qLower) ||
          item.a.toLowerCase().includes(qLower)
        ) {
          results.push({ ...item, originCategory: cat.categoryName });
        }
      });
    });

    return results;
  }, [searchQuery, activeCategoryIndex]);

  // Toggle Accordion Item
  const toggleAccordion = (index) => {
    setOpenAccordionIndex((prev) => (prev === index ? null : index));
  };

  // Switch category
  const handleCategorySelect = (index) => {
    setActiveCategoryIndex(index);
    setSearchQuery("");
    setOpenAccordionIndex(0);
    setHighlightedQuestionIndex(null);
  };

  // 🔥 DIRECT LINK: Popular Question Click Action
  const handlePopularQuestionClick = (item) => {
    setSearchQuery("");
    setActiveCategoryIndex(item.categoryIndex);
    setOpenAccordionIndex(item.questionIndex);
    setHighlightedQuestionIndex(item.questionIndex);

    if (accordionViewRef.current) {
      accordionViewRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setTimeout(() => {
      setHighlightedQuestionIndex(null);
    }, 2400);
  };

  return (
    <div
      className={`faq-page-master-wrapper ${isDarkMode ? "dark-theme" : "light-theme"}`}
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
        <div
          className="abt-hero-banner"
          style={{ backgroundImage: `url(${heroBgImg})` }}
        >
          <div className="abt-hero-overlay"></div>
          <div className="abt-hero-inner">
            <h1 className="abt-hero-title faq-hero-title">
              FREQUENTLY ASKED QUESTIONS
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
            <span className="abt-current">FAQs</span>
          </nav>
          <p className="abt-hero-subtitle">
            Everything you need to know about our clinical semi-permanent makeup treatments,
            pre-procedure preparation, recovery timelines, pigment safety, and clinic policies.
          </p>
        </div>
      </header>

      <div className="faq-page-inner-container">
        
        {/* ============================================================
            2. "HOW CAN WE HELP?" SEARCH & POPULAR QUESTIONS BOX
        ============================================================ */}
        <section className="faq-search-box-card">
          <h2 className="search-section-heading">How Can We Help?</h2>

          <div className="search-input-wrapper">
            <div className="search-field-container">
              <FaSearch className="search-input-icon" />
              <input
                type="text"
                placeholder="Search your question (e.g. pain, aftercare, healing, price)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="faq-search-input"
              />
              <button
                type="button"
                className="search-submit-btn"
                aria-label="Search"
              >
                <FaSearch />
              </button>
            </div>
          </div>

          {/* Popular Questions Linked Pills */}
          <div className="popular-questions-block">
            <span className="popular-title">Popular Questions</span>
            <div className="popular-tags-row">
              {POPULAR_QUESTIONS.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="popular-pill-btn"
                  onClick={() => handlePopularQuestionClick(item)}
                >
                  <span className="popular-pill-dot" />
                  <span className="popular-pill-text">{item.tag}</span>
                  <span className="popular-category-tag">{item.categoryName}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            3. TOP HORIZONTAL ICON TABS BAR
        ============================================================ */}
        <div className="faq-horizontal-tabs-container">
          {FAQ_DATABASE.map((cat, idx) => (
            <button
              key={cat.id}
              type="button"
              className={`faq-horiz-tab-pill ${
                activeCategoryIndex === idx && !searchQuery ? "active-tab" : ""
              }`}
              onClick={() => handleCategorySelect(idx)}
            >
              <span className="tab-icon">{cat.icon}</span>
              <span className="tab-text">{cat.shortName}</span>
            </button>
          ))}
        </div>

        {/* ============================================================
            4. MAIN Q&A SECTION (2-COLUMN: SIDEBAR + ACCORDION)
        ============================================================ */}
        <section
          className="faq-main-content-layout"
          id="faq-accordion-view"
          ref={accordionViewRef}
        >
          {/* Left Sticky Category Sidebar */}
          <aside className="faq-categories-sidebar">
            <div className="sidebar-card-box">
              <h3 className="sidebar-header-label">FAQ CATEGORIES</h3>
              <nav className="sidebar-categories-nav">
                {FAQ_DATABASE.map((cat, idx) => (
                  <button
                    key={cat.id}
                    type="button"
                    className={`cat-nav-item-btn ${
                      activeCategoryIndex === idx && !searchQuery
                        ? "cat-active"
                        : ""
                    }`}
                    onClick={() => handleCategorySelect(idx)}
                  >
                    <span className="cat-num">{cat.categoryNumber}</span>
                    <span className="cat-title">{cat.categoryName}</span>
                  </button>
                ))}
              </nav>

              {/* Need Personal Advice Box */}
              <div className="sidebar-advice-banner">
                <div className="advice-icon-wrap">
                  <FaHeadset />
                </div>
                <div className="advice-text-content">
                  <span className="advice-title">Need Personal Advice?</span>
                  <Link to="/contact" className="advice-contact-link">
                    CONTACT OUR TEAM →
                  </Link>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Accordion List Area */}
          <main className="faq-accordion-pane">
            <div className="accordion-pane-header">
              <h2 className="current-category-title">
                {searchQuery
                  ? `Search Results for "${searchQuery}" (${filteredQuestions.length})`
                  : FAQ_DATABASE[activeCategoryIndex].categoryName}
              </h2>
            </div>

            {filteredQuestions.length === 0 ? (
              <div className="no-faq-results">
                <p>No matching questions found for "{searchQuery}".</p>
                <button
                  type="button"
                  className="reset-search-btn"
                  onClick={() => setSearchQuery("")}
                >
                  View All Questions
                </button>
              </div>
            ) : (
              <div className="faq-accordion-list">
                {filteredQuestions.map((item, index) => {
                  const isOpen = openAccordionIndex === index;
                  const isHighlighted = highlightedQuestionIndex === index;

                  return (
                    <div
                      key={index}
                      className={`faq-accordion-card ${
                        isOpen ? "accordion-open" : ""
                      } ${isHighlighted ? "question-highlighted" : ""}`}
                    >
                      {/* Accordion Header */}
                      <button
                        type="button"
                        className="accordion-header-btn"
                        onClick={() => toggleAccordion(index)}
                      >
                        <div className="accordion-toggle-circle">
                          <span className="toggle-symbol">
                            {isOpen ? "−" : "+"}
                          </span>
                        </div>
                        <span className="accordion-question-text">{item.q}</span>
                      </button>

                      {/* Accordion Answer Content */}
                      <div className="accordion-body-collapse">
                        <div className="accordion-body-inner">
                          <p className="accordion-answer-text">{item.a}</p>
                          {item.originCategory && (
                            <span className="answer-category-badge">
                              Category: {item.originCategory}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </section>

        {/* ============================================================
            5. "QUESTIONS ABOUT TREATMENTS?" 4-CARDS GRID
        ============================================================ */}
        <section className="faq-treatment-cards-section">
          <h2 className="treatment-cards-heading">
            Questions About <em>Treatments?</em>
          </h2>

          <div className="treatment-cards-grid">
            {TREATMENT_CARDS.map((card, idx) => (
              <div className="faq-treatment-feature-card" key={idx}>
                <div className="card-image-box">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="treatment-card-img"
                  />
                </div>
                <div className="card-info-box">
                  <h3 className="card-treatment-title">{card.title}</h3>
                  <p className="card-treatment-desc">{card.items}</p>
                  <button
                    type="button"
                    className="card-faq-action-link"
                    onClick={() => {
                      handleCategorySelect(card.categoryTarget);
                      if (accordionViewRef.current) {
                        accordionViewRef.current.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }
                    }}
                  >
                    VIEW TREATMENT FAQ →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================
            6. "BEAUTY & CONFIDENCE FOR EVERYONE" MEN'S SPOTLIGHT BANNER
        ============================================================ */}
        <section className="faq-spotlight-banner-section">
          <div className="spotlight-photo-col">
            <img
              src={spotlight}
              alt="Scalp micropigmentation for men"
              className="spotlight-img"
            />
          </div>

          <div className="spotlight-content-col">
            <h2 className="spotlight-title">
              Beauty &amp; Confidence <br />
              For Everyone
            </h2>
            <p className="spotlight-desc">
              Browlicious provides professional aesthetic and permanent makeup
              solutions for both women and men, with treatments personalized to
              individual anatomical goals.
            </p>
          </div>

          <div className="spotlight-features-col">
            <ul className="spotlight-list">
              <li>
                <span className="list-icon-badge">
                  <FaUserMd />
                </span>
                <span>Scalp Micropigmentation</span>
              </li>
              <li>
                <span className="list-icon-badge">
                  <FaCut />
                </span>
                <span>Men's Brow Grooming</span>
              </li>
              <li>
                <span className="list-icon-badge">
                  <FaHeart />
                </span>
                <span>Skin Treatments</span>
              </li>
              <li>
                <span className="list-icon-badge">
                  <FaShieldAlt />
                </span>
                <span>Personalized Consultation</span>
              </li>
            </ul>

            <button
              type="button"
              className="spotlight-cta-btn"
              onClick={() => {
                handleCategorySelect(7); // Jump to Men's Treatments
                if (accordionViewRef.current) {
                  accordionViewRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
            >
              EXPLORE MEN'S TREATMENTS →
            </button>
          </div>
        </section>

        {/* ============================================================
            7. "STILL NOT SURE? TALK TO OUR EXPERTS" CTA BANNER
        ============================================================ */}
        <section className="faq-expert-cta-banner">
          <div className="expert-photo-wrap">
            <img
              src={expert}
              alt="Lead aesthetician Dr. Ananya"
              className="expert-avatar-img"
            />
          </div>

          <div className="expert-content-wrap">
            <span className="expert-tagline">STILL NOT SURE?</span>
            <h2 className="expert-headline">Talk to Our Experts</h2>
            <p className="expert-subtext">
              Every client is different. Our certified specialists can help you
              understand your options and choose the treatment that best suits your goals.
            </p>

            <div className="expert-actions-row">
              <Link to="/contact" className="expert-btn btn-solid-pink">
                <FaPhoneAlt />
                <span>CONTACT US</span>
              </Link>
              <Link to="/book-appointment" className="expert-btn btn-outline-pink">
                <FaCalendarAlt />
                <span>BOOK CONSULTATION</span>
              </Link>
            </div>
          </div>

          <div className="expert-pillars-wrap">
            <div className="pillar-item">
              <div className="pillar-icon">
                <FaUserMd />
              </div>
              <div className="pillar-text">
                <strong>Certified Experts</strong>
                <span>Highly trained &amp; experienced specialists</span>
              </div>
            </div>

            <div className="pillar-item">
              <div className="pillar-icon">
                <FaShieldAlt />
              </div>
              <div className="pillar-text">
                <strong>Safe &amp; Hygienic</strong>
                <span>Strict clinical cleanliness &amp; safety</span>
              </div>
            </div>

            <div className="pillar-item">
              <div className="pillar-icon">
                <FaHeart />
              </div>
              <div className="pillar-text">
                <strong>Personalized Care</strong>
                <span>Treatments designed around you</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            8. BOTTOM STATS BAR
        ============================================================ */}
        <section className="faq-bottom-stats-bar">
          <div className="bottom-stat-unit">
            <FaAward className="stat-unit-icon" />
            <div className="stat-unit-info">
              <span className="stat-val">10+</span>
              <span className="stat-label">Years Experience</span>
            </div>
          </div>

          <div className="bottom-stat-unit">
            <FaUsers className="stat-unit-icon" />
            <div className="stat-unit-info">
              <span className="stat-val">5000+</span>
              <span className="stat-label">Happy Clients</span>
            </div>
          </div>

          <div className="bottom-stat-unit">
            <FaUserMd className="stat-unit-icon" />
            <div className="stat-unit-info">
              <span className="stat-val">15+</span>
              <span className="stat-label">Expert Doctors</span>
            </div>
          </div>

          <div className="bottom-stat-unit">
            <FaSmile className="stat-unit-icon" />
            <div className="stat-unit-info">
              <span className="stat-val">98%</span>
              <span className="stat-label">Satisfaction Rate</span>
            </div>
          </div>

          <div className="bottom-stat-unit">
            <FaStar className="stat-unit-icon" />
            <div className="stat-unit-info">
              <span className="stat-val">4.9/5</span>
              <span className="stat-label">Client Rating</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
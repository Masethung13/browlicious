import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/Header.css";
import browliciousLogo from "../assets/browlicious-dark-logo.png";
import headerEditorialImg from "../assets/clinic1.png";

const NAV_LINKS = [
  { name: "Home", href: "/", subtitle: "01 / Welcome", isRoute: true },
  { name: "About Us", href: "/about", subtitle: "02 / Our Story", isRoute: true },
  { name: "Services", href: "/#services", subtitle: "03 / Signature PMU" },
  { name: "Result", href: "/results", subtitle: "04 / The Experience", isRoute: true },
  { name: "Blogs", href: "/blogs", subtitle: "05 / Beauty Insights", isRoute: true },
  { name: "Why Choose Us", href: "/#why-choose-us", subtitle: "06 / Master Standards" },
  { name: "Faq", href: "/#testimonials", subtitle: "07 / Reviews" },
  { name: "Contact", href: "/book-appointment", subtitle: "08 / Book Session", isRoute: true },
];

export default function Header({ isDarkMode = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Scroll Tracking for Sticky Header Glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Lock Body Scroll & Keyboard Escape on Drawer Open
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };

    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => window.removeEventListener("keydown", onKey);
  }, [isMenuOpen]);

  // 3. Smooth Scroll to Home on Logo Click
  const handleLogoClick = (e) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      if (window.location.hash) {
        window.history.pushState(null, "", window.location.pathname);
      }
    }
  };

  return (
    <>
      {/* ============================================================
          MAIN HEADER WITH RESPONSIVE 3-COLUMN GRID
      ============================================================ */}
      <header className={`site-header ${isScrolled ? "header-scrolled" : ""} ${isDarkMode ? "dark-theme" : "light-theme"}`}>
        <div className="header-container">
          
          {/* Left Column: Menu Button */}
          <div className="header-left">
            <button
              className="menu-toggle-btn"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open Navigation Menu"
            >
              <div className="menu-toggle-circle">
                <span className="hamburger-line line-1"></span>
                <span className="hamburger-line line-2"></span>
              </div>
              <span className="menu-toggle-text">Menu</span>
            </button>
          </div>

          {/* Center Column: Browlicious Logo */}
          <div className="header-center">
            <a 
              href="#home" 
              onClick={handleLogoClick} 
              className="brand-logo" 
              aria-label="Browlicious Home"
            >
              <img 
                src={browliciousLogo} 
                alt="Browlicious PMU Clinic & Academy Logo" 
                className="brand-logo-img" 
              />
            </a>
          </div>

          {/* Right Column: Phone & Book Appointment Route CTA */}
          <div className="header-right">
            <div className="appointment-phone">
              <span className="phone-label">Call:</span>
              <a href="tel:+918111643210" className="phone-link">
                +91 81116 43210
              </a>
            </div>

            <Link to="/book-appointment" className="book-cta-btn">
              <span className="btn-text-default">Book Appointment</span>
              <span className="btn-text-hover">Book Appointment</span>
            </Link>
          </div>

        </div>
      </header>

      {/* ============================================================
          SPLIT & SLIDE SIDEBAR DRAWER
      ============================================================ */}
      <div className={`menu-drawer-wrapper ${isMenuOpen ? "drawer-open" : ""} ${isDarkMode ? "dark-theme" : "light-theme"}`}>
        <div className="drawer-backdrop" onClick={() => setIsMenuOpen(false)} />

        <div className="drawer-split-stage">
          {/* LEFT WING: Navigation & Contact */}
          <div className="drawer-split-wing left-wing">
            <div className="drawer-top-bar">
              <button
                className="drawer-close-btn"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close Navigation"
              >
                <div className="close-circle">
                  <svg className="close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </div>
                <span className="close-btn-text">Close</span>
              </button>

              <span className="drawer-brand-mark">BROWLICIOUS</span>
            </div>

            <div className="drawer-navigation-pane">
              <nav className="vertical-nav-menu">
                {NAV_LINKS.map((item, index) => (
                  <div
                    className="nav-menu-item"
                    key={item.name}
                    style={{ "--item-delay": `${0.25 + index * 0.05}s` }}
                  >
                    <span className="nav-item-num">{item.subtitle}</span>
                    {item.isRoute ? (
                      <Link
                        to={item.href}
                        className="nav-menu-single-link"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="link-text" data-text={item.name}>
                          {item.name}
                        </span>
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        className="nav-menu-single-link"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="link-text" data-text={item.name}>
                          {item.name}
                        </span>
                      </a>
                    )}
                  </div>
                ))}
              </nav>

              <div className="drawer-contact-footer">
                <div className="footer-meta-block" style={{ "--footer-delay": "0.65s" }}>
                  <h4 className="meta-title">Clinic Studio Location</h4>
                  <p className="meta-content">
                    Browlicious PMU Clinic &amp; Academy<br />
                    Luxury Aesthetic Studio, Chennai<br />
                    <span className="meta-highlight">+91 81116 43210</span>
                  </p>
                </div>

                <div className="footer-meta-block" style={{ "--footer-delay": "0.75s" }}>
                  <h4 className="meta-title">Consultations &amp; Enquiries</h4>
                  <p className="meta-content">
                    Email: info@browlicious.com<br />
                    Bespoke PMU Consultations Available
                  </p>
                </div>

                <div className="footer-meta-block" style={{ "--footer-delay": "0.85s" }}>
                  <h4 className="meta-title">Clinic Working Hours</h4>
                  <p className="meta-content">
                    Mon - Sat: 10:00 AM - 7:00 PM<br />
                    <span className="meta-highlight">Sunday: By Prior Appointment</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="split-center-seam" />

          {/* RIGHT WING: Editorial Image Pane */}
          <div className="drawer-split-wing right-wing">
            <div className="drawer-editorial-pane">
              <div className="editorial-inner">
                <span className="editorial-eyebrow">THE ART OF PERMANENT BEAUTY</span>
                <h3 className="editorial-description">
                  Master-Level Permanent Makeup &amp; Advanced Aesthetics Tailored for Natural Elegance.
                </h3>
                <p className="editorial-sub-description">
                  Every brow stroke, lip tone, and contour is mathematically mapped to enhance your unique facial symmetry with certified hypoallergenic mineral pigments.
                </p>

                <div className="editorial-image-container">
                  <img
                    src={headerEditorialImg}
                    alt="Browlicious PMU Aesthetic Clinic"
                    className="editorial-img"
                  />
                  <div className="image-lens-glow" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
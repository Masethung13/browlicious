import React, { useState, useEffect } from "react";
import "../styles/Header.css";

const NAV_LINKS = [
  { name: "Home", href: "#home", subtitle: "01 / Sanctuary" },
  { name: "Services", href: "#services", subtitle: "02 / Spa Rituals" },
  { name: "Academy", href: "#academy", subtitle: "03 / Training" },
  { name: "Blog", href: "#blog", subtitle: "04 / Journal" },
  { name: "Locations", href: "#locations", subtitle: "05 / Retreats" },
  { name: "Contact", href: "#contact", subtitle: "06 / Inquiries" },
];

const LOGO_TEXT = "SERAVA";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // 1. Clean Scroll Tracking for Main Header
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

  return (
    <>
      {/* ============================================================
          MAIN HEADER WITH RESPONSIVE 3-COLUMN GRID
      ============================================================ */}
      <header className={`site-header ${isScrolled ? "header-scrolled" : ""}`}>
        <div className="header-container">
          
          {/* Left Column: Menu Button & Search */}
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

            <button className="header-search-btn" aria-label="Search site">
              <svg className="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>

          {/* Center Column: Logo */}
          <div className="header-center">
            <a href="/" className="brand-logo">
              <span className="logo-main">
                {LOGO_TEXT.split("").map((char, index) => (
                  <span
                    key={index}
                    className="logo-char"
                    style={{ "--char-index": index }}
                  >
                    {char}
                  </span>
                ))}
              </span>
              <span className="logo-sub">Beauty &amp; Wellness Spa</span>
            </a>
          </div>

          {/* Right Column: Phone & CTA */}
          <div className="header-right">
            <div className="appointment-phone">
              <span className="phone-label">Concierge:</span>
              <a href="tel:6022665755" className="phone-link">
                (602) 266-5755
              </a>
            </div>

            <a href="#book" className="book-cta-btn">
              <span className="btn-text-default">Book Ritual</span>
              <span className="btn-text-hover">Book Ritual</span>
            </a>
          </div>

        </div>
      </header>

      {/* ============================================================
          SPLIT & SLIDE SIDEBAR DRAWER
      ============================================================ */}
      <div className={`menu-drawer-wrapper ${isMenuOpen ? "drawer-open" : ""}`}>
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

              <span className="drawer-brand-mark">SERAVA SANCTUARY</span>
            </div>

            <div className="drawer-navigation-pane">
              <nav className="vertical-nav-menu">
                {NAV_LINKS.map((item, index) => (
                  <div
                    className="nav-menu-item"
                    key={item.name}
                    style={{ "--item-delay": `${0.25 + index * 0.06}s` }}
                  >
                    <span className="nav-item-num">{item.subtitle}</span>
                    <a
                      href={item.href}
                      className="nav-menu-single-link"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="link-text" data-text={item.name}>
                        {item.name}
                      </span>
                    </a>
                  </div>
                ))}
              </nav>

              <div className="drawer-contact-footer">
                <div className="footer-meta-block" style={{ "--footer-delay": "0.65s" }}>
                  <h4 className="meta-title">Sanctuary Address</h4>
                  <p className="meta-content">
                    Serava Wellness Center<br />
                    Madison Avenue, Suite 124, NY<br />
                    <span className="meta-highlight">+1 (800) 245-9820</span>
                  </p>
                </div>

                <div className="footer-meta-block" style={{ "--footer-delay": "0.75s" }}>
                  <h4 className="meta-title">Concierge &amp; Inquiries</h4>
                  <p className="meta-content">
                    Email: concierge@seravaspa.com<br />
                    Private Booking Available
                  </p>
                </div>

                <div className="footer-meta-block" style={{ "--footer-delay": "0.85s" }}>
                  <h4 className="meta-title">Hours of Calm</h4>
                  <p className="meta-content">
                    Mon - Fri: 9:00 AM - 8:00 PM<br />
                    Sat: 10:00 AM - 8:00 PM<br />
                    <span className="meta-highlight">Sun: Private Retreats</span>
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
                <span className="editorial-eyebrow">A Sanctuary for the Senses</span>
                <h3 className="editorial-description">
                  Discover a curated selection of meditative spa rituals designed
                  to restore equilibrium and elevate vitality.
                </h3>
                <p className="editorial-sub-description">
                  Every formulation and touchpoint is harmonized to bring you
                  radiance, balance, and mindful stillness.
                </p>

                <div className="editorial-image-container">
                  <img
                    src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1200"
                    alt="Spa calming environment"
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
import React, { useState } from 'react';
import '../styles/Header.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Primary Sticky Header */}
      <header className="site-header">
        <div className="header-container">
          
          {/* Left Block: Hamburger Trigger & Search */}
          <div className="header-left">
            <button 
              className="menu-toggle-btn" 
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open Menu"
            >
              <div className="menu-toggle-circle">
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
              </div>
              <span className="menu-toggle-text">Menu</span>
            </button>

            <button className="header-search-btn" aria-label="Search">
              <svg className="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>

          {/* Center Block: Brand Typography Logo */}
          <div className="header-center">
            <a href="/" className="brand-logo">
              <span className="logo-main">SERAVA</span>
              <span className="logo-sub">Beauty &amp; Spa</span>
            </a>
          </div>

          {/* Right Block: Phone Link & Booking Action */}
          <div className="header-right">
            <div className="appointment-phone">
              <span className="phone-label">Appointment:</span>
              <a href="tel:6022665755" className="phone-link">(602) 266-5755</a>
            </div>
            <a href="#book" className="book-cta-btn">
              Book Appointment
            </a>
          </div>

        </div>
      </header>

      {/* Slide-out Menu Drawer */}
      <div className={`menu-drawer-wrapper ${isMenuOpen ? 'drawer-open' : ''}`}>
        <div className="drawer-backdrop" onClick={() => setIsMenuOpen(false)} />
        
        <div className="drawer-container">
          
          {/* Drawer Top Header Control */}
          <div className="drawer-top-bar">
            <button className="drawer-close-btn" onClick={() => setIsMenuOpen(false)}>
              <div className="close-circle">
                <svg className="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </div>
              <span className="close-btn-text">Close</span>
            </button>
          </div>

          {/* Drawer Content Area (Split Grid Layout) */}
          <div className="drawer-content-grid">
            
            {/* Left Column: Flat Direct Route Navigation and Footer Info */}
            <div className="drawer-navigation-pane">
              <nav className="vertical-nav-menu">
                
                <div className="nav-menu-item">
                  <a href="#home" className="nav-menu-single-link" onClick={() => setIsMenuOpen(false)}>
                    Home
                  </a>
                </div>

                <div className="nav-menu-item">
                  <a href="#services" className="nav-menu-single-link" onClick={() => setIsMenuOpen(false)}>
                    Services
                  </a>
                </div>

                <div className="nav-menu-item">
                  <a href="#academy" className="nav-menu-single-link" onClick={() => setIsMenuOpen(false)}>
                    Academy
                  </a>
                </div>

                <div className="nav-menu-item">
                  <a href="#blog" className="nav-menu-single-link" onClick={() => setIsMenuOpen(false)}>
                    Blog
                  </a>
                </div>

                <div className="nav-menu-item">
                  <a href="#locations" className="nav-menu-single-link" onClick={() => setIsMenuOpen(false)}>
                    Locations
                  </a>
                </div>

                <div className="nav-menu-item">
                  <a href="#contact" className="nav-menu-single-link" onClick={() => setIsMenuOpen(false)}>
                    Contact
                  </a>
                </div>

              </nav>

              {/* Drawer Contact Footer Section */}
              <div className="drawer-contact-footer">
                <div className="footer-meta-block">
                  <h4 className="meta-title">Contact Us</h4>
                  <p className="meta-content">
                    Serava Spa &amp; Wellness Center<br />
                    Madison Avenue, Suite 124, NY<br />
                    <span className="meta-highlight">Phone: +84 987 123 456</span>
                  </p>
                </div>

                <div className="footer-meta-block">
                  <h4 className="meta-title">Booking &amp; Support</h4>
                  <p className="meta-content">
                    Email: booking@seravaspa.com<br />
                    Hotline: +84 987 123 456
                  </p>
                </div>

                <div className="footer-meta-block">
                  <h4 className="meta-title">Opening Hours</h4>
                  <p className="meta-content">
                    Mon - Friday: 9:00 AM - 8:00 PM<br />
                    Saturday: 10:00 AM - 8:00 PM<br />
                    <span className="meta-highlight">Sunday: Closed</span>
                  </p>
                </div>
              </div>

            </div>

            {/* Right Pane: Minimalist Editorial Space */}
            <div className="drawer-editorial-pane">
              <div className="editorial-inner">
                <span className="editorial-eyebrow">Discover Serava</span>
                <p className="editorial-description">
                  DISCOVER A CURATED SELECTION OF SPA RITUALS DESIGNED TO RELAX YOUR BODY AND ELEVATE YOUR WELLBEING EVERY SINGLE DAY.
                </p>
                <p className="editorial-sub-description">
                  Each Treatment Is Crafted With Care To Bring You Balance, Beauty, And Complete Serenity In Every Moment.
                </p>
                
                <div className="editorial-image-container">
                  <img 
                    src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1000" 
                    alt="Spa environment with sheer curtain" 
                    className="editorial-img"
                  />
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}
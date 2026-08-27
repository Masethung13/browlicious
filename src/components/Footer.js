import React from "react";
import "../styles/Footer.css";
import footerCtaBanner from "../assets/footer_cta_banner.png";

export default function Footer({ isDarkMode = false }) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className={`footer-wrapper-stage ${isDarkMode ? "dark-theme" : "light-theme"}`}>
      
      {/* ============================================================
          ZONE 1: CALL TO ACTION BANNER & VALUE RIBBON
      ============================================================ */}
      <div 
        className="footer-cta-banner"
        style={{ backgroundImage: `url(${footerCtaBanner})` }}
      >
        <div className="footer-cta-overlay" />

        <div className="cta-banner-container">
          <span className="cta-eyebrow">YOUR JOURNEY AWAITS</span>
          <h2 className="cta-banner-title">Ready to Begin Your Beauty Journey?</h2>
          <p className="cta-banner-desc">
            Explore our bespoke PMU treatments or speak directly with our certified master specialists to curate your customized enhancement plan.
          </p>
          
          <div className="cta-buttons-row">
            <a href="#booking" className="cta-btn-solid-pink">
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>BOOK APPOINTMENT</span>
              <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>

            <a href="https://wa.me/918111643210" target="_blank" rel="noopener noreferrer" className="cta-btn-outline-white">
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              <span>WHATSAPP US</span>
            </a>
          </div>
        </div>
      </div>

      {/* HORIZONTAL CORE VALUES RIBBON */}
      <div className="footer-values-ribbon">
        <div className="values-ribbon-container">
          
          <div className="value-ribbon-item">
            <div className="value-icon-circle">
              <svg className="ribbon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <circle cx="12" cy="11" r="3"></circle>
              </svg>
            </div>
            <div className="value-text-block">
              <h4 className="value-title">Safe &amp; Hygienic</h4>
              <p className="value-desc">Hospital-grade sterilization &amp; single-use cartridges.</p>
            </div>
          </div>

          <div className="value-ribbon-item">
            <div className="value-icon-circle">
              <svg className="ribbon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
            <div className="value-text-block">
              <h4 className="value-title">Certified Specialists</h4>
              <p className="value-desc">Internationally certified master PMU artists.</p>
            </div>
          </div>

          <div className="value-ribbon-item">
            <div className="value-icon-circle">
              <svg className="ribbon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            </div>
            <div className="value-text-block">
              <h4 className="value-title">Advanced Technology</h4>
              <p className="value-desc">Nanopen precision &amp; mineral-grade organic pigments.</p>
            </div>
          </div>

          <div className="value-ribbon-item">
            <div className="value-icon-circle">
              <svg className="ribbon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div className="value-text-block">
              <h4 className="value-title">Personalised Care</h4>
              <p className="value-desc">Custom facial structural mapping for every face.</p>
            </div>
          </div>

        </div>
      </div>

      {/* ============================================================
          ZONE 2: 5-COLUMN DIRECTORY & COPYRIGHT BLOCK
      ============================================================ */}
      <div className="footer-directory-block">
        <div className="directory-container">
          
          {/* Column 1: Branding & Social Nodes */}
          <div className="directory-column col-branding">
            <span className="footer-logo">BROWLICIOUS</span>
            <span className="footer-logo-sub">PREMIUM PERMANENT MAKEUP &amp; COSMETIC CLINIC</span>
            <p className="footer-brand-narrative">
              Enhancing your natural symmetry with master-level precision, gentle mineral pigments, and bespoke care rituals.
            </p>
            
            <div className="social-nodes-row">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-outline" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="social-svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-outline" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="social-svg">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
             
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon-outline" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="social-svg">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 2.1 0 0 0 1 11.75a29 2.1 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 2.1 0 0 0 .46-5.25 29 2.1 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
              
            </div>
          </div>

          {/* Column 2: Quick Links Directory */}
          <div className="directory-column">
            <h4 className="directory-title">QUICK LINKS</h4>
            <ul className="directory-list">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#results">Results</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>

          {/* Column 3: Treatments Directory */}
          <div className="directory-column">
            <h4 className="directory-title">TREATMENTS</h4>
            <ul className="directory-list text-flat">
              <li><a href="#services">Microblading</a></li>
              <li><a href="#services">Combo Brows</a></li>
              <li><a href="#services">Lip Blushing</a></li>
              <li><a href="#services">Winged Eyeliner</a></li>
              <li><a href="#services">Scalp Micropigmentation</a></li>
              <li><a href="#services">BB Glow Facial</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Directory */}
          <div className="directory-column">
            <h4 className="directory-title">CONTACT</h4>
            <div className="contact-meta-list">
              <a href="tel:+918111643210" className="contact-meta-item">
                <svg className="contact-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.79 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>+91 81116 43210</span>
              </a>
              <a href="https://wa.me/918111643210" target="_blank" rel="noopener noreferrer" className="contact-meta-item">
                <svg className="contact-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
                <span>WhatsApp Us</span>
              </a>
              <a href="mailto:info@browlicious.com" className="contact-meta-item">
                <svg className="contact-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>info@browlicious.com</span>
              </a>
              <div className="contact-meta-item">
                <svg className="contact-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>Browlicious PMU Clinic, Chennai</span>
              </div>
            </div>
          </div>

          {/* Column 5: Opening Hours Directory */}
          <div className="directory-column">
            <h4 className="directory-title">HOURS</h4>
            <div className="hours-meta-list">
              <div className="hours-day-block">
                <svg className="contact-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <div className="hours-details">
                  <span className="hours-days">Mon - Sat</span>
                  <span className="hours-time">10:00 AM - 7:00 PM</span>
                </div>
              </div>
              <div className="hours-day-block gap-offset">
                <div className="hours-details">
                  <span className="hours-days">Sunday</span>
                  <span className="hours-time highlighted">Closed</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ============================================================
          ZONE 3: COPYRIGHT & LEGAL FOOTER BAR
      ============================================================ */}
      <div className="footer-copyright-bar">
        <div className="copyright-container">
          <p className="copyright-text">
            © 2026 Browlicious. All Rights Reserved.
          </p>
          
          <div className="legal-links">
            <a href="#privacy" className="legal-link">Privacy Policy</a>
            <span className="legal-divider">|</span>
            <a href="#terms" className="legal-link">Terms &amp; Conditions</a>
          </div>

          <button onClick={scrollToTop} className="back-to-top-btn" aria-label="Scroll back to top">
            <span>Back to Top</span>
            <svg className="top-arrow-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="19" x2="12" y2="5"></line>
              <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
          </button>
        </div>
      </div>

    </footer>
  );
}
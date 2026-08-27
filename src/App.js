import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import ServiceSection from './components/ServiceSection';
import AboutSection from './components/AboutSection';
import WhyChooseUs from './components/Whychooseus';
import BeautyJourney from './components/BeautyJourney';
import Footer from './components/Footer';
import Pr from './components/Pr';
import Testimonials from './components/Testimonials';
import AbtPg from './components/AbtPg';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function HomePage({ isDarkMode, setIsDarkMode }) {
  return (
    <>
      <Home isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <AboutSection isDarkMode={isDarkMode} />
      <ServiceSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <BeautyJourney isDarkMode={isDarkMode} />
      <WhyChooseUs isDarkMode={isDarkMode} />
      <Pr isDarkMode={isDarkMode} />
      <Testimonials isDarkMode={isDarkMode} />
    </>
  );
}

function App() {
  // Theme state: default to false (light theme) or true (dark theme)
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }, [isDarkMode]);

  return (
    <Router>
      <ScrollToTop />
      <div className={`App ${isDarkMode ? "dark-theme" : "light-theme"}`}>
        {/* Premium responsive header with slide-out menu drawer */}
        <Header isDarkMode={isDarkMode} />
        <Routes>
          <Route path="/" element={<HomePage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
          <Route path="/about" element={<AbtPg isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
          <Route path="/about-us" element={<AbtPg isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
          <Route path="/abt" element={<AbtPg isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
        </Routes>
        <Footer isDarkMode={isDarkMode} />
      </div>
    </Router>
  );
}

export default App;
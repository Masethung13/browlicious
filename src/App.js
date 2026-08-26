import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import ServiceSection from './components/ServiceSection';
import AboutSection from './components/AboutSection';
import WhyChooseUs from './components/Whychooseus';
import BeautyJourney from './components/BeautyJourney';
import Footer from './components/Footer';
import Pr from './components/Pr';
import Testimonials from './components/Testimonials';



function App() {
  // Theme state: default to false (light theme) or true (dark theme)
  // Matching the light luxury theme in user's image, while fully supporting toggling
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
    <div className={`App ${isDarkMode ? "dark-theme" : "light-theme"}`}>
      {/* Premium responsive header with slide-out menu drawer */}
      <Header isDarkMode={isDarkMode} />
      <Home isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <AboutSection isDarkMode={isDarkMode} />
      <ServiceSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <BeautyJourney isDarkMode={isDarkMode} />
      <WhyChooseUs isDarkMode={isDarkMode} />
      <Pr isDarkMode={isDarkMode} />
      <Testimonials isDarkMode={isDarkMode} />
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}

export default App;
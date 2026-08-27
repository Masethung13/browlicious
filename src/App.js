import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Layout Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Page Components
import Home from "./components/Home";
import AboutSection from "./components/AboutSection";
import ServiceSection from "./components/ServiceSection";
import BeautyJourney from "./components/BeautyJourney";
import WhyChooseUs from "./components/Whychooseus";
import Pr from "./components/Pr";
import Testimonials from "./components/Testimonials";
import BookAppointment from "./components/BookAppointment";
import AbtPg from "./components/AbtPg";
import Blogspg from "./components/Blogspg";

// Scroll to top on route change helper
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// 1. Full Landing Page Component (Home route "/")
function LandingPage({ isDarkMode, setIsDarkMode }) {
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

// 2. Master App with Routing
function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
    } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
    }
  }, [isDarkMode]);

  return (
    <Router>
      <ScrollToTop />
      <div className={`App ${isDarkMode ? "dark-theme" : "light-theme"}`}>
        {/* Global Header */}
        <Header isDarkMode={isDarkMode} />

        {/* Dynamic Route Switching */}
        <Routes>
          {/* Main Home / Landing Route */}
          <Route
            path="/"
            element={
              <LandingPage
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
              />
            }
          />

          {/* Dedicated About Us Page Route */}
          <Route
            path="/about"
            element={
              <AbtPg
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
              />
            }
          />
          <Route
            path="/about-us"
            element={
              <AbtPg
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
              />
            }
          />
          <Route
            path="/abt"
            element={
              <AbtPg
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
              />
            }
          />

          {/* Dedicated Book Appointment Route */}
          <Route
            path="/book-appointment"
            element={
              <BookAppointment
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
              />
            }
          />

          {/* Dedicated Blogs Page Route */}
          <Route
            path="/blogs"
            element={
              <Blogspg
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
              />
            }
          />
          <Route
            path="/blog"
            element={
              <Blogspg
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
              />
            }
          />
          <Route
            path="/blogspg"
            element={
              <Blogspg
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
              />
            }
          />
        </Routes>

        {/* Global Footer */}
        <Footer isDarkMode={isDarkMode} />
      </div>
    </Router>
  );
}

export default App;
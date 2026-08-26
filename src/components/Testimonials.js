import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

// Swiper core styles
import "swiper/css";
import "swiper/css/navigation";
import "../styles/Testimonials.css";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Neha Sharma",
    treatment: "Microblading Hyper-Realism",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    rating: 5,
    review: "The level of symmetry and precision is extraordinary. My brows look completely natural and wake-up ready every morning.",
  },
  {
    id: 2,
    name: "Rahul Mehta",
    treatment: "Scalp Micropigmentation",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    rating: 5,
    review: "The hairline blending is undetectable. Masterful practitioner and an ultra-hygienic, relaxing clinical atmosphere.",
  },
  {
    id: 3,
    name: "Priya S.",
    treatment: "Lip Blushing Aquarelle",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    rating: 5,
    review: "The custom organic pigment shade matches my undertones perfectly. Soft, luscious, and zero daily lipstick needed!",
  },
  {
    id: 4,
    name: "Ananya Patel",
    treatment: "BB Glow & HydraFacial",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
    rating: 5,
    review: "Left my skin with a luminous glass-skin radiance that lasted for weeks. Truly a 5-star bespoke aesthetic experience.",
  },
  {
    id: 5,
    name: "Vikram Malhotra",
    treatment: "Combo Ombre Brows",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    rating: 5,
    review: "Unbelievable attention to detail and facial bone structure mapping. Highest recommendation for anyone seeking PMU.",
  },
];

export default function Testimonials({ isDarkMode = false }) {
  const swiperRef = useRef(null);

  return (
    <section className={`testimonials-section ${isDarkMode ? "dark-theme" : "light-theme"}`} id="testimonials">
      <div className="testimonials-glass-card">
        
        {/* Header: Eyebrow + Title + Link */}
        <div className="testimonials-top-bar">
          <div className="testimonials-title-group">
            <span className="testimonials-eyebrow">CLIENT STORIES &amp; EXPERIENCES</span>
            <h2 className="testimonials-title">What Our Clients Say</h2>
          </div>

          <a href="#services" className="view-all-link">
            <span>Explore All Treatments</span>
            <span className="link-arrow">→</span>
          </a>
        </div>

        {/* Carousel Area with Circular Navigation Arrows */}
        <div className="swiper-slider-wrapper">
          
          {/* Custom Left Arrow */}
          <button
            className="carousel-nav-btn btn-prev"
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous Testimonials"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          {/* Swiper Component */}
          <Swiper
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            speed={750}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.3,
                spaceBetween: 18,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 22,
              },
              1100: {
                slidesPerView: 3,
                spaceBetween: 26,
              },
            }}
            className="testimonials-swiper"
          >
            {TESTIMONIALS.map((item) => (
              <SwiperSlide key={item.id} className="testimonial-swiper-slide">
                <div className="client-review-card">
                  {/* Subtle Card Glow Highlight on Hover */}
                  <div className="card-ambient-glow" />

                  {/* Header: Avatar + Client Meta */}
                  <div className="client-header">
                    <div className="avatar-ring-container">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="client-avatar-img"
                        loading="lazy"
                      />
                      <div className="avatar-shimmer" />
                    </div>

                    <div className="client-info">
                      <h3 className="client-name">{item.name}</h3>
                      <span className="client-treatment">{item.treatment}</span>
                    </div>
                  </div>

                  {/* Star Ratings */}
                  <div className="star-rating-row">
                    {[...Array(item.rating)].map((_, i) => (
                      <span key={i} className="pink-star" style={{ "--star-i": i }}>
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="client-review-text">"{item.review}"</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Right Arrow */}
          <button
            className="carousel-nav-btn btn-next"
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next Testimonials"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

        </div>

      </div>
    </section>
  );
}
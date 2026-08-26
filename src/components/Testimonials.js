import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay} from "swiper/modules";

// Swiper core styles
import "swiper/css";
import "swiper/css/navigation";
import "../styles/Testimonials.css";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Neha Sharma",
    treatment: "Microblading",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    rating: 5,
    review: "Amazing experience! My brows look so natural and perfect.",
  },
  {
    id: 2,
    name: "Rahul Mehta",
    treatment: "Scalp Micropigmentation",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    rating: 5,
    review: "Very professional team and excellent results.",
  },
  {
    id: 3,
    name: "Priya S.",
    treatment: "Lip Blushing",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    rating: 5,
    review: "My lips look so soft and beautiful. Highly recommended!",
  },
  {
    id: 4,
    name: "Ananya Patel",
    treatment: "HydraFacial Glow",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
    rating: 5,
    review: "The treatment left my skin completely renewed and glowing for weeks.",
  },
  {
    id: 5,
    name: "Vikram Malhotra",
    treatment: "Beard Contour & Scalp",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    rating: 5,
    review: "Unbelievable attention to detail and a truly relaxing environment.",
  },
];

export default function Testimonials() {
  const swiperRef = useRef(null);

  return (
    <section className="testimonials-section">
      <div className="testimonials-glass-card">
        
        {/* Header: Title + Link */}
        <div className="testimonials-top-bar">
          <h2 className="testimonials-title">What Our Clients Say</h2>
          <a href="#all-testimonials" className="view-all-link">
            <span>View All Testimonials</span>
            <span className="link-arrow">&gt;</span>
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
            speed={700}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
                spaceBetween: 20,
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
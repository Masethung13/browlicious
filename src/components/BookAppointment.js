import React, { useState, useEffect, useMemo } from "react";
// Firebase SDK imports
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// React Toastify imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../styles/BookAppointment.css";

// 1. Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRoJkzdS1VIGTBeN8khJEroKO8zW2M3nE",
  authDomain: "browlicious-web.firebaseapp.com",
  projectId: "browlicious-web",
  storageBucket: "browlicious-web.firebasestorage.app",
  messagingSenderId: "1006855218065",
  appId: "1:1006855218065:web:3ccb3eff52bfb1b4627030",
  measurementId: "G-Y0J5SNE50W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Updated Treatments List with your requested additions
const TREATMENTS = [
  {
    id: "microblading",
    title: "Microblading",
    desc: "Natural hair-like brow strokes",
    duration: "2 – 2.5 Hours",
    price: "₹14,999",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 36C22 20 42 20 52 36" strokeLinecap="round" />
        <path d="M18 31C24 24 38 24 46 31" strokeLinecap="round" />
        <path d="M22 28C27 24 35 24 40 28" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "combo-brows",
    title: "Combo Brows",
    desc: "Microblading + shading effect",
    duration: "2.5 – 3 Hours",
    price: "₹18,499",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 34C24 18 44 20 52 34" strokeLinecap="round" />
        <path d="M16 42C26 48 38 48 48 42" strokeLinecap="round" />
        <circle cx="32" cy="40" r="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "ombre-brows",
    title: "Ombre Brows",
    desc: "Soft powdered gradient brow effect",
    duration: "2 – 3 Hours",
    price: "₹16,999",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 34C22 18 44 18 52 34" strokeLinecap="round" strokeDasharray="3 3" />
        <path d="M18 30C26 22 38 22 46 30" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "lip-blushing",
    title: "Lip Blushing",
    desc: "Natural lush lip color enhancement",
    duration: "2 – 2.5 Hours",
    price: "₹15,499",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M14 32C20 22 28 26 32 30C36 26 44 22 50 32C42 42 22 42 14 32Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 32C22 35 42 35 50 32" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "eyeliner-tattoo",
    title: "Eyeliner Tattoo",
    desc: "Defined lashline that lasts beautifully",
    duration: "1.5 – 2 Hours",
    price: "₹11,999",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 32C20 20 44 20 52 32C44 44 20 44 12 32Z" strokeLinecap="round" />
        <circle cx="32" cy="32" r="6" />
        <path d="M48 24L56 18" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "brow-lamination",
    title: "Brow Lamination",
    desc: "Lifted, styled & sculpted brows",
    duration: "1 – 1.5 Hours",
    price: "₹6,499",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M14 36C22 18 42 18 50 36" strokeLinecap="round" />
        <path d="M22 32L26 22M32 30L34 18M42 32L40 22" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "scalp-micropigmentation",
    title: "Scalp Micropigmentation",
    desc: "Natural-looking hairline density",
    duration: "2 – 3 Hours",
    price: "₹24,999",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="32" cy="26" r="14" />
        <path d="M16 52C16 42 24 38 32 38C40 38 48 42 48 52" strokeLinecap="round" />
        <circle cx="28" cy="22" r="1" fill="currentColor" />
        <circle cx="32" cy="20" r="1" fill="currentColor" />
        <circle cx="36" cy="22" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "skin-rejuvenation",
    title: "Skin Rejuvenation",
    desc: "Collagen renewal & radiant skin glow",
    duration: "1 – 1.5 Hours",
    price: "₹8,999",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="32" cy="28" r="12" />
        <path d="M18 52C20 42 26 38 32 38C38 38 44 42 46 52" strokeLinecap="round" />
        <path d="M32 8V12M12 28H8M56 28H52" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "hydra-facial",
    title: "Hydra Facial",
    desc: "Deep pore cleanse, hydration & instant glow",
    duration: "45 – 60 Mins",
    price: "₹5,499",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M32 12C32 12 18 28 18 38C18 45.73 24.27 52 32 52C39.73 52 46 45.73 46 38C46 28 32 12 32 12Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M26 36C26 36 29 44 38 44" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "acne-scar-treatment",
    title: "Acne Scar Treatment",
    desc: "Targeted resurfacing for smooth, clear skin",
    duration: "1 – 2 Hours",
    price: "₹9,499",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="32" cy="32" r="18" />
        <circle cx="26" cy="28" r="2" fill="currentColor" />
        <circle cx="38" cy="26" r="2" fill="currentColor" />
        <circle cx="32" cy="38" r="2" fill="currentColor" />
        <path d="M22 18L16 12M42 18L48 12" strokeLinecap="round" />
      </svg>
    ),
  },
];

const SPECIALISTS = [
  {
    id: "dr-ananya",
    name: "Dr. Ananya R.",
    role: "Founder & Lead Specialist",
    experience: "10+ Yrs Exp.",
    img: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    role: "PMU Specialist",
    experience: "6+ Yrs Exp.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "rahul-mehta",
    name: "Rahul Mehta",
    role: "Scalp & Men's Specialist",
    experience: "8+ Yrs Exp.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  },
];

const BASE_TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:30 PM",
  "02:00 PM",
  "03:30 PM",
  "05:00 PM",
  "06:30 PM",
  "07:30 PM",
];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Helper: parse slot string ("10:00 AM", "02:30 PM") into a Date object on the target day
const parseSlotToDate = (targetDate, slotStr) => {
  const [time, modifier] = slotStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);
  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  const d = new Date(targetDate);
  d.setHours(hours, minutes, 0, 0);
  return d;
};

export default function BookAppointment() {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  // Calendar View state (defaults to current month and year)
  const [currentViewDate, setCurrentViewDate] = useState(() => new Date());

  // Selected Date (defaults to today)
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });

  // Selected Time Slot
  const [selectedTime, setSelectedTime] = useState("");

  // Selections for Treatment & Specialist
  const [selectedTreatment, setSelectedTreatment] = useState("Combo Brows");
  const [selectedSpecialist, setSelectedSpecialist] = useState("Dr. Ananya R.");

  // Form Details
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    notes: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Calendar navigation: Prev Month
  const handlePrevMonth = () => {
    const newDate = new Date(currentViewDate.getFullYear(), currentViewDate.getMonth() - 1, 1);
    const now = new Date();
    if (newDate.getFullYear() < now.getFullYear() || (newDate.getFullYear() === now.getFullYear() && newDate.getMonth() < now.getMonth())) {
      return;
    }
    setCurrentViewDate(newDate);
  };

  // Calendar navigation: Next Month
  const handleNextMonth = () => {
    const newDate = new Date(currentViewDate.getFullYear(), currentViewDate.getMonth() + 1, 1);
    setCurrentViewDate(newDate);
  };

  // Build calendar matrix for currentViewDate
  const calendarDays = useMemo(() => {
    const year = currentViewDate.getFullYear();
    const month = currentViewDate.getMonth();

    const firstDayIndex = new Date(year, month, 1).getDay();
    const offset = (firstDayIndex + 6) % 7;
    const totalDays = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < offset; i++) {
      days.push({ empty: true });
    }

    for (let day = 1; day <= totalDays; day++) {
      const thisDate = new Date(year, month, day);
      thisDate.setHours(0, 0, 0, 0);
      const isPast = thisDate < today;
      const isSelected = selectedDate && thisDate.getTime() === selectedDate.getTime();
      const isToday = thisDate.getTime() === today.getTime();

      days.push({
        empty: false,
        dayNumber: day,
        dateObj: thisDate,
        isPast,
        isSelected,
        isToday,
      });
    }

    return days;
  }, [currentViewDate, selectedDate, today]);

  // Evaluate time slots: disable slots in the past if selectedDate is today
  const timeSlotsStatus = useMemo(() => {
    const now = new Date();
    const isSelectedToday = selectedDate && selectedDate.getTime() === today.getTime();

    return BASE_TIME_SLOTS.map((slot) => {
      if (!selectedDate) {
        return { time: slot, available: false, reason: "Select a date first" };
      }

      if (isSelectedToday) {
        const slotDate = parseSlotToDate(selectedDate, slot);
        const isPast = slotDate <= new Date(now.getTime() + 15 * 60 * 1000);
        return {
          time: slot,
          available: !isPast,
          reason: isPast ? "Slot has passed for today" : "Available",
        };
      }

      return { time: slot, available: true, reason: "Available" };
    });
  }, [selectedDate, today]);

  // Clear invalid slot if selected time passes
  useEffect(() => {
    if (selectedTime) {
      const currentSlot = timeSlotsStatus.find((s) => s.time === selectedTime);
      if (!currentSlot || !currentSlot.available) {
        setSelectedTime("");
      }
    }
  }, [selectedDate, timeSlotsStatus, selectedTime]);

  const isPrevMonthDisabled = useMemo(() => {
    const now = new Date();
    return (
      currentViewDate.getFullYear() === now.getFullYear() &&
      currentViewDate.getMonth() === now.getMonth()
    );
  }, [currentViewDate]);

  // Input Change Handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Comprehensive Form & Date/Time Validation
  const validateForm = () => {
    const errs = {};

    if (!selectedDate) {
      errs.date = "Please select an appointment date.";
      toast.error("Please pick a booking date.");
      return false;
    } else if (selectedDate < today) {
      errs.date = "Appointment date cannot be in the past.";
      toast.error("Selected date has already passed.");
      return false;
    }

    if (!selectedTime) {
      errs.time = "Please select a valid time slot.";
      toast.error("Please choose a valid time slot.");
      return false;
    } else {
      const selectedSlotDate = parseSlotToDate(selectedDate, selectedTime);
      if (selectedSlotDate < new Date()) {
        errs.time = "Selected time has already passed for today.";
        toast.error("Selected time slot has passed. Please pick a future time.");
        return false;
      }
    }

    if (!formData.fullName.trim()) {
      errs.fullName = "Full name is required.";
      toast.error("Please enter your full name.");
    } else if (formData.fullName.trim().length < 3) {
      errs.fullName = "Name must be at least 3 characters.";
      toast.error("Full name is too short.");
    }

    if (!formData.phone.trim()) {
      errs.phone = "Phone number is required.";
      toast.error("Please provide your 10-digit phone number.");
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      errs.phone = "Enter a valid 10-digit mobile number.";
      toast.error("Invalid phone number (10 digits required).");
    }

    if (!formData.email.trim()) {
      errs.email = "Email address is required.";
      toast.error("Please enter your email for confirmation.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address.";
      toast.error("Invalid email format.");
    }

    if (!formData.agreeTerms) {
      errs.agreeTerms = "You must agree to terms & privacy policy.";
      toast.warning("Please accept the terms and privacy policy.");
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Submit Booking
  const handleConfirmBooking = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    const toastId = toast.loading("Confirming your appointment...");

    const formattedDate = `${selectedDate.getDate()} ${MONTH_NAMES[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`;

    const bookingPayload = {
      fullName: formData.fullName,
      phone: `+91 ${formData.phone}`,
      email: formData.email,
      treatment: selectedTreatment,
      specialist: selectedSpecialist,
      date: formattedDate,
      time: selectedTime,
      notes: formData.notes || "None",
      submittedAt: new Date().toISOString(),
    };

    try {
      // 1. Save to Firebase Firestore
      await addDoc(collection(db, "appointments"), {
        ...bookingPayload,
        createdAt: serverTimestamp(),
      });

      // 2. Send email via FormSubmit.co
      await fetch("https://formsubmit.co/ajax/bharathdws98424@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `New Appointment Booking - ${formData.fullName}`,
          ...bookingPayload,
        }),
      });

      toast.update(toastId, {
        render: "Appointment booked successfully!",
        type: "success",
        isLoading: false,
        autoClose: 4000,
      });

      setIsSuccess(true);
    } catch (err) {
      console.error("Booking Error:", err);
      toast.update(toastId, {
        render: "Failed to confirm booking. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formattedSelectedDateText = selectedDate
    ? `${selectedDate.getDate()} ${MONTH_NAMES[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`
    : "Not Selected";

  return (
    <div className="appointment-page-wrapper">
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="appointment-layout-grid">
        
        {/* ============================================================
            LEFT COLUMN: SCROLLABLE SECTIONS (01, 02, 03)
        ============================================================ */}
        <div className="appointment-steps-scrollable">
          
          <div className="appointment-page-header">
            <span className="header-eyebrow">Bespoke Aesthetic Sanctuary</span>
            <h1 className="header-headline">
              Reserve Your <em>Signature</em> Ritual
            </h1>
            <p className="header-subtext">
              Select your customized treatment, preferred artist, and a date &amp;
              time that seamlessly aligns with your schedule.
            </p>
          </div>

          {/* --- SECTION 01: SELECT TREATMENT (10 Treatments) --- */}
          <div className="booking-card section-treatment">
            <div className="section-card-header">
              <span className="step-tag">Step 01</span>
              <h3 className="section-step-title">Select Treatment</h3>
            </div>

            <div className="treatments-grid">
              {TREATMENTS.map((item) => {
                const isSelected = selectedTreatment === item.title;
                return (
                  <div
                    key={item.id}
                    className={`treatment-card ${isSelected ? "selected" : ""}`}
                    onClick={() => {
                      setSelectedTreatment(item.title);
                      toast.info(`Selected: ${item.title}`, { autoClose: 1200 });
                    }}
                  >
                    {isSelected && (
                      <div className="selected-check-badge">
                        <span>✓</span>
                      </div>
                    )}
                    <div className="treatment-icon-circle">{item.icon}</div>
                    <h4 className="treatment-title">{item.title}</h4>
                    <p className="treatment-desc">{item.desc}</p>
                    <div className="treatment-meta-footer">
                      <span className="treatment-duration">{item.duration}</span>
                      <span className="treatment-price">{item.price}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* --- SECTION 02: CHOOSE YOUR SPECIALIST --- */}
          <div className="booking-card section-specialist">
            <div className="section-card-header">
              <span className="step-tag">Step 02</span>
              <h3 className="section-step-title">Choose Your Specialist</h3>
            </div>

            <div className="specialists-grid">
              {SPECIALISTS.map((spec) => {
                const isSelected = selectedSpecialist === spec.name;
                return (
                  <div
                    key={spec.id}
                    className={`specialist-card ${isSelected ? "selected" : ""}`}
                    onClick={() => {
                      setSelectedSpecialist(spec.name);
                      toast.info(`Specialist: ${spec.name}`, { autoClose: 1200 });
                    }}
                  >
                    <div className="specialist-avatar-wrap">
                      <img src={spec.img} alt={spec.name} className="specialist-img" />
                      {isSelected && (
                        <div className="specialist-check-badge">
                          <span>✓</span>
                        </div>
                      )}
                    </div>
                    <h4 className="specialist-name">{spec.name}</h4>
                    <p className="specialist-role">{spec.role}</p>
                    <span className="specialist-exp-badge">{spec.experience}</span>
                    <button type="button" className="view-profile-btn">
                      View Profile
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* --- SECTION 03: DATE & TIME --- */}
          <div className="booking-card section-datetime">
            <div className="section-card-header">
              <span className="step-tag">Step 03</span>
              <h3 className="section-step-title">Choose Date &amp; Time</h3>
            </div>

            <div className="datetime-split-wrapper">
              
              {/* Calendar */}
              <div className="calendar-widget">
                <div className="calendar-nav-header">
                  <button
                    type="button"
                    className="cal-nav-arrow"
                    onClick={handlePrevMonth}
                    disabled={isPrevMonthDisabled}
                    title={isPrevMonthDisabled ? "Cannot navigate to past months" : "Previous Month"}
                  >
                    &lt;
                  </button>
                  <span className="cal-month-title">
                    {MONTH_NAMES[currentViewDate.getMonth()]} {currentViewDate.getFullYear()}
                  </span>
                  <button
                    type="button"
                    className="cal-nav-arrow"
                    onClick={handleNextMonth}
                    title="Next Month"
                  >
                    &gt;
                  </button>
                </div>

                <div className="calendar-days-head">
                  <span>MON</span>
                  <span>TUE</span>
                  <span>WED</span>
                  <span>THU</span>
                  <span>FRI</span>
                  <span>SAT</span>
                  <span>SUN</span>
                </div>

                <div className="calendar-dates-grid">
                  {calendarDays.map((item, index) => {
                    if (item.empty) {
                      return <span key={`empty-${index}`} className="cal-date empty"></span>;
                    }

                    return (
                      <button
                        key={`day-${item.dayNumber}`}
                        type="button"
                        disabled={item.isPast}
                        className={`cal-date ${item.isSelected ? "selected" : ""} ${
                          item.isPast ? "past-date" : ""
                        } ${item.isToday ? "today-date" : ""}`}
                        onClick={() => {
                          if (!item.isPast) {
                            setSelectedDate(item.dateObj);
                            toast.info(
                              `Date: ${item.dayNumber} ${MONTH_NAMES[item.dateObj.getMonth()]} ${item.dateObj.getFullYear()}`,
                              { autoClose: 1000 }
                            );
                          }
                        }}
                      >
                        {item.dayNumber}
                      </button>
                    );
                  })}
                </div>
                <div className="calendar-footer-hint">
                  <span>* Past dates are automatically disabled</span>
                </div>
              </div>

              {/* Time Slots Widget */}
              <div className="timeslots-widget">
                <h4 className="timeslots-header-title">Available Time Slots</h4>
                <div className="timeslots-grid">
                  {timeSlotsStatus.map((slotObj, index) => {
                    const isSelected = selectedTime === slotObj.time;
                    const isAvailable = slotObj.available;

                    return (
                      <button
                        key={index}
                        type="button"
                        disabled={!isAvailable}
                        className={`time-slot-btn ${
                          !isAvailable ? "unavailable" : isSelected ? "selected" : ""
                        }`}
                        onClick={() => {
                          if (isAvailable) {
                            setSelectedTime(slotObj.time);
                            toast.info(`Time: ${slotObj.time}`, { autoClose: 1000 });
                          } else {
                            toast.warning(slotObj.reason);
                          }
                        }}
                      >
                        {slotObj.time}
                      </button>
                    );
                  })}
                </div>
                <span className="timeslots-note">
                  {selectedDate && selectedDate.getTime() === today.getTime()
                    ? "* Today's past time slots are disabled"
                    : "* Grayed out slots are unavailable"}
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* ============================================================
            RIGHT COLUMN: STICKY NON-SCROLLABLE FORM & SUMMARY
        ============================================================ */}
        <div className="appointment-sticky-column">
          <form
            className="booking-card details-form-card"
            onSubmit={handleConfirmBooking}
            noValidate
          >
            <div className="form-summary-header">
              <span className="summary-badge">Summary &amp; Checkout</span>
              <h3 className="details-header-title">Your Details</h3>
            </div>

            {/* Live Summary Pill Box */}
            <div className="booking-live-summary">
              <div className="summary-pill-item">
                <span className="summary-lbl">Treatment:</span>
                <span className="summary-val">{selectedTreatment}</span>
              </div>
              <div className="summary-pill-item">
                <span className="summary-lbl">Specialist:</span>
                <span className="summary-val">{selectedSpecialist}</span>
              </div>
              <div className="summary-pill-item">
                <span className="summary-lbl">Schedule:</span>
                <span className="summary-val">
                  {formattedSelectedDateText}{" "}
                  {selectedTime ? `at ${selectedTime}` : "(Pick time)"}
                </span>
              </div>
            </div>

            {/* Full Name */}
            <div className="form-input-group">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                name="fullName"
                placeholder="e.g. Aditi Singhania"
                value={formData.fullName}
                onChange={handleChange}
                className={`form-control-input ${errors.fullName ? "is-invalid" : ""}`}
              />
              {errors.fullName && <span className="error-text">{errors.fullName}</span>}
            </div>

            {/* Phone Number with +91 Prefix */}
            <div className="form-input-group">
              <label className="form-label">Phone Number *</label>
              <div className="phone-prefix-wrap">
                <span className="country-code-pill">+91</span>
                <input
                  type="tel"
                  name="phone"
                  placeholder="98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`form-control-input phone-field ${errors.phone ? "is-invalid" : ""}`}
                  maxLength={10}
                />
              </div>
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>

            {/* Email Address */}
            <div className="form-input-group">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                name="email"
                placeholder="aditi@example.com"
                value={formData.email}
                onChange={handleChange}
                className={`form-control-input ${errors.email ? "is-invalid" : ""}`}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            {/* Special Requests */}
            <div className="form-input-group">
              <label className="form-label">Special Requests (Optional)</label>
              <textarea
                name="notes"
                rows="2"
                placeholder="Tell us about sensitive skin, allergies..."
                value={formData.notes}
                onChange={handleChange}
                className="form-control-textarea"
              />
            </div>

            {/* Terms Checkbox */}
            <div className="form-checkbox-group">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                />
                <span className="custom-checkmark"></span>
                <span className="checkbox-label-text">
                  I agree to the <a href="#terms">terms of service</a> &amp;{" "}
                  <a href="#privacy">privacy policy</a>.
                </span>
              </label>
              {errors.agreeTerms && <span className="error-text">{errors.agreeTerms}</span>}
            </div>

            {/* Action Buttons */}
            <div className="form-actions-row">
              <button
                type="button"
                className="btn-back"
                onClick={() => window.history.back()}
              >
                Back
              </button>
              <button
                type="submit"
                className="btn-confirm-booking"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>Securing Suite...</span>
                ) : (
                  <>
                    <span>Confirm Booking</span>
                    <span className="btn-arrow">→</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

      </div>

      {/* ============================================================
          CONFIRMATION SUCCESS MODAL
      ============================================================ */}
      {isSuccess && (
        <div className="booking-modal-overlay">
          <div className="booking-modal-card">
            <div className="modal-success-icon">✓</div>
            <span className="modal-eyebrow">Booking Confirmed</span>
            <h3 className="modal-title">Your Sanctuary Awaits</h3>
            <p className="modal-desc">
              Thank you, <strong>{formData.fullName}</strong>. Your session for{" "}
              <strong>{selectedTreatment}</strong> with <strong>{selectedSpecialist}</strong> has been
              reserved for <strong>{formattedSelectedDateText} at {selectedTime}</strong>.
            </p>
            <div className="modal-ticket-details">
              <span>Appointment ID: #BRW-{Math.floor(100000 + Math.random() * 900000)}</span>
              <span>Location: Browlicious Studio, Chennai</span>
            </div>
            <p className="modal-sub">
              A confirmation receipt and calendar invite have been dispatched to{" "}
              <strong>{formData.email}</strong>.
            </p>
            <button
              className="btn-modal-close"
              onClick={() => {
                setIsSuccess(false);
                setFormData({ fullName: "", phone: "", email: "", notes: "", agreeTerms: false });
                window.location.href = "/";
              }}
            >
              Return to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
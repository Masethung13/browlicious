import React, { useEffect, useRef } from "react";
import "../styles/GlobalElasticCursor.css";

export default function GlobalElasticCursor({ isDarkMode = false }) {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    // Check for touch devices or reduced motion preference
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouch || reducedMotion) return;

    const pointer = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    const previousPointer = { x: pointer.x, y: pointer.y };
    const dot = { x: pointer.x, y: pointer.y };
    const ring = {
      x: pointer.x,
      y: pointer.y,
      width: 36,
      height: 36,
      radius: 50,
    };

    let pointerSpeed = 0;
    let movementAngle = 0;
    let animationFrameId;

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    const handlePointerMove = (event) => {
      previousPointer.x = pointer.x;
      previousPointer.y = pointer.y;

      pointer.x = event.clientX;
      pointer.y = event.clientY;

      const dx = pointer.x - previousPointer.x;
      const dy = pointer.y - previousPointer.y;

      pointerSpeed = Math.hypot(dx, dy);
      movementAngle = Math.atan2(dy, dx);

      if (cursorRef.current && cursorRef.current.style.opacity !== "1") {
        cursorRef.current.style.opacity = "1";
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "0";
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "1";
    };

    const handleMouseDown = () => {
      cursorRef.current?.classList.add("is-clicking");
    };

    const handleMouseUp = () => {
      cursorRef.current?.classList.remove("is-clicking");
    };

    const animateCursor = () => {
      // 1. Inner dot follows pointer fast and crisp
      dot.x += (pointer.x - dot.x) * 0.4;
      dot.y += (pointer.y - dot.y) * 0.4;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dot.x}px, ${dot.y}px) translate(-50%, -50%)`;
      }

      // Constant cursor shape - smooth elastic trail without hover morphing
      const targetX = pointer.x;
      const targetY = pointer.y;
      const targetWidth = 36;
      const targetHeight = 36;
      const targetRadius = 50;

      // 2. Ring Follows & Interpolates smoothly
      ring.x += (targetX - ring.x) * 0.15;
      ring.y += (targetY - ring.y) * 0.15;
      ring.width = targetWidth;
      ring.height = targetHeight;
      ring.radius = targetRadius;

      // 3. Elastic Stretch along velocity vector
      const speedEnergy = clamp(pointerSpeed / 35, 0, 1);
      const stretchX = 1 + speedEnergy * 0.38;
      const stretchY = 1 - speedEnergy * 0.14;

      if (ringRef.current) {
        ringRef.current.style.width = `${ring.width}px`;
        ringRef.current.style.height = `${ring.height}px`;
        ringRef.current.style.borderRadius = `${ring.radius}%`;
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px) translate(-50%, -50%) rotate(${movementAngle}rad) scale(${stretchX}, ${stretchY})`;
      }

      pointerSpeed *= 0.82;
      animationFrameId = requestAnimationFrame(animateCursor);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    animationFrameId = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className={`global-elastic-cursor ${isDarkMode ? "dark-theme" : "light-theme"}`}
      ref={cursorRef}
      aria-hidden="true"
    >
      <div className="global-cursor__ring" ref={ringRef}></div>
      <div className="global-cursor__dot" ref={dotRef}></div>
    </div>
  );
}

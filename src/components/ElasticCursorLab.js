import React, { useEffect, useRef } from "react";
import "../styles/ElasticCursorLab.css";

export default function ElasticCursorLab() {
  // DOM References
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  // Monitor DOM References for lag-free 60fps HUD updates
  const targetValRef = useRef(null);
  const distanceValRef = useRef(null);
  const stretchXValRef = useRef(null);
  const stretchYValRef = useRef(null);
  const magnetValRef = useRef(null);
  const magnetLabelRef = useRef(null);
  const magnetBarRef = useRef(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) return;

    const pointer = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    const previousPointer = { x: pointer.x, y: pointer.y };
    const dot = { x: pointer.x, y: pointer.y };
    const ring = {
      x: pointer.x,
      y: pointer.y,
      width: 38,
      height: 38,
      radius: 50,
    };

    let pointerSpeed = 0;
    let movementAngle = 0;
    let animationFrameId;

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    const updateMonitor = (stretchX, stretchY) => {
      if (!targetValRef.current) return;

      targetValRef.current.textContent = "Fluid Follow";
      if (distanceValRef.current) distanceValRef.current.textContent = "0";
      if (stretchXValRef.current) stretchXValRef.current.textContent = `${stretchX.toFixed(2)}×`;
      if (stretchYValRef.current) stretchYValRef.current.textContent = `${stretchY.toFixed(2)}×`;

      if (magnetValRef.current) magnetValRef.current.textContent = "0";
      if (magnetBarRef.current) magnetBarRef.current.style.width = "0%";
      if (magnetLabelRef.current) magnetLabelRef.current.textContent = "Smooth";
    };

    const handlePointerMove = (event) => {
      previousPointer.x = pointer.x;
      previousPointer.y = pointer.y;

      pointer.x = event.clientX;
      pointer.y = event.clientY;

      const dx = pointer.x - previousPointer.x;
      const dy = pointer.y - previousPointer.y;

      pointerSpeed = Math.hypot(dx, dy);
      movementAngle = Math.atan2(dy, dx);
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "0";
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "1";
    };

    const animateCursor = () => {
      // 1. Inner dot follows quickly
      dot.x += (pointer.x - dot.x) * 0.35;
      dot.y += (pointer.y - dot.y) * 0.35;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dot.x}px, ${dot.y}px) translate(-50%, -50%)`;
      }

      // Constant cursor shape - no hover shape change or magnetic morphing
      const targetX = pointer.x;
      const targetY = pointer.y;
      const targetWidth = 38;
      const targetHeight = 38;
      const targetRadius = 50;

      // 2. Ring Follows & Interpolates smoothly
      ring.x += (targetX - ring.x) * 0.14;
      ring.y += (targetY - ring.y) * 0.14;
      ring.width = targetWidth;
      ring.height = targetHeight;
      ring.radius = targetRadius;

      // 3. Elastic Stretch calculation based on movement speed
      const speedEnergy = clamp(pointerSpeed / 40, 0, 1);
      const stretchX = 1 + speedEnergy * 0.45;
      const stretchY = 1 - speedEnergy * 0.16;

      if (ringRef.current) {
        ringRef.current.style.width = `${ring.width}px`;
        ringRef.current.style.height = `${ring.height}px`;
        ringRef.current.style.borderRadius = `${ring.radius}%`;
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px) translate(-50%, -50%) rotate(${movementAngle}rad) scale(${stretchX}, ${stretchY})`;
      }

      updateMonitor(stretchX, stretchY);

      pointerSpeed *= 0.82;
      animationFrameId = requestAnimationFrame(animateCursor);
    };

    window.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    animationFrameId = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="elastic-lab-root">
      {/* Background Ambients */}
      <div className="ambient ambient--one" aria-hidden="true"></div>
      <div className="ambient ambient--two" aria-hidden="true"></div>

      {/* Custom Cursor */}
      <div className="cursor" ref={cursorRef} aria-hidden="true">
        <div className="cursor__ring" ref={ringRef}></div>
        <div className="cursor__dot" ref={dotRef}></div>
      </div>

      {/* Header */}
      <header className="header">
        <a className="brand magnetic-target" href="#home">
          <span className="brand__icon">◎</span>
          <span className="brand__text">
            <strong>Elastic Cursor Lab</strong>
            <small>Magnetic Pointer Study</small>
          </span>
        </a>

        <nav className="nav">
          <a className="magnetic-target" href="#playground">Playground</a>
          <a className="magnetic-target" href="#examples">Examples</a>
          <a className="magnetic-target" href="#tutorial">Tutorial</a>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="hero" id="home">
          <div className="hero__content">
            <div className="label">Interactive CSS + JavaScript Tutorial</div>
            <h1>
              Make the cursor <span>feel elastic.</span>
            </h1>
            <p>
              The inner dot follows the pointer directly while the outer ring
              trails behind. Near interactive elements, the ring stretches toward
              the target and morphs into its shape.
            </p>

            <div className="hero__actions">
              <a className="button button--primary magnetic-target" href="#playground">
                Try the Cursor <span>↓</span>
              </a>
              <button className="button button--secondary magnetic-target" type="button">
                Hover Me
              </button>
            </div>
          </div>

          <div className="hero__visual">
            <div className="hero-pointer">
              <div className="hero-pointer__ring"></div>
              <div className="hero-pointer__dot"></div>
            </div>
            <div className="hero-target">Magnetic Target</div>
            <span className="hero__visual-label">Cursor → Target</span>
          </div>
        </section>

        {/* Playground Section */}
        <section className="playground" id="playground">
          <div className="section-heading">
            <div>
              <span className="section-heading__label">Interactive Playground</span>
              <h2>Move between the targets.</h2>
            </div>
            <p>
              Approach the buttons and links slowly. The cursor ring detects the
              nearest interactive element and begins stretching toward its center.
            </p>
          </div>

          <div className="lab">
            <div className="lab__stage">
              <div className="stage-grid"></div>

              <div className="stage-content">
                <span>Magnetic Interface</span>
                <h3>
                  Move closer. <strong>Feel the pull.</strong>
                </h3>
                <p>Different target sizes create different cursor shapes.</p>

                <div className="stage-actions">
                  <button className="target-button target-button--primary magnetic-target" type="button">
                    Launch Project
                  </button>
                  <button className="target-button magnetic-target" type="button">
                    View Details
                  </button>
                </div>

                <div className="stage-links">
                  <a className="magnetic-target" href="#about">About</a>
                  <a className="magnetic-target" href="#archive">Archive</a>
                  <a className="magnetic-target" href="#contact">Contact</a>
                </div>
              </div>

              <div className="stage-card magnetic-target">
                <span>Card Target</span>
                <strong>03</strong>
              </div>
            </div>

            {/* Monitor HUD */}
            <aside className="monitor">
              <div className="monitor__header">
                <span>Cursor Monitor</span>
                <span className="monitor__status">
                  <i></i> Live
                </span>
              </div>

              <div className="monitor__main">
                <span>Active Target</span>
                <strong ref={targetValRef}>None</strong>
              </div>

              <div className="monitor__row">
                <span>Distance</span>
                <strong>
                  <span ref={distanceValRef}>0</span>
                  <small>px</small>
                </strong>
              </div>

              <div className="monitor__row">
                <span>Stretch X</span>
                <strong ref={stretchXValRef}>1.00×</strong>
              </div>

              <div className="monitor__row">
                <span>Stretch Y</span>
                <strong ref={stretchYValRef}>1.00×</strong>
              </div>

              <div className="monitor__row">
                <span>Magnetism</span>
                <strong>
                  <span ref={magnetValRef}>0</span>%
                </strong>
              </div>

              <div className="magnet-meter">
                <div className="magnet-meter__top">
                  <span>Target Influence</span>
                  <strong ref={magnetLabelRef}>Idle</strong>
                </div>
                <div className="magnet-meter__track">
                  <span ref={magnetBarRef}></span>
                </div>
              </div>

              <p className="monitor__note">
                The inner dot stays close to the real pointer. Only the outer ring
                receives magnetic attraction and shape morphing.
              </p>
            </aside>
          </div>
        </section>

        {/* Examples Section */}
        <section className="examples" id="examples">
          <div className="section-heading">
            <div>
              <span className="section-heading__label">Target Types</span>
              <h2>One cursor. Different morphs.</h2>
            </div>
            <p>
              The same cursor can adapt to compact links, large buttons and cards
              by reading the target's bounding rectangle.
            </p>
          </div>

          <div className="example-grid">
            <article className="example-card">
              <div className="example-card__top">
                <span>01</span>
                <span>Text Link</span>
              </div>
              <div className="example-card__demo">
                <a className="demo-link magnetic-target" href="#discover">
                  Discover
                </a>
              </div>
              <h3>Compact Morph</h3>
              <p>Small links create a tight pill around the label.</p>
            </article>

            <article className="example-card">
              <div className="example-card__top">
                <span>02</span>
                <span>Button</span>
              </div>
              <div className="example-card__demo">
                <button className="demo-button magnetic-target" type="button">
                  Continue
                </button>
              </div>
              <h3>Button Morph</h3>
              <p>The ring expands to follow the button dimensions and radius.</p>
            </article>

            <article className="example-card">
              <div className="example-card__top">
                <span>03</span>
                <span>Card</span>
              </div>
              <div className="example-card__demo">
                <div className="demo-tile magnetic-target">
                  <span>Interactive</span>
                  <strong>Tile</strong>
                </div>
              </div>
              <h3>Surface Morph</h3>
              <p>Larger targets create a subtle outline around the entire surface.</p>
            </article>
          </div>
        </section>

        {/* Mechanics Section */}
        <section className="mechanics">
          <div className="section-heading">
            <div>
              <span className="section-heading__label">Cursor Mechanics</span>
              <h2>Two objects. Two behaviors.</h2>
            </div>
            <p>
              Separating the dot from the ring is what makes the cursor feel elastic
              instead of simply delayed.
            </p>
          </div>

          <div className="mechanics-grid">
            <article className="mechanics-card">
              <div className="mechanics-card__visual">
                <span className="mechanics-dot"></span>
              </div>
              <span className="mechanics-card__number">01</span>
              <h3>Inner Dot</h3>
              <p>Tracks the real pointer quickly and preserves precise cursor feedback.</p>
              <code>dot += (pointer - dot) × .35</code>
            </article>

            <article className="mechanics-card">
              <div className="mechanics-card__visual">
                <span className="mechanics-ring"></span>
              </div>
              <span className="mechanics-card__number">02</span>
              <h3>Outer Ring</h3>
              <p>Uses slower interpolation so it visibly trails behind movement.</p>
              <code>ring += (target - ring) × .14</code>
            </article>

            <article className="mechanics-card">
              <div className="mechanics-card__visual mechanics-card__visual--stretch">
                <span></span>
                <i></i>
              </div>
              <span className="mechanics-card__number">03</span>
              <h3>Elastic Stretch</h3>
              <p>Cursor velocity stretches the ring along its current movement angle.</p>
              <code>scaleX = 1 + speed × .001</code>
            </article>
          </div>
        </section>

        {/* Tutorial Section */}
        <section className="tutorial" id="tutorial">
          <div className="section-heading">
            <div>
              <span className="section-heading__label">How It Works</span>
              <h2>Four interaction layers.</h2>
            </div>
            <p>
              Smooth interpolation, velocity, proximity and target bounds combine
              to create the final elastic cursor.
            </p>
          </div>

          <div className="tutorial-grid">
            <article className="tutorial-card">
              <span className="tutorial-card__number">01</span>
              <div>
                <h3>Track the pointer</h3>
                <p>Store the latest client coordinates from pointer movement.</p>
                <pre><code>{`pointer.x = event.clientX;\npointer.y = event.clientY;`}</code></pre>
              </div>
            </article>

            <article className="tutorial-card">
              <span className="tutorial-card__number">02</span>
              <div>
                <h3>Interpolate the ring</h3>
                <p>Move only part of the remaining distance each animation frame.</p>
                <pre><code>{`ring.x +=\n  (targetX - ring.x)\n  * 0.14;`}</code></pre>
              </div>
            </article>

            <article className="tutorial-card">
              <span className="tutorial-card__number">03</span>
              <div>
                <h3>Find target proximity</h3>
                <p>Measure cursor distance from the center of every interactive target.</p>
                <pre><code>{`distance =\n  Math.hypot(\n    pointer.x - centerX,\n    pointer.y - centerY\n  );`}</code></pre>
              </div>
            </article>

            <article className="tutorial-card">
              <span className="tutorial-card__number">04</span>
              <div>
                <h3>Morph to the target</h3>
                <p>When close enough, transition ring dimensions toward the target rectangle.</p>
                <pre><code>{`width =\n  target.width + 16;\n\nheight =\n  target.height + 16;`}</code></pre>
              </div>
            </article>
          </div>
        </section>

        {/* Formula Section */}
        <section className="formula">
          <div className="formula__copy">
            <span className="formula__label">Core Principle</span>
            <h2>
              Pointer position + <span>target attraction.</span>
            </h2>
            <p>
              The ring usually follows the pointer, but proximity shifts its
              target position toward the nearest interactive element.
            </p>
          </div>

          <div className="formula__code">
            <div>
              <span>follow</span>
              <code>ring → pointer</code>
            </div>
            <div>
              <span>magnet</span>
              <code>pointer → target center</code>
            </div>
            <div>
              <span>morph</span>
              <code>ring size → target bounds</code>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <span>Elastic Cursor Tutorial</span>
        <span className="footer__center">Follow • Stretch • Magnetism</span>
        <a
          href="https://www.ashishranjan.net"
          target="_blank"
          rel="noopener noreferrer"
          className="magnetic-target"
        >
          Built by Ashish Ranjan
        </a>
      </footer>
    </div>
  );
}
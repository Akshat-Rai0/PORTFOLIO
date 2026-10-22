import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Nav from "./Nav.jsx";
import VantaBackground from "./VantaBackground.jsx";
import { site } from "../data/site.js";
import { useIsMobile } from "../hooks/useIsMobile.js";
import { useReducedMotion } from "../hooks/useReducedMotion.js";
import styles from "./Hero.module.css";

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

export default function Hero() {
  const heroRef = useRef(null);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile(768);
  const [webgl, setWebgl] = useState(() => hasWebGL());
  const fallback = reduced || isMobile || !webgl;
  const [vantaOn, setVantaOn] = useState(true);

  useEffect(() => {
    setWebgl(hasWebGL());
  }, []);

  useGSAP(
    () => {
      const content = heroRef.current.querySelectorAll("[data-hero-item]");
      if (reduced) {
        gsap.set(content, { opacity: 1, y: 0 });
      } else {
        gsap.fromTo(
          content,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.1 }
        );
      }

      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => setVantaOn(true),
        onEnterBack: () => setVantaOn(true),
        onLeave: () => setVantaOn(false),
        onLeaveBack: () => setVantaOn(false)
      });
    },
    { scope: heroRef, dependencies: [reduced] }
  );

  return (
    <section id="top" ref={heroRef} className={styles.hero} aria-label="Introduction">
      <VantaBackground active={vantaOn && !fallback} fallback={fallback} />
      <Nav />
      <div className={styles.content}>
        <p className={styles.kicker} data-hero-item>
          // agentic AI engineer in the making
        </p>
        <h1 data-hero-item>
          Hi, I'm
          <br />
          {site.name}
          <span className={styles.period}>.</span>
        </h1>
        <p className={styles.sub} data-hero-item>
          Third-year B.Tech student in {site.branch} at {site.college}, building agents that plan,
          execute and retrieve.
        </p>
        <div className={styles.actions} data-hero-item>
          <a
            className={styles.primary}
            href="#work"
            onClick={(event) => {
              const work = document.getElementById("work");
              if (!work) return;
              event.preventDefault();
              if (reduced) work.scrollIntoView();
              else gsap.to(window, { duration: 0.85, ease: "power3.inOut", scrollTo: { y: work, autoKill: true } });
            }}
          >
            See my projects
          </a>
          <a className={styles.github} href={site.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          {site.resumeUrl ? (
            <a className={styles.resume} href={site.resumeUrl} target="_blank" rel="noopener noreferrer">
              Resume ↗
            </a>
          ) : (
            <span className={styles.resumeDisabled} title="TODO: add resumeUrl in src/data/site.js">
              Resume ↗
            </span>
          )}
        </div>
      </div>
      <p className={styles.scroll} data-hero-item>
        scroll ↓
      </p>
    </section>
  );
}

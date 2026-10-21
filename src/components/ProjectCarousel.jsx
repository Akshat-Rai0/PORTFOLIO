import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import ProjectCard from "./ProjectCard.jsx";
import { mapProjectsToFlexItems } from "../data/projects.js";
import { useIsMobile } from "../hooks/useIsMobile.js";
import { useReducedMotion } from "../hooks/useReducedMotion.js";
import styles from "./ProjectCarousel.module.css";

const FlexCarousel = lazy(() => import("../vendor/FlexCarousel/FlexCarousel.jsx"));

function wrapIndex(index, length) {
  return ((index % length) + length) % length;
}

function hasWebGL2() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2"));
  } catch {
    return false;
  }
}

function Caption({ project, index, total }) {
  const current = String(index + 1).padStart(2, "0");
  const count = String(total).padStart(2, "0");
  return (
    <div className={styles.caption}>
      <p className={styles.captionTitle}>{project.title}</p>
      <p className={styles.counter}>
        {current} / {count}
      </p>
      {project.pagesUrl ? (
        <a className={styles.liveLink} href={project.pagesUrl} target="_blank" rel="noopener noreferrer">
          Open on GitHub Pages →
        </a>
      ) : (
        <span className={styles.soon}>Coming soon</span>
      )}
    </div>
  );
}

function DomStage({ projects, index, setIndex, reduced, stageRef }) {
  const slots = [-2, -1, 0, 1, 2];
  const total = projects.length;
  return (
    <div className={styles.row}>
      {slots.map((slot) => {
        const projectIndex = wrapIndex(index + slot, total);
        const project = projects[projectIndex];
        return (
          <ProjectCard
            key={`${project.id}-${slot}`}
            project={project}
            index={projectIndex}
            slot={slot}
            total={total}
            playVideo={slot === 0}
            reducedMotion={reduced}
          />
        );
      })}
    </div>
  );
}

function FlexStage({ projects, index, setIndex, reduced }) {
  const items = useMemo(() => mapProjectsToFlexItems(projects), [projects]);
  const project = projects[index];
  const showVideo = Boolean(project.video) && !reduced;

  return (
    <div className={styles.flexWrap}>
      <FlexCarousel
        items={items}
        preset="liquid"
        intro="none"
        fit="portrait"
        captions={false}
        captureWheel
        focusOnClick={false}
        autoplay={false}
        cardHeight={0.68}
        gap={24}
        radius={28}
        onChange={(next) => setIndex(next)}
      />
      {showVideo ? (
        <video
          key={project.id}
          className={styles.centerVideo}
          src={project.video}
          poster={project.poster || undefined}
          muted
          loop
          playsInline
          autoPlay
        />
      ) : null}
    </div>
  );
}

export default function ProjectCarousel({ projects }) {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile(768);
  const stageRef = useRef(null);
  const dragRef = useRef({ active: false, x: 0 });
  const [index, setIndex] = useState(0);
  const [useFlex, setUseFlex] = useState(false);
  const total = projects.length;
  const project = projects[index] || projects[0];

  useEffect(() => {
    if (reduced || isMobile) {
      setUseFlex(false);
      return;
    }
    setUseFlex(hasWebGL2());
  }, [reduced, isMobile]);

  const go = (delta) => {
    if (useFlex) {
      const host = stageRef.current?.querySelector(".flex-carousel");
      if (host) {
        host.focus();
        host.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: delta > 0 ? "ArrowRight" : "ArrowLeft",
            bubbles: true
          })
        );
        return;
      }
    }
    setIndex((current) => wrapIndex(current + delta, total));
  };

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || useFlex) return undefined;
    let wheelLock = 0;

    const onKey = (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(-1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        go(1);
      }
    };

    const onWheel = (event) => {
      const horizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY);
      const delta = horizontal ? event.deltaX : event.deltaY;
      if (!horizontal && Math.abs(event.deltaY) < 40) return;
      event.preventDefault();
      const now = Date.now();
      if (now - wheelLock < 420) return;
      if (Math.abs(delta) < 12) return;
      wheelLock = now;
      go(delta > 0 ? 1 : -1);
    };

    const onPointerDown = (event) => {
      dragRef.current = { active: true, x: event.clientX };
    };
    const onPointerUp = (event) => {
      if (!dragRef.current.active) return;
      const dx = event.clientX - dragRef.current.x;
      dragRef.current.active = false;
      if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    };

    stage.addEventListener("keydown", onKey);
    stage.addEventListener("wheel", onWheel, { passive: false });
    stage.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      stage.removeEventListener("keydown", onKey);
      stage.removeEventListener("wheel", onWheel);
      stage.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [total, useFlex]);

  return (
    <div>
      <div ref={stageRef} className={styles.stage} tabIndex={0} aria-label="Selected work carousel">
        {useFlex ? (
          <Suspense fallback={<DomStage projects={projects} index={index} setIndex={setIndex} reduced={reduced} />}>
            <FlexStage projects={projects} index={index} setIndex={setIndex} reduced={reduced} />
          </Suspense>
        ) : (
          <DomStage projects={projects} index={index} setIndex={setIndex} reduced={reduced} />
        )}
        <button className={`${styles.ctrl} ${styles.prev}`} type="button" aria-label="Previous project" onClick={() => go(-1)}>
          ‹
        </button>
        <button className={`${styles.ctrl} ${styles.next}`} type="button" aria-label="Next project" onClick={() => go(1)}>
          ›
        </button>
      </div>
      <div className={styles.live} aria-live="polite">
        {project.title}, {index + 1} of {total}
      </div>
      <Caption project={project} index={index} total={total} />
    </div>
  );
}

import { useEffect, useRef } from "react";
import styles from "./ProjectCard.module.css";

function PlayIcon() {
  return (
    <svg className={styles.play} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10 8.5v7l6-3.5z" fill="currentColor" />
    </svg>
  );
}

export default function ProjectCard({ project, index, slot, total, playVideo, reducedMotion }) {
  const videoRef = useRef(null);
  const number = String(index + 1).padStart(2, "0");
  const glow = index % 2 === 0 ? "red" : "teal";
  const isCenter = slot === 0;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    const play = () => {
      const attempt = video.play();
      if (attempt && typeof attempt.catch === "function") attempt.catch(() => {});
    };
    play();
    return () => {
      video.pause();
    };
  }, [playVideo, project.id]);

  return (
    <article
      className={`${styles.card} ${styles[`slot${slot < 0 ? `M${Math.abs(slot)}` : slot}`]} ${isCenter ? styles.center : ""}`}
      data-glow={glow}
      aria-hidden={!isCenter}
    >
      <div className={styles.media}>
        {playVideo && project.video && !reducedMotion ? (
          <video
            ref={videoRef}
            className={styles.video}
            src={project.video}
            poster={project.poster || undefined}
            muted
            loop
            playsInline
            autoPlay
          />
        ) : project.poster ? (
          <img className={styles.poster} src={project.poster} alt="" />
        ) : null}
      </div>
      <p className={styles.meta}>
        {number} · {project.tag}
      </p>
      <div className={styles.bottom}>
        <h3 className={styles.title}>{project.title}</h3>
        {isCenter ? <PlayIcon /> : null}
      </div>
    </article>
  );
}

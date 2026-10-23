import ProjectCarousel from "./ProjectCarousel.jsx";
import { projects } from "../data/projects.js";
import styles from "./Work.module.css";

export default function Work() {
  return (
    <section id="work" className={`${styles.work}`}>
      <div className={`reveal ${styles.head}`}>
        <p className="section-label">03 / Selected work</p>
        <p className={styles.hint}>drag, scroll or use the arrows</p>
      </div>
      <div className="reveal">
        <ProjectCarousel projects={projects} />
      </div>
    </section>
  );
}

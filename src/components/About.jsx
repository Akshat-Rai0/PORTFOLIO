import AgentTrace from "./AgentTrace.jsx";
import { projects } from "../data/projects.js";
import styles from "./About.module.css";

export default function About() {
  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className={`about-reveal ${styles.left}`}>
        <p className="section-label">01 / About</p>
        <p className={styles.note}>Instead of a paragraph, an agent introduces me.</p>
      </div>
      <div className="about-reveal">
        <AgentTrace projectCount={projects.length} />
      </div>
    </section>
  );
}

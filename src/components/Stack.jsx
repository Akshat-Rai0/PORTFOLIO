import SkillRow from "./SkillRow.jsx";
import { skillRows } from "../data/skills.js";
import styles from "./Stack.module.css";

export default function Stack() {
  return (
    <section id="stack" className={`section ${styles.stack}`}>
      <p className="section-label reveal">02 / Stack</p>
      <div className="reveal">
        {skillRows.map((row) => (
          <SkillRow key={row.id} row={row} />
        ))}
      </div>
    </section>
  );
}

import SkillTile from "./SkillTile.jsx";
import { useReducedMotion } from "../hooks/useReducedMotion.js";
import styles from "./SkillRow.module.css";

export default function SkillRow({ row }) {
  const reduced = useReducedMotion();
  const loop = [...row.skills, ...row.skills];

  return (
    <div className={styles.block}>
      <div className={styles.caption}>
        <span>{row.label}</span>
        <span aria-hidden="true">{row.direction}</span>
      </div>
      <div className={`${styles.window} ${reduced ? styles.static : ""}`}>
        <div
          className={`${styles.track} ${row.reverse ? styles.reverse : ""}`}
          style={{ animationDuration: row.duration }}
        >
          {(reduced ? row.skills : loop).map((skill, index) => (
            <SkillTile key={`${skill.id}-${index}`} skill={skill} accent={row.accent} />
          ))}
        </div>
        <span className={`${styles.fade} ${styles.left}`} aria-hidden="true" />
        <span className={`${styles.fade} ${styles.right}`} aria-hidden="true" />
      </div>
    </div>
  );
}

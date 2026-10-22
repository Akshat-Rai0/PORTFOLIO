import { getSimpleIcon } from "../data/icons.js";
import styles from "./SkillTile.module.css";

export default function SkillTile({ skill, accent }) {
  const icon = getSimpleIcon(skill.icon);

  return (
    <div className={`${styles.tile} ${accent === "red" ? styles.lead : ""}`}>
      <span className={styles.icon} aria-hidden="true">
        {icon ? (
          <svg viewBox="0 0 24 24" role="img">
            <path d={icon.path} />
          </svg>
        ) : (
          <span className={styles.mono}>{skill.mono}</span>
        )}
      </span>
      <span className={styles.name}>{skill.name}</span>
    </div>
  );
}

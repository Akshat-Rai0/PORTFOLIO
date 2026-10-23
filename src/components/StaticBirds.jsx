import styles from "./StaticBirds.module.css";

const birds = [
  { x: 12, y: 24, r: 12, c: "red" },
  { x: 34, y: 52, r: -8, c: "teal" },
  { x: 61, y: 27, r: 20, c: "teal" },
  { x: 84, y: 67, r: -18, c: "red" },
  { x: 21, y: 78, r: 8, c: "teal" },
  { x: 76, y: 16, r: -6, c: "red" }
];

export default function StaticBirds() {
  return (
    <svg className={styles.svg} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {birds.map((bird, index) => (
        <g key={index} transform={`translate(${bird.x} ${bird.y}) rotate(${bird.r})`}>
          <path
            d="M-1.6 0 L1.8 -1.1 L0.2 0 L1.8 1.1 Z"
            fill="none"
            stroke={bird.c === "red" ? "#ed0000" : "#00e88b"}
            strokeWidth="0.35"
            strokeLinejoin="round"
          />
        </g>
      ))}
    </svg>
  );
}

import styles from "./StaticBirds.module.css";

const birds = [
  { x: 8, y: 18, r: 12, c: "red" },
  { x: 18, y: 42, r: -8, c: "teal" },
  { x: 28, y: 22, r: 20, c: "teal" },
  { x: 38, y: 58, r: -18, c: "red" },
  { x: 48, y: 30, r: 6, c: "red" },
  { x: 58, y: 16, r: 24, c: "teal" },
  { x: 68, y: 48, r: -10, c: "red" },
  { x: 78, y: 28, r: 14, c: "teal" },
  { x: 88, y: 62, r: -22, c: "red" },
  { x: 12, y: 72, r: 8, c: "teal" },
  { x: 72, y: 72, r: -6, c: "red" },
  { x: 42, y: 78, r: 16, c: "teal" },
  { x: 92, y: 38, r: 4, c: "red" },
  { x: 22, y: 58, r: -14, c: "teal" },
  { x: 62, y: 38, r: 10, c: "red" },
  { x: 84, y: 12, r: -4, c: "teal" }
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

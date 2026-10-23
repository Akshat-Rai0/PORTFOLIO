import { useEffect, useRef } from "react";
import StaticBirds from "./StaticBirds.jsx";
import styles from "./VantaBackground.module.css";

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

export default function VantaBackground({ active, fallback }) {
  const elRef = useRef(null);

  useEffect(() => {
    if (fallback || !active) return undefined;
    if (!hasWebGL()) return undefined;

    const el = elRef.current;
    let effect;
    let cancelled = false;

    (async () => {
      const [{ default: BIRDS }, THREE] = await Promise.all([
        import("vanta/dist/vanta.birds.min"),
        import("three")
      ]);
      if (cancelled || !el || el.dataset.vantaReady === "1") return;
      el.dataset.vantaReady = "1";
      effect = BIRDS({
        el,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        backgroundColor: 0x000000,
        color1: 0xed0000,
        color2: 0x00e88b,
        birdSize: 1.35,
        wingSpan: 28.0,
        speedLimit: 7.0,
        separation: 80.0,
        alignment: 65.0,
        cohesion: 70.0
      });
      if (cancelled && effect) {
        effect.destroy();
        delete el.dataset.vantaReady;
      }
    })();

    return () => {
      cancelled = true;
      delete el?.dataset.vantaReady;
      if (effect) {
        effect.destroy();
        effect = undefined;
      }
    };
  }, [active, fallback]);

  return (
    <div ref={elRef} className={styles.layer} aria-hidden="true">
      {fallback || !active ? <StaticBirds /> : null}
    </div>
  );
}

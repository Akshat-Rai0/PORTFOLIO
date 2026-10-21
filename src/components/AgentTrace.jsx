import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TextPlugin } from "gsap/TextPlugin";
import { useReducedMotion } from "../hooks/useReducedMotion.js";
import styles from "./AgentTrace.module.css";

gsap.registerPlugin(TextPlugin);

export default function AgentTrace({ projectCount }) {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();
  const resultText = `Akshat · BIT Mesra · class of 2028 · builds LLM agents that plan, execute and retrieve.`;

  useGSAP(
    () => {
      const root = rootRef.current;
      const command = root.querySelector("[data-line='command'] .rest");
      const plans = root.querySelectorAll("[data-kind='plan']");
      const executes = root.querySelectorAll("[data-kind='execute']");
      const checks = root.querySelectorAll("[data-check]");
      const result = root.querySelector("[data-kind='result']");
      const resultCopy = root.querySelector("[data-result-text]");
      const cursor = root.querySelector("[data-cursor]");

      if (reduced) {
        gsap.set([command.parentElement, ...plans, ...executes, result, cursor], {
          opacity: 1,
          y: 0,
          visibility: "visible"
        });
        gsap.set(checks, { scale: 1, opacity: 1 });
        resultCopy.textContent = resultText;
        return;
      }

      gsap.set([command.parentElement, ...plans, ...executes, result], {
        opacity: 0,
        y: 6,
        visibility: "visible"
      });
      gsap.set(checks, { scale: 0, opacity: 0 });
      gsap.set(cursor, { opacity: 0 });
      resultCopy.textContent = "";
      const fullCommand = command.dataset.full;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 60%",
          once: true
        }
      });

      command.textContent = "";
      tl.to(command.parentElement, { opacity: 1, y: 0, duration: 0.2 });
      tl.to(command, { duration: 0.55, text: fullCommand, ease: "none" });
      plans.forEach((line) => {
        tl.to(line, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, "+=0.1");
      });
      tl.to({}, { duration: 0.7 });
      executes.forEach((line, index) => {
        tl.to(line, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
        tl.to(checks[index], { scale: 1, opacity: 1, duration: 0.18, ease: "back.out(2)" }, "<0.12");
      });
      tl.to({}, { duration: 0.28 });
      tl.to(result, { opacity: 1, y: 0, duration: 0.2 });
      tl.to(resultCopy, {
        duration: Math.max(0.4, resultText.length * 0.025),
        text: resultText,
        ease: "none"
      });
      tl.to(cursor, { opacity: 1, duration: 0.01 });
    },
    { scope: rootRef, dependencies: [reduced, projectCount] }
  );

  return (
    <div ref={rootRef} className={styles.terminal} role="group" aria-label="Agent trace introducing Akshat">
      <div className={styles.header}>
        <span className={styles.dots} aria-hidden="true">
          <i /><i /><i />
        </span>
        <span className={styles.title}>agent-trace — about.run</span>
      </div>
      <div className={styles.body}>
        <p data-line="command" className={styles.line}>
          <span className={styles.tag} />
          <span className={styles.rest} data-full={`$ agent run --task "introduce akshat"`}>
            $ agent run --task "introduce akshat"
          </span>
        </p>
        <p data-kind="plan" className={styles.line}>
          <span className={`${styles.tag} ${styles.plan}`}>[PLAN]</span>
          <span className={styles.rest}>1. who: third-year CSE (AI & ML) at BIT Mesra</span>
        </p>
        <p data-kind="plan" className={styles.line}>
          <span className={`${styles.tag} ${styles.plan}`}>[PLAN]</span>
          <span className={styles.rest}>2. focus: agentic AI, planners, tool use, retrieval</span>
        </p>
        <p data-kind="plan" className={styles.line}>
          <span className={`${styles.tag} ${styles.plan}`}>[PLAN]</span>
          <span className={styles.rest}>3. proof: projects that actually ship</span>
        </p>
        <p data-kind="execute" className={styles.line}>
          <span className={`${styles.tag} ${styles.exec}`}>[EXECUTE]</span>
          <span className={styles.rest}>
            step 1 → profile.read() <span data-check>✓</span>
          </span>
        </p>
        <p data-kind="execute" className={styles.line}>
          <span className={`${styles.tag} ${styles.exec}`}>[EXECUTE]</span>
          <span className={styles.rest}>
            step 2 → projects.list() <span data-check>✓</span> {projectCount} results
          </span>
        </p>
        <p data-kind="execute" className={styles.line}>
          <span className={`${styles.tag} ${styles.exec}`}>[EXECUTE]</span>
          <span className={styles.rest}>
            step 3 → stack.summarize() <span data-check>✓</span>
          </span>
        </p>
        <p data-kind="result" className={`${styles.line} ${styles.result}`}>
          <span className={`${styles.tag} ${styles.res}`}>[RESULT]</span>
          <span className={styles.rest}>
            <strong>Akshat</strong>
            <span data-result-text> · BIT Mesra · class of 2028 · builds LLM agents that plan, execute and retrieve.</span>
            <span data-cursor className={styles.cursor} aria-hidden="true" />
          </span>
        </p>
      </div>
    </div>
  );
}

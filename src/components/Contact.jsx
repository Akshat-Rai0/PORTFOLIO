import { site } from "../data/site.js";
import styles from "./Contact.module.css";

function LinkOrTodo({ href, children, todo }) {
  if (!href) {
    return (
      <span className={styles.todo} title={`TODO: ${todo}`}>
        {children}
      </span>
    );
  }
  return (
    <a href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel="noopener noreferrer">
      {children}
    </a>
  );
}

export default function Contact() {
  return (
    <section id="contact" className={`section ${styles.contact}`}>
      <p className="section-label reveal">04 / Contact</p>
      <h2 className="reveal">
        Let's build something<span>.</span>
      </h2>
      <div className={`reveal ${styles.links}`}>
        <a href={site.github} target="_blank" rel="noopener noreferrer">
          {site.githubLabel}
        </a>
        <LinkOrTodo href={site.email ? `mailto:${site.email}` : ""} todo="email in src/data/site.js">
          {site.email || "email TODO"}
        </LinkOrTodo>
        <LinkOrTodo href={site.linkedin} todo="linkedin in src/data/site.js">
          LinkedIn
        </LinkOrTodo>
        <LinkOrTodo href={site.resumeUrl} todo="resumeUrl in src/data/site.js">
          Resume (Google Drive) ↗
        </LinkOrTodo>
      </div>
      <p className={`reveal ${styles.foot}`}>© 2026 {site.name} · {site.college}</p>
    </section>
  );
}

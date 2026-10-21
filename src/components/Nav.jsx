import gsap from "gsap";
import { site } from "../data/site.js";
import { useReducedMotion } from "../hooks/useReducedMotion.js";
import styles from "./Nav.module.css";

const links = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" }
];

export default function Nav() {
  const reduced = useReducedMotion();

  const onNav = (event, href) => {
    event.preventDefault();
    const el = document.querySelector(href);
    if (!el) return;
    if (reduced) {
      el.scrollIntoView();
      return;
    }
    gsap.to(window, { duration: 0.85, ease: "power3.inOut", scrollTo: { y: el, autoKill: true } });
  };

  return (
    <header className={styles.bar}>
      <a className={styles.handle} href="#top">
        {site.handle}
      </a>
      <nav className={styles.nav} aria-label="Primary">
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={(event) => onNav(event, link.href)}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

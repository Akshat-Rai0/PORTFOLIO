import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Stack from "./components/Stack.jsx";
import Work from "./components/Work.jsx";
import Contact from "./components/Contact.jsx";
import { projects, validateProjects } from "./data/projects.js";
import { useReducedMotion } from "./hooks/useReducedMotion.js";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

validateProjects(projects);

export default function App() {
  const reduced = useReducedMotion();

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts?.ready) {
      document.fonts.ready.then(refresh);
    }
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  useGSAP(
    () => {
      if (reduced) {
        gsap.set(".reveal", { opacity: 1, y: 0 });
        return;
      }
      gsap.utils.toArray(".section").forEach((section) => {
        const targets = section.querySelectorAll(".reveal");
        if (!targets.length) return;
        gsap.fromTo(
          targets,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              once: true
            }
          }
        );
      });
    },
    { dependencies: [reduced] }
  );

  return (
    <>
      <a className="skip-link" href="#work">
        Skip to work
      </a>
      <Hero />
      <About />
      <Stack />
      <Work />
      <Contact />
    </>
  );
}

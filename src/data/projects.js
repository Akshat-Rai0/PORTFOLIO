export const projects = [
  {
    id: "plan-execute-agent",
    title: "PLAN-EXECUTE-AGENT",
    tag: "LangGraph",
    summary: "TODO one-line outcome",
    video: "", // TODO brag video URL (mp4/webm)
    poster: "", // TODO poster image
    pagesUrl: "", // TODO https://akshat-rai0.github.io/<repo>/
    repoUrl: "https://github.com/Akshat-Rai0/PLAN-EXECUTE-AGENT"
  },
  {
    id: "documentor",
    title: "DocuMentor",
    tag: "Agentic RAG",
    summary: "TODO",
    video: "", // TODO
    poster: "", // TODO
    pagesUrl: "", // TODO
    repoUrl: "" // TODO
  },
  {
    id: "eye",
    title: "EYE",
    tag: "Full-stack",
    summary: "TODO Intelligent Visual Asset Management",
    video: "", // TODO
    poster: "", // TODO
    pagesUrl: "", // TODO
    repoUrl: "" // TODO
  },
  {
    id: "sovereign-workbench",
    title: "Sovereign Workbench",
    tag: "SIH 2026",
    summary: "TODO on-premise agentic AI workbench (PS 26117)",
    video: "", // TODO
    poster: "", // TODO
    pagesUrl: "", // TODO
    repoUrl: "" // TODO
  }
];

export function validateProjects(list = projects) {
  if (typeof import.meta !== "undefined" && import.meta.env && !import.meta.env.DEV) {
    return true;
  }
  const seen = new Set();
  list.forEach((project, index) => {
    if (!project?.id || !project?.title) {
      console.warn(`[projects] item ${index} is missing id or title`, project);
    }
    if (project?.id) {
      if (seen.has(project.id)) {
        console.warn(`[projects] duplicate id "${project.id}"`);
      }
      seen.add(project.id);
    }
  });
  return true;
}

const escapeXml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export function projectPosterSrc(project, index = 0) {
  if (project.poster) return project.poster;
  const glow = index % 2 === 0 ? "rgba(237,0,0,0.38)" : "rgba(0,232,139,0.28)";
  const title = escapeXml(project.title || "Project");
  const tag = escapeXml(project.tag || "");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="720" height="1000" viewBox="0 0 720 1000">
    <rect width="720" height="1000" fill="#0d0d0d"/>
    <circle cx="${index % 2 === 0 ? 180 : 540}" cy="280" r="260" fill="${glow}"/>
    <text x="40" y="70" fill="#9a9a9a" font-family="ui-monospace, monospace" font-size="22">${String(index + 1).padStart(2, "0")} · ${tag}</text>
    <text x="40" y="920" fill="#f2f2f2" font-family="Space Grotesk, sans-serif" font-size="42" font-weight="700">${title}</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function mapProjectsToFlexItems(list = projects) {
  return list.map((project, index) => ({
    src: projectPosterSrc(project, index),
    alt: project.title,
    title: project.title,
    subtitle: project.tag
  }));
}

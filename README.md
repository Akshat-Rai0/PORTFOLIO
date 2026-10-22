# akshat.dev

Personal portfolio for Akshat (BIT Mesra, CSE AI & ML, class of 2028). Single-page React site: Hero, About (agent trace), Stack, Work, Contact.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

`VITE_BASE` controls the asset prefix:

- user site (`<user>.github.io`) → `/`
- project site → `/<repo>/`

Example:

```bash
VITE_BASE=/PORTFOLIO/ npm run build
```

## Deploy

Push `main` (or `master`). `.github/workflows/deploy.yml` sets `VITE_BASE` from the repo name, builds, and publishes `dist` to GitHub Pages. Enable Pages with **GitHub Actions** as the source.

## How to add a project

Edit `src/data/projects.js` only. Append an object:

```js
{
  id: "unique-slug",
  title: "Display title",
  tag: "LangGraph",
  summary: "One-line outcome",
  video: "/media/project.mp4", // or a hosted mp4/webm
  poster: "/media/project.jpg",
  pagesUrl: "https://akshat-rai0.github.io/<repo>/",
  repoUrl: "https://github.com/Akshat-Rai0/<repo>"
}
```

Put preview clips in `public/media/` (from [brag](https://github.com/latent-spaces/brag) or any mp4/webm). Copy `case-study-template/` into the project repo for the GitHub Pages case study. Missing `video`, `poster`, or `pagesUrl` will not crash the UI.

## How to add a skill

Edit `src/data/skills.js`. Each row is `{ id, name, icon, mono }`.

- `icon` is a `simple-icons` export such as `"siPython"`.
- If the export does not exist, set `icon: null` and keep a 2–3 letter `mono` (monogram tile).

## How to update the resume

1. Put the PDF on Google Drive.
2. Set `resumeUrl` in `src/data/site.js` once.
3. Later updates: Drive → file → **Manage versions** → upload. The share link never changes.

Also fill `email` and `linkedin` in `src/data/site.js` (left as `TODO`).

## Docs

Planning HTML (dark theme) lives in `/docs`: definition, behavior, UI, roadmap, system wiring.

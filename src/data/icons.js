import {
  siDjango,
  siDocker,
  siFastapi,
  siGithub,
  siHuggingface,
  siJupyter,
  siLangchain,
  siNumpy,
  siOllama,
  siOpencv,
  siPandas,
  siPython,
  siPytorch,
  siReact,
  siScikitlearn,
  siSqlite,
  siTailwindcss,
  siTypescript
} from "simple-icons";

const registry = {
  siDjango,
  siDocker,
  siFastapi,
  siGithub,
  siHuggingface,
  siJupyter,
  siLangchain,
  siNumpy,
  siOllama,
  siOpencv,
  siPandas,
  siPython,
  siPytorch,
  siReact,
  siScikitlearn,
  siSqlite,
  siTailwindcss,
  siTypescript
};

export function getSimpleIcon(name) {
  if (!name) return null;
  return registry[name] || null;
}

export const skillRows = [
  {
    id: "agentic",
    label: "Agentic AI",
    direction: "←",
    accent: "red",
    duration: "45s",
    reverse: false,
    skills: [
      { id: "langgraph", name: "LangGraph", icon: "siLangchain", mono: "LG" },
      { id: "mcp", name: "MCP", icon: null, mono: "MCP" },
      { id: "rag", name: "RAG", icon: null, mono: "RAG" },
      { id: "huggingface", name: "Hugging Face", icon: "siHuggingface", mono: "HF" },
      { id: "ollama", name: "Ollama", icon: "siOllama", mono: "OL" },
      { id: "chromadb", name: "ChromaDB", icon: null, mono: "CH" },
      { id: "langsmith", name: "LangSmith", icon: null, mono: "LS" },
      { id: "llm-apis", name: "LLM APIs", icon: null, mono: "LLM" }
    ]
  },
  {
    id: "ml",
    label: "ML · Deep Learning · Vision",
    direction: "→",
    accent: "neutral",
    duration: "55s",
    reverse: true,
    skills: [
      { id: "python", name: "Python", icon: "siPython", mono: "PY" },
      { id: "pytorch", name: "PyTorch", icon: "siPytorch", mono: "PT" },
      { id: "sklearn", name: "scikit-learn", icon: "siScikitlearn", mono: "SK" },
      { id: "numpy", name: "NumPy", icon: "siNumpy", mono: "NP" },
      { id: "pandas", name: "Pandas", icon: "siPandas", mono: "PD" },
      { id: "lightgbm", name: "LightGBM", icon: null, mono: "LGB" },
      { id: "opencv", name: "OpenCV", icon: "siOpencv", mono: "CV" },
      { id: "yolov11", name: "YOLOv11", icon: null, mono: "YO" },
      { id: "clip", name: "CLIP", icon: null, mono: "CL" },
      { id: "moondream2", name: "Moondream2", icon: null, mono: "MD" },
      { id: "umap", name: "UMAP", icon: null, mono: "UM" }
    ]
  },
  {
    id: "ship",
    label: "Build & Ship",
    direction: "←",
    accent: "neutral",
    duration: "45s",
    reverse: false,
    skills: [
      { id: "fastapi", name: "FastAPI", icon: "siFastapi", mono: "FA" },
      { id: "django", name: "Django", icon: "siDjango", mono: "DJ" },
      { id: "sqlite", name: "SQLite", icon: "siSqlite", mono: "SQL" },
      { id: "react", name: "React", icon: "siReact", mono: "RE" },
      { id: "jsts", name: "JS / TS", icon: "siTypescript", mono: "JS" },
      { id: "tailwind", name: "Tailwind CSS", icon: "siTailwindcss", mono: "TW" },
      { id: "git", name: "Git & GitHub", icon: "siGithub", mono: "GH" },
      { id: "jupyter", name: "Jupyter", icon: "siJupyter", mono: "JU" },
      { id: "docker", name: "Docker", icon: "siDocker", mono: "DK" }
    ]
  }
];

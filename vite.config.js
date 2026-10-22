import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: process.env.VITE_BASE || "/",
  plugins: [react()],
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 700,
    modulePreload: {
      resolveDependencies(_filename, deps) {
        return deps.filter((dep) => !dep.includes("flex-carousel") && !dep.includes("vanta-three"));
      }
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("vanta") || id.includes("/three/")) return "vanta-three";
          if (id.includes("FlexCarousel") || id.includes("/ogl")) return "flex-carousel";
          if (id.includes("gsap")) return "gsap";
        }
      }
    }
  }
});

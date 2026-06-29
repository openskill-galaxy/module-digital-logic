import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";

// 项目站点 module-digital-logic，部署在子路径 /module-digital-logic/
export default defineConfig({
  base: "/module-digital-logic/",
  plugins: [react as unknown as PluginOption],
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});

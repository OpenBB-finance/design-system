import VitePluginSvgSpritemap from "@spiriit/vite-plugin-svg-spritemap";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "../../packages/ui/src")
    },
  },
  plugins: [
    react(),
    VitePluginSvgSpritemap("../../packages/ui/src/icons/**/*.svg"),
  ],
});

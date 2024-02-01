import VitePluginSvgSpritemap from "@spiriit/vite-plugin-svg-spritemap";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePluginSvgSpritemap("../../packages/common/src/icons/*.svg"),
  ],
});

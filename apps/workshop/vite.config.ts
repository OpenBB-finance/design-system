import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(__dirname, "../../packages/common/src/icons")],
      symbolId: "icon-[dir]-[name]",
    }),
  ],
});

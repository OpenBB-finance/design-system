import react from "@vitejs/plugin-react";
import { execSync } from "child_process";
import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import packageData from "./package.json";

const rev = execSync("git rev-parse --short HEAD").toString().trim();
process.env.VITE_VERSION = packageData.version;
process.env.VITE_BUILD_INFO = `v. ${
  packageData.version
}, rev. ${rev}, built at ${new Date().toLocaleString()}`;

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: false,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "OpenBB UI",
      fileName: (format) => `openbb-ui.${format}.js`,
    },
    rollupOptions: {
      // externalize deps that shouldn't be bundled
      // into your library
      external: ["react", "react-dom"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: "React",
        },
      },
    },
  },
  plugins: [
    react(),
    dts({ rollupTypes: true, insertTypesEntry: true }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(__dirname, "src/icons")],
      symbolId: "icon-[dir]-[name]",
    }),
  ],
});

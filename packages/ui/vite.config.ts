import VitePluginSvgSpritemap from "@spiriit/vite-plugin-svg-spritemap";
import react from "@vitejs/plugin-react";
import { execSync } from "node:child_process";
import path from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import packageData from "./package.json";
import { buildIcons } from "./plugins/icons-typings";

const rev = execSync("git rev-parse --short HEAD").toString().trim();
process.env.VITE_VERSION = packageData.version;
process.env.VITE_BUILD_INFO = `Design System v. ${
  packageData.version
}, rev. ${rev}, built at ${new Date().toLocaleString()}`;

buildIcons(path.resolve(__dirname, "./src/icons"));

// https://vitejs.dev/config/
export default defineConfig({
  root: path.resolve(__dirname, "."),
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    cssMinify: false,
    cssCodeSplit: true,
    lib: {
      entry: {
        lib: "src/index.ts",
        fonts: "src/fonts/fonts.ts",
      },
      name: "UI",
      fileName: (format, name) => `${name}.${format}.js`,
    },
    rollupOptions: {
      // externalize deps that shouldn't be bundled
      // into your library
      external: [
        ...Object.keys(packageData.dependencies || {}),
        ...Object.keys(packageData.peerDependencies || {}),
      ],
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
    VitePluginSvgSpritemap("./src/icons/**/*.svg", {
      output: "spritemap.svg", //! removes hash from filename to have a constant url
    }),
    dts({ rollupTypes: true }),
  ],
});

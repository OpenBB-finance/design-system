import VitePluginSvgSpritemap from "@spiriit/vite-plugin-svg-spritemap";
import react from "@vitejs/plugin-react";
import { execSync } from "child_process";
import path from "path";
import { defineConfig } from "vite";
import packageData from "./package.json";

const rev = execSync("git rev-parse --short HEAD").toString().trim();
process.env.VITE_VERSION = packageData.version;
process.env.VITE_BUILD_INFO = `Design System v. ${
  packageData.version
}, rev. ${rev}, built at ${new Date().toLocaleString()}`;

// https://vitejs.dev/config/
export default defineConfig({
  root: path.resolve(__dirname, "."),
  resolve: {
    alias: {
      "~": "./src",
    },
  },
  build: {
    minify: false,
    lib: {
      entry: {
        lib: "src/index.ts",
      },
      name: "UIPro",
      fileName: (format, name) => `${name}.${format}.js`,
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
    VitePluginSvgSpritemap("../common/src/icons/*.svg"),
    // dts({ rollupTypes: true }) //! <- this doesn't work
  ],
});

import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "tailwind.config.ts"],
  dts: true,
  external: ["react", "react-dom"],
});

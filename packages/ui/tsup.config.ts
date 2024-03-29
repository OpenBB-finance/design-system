import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["tailwind.config.ts"],
  format: "esm",
  dts: true,
  external: ["react", "react-dom"],
});

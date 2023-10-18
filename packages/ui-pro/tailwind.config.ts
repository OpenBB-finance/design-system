// tailwind config is required for editor support
import conf from "common/tailwind.config";
import type { Config } from "tailwindcss";

export default {
  content: [
    ...conf.content,
    "../../packages/ui-pro/src/**/*.{js,jsx,ts,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,jsx,ts,tsx,mdx}", //? TODO: move common components to common package
  ],
  presets: [conf],
} satisfies Config;

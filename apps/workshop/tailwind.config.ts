// tailwind config is required for editor support
import conf from "main/tailwind.config";
import type { Config } from "tailwindcss";

export default {
  content: [
    // ...conf.content,
    "../../packages/common/src/**/*.{js,jsx,ts,tsx,mdx}",
    "../../packages/main/src/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  presets: [conf],
} satisfies Config;

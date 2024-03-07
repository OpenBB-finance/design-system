// tailwind config is required for editor support
import conf from "@openbb/ui/tailwind.config";
import type { Config } from "tailwindcss";

export default {
  content: [
    "../../packages/ui/src/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  presets: [conf],
} satisfies Config;

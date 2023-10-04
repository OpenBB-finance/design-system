// tailwind config is required for editor support
import conf from "common/tailwind.config";
import type { Config } from "tailwindcss";

export default {
  content: [...conf.content, "../../packages/ui/src/**/*.{js,jsx,ts,tsx,mdx}"],
  presets: [conf],
} satisfies Config;

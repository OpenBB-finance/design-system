// tailwind config is required for editor support
import type { Config } from "tailwindcss";
import conf from "common/tailwind.config";

export default {
  content: conf.content,
  presets: [conf],
} satisfies Config;

import plugin from "tailwindcss/plugin";

export const RADIAL_COLORS = {
  "light-blue": "from-light-blue-500/50",
  "dark-blue": "from-dark-blue-500/80",
  purple: "from-purple-500/80",
  burgundy: "from-burgundy-500/50",
  cardinal: "from-cardinal-500/50",
  ruby: "from-ruby-500/50",
  orange: "from-orange-500/50",
  yellow: "from-yellow-500/50",
  danger: "from-danger-500/50",
  warning: "from-warning-500/50",
  success: "from-success-500/50",
  accent: "from-accent-500/50",
} as const;

export const bgRadialPlugin = plugin(function ({ addUtilities }) {
  addUtilities({
    ".bg-radial": {
      backgroundImage:
        "radial-gradient(50% 50% at 50% 50%, var(--tw-gradient-stops))",
    },
  });

  for (const name in RADIAL_COLORS) {
    const color = RADIAL_COLORS[name as keyof typeof RADIAL_COLORS];
    addUtilities({
      [`.bg-radial-${name}`]: {
        [`@apply bg-radial ${color}`]: {},
      },
    });
  }
});

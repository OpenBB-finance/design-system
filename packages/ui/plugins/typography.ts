import plugin from "tailwindcss/plugin";

const STYLE = {
  title: {
    fontFamily: "Inter",
  },
  subtitle: {
    fontFamily: "Inter",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
  },
  body: { fontFamily: "Inter" },
} as const;

const SIZE = {
  title: {
    xs: { fontSize: "1.5rem", lineHeight: "2.25rem" },
    sm: { fontSize: "1.75rem", lineHeight: "2.625rem" },
    md: { fontSize: "2rem", lineHeight: "3rem" },
    lg: { fontSize: "2.5rem", lineHeight: "3.75rem" },
    xl: { fontSize: "3rem", lineHeight: "4rem" },
  },
  subtitle: {
    "2xs": { fontSize: "0.625rem", lineHeight: "1rem" },
    xs: { fontSize: "0.75rem", lineHeight: "1.125rem" },
    sm: { fontSize: "0.875rem", lineHeight: "1.375rem" },
    md: { fontSize: "1.125rem", lineHeight: "1.75rem" },
    lg: { fontSize: "1.25rem", lineHeight: "2rem" },
    xl: { fontSize: "1.5rem", lineHeight: "2rem" },
  },
  body: {
    xs: { fontSize: "0.75rem", lineHeight: "1.125rem" },
    sm: { fontSize: "0.875rem", lineHeight: "1.375rem" },
    md: { fontSize: "1rem", lineHeight: "1.5rem" },
    lg: { fontSize: "1.125rem", lineHeight: "1.75rem" },
    xl: { fontSize: "1.25rem", lineHeight: "1.875rem" },
    subtitle: { fontSize: "2rem", lineHeight: "3rem" },
  },
} as const;

const WEIGHT = {
  bold: { fontWeight: "700" },
  medium: { fontWeight: "500" },
  regular: { fontWeight: "400" },
} as const;

type Style = keyof typeof STYLE;
type Size<T extends Style> = keyof (typeof SIZE)[T];
type Weight = keyof typeof WEIGHT;
// type TypographyClass = `${Style}-${Size<Style>}-${Weight}`; //? not sure I need it
type TypographyObject = Record<string, string>;

const classMap = new Map<string, TypographyObject>();
for (const _style in STYLE) {
  const style = _style as Style;
  for (const _size in SIZE[style]) {
    const size = _size as Size<typeof style>;
    for (const _weight in WEIGHT) {
      const weight = _weight as Weight;
      classMap.set(`${style}-${size}-${weight}`, {
        ...STYLE[style],
        ...SIZE[style][size],
        ...WEIGHT[weight],
      });
    }
  }
}
export const typographyClassGroup = [...classMap.keys()];

export const typographyPlugin = plugin(({ addUtilities }) => {
  classMap.forEach((value, key) => {
    addUtilities({
      [`.${key}`]: value,
    });
  });
});

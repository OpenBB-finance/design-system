/* Base colors */

export const current = "currentColor" as const;
export const inherit = "inherit" as const;
export const transparent = "transparent" as const;

export const white = "#FFFFFF" as const;
export const black = "#000000" as const;

export const grey = {
  50: "#F6F6F6",
  100: "#EAEAEA",
  200: "#DCDCDC",
  300: "#C8C8C8",
  400: "#A2A2A2",
  500: "#808080",
  600: "#5A5A5A",
  700: "#474747",
  750: "#404040",
  800: "#2A2A2A",
  850: "#131313",
  900: "#070707",
} as const;

export const dark = {
  50: "#8A8A90",
  100: "#6D6E74",
  200: "#5A5961",
  300: "#505059",
  400: "#46464F",
  500: "#36363F",
  600: "#303038",
  700: "#2A2A31",
  750: "#24242A",
  800: "#212126",
  850: "#1F1E23",
  900: "#151518",
} as const;

/* Primary colors */

export const lightBlue = {
  50: "#ECF7FF",
  100: "#CCEEFF",
  200: "#99DDFF",
  300: "#66CCFF",
  400: "#33BBFF",
  500: "#00AAFF",
  600: "#0088CC",
  700: "#006699",
  800: "#004466",
  900: "#002D48",
} as const;

export const darkBlue = {
  50: "#F2F7FB",
  100: "#CCDEEE",
  200: "#99BEDD",
  300: "#669DCB",
  400: "#337DBA",
  500: "#005CA9",
  600: "#004A87",
  700: "#003765",
  800: "#002544",
  900: "#000E21",
} as const;

export const purple = {
  50: "#F6F4F8",
  100: "#DAD4E5",
  200: "#B6A9CB",
  300: "#917DB0",
  400: "#6D5296",
  500: "#48277C",
  600: "#3A1F63",
  700: "#2B174A",
  800: "#1D1032",
  900: "#16082C",
} as const;

export const burgundy = {
  50: "#F3E9EF",
  100: "#E6D4DF",
  200: "#CDA8C0",
  300: "#B47DA0",
  400: "#9B5181",
  500: "#822661",
  600: "#681E4E",
  700: "#4E173A",
  800: "#340F27",
  900: "#200415",
} as const;

export const cardinal = {
  50: "#F9EBED",
  100: "#F3D6DA",
  200: "#E6ADB5",
  300: "#DA8490",
  400: "#CD5B6B",
  500: "#C13246",
  600: "#9A2838",
  700: "#741E2A",
  800: "#4D141C",
  900: "#34070D",
} as const;

export const ruby = {
  50: "#FCF5F6",
  100: "#FACCD8",
  200: "#F499B0",
  300: "#EF6689",
  400: "#E93361",
  500: "#E4003A",
  600: "#B6002E",
  700: "#890023",
  800: "#5B0017",
  900: "#3F0009",
} as const;

export const orange = {
  50: "#FEF9F2",
  100: "#FCE5CC",
  200: "#F9CB99",
  300: "#F5B166",
  400: "#F29733",
  500: "#EF7D00",
  600: "#BF6400",
  700: "#8F4B00",
  800: "#603200",
  900: "#421E00",
} as const;

export const yellow = {
  50: "#FEFDF2",
  100: "#FFFBCC",
  200: "#FFF466",
  300: "#FFF466",
  400: "#FFF133",
  500: "#FFED00",
  600: "#CCBE00",
  700: "#998E00",
  800: "#665F00",
  900: "#2E2A00",
} as const;

/* Feedback colors */

export const danger = {
  50: "#FEF2F2",
  100: "#FEE2E2",
  200: "#FECACA",
  300: "#FCA5A5",
  400: "#F87171",
  500: "#EF4444",
  600: "#DC2626",
  700: "#B91C1C",
  800: "#991B1B",
  900: "#7F1D1D",
} as const;

export const warning = {
  50: "#FFF7ED",
  100: "#FFEDD5",
  200: "#FED7AA",
  300: "#FDBA74",
  400: "#FB923C",
  500: "#F97316",
  600: "#EA580C",
  700: "#C2410C",
  800: "#9A3412",
  900: "#7C2D12",
} as const;

export const success = {
  50: "#F0FDF4",
  100: "#DCFCE7",
  200: "#BBF7D0",
  300: "#86EFAC",
  400: "#4ADE80",
  500: "#22C55E",
  600: "#16A34A",
  700: "#15803D",
  800: "#166534",
  900: "#14532D",
} as const;

/** Alias for danger */
export const redFeedback = danger;
/** Alias for warning */
export const yellowFeedback = warning;
/** Alias for success */
export const greenFeedback = success;

export const colors = {
  current,
  inherit,
  transparent,

  white,
  black,
  grey,
  dark,

  "light-blue": lightBlue,
  "dark-blue": darkBlue,
  purple,
  burgundy,
  cardinal,
  ruby,
  orange,
  yellow,

  danger,
  warning,
  success,
  info: lightBlue,

  red: redFeedback,
  green: greenFeedback,
} as const;

/* Gradients */

export const gradients = {
  "gradient-01": `linear-gradient(136deg, ${burgundy[500]} 0%, ${purple[500]} 97.40%)`,
  "gradient-02": `linear-gradient(140deg, ${purple[500]} 0%, ${darkBlue[400]} 97.40%)`,
  "gradient-03": `linear-gradient(132deg, ${darkBlue[700]} 0%, ${lightBlue[500]} 100%)`,
  "gradient-04": `linear-gradient(138deg, ${cardinal[500]} 0%, ${burgundy[500]} 31.45%, ${purple[500]} 60.57%, #1451A0 95.83%)`,
  "gradient-05": `linear-gradient(138deg, ${burgundy[500]} 0%, #E15529 97.40%)`,
  "gradient-06": `linear-gradient(136deg, #E05E00 0%, #FFEC00 100%)`,
  "gradient-07": `linear-gradient(135deg, #FCED00 0%, ${orange[500]} 17.64%, ${cardinal[500]} 34.65%, ${burgundy[500]} 51.05%, ${purple[500]} 66.61%, #2D378C 82.10%, ${darkBlue[500]} 95.72%)`,
} as const;

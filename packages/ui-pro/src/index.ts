import "./global.css";

export * from "common";
export * from "./components";

export * from "../../ui/src/components/ui/Button";
export * from "../../ui/src/components/ui/Checkbox";

export const VERSION = import.meta.env.VITE_VERSION;
export const BUILD_INFO = import.meta.env.VITE_BUILD_INFO;

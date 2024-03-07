import "./styles/global.css";

export * from "./atoms";
export * from "./dialogs";
export * from "./molecules";
export const VERSION = import.meta.env.VITE_VERSION;
export const BUILD_INFO = import.meta.env.VITE_BUILD_INFO;

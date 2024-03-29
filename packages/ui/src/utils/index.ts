import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* Promisify */

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* Math */

/** @deprecated use React.useId() instead */
export function makeRandomId(name?: string) {
  const suffix = Math.random().toString(36).substring(6);
  return [name, suffix].filter(Boolean).join("-");
}

export function clamp(x: number, min: number, max: number) {
  return Math.min(Math.max(x, min), max);
}

/* String */

export function capitalizeString<T extends string>(string: T) {
  return (string.charAt(0).toUpperCase() + string.slice(1)) as Capitalize<T>;
}

/* Types */

export type CanBeImmutable<T> = T | Readonly<T>;

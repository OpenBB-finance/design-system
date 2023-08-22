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

export function makeRandomId(name?: string) {
  const suffix = Math.random().toString(36).substring(6);
  return [name, suffix].filter(Boolean).join("-");
}

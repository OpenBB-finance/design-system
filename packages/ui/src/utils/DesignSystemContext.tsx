import type React from "react";
import { createContext } from "react";
import type { Config } from "tailwindcss";

export interface DesignSystemContextValue {
  tailwind: Partial<Config>;
}

export const DesignSystemContext = createContext<DesignSystemContextValue>({
  tailwind: {},
});

// TODO: Optimize breakpoints
export function DesignSystemProvider(props: {
  children: React.ReactNode;
  value: DesignSystemContextValue;
}) {
  return (
    <DesignSystemContext.Provider value={props.value}>
      {props.children}
    </DesignSystemContext.Provider>
  );
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_VERSION: string;
  readonly VITE_BUILD_INFO: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DEV: string;
  readonly VITE_PROD: string;
  readonly VITE_PORT: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

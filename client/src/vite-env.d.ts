/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly APP_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

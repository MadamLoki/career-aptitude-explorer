/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly ADZUNA_APP_ID: string
    readonly ADZUNA_API_KEY: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly GENERATE_SOURCEMAP:  boolean | 'inline' | 'hidden'

  readonly VITE_APP_TITLE: string
  readonly REACT_APP_TITLE: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}


declare global {
  namespace NodeJS {
    interface Process {
      env: ProcessEnv;
    }

    interface ProcessEnv extends ImportMetaEnv {
      NODE_ENV: string;
    }
  }

  var process: NodeJS.Process;
}


declare global {
  namespace NodeJS {
    interface Process {
      env: ProcessEnv;
    }

    interface ProcessEnv extends ImportMetaEnv {
      NODE_ENV: string;
    }
  }

  let process: NodeJS.Process;
}

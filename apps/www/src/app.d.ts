/// <reference types="../worker-configuration.d.ts" />

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals { }
    // interface PageData { }
    // interface PageState {}
    interface Platform {
      env: Env;
      caches: CacheStorage;
      context: ExecutionContext;
      cf: CfProperties;
    }
  }
}

export {};

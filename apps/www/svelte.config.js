import cloudflare from "@sveltejs/adapter-cloudflare";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [vitePreprocess()],
  kit: {
    adapter: cloudflare({
      routes: {
        exclude: ["/_app/*", "/p/*", "/favicon.ico", "/robots.txt"],
      },
    }),
    prerender: {
      handleHttpError: "ignore",
    },
  },
};

export default config;

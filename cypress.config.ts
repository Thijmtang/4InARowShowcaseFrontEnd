import { defineConfig } from "cypress";
import react from '@vitejs/plugin-react';
export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
      viteConfig: {
        plugins: [react()],
        server: {
          port: 3000,
        },
      }
    },
  },
});
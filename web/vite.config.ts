import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            "module-resolver",
            {
              root: ["./src"],
              alias: {
                "@components": "./src/components",
              },
            },
          ],
        ],
      },
    }),
  ],
  server: {
    port: 3000,
  },
});

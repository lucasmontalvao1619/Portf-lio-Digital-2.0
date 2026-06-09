import tailwindcss from "./frontend/node_modules/@tailwindcss/vite/dist/index.mjs";
import react from "./frontend/node_modules/@vitejs/plugin-react/dist/index.js";
import { fileURLToPath, URL } from "node:url";

export default {
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./frontend/src", import.meta.url)),
    },
  },
  assetsInclude: ["**/*.svg", "**/*.csv"],
};

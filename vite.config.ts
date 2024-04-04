import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@enviroment": path.resolve(__dirname, "src/enviroment"),
    },
  },
  plugins: [react()],
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const BASE_URL = "http://localhost:3000/";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/v1/products/all-products": BASE_URL,
      "/api/v1/products/single-product": BASE_URL,
    },
  },
});

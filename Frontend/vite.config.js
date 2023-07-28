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
      "/api/v1/category/all-category": BASE_URL,
      "/api/v1/login": BASE_URL,
      "/api/v1/register": BASE_URL,
      "/api/v1/myprofile": BASE_URL,
      "/api/v1/logout": BASE_URL,
      "/api/v1/update-profile": BASE_URL,
      "/api/v1/password/update": BASE_URL,
      "/api/v1/password/forgot": BASE_URL,
      "/api/v1/password/reset": BASE_URL,
    },
  },
});

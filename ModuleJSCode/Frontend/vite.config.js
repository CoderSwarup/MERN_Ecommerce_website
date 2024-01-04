import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// const BASE_URL = "https://samecommbackend.cyclic.cloud";
const BASE_URL = "http://localhost:3000/";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      //User Routes
      "/api/v1/login": BASE_URL,
      "/api/v1/register": BASE_URL,
      "/api/v1/myprofile": BASE_URL,
      "/api/v1/refresh-token": BASE_URL,
      "/api/v1/logout": BASE_URL,
      "/api/v1/update-profile": BASE_URL,
      "/api/v1/password/update": BASE_URL,
      "/api/v1/password/forgot": BASE_URL,
      "/api/v1/password/reset": BASE_URL,

      //Products ROute
      "/api/v1/products/single-productt": BASE_URL,
      "/api/v1/products/all-products": BASE_URL,
      // "/api/v1/products/admin/products": BASE_URL,
      "/api/v1/products/admin/update-product": BASE_URL,
      "/api/v1/products/admin/delete-product": BASE_URL,
      "/api/v1/products/single-product": BASE_URL,
      "/api/v1/products/admin/create-product": BASE_URL,

      //Product Review
      "/api/v1/products/review": BASE_URL,

      //Category Routes
      "/api/v1/category/all-category": BASE_URL,

      //Payment routes
      "/api/v1/payment/stripeapikey": BASE_URL,
      "/api/v1/payment/process/payment": BASE_URL,

      //Order Routes
      "/api/v1/orders/order/new": BASE_URL,
      "/api/v1/orders/myorder": BASE_URL,

      //Order Invoice
      "/api/v1/orders/invoices/download": BASE_URL,

      //Admin Routes
      "/api/v1/admin/getallusers": BASE_URL,
      "/api/v1/admin/getsingleuser": BASE_URL,
      "/api/v1/admin/updaterole": BASE_URL,
      "/api/v1/admin/delete-user": BASE_URL,
      "/api/v1/products/admin/products": BASE_URL,
      "/api/v1/products/admin/get-reviews": BASE_URL,
      "/api/v1/products/admin/delete-reviews": BASE_URL,
      "/api/v1/orders/admin/getallorders": BASE_URL,
      "/api/v1/orders/admin/orderdetails": BASE_URL,
      "/api/v1/orders/admin/update/order": BASE_URL,
      "/api/v1/category/admin/create-category": BASE_URL,
      "/api/v1/category/admin/delete-category": BASE_URL,
      "/api/v1/category/admin/update-category": BASE_URL,
    },
  },
});

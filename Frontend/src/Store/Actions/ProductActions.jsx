import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
// Create an async thunk to fetch products from the backend

// all products fetched
export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (search) => {
    try {
      const response = await axios.get(
        `/api/v1/products/all-products${search}`
      ); // Replace with your backend API endpoint
      return response.data;
    } catch (error) {
      throw new Error("Error fetching products: ");
    }
  }
);

// Single Product Details fetched
export const getProductDetails = createAsyncThunk(
  "productDetails/getProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/v1/products/single-product/${id}`);
      return response.data.product;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

//Create a Review
export const NewReview = createAsyncThunk("user/newreview", async (Data) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put("/api/v1/products/review", Data, config);
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

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

// Craeate Products
export const CreateNewProduct = createAsyncThunk(
  "admin/create-product",
  async (Data) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        `/api/v1/products/admin/create-product`,
        Data,
        config
      );
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

//FetAlladming Products
export const getAllAdmingProducts = createAsyncThunk(
  "admin/products",
  async () => {
    try {
      const { data } = await axios.get("/api/v1/products/admin/products");
      return data;
    } catch (error) {
      throw new Error(error.response.message);
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

//get all admin product
export const GetAllAdminProduct = createAsyncThunk("adminproduct", async () => {
  try {
    const { data } = await axios.get("/api/v1/products/admin/products");
    // console.log(data);
    return data;
  } catch (error) {}
});

//Getting Product Reviews
export const GetProductReviews = createAsyncThunk(
  "admin/getrevies",
  async (id) => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/admin/get-reviews/${id}`
      );
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

//Delete Product Review
export const DeleteProductReview = createAsyncThunk(
  "admin/delete-review",
  async ([id, reviewId]) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/products/admin/delete-reviews/${id}?reviewid=${reviewId}`
      );
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

//Delete the Product
export const deleteProductAction = createAsyncThunk(
  "admin/delete",
  async (productId) => {
    try {
      console.log(productId);
      const { data } = await axios.delete(
        `/api/v1/products/admin/delete-product/${productId}`
      );
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// update Product
export const UpdateProdcutAction = createAsyncThunk(
  "admin/update-categories",
  async ([id, Data]) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const { data } = await axios.put(
        `/api/v1/products/admin/update-product/${id}`,
        Data,
        config
      );
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

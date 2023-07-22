// productSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts, getProductDetails } from "../Actions/ProductActions";

// allproduct show reducer
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
    page: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handle the pending, fulfilled, and rejected states for fetchProducts thunk
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { reducer: productsReducer } = productSlice;

//--------------------------------------------
//--------------------------------------------

// product details reducer
const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: {
    product: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
        state.error = null;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { clearError } = productDetailsSlice.actions;
export const { reducer: ProductDetailsReducer } = productDetailsSlice;

//--------------------------------------
//--------------------------------------

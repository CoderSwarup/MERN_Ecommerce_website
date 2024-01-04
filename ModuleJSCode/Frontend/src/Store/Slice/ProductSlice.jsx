// productSlice.js

import { createSlice } from "@reduxjs/toolkit";
import {
  CreateNewProduct,
  DeleteProductReview,
  GetAllAdminProduct,
  GetProductReviews,
  NewReview,
  UpdateProdcutAction,
  deleteProductAction,
  fetchProducts,
  getAllAdmingProducts,
  getProductDetails,
} from "../Actions/ProductActions";

// allproduct show reducer
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: {},
    loading: false,
    error: null,
    page: 1,
    message: null,
  },
  reducers: {
    ClearProductsError: (state) => ({
      ...state,
      error: null,
    }),
    ClearProductMsg: (state) => ({
      ...state,
      message: null,
    }),
  },
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

    //get all admin Product
    builder
      .addCase(GetAllAdminProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetAllAdminProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(GetAllAdminProduct.rejected, (state) => {
        state.loading = false;
        state.error = null;
      });

    //Get aLL Admin Products
    builder
      .addCase(getAllAdmingProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllAdmingProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getAllAdmingProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    //delete Product
    builder
      .addCase(deleteProductAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProductAction.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(deleteProductAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    //Create A Product
    builder
      .addCase(CreateNewProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(CreateNewProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(CreateNewProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { ClearProductsError, ClearProductMsg } = productSlice.actions;
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
    message: null,
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearMessage(state) {
      state.message = null;
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

    //Update Prductc
    builder
      .addCase(UpdateProdcutAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateProdcutAction.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(UpdateProdcutAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.action;
      });
  },
});
export const { clearError, clearMessage } = productDetailsSlice.actions;
export const { reducer: ProductDetailsReducer } = productDetailsSlice;

//--------------------------------------
//--------------------------------------

//review slice
const ReviewSlice = createSlice({
  name: "reviews",
  initialState: {
    loading: false,
    Rerror: null,
    Rmessage: null,
  },
  reducers: {
    clearReviewError(state) {
      state.Rerror = null;
    },
    clearReviewMsg(state) {
      state.Rmessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(NewReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(NewReview.fulfilled, (state, action) => {
        state.loading = false;
        state.Rmessage = action.payload.message;
      })
      .addCase(NewReview.rejected, (state, action) => {
        state.loading = false;
        state.Rerror = action.error.message;
      });
  },
});

export const { clearReviewError, clearReviewMsg } = ReviewSlice.actions;
export const { reducer: ReviewReducer } = ReviewSlice;

// Product Recies Reducer
const ProductReviewsSlice = createSlice({
  name: "ProductReviews",
  initialState: {
    reviews: [],
    loading: false,
    error: null,
    isDeleted: null,
  },
  reducers: {
    ProductReviewsErrClr: (state) => ({
      ...state,
      error: null,
    }),
    Reset_Is_Deleted: (state) => ({
      ...state,
      isDeleted: false,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetProductReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetProductReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.reviews;
      })
      .addCase(GetProductReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    //Delete review
    builder
      .addCase(DeleteProductReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(DeleteProductReview.fulfilled, (state, action) => {
        state.loading = false;
        state.isDeleted = action.payload.message;
      })
      .addCase(DeleteProductReview.rejected, (state, action) => {
        state.loading = false;
        state.isDeleted = null;
        state.error = action.error.message;
      });
  },
});

export const { ProductReviewsErrClr, Reset_Is_Deleted } =
  ProductReviewsSlice.actions;

export const { reducer: ProductReviewsReducer } = ProductReviewsSlice;

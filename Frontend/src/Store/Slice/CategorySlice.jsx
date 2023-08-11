import { createSlice } from "@reduxjs/toolkit";
import {
  CreateNewCategory,
  DeleteCategoryAction,
  UpdateCategoryAction,
  fetchallCategory,
} from "../Actions/CategoryActions";

const CategorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handle the pending, fulfilled, and rejected states for fetchProducts thunk
    builder
      .addCase(fetchallCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchallCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.category;
      })
      .addCase(fetchallCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(CreateNewCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(CreateNewCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(CreateNewCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    //Delete Category
    builder
      .addCase(DeleteCategoryAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(DeleteCategoryAction.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(DeleteCategoryAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    //Update categrory
    builder
      .addCase(UpdateCategoryAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdateCategoryAction.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(UpdateCategoryAction, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { reducer: CategoryReducer } = CategorySlice;

import { createSlice } from "@reduxjs/toolkit";
import { fetchallCategory } from "../Actions/CategoryActions";

const CategorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    loading: false,
    error: null,
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
        state.categories = action.payload;
      })
      .addCase(fetchallCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { reducer: CategoryReducer } = CategorySlice;

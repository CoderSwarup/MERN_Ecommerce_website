//get all categiories

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchallCategory = createAsyncThunk(
  "categories/fetch",
  async () => {
    try {
      const response = await axios.get(`/api/v1/category/all-category`);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching products: ");
    }
  }
);

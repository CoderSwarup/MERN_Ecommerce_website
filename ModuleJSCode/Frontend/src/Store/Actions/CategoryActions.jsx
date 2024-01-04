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

//Craeate A category
export const CreateNewCategory = createAsyncThunk(
  "categories/create",
  async (name) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        "/api/v1/category/admin/create-category",
        { name },
        config
      );
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

//Delete Categoru Action
export const DeleteCategoryAction = createAsyncThunk(
  "categories/delete",
  async (id) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/admin/delete-category/${id}`
      );
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

//Update Category
export const UpdateCategoryAction = createAsyncThunk(
  "categories/update",
  async ([id, name]) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put(
        `/api/v1/category/admin/update-category/${id}`,
        { name },
        config
      );
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

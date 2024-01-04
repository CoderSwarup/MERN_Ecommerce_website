import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Create a New Order
export const CreateNewOrder = createAsyncThunk(
  "user/neworder",
  async (order) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/orders/order/new",
        order,
        config
      );
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Myorder
export const FetchMyorders = createAsyncThunk("user/myorders", async () => {
  try {
    const { data } = await axios.get("/api/v1/orders/myorder");
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
  y;
});

//Fetch all adminorder
export const fetchAdminOrders = createAsyncThunk("admin/orders", async () => {
  try {
    const { data } = await axios.get(`/api/v1/orders/admin/getallorders`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

//Fetch Singel Order Details
export const GetOrderDetailsAction = createAsyncThunk(
  "admin/order-details",
  async (id) => {
    try {
      const { data } = await axios.get(
        `/api/v1/orders/admin/orderdetails/${id}`
      );
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

//Update Order Process
export const UpdateOrderStatus = createAsyncThunk(
  "admin/update-status",
  async ([id, status]) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `/api/v1/orders/admin/update/order/${id}`,
        status,
        config
      );
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

import { createSlice } from "@reduxjs/toolkit";
import { CreateNewOrder, FetchMyorders } from "../Actions/OrderActions";
const OrderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
    success: false,
    message: null,
    error: null,
  },
  reducers: {
    ClearOrderMsg: (state) => ({
      ...state,
      message: null,
    }),
    ClearOrderError: (state) => ({
      ...state,
      error: null,
    }),
    ResetOrderSuccess: (state) => ({
      ...state,
      success: false,
    }),
  },

  extraReducers: (builder) => {
    builder
      .addCase(CreateNewOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(CreateNewOrder.fulfilled, (state, action) => {
        (state.loading = false),
          (state.orders = action.payload),
          (state.message = state.orders.message);
        state.success = true;
      })
      .addCase(CreateNewOrder.rejected, (state, action) => {
        state.orders = [];
        state.message = null;
        state.success = false;
        state.error = action.error.message;
      });
  },
});

export const { ClearOrderError, ClearOrderMsg, ResetOrderSuccess } =
  OrderSlice.actions;
export const { reducer: OrderReducer } = OrderSlice;

const MyorderSlice = createSlice({
  name: "myorders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {
    ClearMyorderErr: (state) => ({
      ...state,
      errror: null,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(FetchMyorders.pending, (state) => {
        state.loading = true;
      })
      .addCase(FetchMyorders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.order;
      })
      .addCase(FetchMyorders.rejected, (state, action) => {
        state.loading = false;
        state.orders = [];
        state.error = action.error.message;
      });
  },
});

export const { ClearMyorderErr } = MyorderSlice.actions;
export const { reducer: MyorderReducer } = MyorderSlice;

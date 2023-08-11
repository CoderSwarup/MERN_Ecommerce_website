import { createSlice } from "@reduxjs/toolkit";
import {
  CreateNewOrder,
  FetchMyorders,
  GetOrderDetailsAction,
  UpdateOrderStatus,
  fetchAdminOrders,
} from "../Actions/OrderActions";
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

    //Admin orders
    builder
      .addCase(fetchAdminOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
      })
      .addCase(fetchAdminOrders.rejected, (state) => {
        state.loading = false;
        state.error = action.error.message;
      });

    //Delete The Order
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

const OrderDetailsSlice = createSlice({
  name: "orderdetails",
  initialState: {
    order: {},
    message: null,
    error: null,
    loading: false,
    isUpdated: false,
  },
  reducers: {
    ClrOrderDetailserr: (state) => ({
      ...state,
      error: null,
    }),
    Reset_order_Updated: (state) => ({
      ...state,
      isUpdated: false,
    }),
    ClrOrderDetailsMsg: (state) => ({
      ...state,
      message: null,
    }),
  },

  extraReducers: (builder) => {
    builder
      .addCase(GetOrderDetailsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetOrderDetailsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
        state.message = action.payload.message;
      })
      .addCase(GetOrderDetailsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Update order Status
    builder
      .addCase(UpdateOrderStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.isUpdated = action.payload.success;
      })
      .addCase(UpdateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.isUpdated = false;
        state.error = action.error.message;
      });
  },
});

export const { ClrOrderDetailsMsg, ClrOrderDetailserr, Reset_order_Updated } =
  OrderDetailsSlice.actions;
export const { reducer: OrderDetailsReducer } = OrderDetailsSlice;

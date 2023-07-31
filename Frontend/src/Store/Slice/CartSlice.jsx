import { createSlice } from "@reduxjs/toolkit";

const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
const SavedShpping = JSON.parse(localStorage.getItem("shippingInfo")) || {};
const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: savedCartItems,
    shippingInfo: SavedShpping,
  },
  reducers: {
    AddtoCart: (state, action) => {
      const item = action.payload;

      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );

      if (isItemExist) {
        // If the item already exists, update its quantity
        isItemExist.quantity += item.quantity;
      } else {
        // If the item doesn't exist, add it to the cartItems array
        state.cartItems.push(item);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    //Remove
    RemoveCartitem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.product !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    IncrementQuantity: (state, action) => {
      const productId = action.payload;

      // Find the item with the specified product ID in the cartItems array
      const itemToIncrement = state.cartItems.find(
        (item) => item.product === productId
      );

      if (itemToIncrement) {
        // Increment the quantity of the item if it exists in the cart
        itemToIncrement.quantity++;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    DecrementQuantity: (state, action) => {
      const productId = action.payload;

      // Find the item with the specified product ID in the cartItems array
      const itemToDecrement = state.cartItems.find(
        (item) => item.product === productId
      );

      if (itemToDecrement) {
        // Decrement the quantity of the item if it exists in the cart
        itemToDecrement.quantity--;

        // If the quantity becomes zero, remove the item from the cart
        if (itemToDecrement.quantity === 0) {
          state.cartItems = state.cartItems.filter(
            (item) => item.product !== productId
          );
        }
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    //Shipping Info Save d
    ShippingInfoSave: (state, { payload }) => {
      state.shippingInfo = payload;
      localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo));
    },
  },
});

export const {
  AddtoCart,
  RemoveCartitem,
  IncrementQuantity,
  DecrementQuantity,
  ShippingInfoSave,
} = CartSlice.actions;
export default CartSlice.reducer;

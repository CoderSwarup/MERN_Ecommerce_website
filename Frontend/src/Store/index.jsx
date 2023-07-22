import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./Slice/UserSlice";
import { ProductDetailsReducer, productsReducer } from "./Slice/ProductSlice";

const Store = configureStore({
  reducer: {
    user: UserSlice,
    products: productsReducer,
    productDetails: ProductDetailsReducer,
  },
});

export default Store;

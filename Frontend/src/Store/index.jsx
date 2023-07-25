import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./Slice/UserSlice";
import { ProductDetailsReducer, productsReducer } from "./Slice/ProductSlice";
import { CategoryReducer } from "./Slice/CategorySlice";

const Store = configureStore({
  reducer: {
    user: UserSlice,
    products: productsReducer,
    productDetails: ProductDetailsReducer,
    categories: CategoryReducer,
  },
});

export default Store;

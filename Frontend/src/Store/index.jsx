import { configureStore } from "@reduxjs/toolkit";
import {
  ForgotPasswordReducer,
  ProfileReducer,
  UserReducer,
} from "./Slice/UserSlice";
import { ProductDetailsReducer, productsReducer } from "./Slice/ProductSlice";
import { CategoryReducer } from "./Slice/CategorySlice";
import CartSlice from "./Slice/CartSlice";

const Store = configureStore({
  reducer: {
    user: UserReducer,
    profile: ProfileReducer,
    products: productsReducer,
    productDetails: ProductDetailsReducer,
    categories: CategoryReducer,
    forgotpassword: ForgotPasswordReducer,
    cart: CartSlice,
  },
});

export default Store;

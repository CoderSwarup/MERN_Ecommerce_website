import { configureStore } from "@reduxjs/toolkit";
import {
  ForgotPasswordReducer,
  ProfileReducer,
  UserReducer,
} from "./Slice/UserSlice";
import {
  ProductDetailsReducer,
  ReviewReducer,
  productsReducer,
} from "./Slice/ProductSlice";
import { CategoryReducer } from "./Slice/CategorySlice";
import CartSlice from "./Slice/CartSlice";
import { MyorderReducer, OrderReducer } from "./Slice/OrderSlice";

const Store = configureStore({
  reducer: {
    user: UserReducer,
    profile: ProfileReducer,
    products: productsReducer,
    productDetails: ProductDetailsReducer,
    categories: CategoryReducer,
    forgotpassword: ForgotPasswordReducer,
    cart: CartSlice,
    order: OrderReducer,
    myorders: MyorderReducer,
    review: ReviewReducer,
  },
});

export default Store;

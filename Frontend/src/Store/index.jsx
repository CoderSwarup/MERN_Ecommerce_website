import { configureStore } from "@reduxjs/toolkit";
import {
  ForgotPasswordReducer,
  GetAllUserReducer,
  ProfileReducer,
  UserDetailsReducer,
  UserReducer,
} from "./Slice/UserSlice";
import {
  ProductDetailsReducer,
  ProductReviewsReducer,
  ReviewReducer,
  productsReducer,
} from "./Slice/ProductSlice";
import { CategoryReducer } from "./Slice/CategorySlice";
import CartSlice from "./Slice/CartSlice";
import {
  MyorderReducer,
  OrderDetailsReducer,
  OrderReducer,
} from "./Slice/OrderSlice";

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
    allUsers: GetAllUserReducer,
    userDetails: UserDetailsReducer,
    productReviews: ProductReviewsReducer,
    orderDetails: OrderDetailsReducer,
    category: CategoryReducer,
  },
});

export default Store;

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Header from "./Components/Layouts/Hearder/Header";
import Footer from "./Components/Layouts/Footer/Footer";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductDetails from "./Components/Product/ProductDetails";
import ProductsPage from "./Components/Product/ProductsPage";
import LoginSignup from "./Components/User/LoginSignup";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadUser } from "./Store/Actions/AuthAction";
import { clearError, clearMessage } from "./Store/Slice/UserSlice";
import UserOptions from "./Components/Layouts/Hearder/UserOptions";
import Profile from "./Components/User/Profile";
import UpdateProfile from "./Components/User/UpdateProfile";
import UpdatePassword from "./Components/User/UpdatePassword";
import ForgotPassword from "./Components/User/ForgotPassword";
import ResetPassword from "./Components/User/ResetPassword";
import Cart from "./Components/Cart/Cart";
import Shipping from "./Components/Cart/Shipping";
import ConfirmOrder from "./Components/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./Components/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./Components/Cart/OrderSuccess";
import MyOrders from "./Components/Order/Myorder";
import ProtectedRoute from "./Components/Route/ProtectedRoute";
import Dashboard from "./Components/Admin/Dashboard";
import UsersList from "./Components/Admin/UsersListDashBoard";
import UpdateUser from "./Components/Admin/UpadateUser";
import ProductReview from "./Components/Admin/ProductReview";
import OrderList from "./Components/Admin/OrderList";
import ProcessOrder from "./Components/Admin/ProcessOrder";
import PageNotFound from "./Components/Layouts/PageNotFound/PageNotFound";
import CategoryPage from "./Components/Admin/CategoryPage";
import ProductList from "./Components/Admin/ProductList";
import UpdateProduct from "./Components/Admin/UpdateProduct";
import CreateProduct from "./Components/Admin/CreateProduct";
import NewProduct from "./Components/Admin/NewProduct";
import About from "./Components/Layouts/About/About";
import Cursor from "./Components/Layouts/Cursor/Cursor";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, message, error } = useSelector((state) => {
    return state.user;
  });

  // =======
  //   STRAPE API KEY
  //========

  const [stripeapikey, setStripeApiKey] = useState("");
  const [stripeLoaded, setStripeLoaded] = useState(false);

  useEffect(() => {
    const getStripeKey = async () => {
      try {
        const { data } = await axios.get("/api/v1/payment/stripeapikey");
        setStripeApiKey(data.stripeApiKey);
        setStripeLoaded(true);
      } catch (error) {
        // Handle any error while fetching the stripe API key
      }
    };

    getStripeKey();
  }, []);

  // ========== STRAPE END

  useEffect(() => {
    dispatch(LoadUser());
    dispatch(clearMessage());
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [message, error]);

  window.onerror = function (message, source, lineno, colno, error) {
    console.log(); // Optionally, you can add additional logic here to handle the error.
    // For now, we'll just return 'true' to suppress all errors.
    return true;
  };

  //Right CLick Prevent
  addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });
  return (
    <>
      <BrowserRouter>
        <Cursor></Cursor>
        <Header>
          {isAuthenticated && (
            <>
              <UserOptions user={user}></UserOptions>

              {stripeLoaded && stripeapikey && (
                <Routes>
                  <Route
                    path="/process/payment"
                    element={
                      <Elements stripe={loadStripe(stripeapikey)}>
                        <Payment />
                      </Elements>
                    }
                  />

                  {/* Order Success Path */}
                  <Route
                    exact
                    path="/order/success"
                    element={<OrderSuccess />}
                  />
                </Routes>
              )}
            </>
          )}

          {/* Publiv paths */}
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route
              exact
              path="/product/:id"
              element={<ProductDetails />}
            ></Route>
            <Route exact path="/products" element={<ProductsPage />}></Route>
            <Route
              exact
              path="/products/:keyword"
              element={<ProductsPage />}
            ></Route>
            <Route
              exact
              path="/signin"
              element={<LoginSignup></LoginSignup>}
            ></Route>

            <Route exact path="/password/forgot" element={<ForgotPassword />} />

            <Route
              exact
              path="/password/reset/:token"
              element={<ResetPassword />}
            />

            <Route exact path="/cart" element={<Cart />}></Route>

            <Route exact path="/about" element={<About />}></Route>
            {/* Publci path end */}

            {/* Protected Routes */}

            {isAuthenticated && (
              <>
                {/* User Routes */}
                <Route exact path="/account" element={<Profile></Profile>} />
                <Route exact path="/me/update" element={<UpdateProfile />} />

                <Route
                  exact
                  path="/password/update"
                  element={<UpdatePassword />}
                />

                <Route exact path="/shipping" element={<Shipping />} />

                <Route exact path="/order/confirm" element={<ConfirmOrder />} />

                <Route exact path="/orders" element={<MyOrders />} />

                {/* Admin Routes */}
                <Route exact path="/admin" element={<ProtectedRoute />}>
                  <Route
                    path="dashboard"
                    element={<Dashboard></Dashboard>}
                  ></Route>
                  <Route exact path="users" element={<UsersList></UsersList>} />
                  <Route exact path="user/:id" element={<UpdateUser />} />
                  <Route exact path="reviews" element={<ProductReview />} />
                  <Route exact path="orders" element={<OrderList />} />
                  <Route exact path="order/:id" element={<ProcessOrder />} />
                  <Route exact path="ctegory" element={<CategoryPage />} />
                  <Route exact path="products" element={<ProductList />} />
                  <Route exact path="product/:id" element={<UpdateProduct />} />
                  <Route exact path="create-product" element={<NewProduct />} />
                </Route>

                {/* Admin Routes End */}
              </>
            )}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Header>
        <Footer></Footer>
        <ToastContainer></ToastContainer>
      </BrowserRouter>
    </>
  );
}

export default App;

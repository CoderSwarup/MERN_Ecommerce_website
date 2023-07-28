import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Components/Home/Home";
import Header from "./Components/Layouts/Hearder/Header";
import Footer from "./Components/Layouts/Footer/Footer";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductDetails from "./Components/Product/ProductDetails";
import ProductsPage from "./Components/Product/ProductsPage";
import LoginSignup from "./Components/User/LoginSignup";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadUser } from "./Store/Actions/AuthAction";
import { clearError, clearMessage } from "./Store/Slice/UserSlice";
import UserOptions from "./Components/Layouts/Hearder/UserOptions";
import ProtectedRoute from "./Components/Route/ProtectedRoute";
import Profile from "./Components/User/Profile";
import UpdateProfile from "./Components/User/UpdateProfile";
import UpdatePassword from "./Components/User/UpdatePassword";
import ForgotPassword from "./Components/User/ForgotPassword";
import ResetPassword from "./Components/User/ResetPassword";
function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, message, error } = useSelector((state) => {
    return state.user;
  });

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
  return (
    <>
      <BrowserRouter>
        <Header>
          {isAuthenticated && <UserOptions user={user}></UserOptions>}
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

            {isAuthenticated && (
              <>
                <Route
                  exact
                  path="/account"
                  element={<Profile></Profile>}
                  // element={<ProtectedRoute element={Profile} />}
                />
                <Route exact path="/me/update" element={<UpdateProfile />} />

                <Route
                  exact
                  path="/password/update"
                  element={<UpdatePassword />}
                />
              </>
            )}

            <Route exact path="/password/forgot" element={<ForgotPassword />} />
            <Route
              exact
              path="/password/reset/:token"
              element={<ResetPassword />}
            />
          </Routes>
        </Header>
        <Footer></Footer>
        <ToastContainer></ToastContainer>
      </BrowserRouter>
    </>
  );
}

export default App;

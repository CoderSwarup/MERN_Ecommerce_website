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
            <Route
              path="/account"
              element={<ProtectedRoute element={Profile} />}
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

import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Components/Home/Home";
import Header from "./Components/Layouts/Hearder/Header";
import Footer from "./Components/Layouts/Footer/Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductDetails from "./Components/Product/ProductDetails";
import ProductsPage from "./Components/Product/ProductsPage";
import LoginSignup from "./Components/User/LoginSignup";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header>
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
          </Routes>
        </Header>
        <Footer></Footer>
        <ToastContainer></ToastContainer>
      </BrowserRouter>
    </>
  );
}

export default App;

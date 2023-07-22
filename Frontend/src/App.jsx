import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Components/Home/Home";
import Header from "./Components/Layouts/Hearder/Header";
import Footer from "./Components/Layouts/Footer/Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductDetails from "./Components/Product/ProductDetails";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/product/:id" element={<ProductDetails />}></Route>
          </Routes>
          <Footer></Footer>
        </Header>
        <ToastContainer></ToastContainer>
      </BrowserRouter>
    </>
  );
}

export default App;

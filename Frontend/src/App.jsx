import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Components/Home/Home";
import Header from "./Components/Layouts/Hearder/Header";
import Footer from "./Components/Layouts/Footer/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
          </Routes>
          <Footer></Footer>
        </Header>
      </BrowserRouter>
    </>
  );
}

export default App;

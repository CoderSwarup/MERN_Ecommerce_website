import React, { useEffect, useState } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "../Product/Product";
import Metadata from "../Layouts/MetaData/Metadata";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Layouts/Loader/Loading";
import { toast } from "react-toastify";
import { fetchProducts } from "../../Store/Actions/ProductActions";
import ProductsPage from "../Product/ProductsPage";

export default function Home() {
  const dispatch = useDispatch();
  const [page, setpage] = useState(1);
  const { loading, products, error } = useSelector((state) => state.products);
  if (error) {
    toast.error(error);
  }
  useEffect(() => {
    dispatch(fetchProducts(`?page=${page}`));
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          <Metadata></Metadata>
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#FeaturedProducts">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="FeaturedProducts">
            {products.products?.map((product, i) => {
              return <Product key={i} product={product}></Product>;
            })}
          </div>
        </>
      )}
    </>
  );
}

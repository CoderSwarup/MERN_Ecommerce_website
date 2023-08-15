import React, { useEffect, useState } from "react";
import Loading from "../Layouts/Loader/Loading";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../Store/Actions/ProductActions";
import "./ProductsPage.css";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import notfound from "../../assets/Imges/nofoundImg.jpg";

import ReactJsPagination from "react-js-pagination";
import Filter from "./Filteration/Filter";
import Metadata from "../Layouts/MetaData/Metadata";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const [value, setValue] = useState([0, 40000]);
  const [isOpen, setisopen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [rating, setrating] = useState(0);

  const { loading, products, error } = useSelector((state) => state.products);
  if (error) {
    toast.error(error);
  }
  //pagination
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = products?.resultperpage || 6;
  const totalPages = Math.ceil(products?.Totalproduct / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  useEffect(() => {
    // Extract minPrice and maxPrice from the value array
    const [minPrice, maxPrice] = value;

    // Dispatch the action with the correct parameters including price filters
    if (params.keyword) {
      dispatch(fetchProducts(`?keyword=${params.keyword}&page=${activePage}`));
    }
    if (selectedCategories.length !== 0) {
      dispatch(
        fetchProducts(
          `?page=${activePage}&price[gte]=${minPrice}&price[lte]=${maxPrice}&category=${selectedCategories.join(
            "&category="
          )}&ratings[gte]=${rating}`
        )
      );
    } else {
      dispatch(
        fetchProducts(
          `?page=${activePage}&price[gte]=${minPrice}&price[lte]=${maxPrice}&ratings[gte]=${rating}`
        )
      );
    }
  }, [dispatch, params.keyword, activePage, value, selectedCategories, rating]);

  const metaTitle = "Sam Ecommerce - Products";
  const metaDescription =
    "Explore our wide range of products at Sam Ecommerce.";

  return (
    <>
      <Metadata title={metaTitle} description={metaDescription}></Metadata>
      {loading ? (
        <Loading></Loading>
      ) : (
        <div className="products-container">
          <h2 className="productsheading">Products</h2>
          <div className="products">
            <div className="filter">
              <Filter
                value={value}
                setValue={setValue}
                isOpen={isOpen}
                setisopen={setisopen}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                rating={rating}
                setrating={setrating}
              ></Filter>
            </div>
            <div className="allproducts">
              {products?.products && products.products.length > 0 ? (
                products.products.map((product) => (
                  <Product key={product._id} product={product}></Product>
                ))
              ) : (
                <div className="notfound">
                  <img src={notfound} alt="" />
                </div>
              )}
            </div>
          </div>

          <div className="pagination-container">
            {products?.Totalproduct <= products?.resultperpage ? (
              ""
            ) : (
              <ReactJsPagination
                activePage={activePage}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={products?.Totalproduct || 1}
                pageRangeDisplayed={5} // Adjust the number of pages shown in the pagination
                onChange={handlePageChange}
                itemClass="page-item"
                linkClass="page-link"
                activeClass="active"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

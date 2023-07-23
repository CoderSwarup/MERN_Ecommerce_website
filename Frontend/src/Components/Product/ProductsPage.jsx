import React, { useEffect, useState } from "react";
import Loading from "../Layouts/Loader/Loading";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../Store/Actions/ProductActions";
import "./ProductsPage.css";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

import ReactJsPagination from "react-js-pagination";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const params = useParams();
  // const [page, setpage] = useState(1);

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
    if (params.keyword) {
      dispatch(fetchProducts(`?keyword=${params.keyword}&page=${activePage}`));
    } else {
      dispatch(fetchProducts(`?page=${activePage}`));
    }
  }, [dispatch, params.keyword, activePage]);

  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        <div className="products-container">
          <h2 className="productsheading">Products</h2>
          <div className="products">
            {products?.products && products.products.length > 0 ? (
              products.products.map((product) => (
                <Product key={product._id} product={product}></Product>
              ))
            ) : (
              <div className="notfound">
                <h1>Product Not Found</h1>
              </div>
            )}
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

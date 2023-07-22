import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

export default function Product({ product }) {
  const options = {
    count: 5,
    edit: false,
    value: product.ratings,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };
  return (
    <Link
      className="productCard"
      style={{ textDecoration: "none", color: "black" }}
      to={`/product/${product._id}`}
    >
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <ReactStars {...options}></ReactStars>
        <span className="review">{product.numofreviews} Reviews</span>
      </div>
      <span>₹{product.price}</span>
    </Link>
  );
}

import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const options = {
  count: 5,
  edit: false,
  value: 2.6,
  isHalf: true,
  size: window.innerWidth < 600 ? 20 : 25,
};

export default function Product({ product }) {
  return (
    <Link
      className="productCard"
      style={{ textDecoration: "none", color: "black" }}
    >
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <ReactStars {...options}></ReactStars>{" "}
        <span className="review">255 Reviews</span>
      </div>
      <span>₹{product.price}</span>
    </Link>
  );
}

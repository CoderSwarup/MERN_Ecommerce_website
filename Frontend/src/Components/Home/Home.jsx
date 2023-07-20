import React from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "../Layouts/Product/Product";

const product = {
  _id: "22029",
  images: [
    {
      url: "https://img.freepik.com/free-photo/electronic-device-balancing-concept_23-2150422318.jpg?w=900&t=st=1689784602~exp=1689785202~hmac=acd5f5ec2be7c1d0e7d2ba9d829daf4b4079bb031411346168461b8db835e4fc",
    },
  ],
  name: "Laptop",
  price: "599.00",
};

export default function Home() {
  return (
    <>
      {/* <MetaData title="ECOMMERCE" /> */}

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
        <Product product={product}></Product>
        <Product product={product}></Product>
        <Product product={product}></Product>
        <Product product={product}></Product>
        <Product product={product}></Product>
        <Product product={product}></Product>
        <Product product={product}></Product>
        <Product product={product}></Product>
      </div>
    </>
  );
}

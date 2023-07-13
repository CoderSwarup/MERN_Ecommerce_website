const express = require("express");
const { getAllProducts } = require("../Controller/productsController");

const productRouter = express.Router();

productRouter.get("/all-products", getAllProducts);

module.exports = productRouter;

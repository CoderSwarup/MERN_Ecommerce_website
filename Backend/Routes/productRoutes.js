const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProductController,
  deleteProductcontroller,
  gteSingleProductController,
} = require("../Controller/productsController");

const productRouter = express.Router();

//create product
productRouter.post("/create-product", createProduct);

//update product
productRouter.put("/update-product/:id", updateProductController);

//delete product
productRouter.delete("/delete-product/:id", deleteProductcontroller);

//get Single Product
// productRouter.get("/single-product/:id", gteSingleProductController);
productRouter.route("/single-product/:id").get(gteSingleProductController);

productRouter.get("/all-products", getAllProducts);

module.exports = productRouter;

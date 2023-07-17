const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProductController,
  deleteProductcontroller,
  gteSingleProductController,
} = require("../Controller/productsController");
const { isAuthicatedUser, isAdmin } = require("../middleware/auth");

const productRouter = express.Router();

//create product
productRouter.post("/create-product", isAuthicatedUser, isAdmin, createProduct);

//update product
productRouter.put(
  "/update-product/:id",
  isAuthicatedUser,
  isAdmin,
  updateProductController
);

//delete product
productRouter.delete(
  "/delete-product/:id",
  isAuthicatedUser,
  isAdmin,
  deleteProductcontroller
);

//get Single Product
// productRouter.get("/single-product/:id", gteSingleProductController);
productRouter.route("/single-product/:id").get(gteSingleProductController);

productRouter.get("/all-products", getAllProducts);

module.exports = productRouter;

const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProductController,
  deleteProductcontroller,
  gteSingleProductController,
  CreateProductReviewController,
  GetProductAllRviews,
  DeleteProductReviews,
} = require("../Controller/productsController");
const { isAuthicatedUser, isAdmin } = require("../middleware/auth");

const productRouter = express.Router();

//create product
productRouter.post(
  "/admin/create-product",
  isAuthicatedUser,
  isAdmin,
  createProduct
);

//update product
productRouter.put(
  "/admin/update-product/:id",
  isAuthicatedUser,
  isAdmin,
  updateProductController
);

//delete product
productRouter.delete(
  "/admin/delete-product/:id",
  isAuthicatedUser,
  isAdmin,
  deleteProductcontroller
);

//get Single Product
// productRouter.get("/single-product/:id", gteSingleProductController);
productRouter.route("/single-product/:id").get(gteSingleProductController);

productRouter.get("/all-products", getAllProducts);

//reviews of products
productRouter
  .route("/review")
  .put(isAuthicatedUser, CreateProductReviewController);

//get all reviews of th product
productRouter.route("/get-reviews/:id").get(GetProductAllRviews);

//delete review
productRouter
  .route("/delete-reviews/:id")
  .delete(isAuthicatedUser, DeleteProductReviews);
module.exports = productRouter;

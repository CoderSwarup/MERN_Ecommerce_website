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
  getAlladminProducts,
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
productRouter
  .route("/admin/get-reviews/:id")
  .get(isAuthicatedUser, isAdmin, GetProductAllRviews);

//delete review
productRouter
  .route("/admin/delete-reviews/:id")
  .delete(isAuthicatedUser, isAdmin, DeleteProductReviews);

//Get all admin product
productRouter
  .route("/admin/products")
  .get(isAuthicatedUser, isAdmin, getAlladminProducts);

module.exports = productRouter;

const express = require("express");
const {
  categorycontroller,
  updatecategorycontroller,
  categoryallcontroller,
  deleteCategorycontroller,
} = require("../Controller/categoryController");
const { isAuthicatedUser, isAdmin } = require("../middleware/auth");
const CategoryRouter = express.Router();

CategoryRouter.route("/admin/create-category").post(
  isAuthicatedUser,
  isAdmin,
  categorycontroller
);

CategoryRouter.route("/admin/update-category/:id").put(
  isAuthicatedUser,

  isAdmin,
  updatecategorycontroller
);

CategoryRouter.route("/all-category").get(categoryallcontroller);

CategoryRouter.route("/admin/delete-category/:id").delete(
  isAuthicatedUser,
  isAdmin,
  deleteCategorycontroller
);

module.exports = CategoryRouter;

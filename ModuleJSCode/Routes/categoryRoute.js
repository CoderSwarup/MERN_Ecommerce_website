import express from "express";
import {
  categorycontroller,
  updatecategorycontroller,
  categoryallcontroller,
  deleteCategorycontroller,
} from "../Controller/categoryController.js";
import { isAuthicatedUser, isAdmin } from "../middleware/auth.js";

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

export default CategoryRouter;

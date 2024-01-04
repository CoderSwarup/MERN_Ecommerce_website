import express from "express";
import { isAuthicatedUser, isAdmin } from "../middleware/auth.js";
import {
  newOrderController,
  GetMyOrder,
  GetUserOrdersByAdmin,
  GetAllOrdersAdmin,
  UpdateOrder,
  DeleteOrder,
  IvoiceController,
} from "../Controller/orderController.js";

const OrderRouter = express.Router();

OrderRouter.route("/order/new").post(isAuthicatedUser, newOrderController);

//get single order
OrderRouter.route("/myorder").get(isAuthicatedUser, GetMyOrder);

//get all orders for admin
OrderRouter.route("/admin/getallorders").get(
  isAuthicatedUser,
  isAdmin,
  GetAllOrdersAdmin
);

OrderRouter.route("/admin/orderdetails/:id").get(
  isAuthicatedUser,
  isAdmin,
  GetUserOrdersByAdmin
);

OrderRouter.route("/admin/update/order/:id").put(
  isAuthicatedUser,
  isAdmin,
  UpdateOrder
);

OrderRouter.route("/admin/delete-order/:id").delete(
  isAuthicatedUser,
  isAdmin,
  DeleteOrder
);

OrderRouter.route("/invoices/download/:id").get(IvoiceController);

export default OrderRouter;

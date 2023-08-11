const express = require("express");
const { isAuthicatedUser, isAdmin } = require("../middleware/auth");
const {
  newOrderController,
  GetMyOrder,
  GetUserOrdersByAdmin,
  GetAllOrdersAdmin,
  UpdateOrder,
  DeleteOrder,
  IvoiceController,
} = require("../Controller/orderController");

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

module.exports = OrderRouter;

const express = require("express");
const { isAuthicatedUser, isAdmin } = require("../middleware/auth");
const {
  newOrderController,
  GetMyOrder,
  GetUserOrdersByAdmin,
  GetAllOrdersAdmin,
  UpdateOrder,
  DeleteOrder,
} = require("../Controller/orderController");

const OrderRouter = express.Router();

OrderRouter.route("/order/new").post(isAuthicatedUser, newOrderController);

//get single order
OrderRouter.route("/myorder").get(isAuthicatedUser, GetMyOrder);

//get all orders for admin
OrderRouter.route("/getallorders").get(
  isAuthicatedUser,
  isAdmin,
  GetAllOrdersAdmin
);

OrderRouter.route("/update/order/:id").put(
  isAuthicatedUser,
  isAdmin,
  UpdateOrder
);

OrderRouter.route("/delete/order/:id").delete(
  isAuthicatedUser,
  isAdmin,
  DeleteOrder
);

module.exports = OrderRouter;

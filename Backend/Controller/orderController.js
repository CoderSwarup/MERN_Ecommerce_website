const orderModel = require("../Model/order.model");
const productModel = require("../Model/product.model");
const ErrorHandler = require("../utils/ErrorHandler");
const { ThrowError } = require("../utils/ErrorHelper");

//Create new order
exports.newOrderController = async (req, res) => {
  try {
    const {
      shippingInfo,
      orderItems,
      itemPrice,
      taxPrice,
      shippingPrice,
      paymentInfo,
      totalPrice,
    } = req.body;

    const order = await orderModel.create({
      shippingInfo,
      orderItems,
      itemPrice,
      paymentInfo,
      taxPrice,
      shippingPrice,
      totalPrice,
      user: req.user._id,
      paidAt: new Date(Date.now()),
    });

    res.status(200).send({
      success: true,
      message: "order is Created  ",
      order,
    });
  } catch (error) {
    console.log(error);
    ThrowError(error, res, "New Order");
  }
};

//get single order
exports.GetMyOrder = async (req, res) => {
  try {
    const order = await orderModel.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    ThrowError(error, res, "Getting Single Order");
  }
};

//admin single user order show
exports.GetUserOrdersByAdmin = async (req, res) => {
  try {
    const order = await orderModel
      .find({ user: req.params.id })
      .populate("user", "name email");

    res.status(200).json({
      success: true,
      message: `${req.params.id} user Order Founded`,
      order,
    });
  } catch (error) {
    ThrowError(error, res, "Getting Single Order");
  }
};

//Get all orders for admin
exports.GetAllOrdersAdmin = async (req, res) => {
  try {
    const orders = await orderModel.find({}).populate("user", "name email");

    let totoalPrice = 0;
    orders?.forEach((order) => {
      totoalPrice += order.totalPrice;
    });

    res.status(200).json({
      success: true,
      message: `user Orders Founded`,
      totoalPrice,
      orders,
    });
  } catch (error) {
    ThrowError(error, res, "Getting Single Order");
  }
};

//Update Order Status
exports.UpdateOrder = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);

    if (!order) {
      throw ErrorHandler.customError("Order Not Found ", 404);
    }

    if (order.orderStatus === "delivered") {
      throw ErrorHandler.customError("Order Delivered Already", 404);
    }

    //update the status of order to delivered and save it in database

    order.orderItems.forEach(async (order) => {
      await updateStock(order.product, order.quantity);
    });

    order.orderStatus = req.body.new_status || order.orderStatus;
    if (req.body.new_status == "delivered") {
      order.deliveredAt = new Date(Date.now());
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).send({
      success: true,
      message: "Order Status Is Updated",
    });

    async function updateStock(id, quantity) {
      const product = await productModel.findById(id);
      product.stock -= quantity;

      await product.save({ validateBeforeSave: false });
    }
  } catch (error) {
    ThrowError(error, res, "Update Order Status");
  }
};

// delete order
exports.DeleteOrder = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);
    if (!order) throw ErrorHandler.customError("Order Not Found", 404);
    await order.deleteOne();
    res.status(200).send({
      success: true,
      message: "Order Deleted Successfully",
    });
  } catch (error) {
    ThrowError(error, res, "Deleting order");
  }
};

import orderModel from "../Model/order.model.js";
import productModel from "../Model/product.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { ThrowError } from "../utils/ErrorHelper.js";
import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";

// Create new order
export const newOrderController = async (req, res) => {
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
      message: "order is Created",
      order,
    });
  } catch (error) {
    console.log(error);
    ThrowError(error, res, "New Order");
  }
};

//get single order
export const GetMyOrder = async (req, res) => {
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
export const GetUserOrdersByAdmin = async (req, res) => {
  try {
    const order = await orderModel
      .findById(req.params.id)
      .populate({
        path: "orderItems.product",
        select: "name email images", // Include specific fields from the product
      })
      .exec();

    if (!order) {
      throw ErrorHandler.customError("Order Not Found", 400);
    }

    res.status(200).json({
      success: true,
      message: `${req.params.id} user Order Founded`,
      order,
    });
  } catch (error) {
    console.log(error);
    ThrowError(error, res, "Getting Single Order");
  }
};

//Get all orders for admin
export const GetAllOrdersAdmin = async (req, res) => {
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
export const UpdateOrder = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);
    if (!order) {
      throw ErrorHandler.customError("Order Not Found ", 404);
    }

    if (order.orderStatus === "Delivered") {
      throw ErrorHandler.customError("Order Delivered Already", 404);
    }

    //update the status of order to delivered and save it in database
    if (req.body.status === "Shipped") {
      order.orderItems.forEach(async (order) => {
        await updateStock(order.product, order.quantity);
      });
    }

    order.orderStatus = req.body.status || order.orderStatus;
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
      if (!product) {
        throw ErrorHandler.customError("Product Will Not Found Soory ", 400);
      }

      product.stock -= quantity;

      await product.save({ validateBeforeSave: false });
    }
  } catch (error) {
    ThrowError(error, res, "Update Order Status");
  }
};

// delete order
export const DeleteOrder = async (req, res) => {
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

// index.js

//Generating Invoice Controller
export const IvoiceController = async (req, res) => {
  try {
    const invoiceId = req.params.id;

    const Order = await orderModel.findById(invoiceId).populate("user", "name");
    if (!Order) {
      throw ErrorHandler.customError("Order Is Not Found Sorry", 400);
    }
    const { shippingInfo, totalPrice, user, orderStatus } = Order;
    // Create a PDF document in memory
    const doc = new PDFDocument();
    const buffers = [];
    doc.on("data", (chunk) => buffers.push(chunk));
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);

      // Send the PDF as a response with appropriate headers
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="invoice_${invoiceId}.pdf"`
      );
      res.send(pdfData);
    });

    // Add content and styles to the PDF (customize according to your invoice data and style)
    let url = path.join(__dirname, "./download.jpg");

    //Pdf Header
    doc
      .image(url, 50, 45, { width: 50 })
      .fillColor("#444444")
      .fontSize(20)
      .text("SAM_ECOMM", 110, 57)
      .fontSize(10)
      .text("123 Bhedshi", 200, 65, { align: "right" })
      .text("Maharastra, IN, 416512", 200, 80, { align: "right" })
      .moveDown();

    // Set a lighter stroke color
    const lighterColor = "#D3D3D3"; // You can adjust the color value here
    doc.strokeColor(lighterColor);

    //generate Coustemor Info
    doc.fontSize(20).text("INVOICE", 50, 175).moveDown();

    const lineY = 120; // Y-coordinate of the line
    const lineLength = 700; // Length of the line
    doc.moveTo(0, lineY).lineTo(lineLength, lineY).stroke(10);

    doc
      .fontSize(10)
      .text(`Invoice Number: ${invoiceId}`, 50, 200)
      .text(`Invoice Date: ${new Date()}`, 50, 215)
      .text(user.name, 400, 200)
      .text(shippingInfo.address, 400, 215)
      .fontSize(30)
      .text(`Total Paid : ${totalPrice}`, 50, 250)
      .fontSize(10)
      .text(
        `${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.country}`,
        400,
        230
      )
      .moveDown();

    doc
      .fontSize(20)
      .fillColor(orderStatus == "Delivered" ? "green" : "red")
      .text(`Order Status : ${orderStatus}`, 50, 300)
      .fillColor("#000")
      .fontSize(10)
      .moveDown();

    // Draw the table headers

    //Pdf Footer
    // doc.fontSize(10).text(" Thank you for Choose SAMECOMM.", 50, 700, {
    //   align: "center",
    //   width: 500,
    // });
    doc.end();
  } catch (error) {
    // console.error("Error generating invoice:", error);
    // res.status(500).json({ error: "Internal server error" });
    ThrowError(error, res, "Generating Invoice Invoice");
  }
};

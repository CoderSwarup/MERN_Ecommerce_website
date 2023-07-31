const express = require("express");
const productRouter = require("./Routes/productRoutes");
const errormiddleware = require("./middleware/errormiddleware");
const userRouter = require("./Routes/userRoutes");
const cookieParser = require("cookie-parser");
const OrderRouter = require("./Routes/orderRoutes");
const CategoryRouter = require("./Routes/categoryRoute");
const app = express();
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const PaymentRouter = require("./Routes/PaymentRoute");
//middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//error middleware // No need this
app.use(function (error, rq, res, next) {
  console.log("errro");
});

// Routes
app.use("/api/v1/category", CategoryRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1/orders", OrderRouter);
app.use("/api/v1/payment", PaymentRouter);

module.exports = app;

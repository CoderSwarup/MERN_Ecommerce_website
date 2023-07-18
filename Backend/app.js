const express = require("express");
const productRouter = require("./Routes/productRoutes");
const errormiddleware = require("./middleware/errormiddleware");
const userRouter = require("./Routes/userRoutes");
const cookieParser = require("cookie-parser");
const OrderRouter = require("./Routes/orderRoutes");

const app = express();
//middleware
app.use(express.json());
app.use(cookieParser());

//error middleware // No need this
app.use(function (error, rq, res, next) {
  console.log("errro");
});

// Routes
app.use("/api/v1/products", productRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1/orders", OrderRouter);

module.exports = app;

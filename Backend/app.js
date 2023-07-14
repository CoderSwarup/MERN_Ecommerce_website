const express = require("express");
const productRouter = require("./Routes/productRoutes");
const errormiddleware = require("./middleware/errormiddleware");

const app = express();
//middleware
app.use(express.json());

//error middleware // No need this
// app.use(errormiddleware)

// Routes
app.use("/api/v1/products", productRouter);

module.exports = app;

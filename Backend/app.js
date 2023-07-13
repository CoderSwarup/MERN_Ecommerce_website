const express = require("express");
const productRouter = require("./Routes/productRoutes");

const app = express();

// Routes
app.use("/api/v1/products", productRouter);

module.exports = app;

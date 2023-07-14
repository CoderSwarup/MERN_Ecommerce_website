const productModel = require("../Model/product.model");
const ErrorHandler = require("../utils/errorhandler");

//create Product  => Admin
exports.createProduct = async (req, res) => {
  try {
    const product = await productModel(req.body);

    product.save();
    res.status(201).send({
      success: true,
      message: "Created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
  }
};

//update product => admin
exports.updateProductController = async (req, res) => {
  try {
    const id = req.params.id;

    let product = await productModel.findById(id);
    // console.log(id, product);
    if (!product) {
      return res.status(500).send({
        success: false,
        message: "Product Not Found ",
      });
    }

    product = await productModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndmodify: false,
    });

    res.status(201).send({
      success: true,
      message: `The Product  been updated successfully`,
      product,
    });
  } catch (error) {
    console.log(error);
  }
};

//delete product => admin
exports.deleteProductcontroller = async (req, res) => {
  try {
    const id = req.params.id;

    let product = await productModel.findById(id);
    // console.log(id, product);
    if (!product) {
      throw ErrorHandler.NotFoundError("Product Not Found ");
    }

    await productModel.findByIdAndDelete(id);

    res.status(201).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    // console.log({ error });
    res.status(error.status).send(error);
  }
};

//get single product
exports.gteSingleProductController = async (req, res) => {
  try {
    const id = req.params.id;

    let product = await productModel.findById(id);
    // console.log(id, product);
    if (!product) {
      throw ErrorHandler.NotFoundError("product Not Found");
      // throw ErrorHandler.customError("Product Not Found", 400);
    }
    res.status(201).send({
      success: true,
      message: "Product is Found",
      product,
    });
  } catch (error) {
    // console.log(error);
    // res.status(error.status).send({
    //   success: false,
    //   message: error.message,
    // });
    res.status(error.status).send(error);
    // next(error);
  }
};

// getall products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find({});

    if (products) {
      res.status(201).send({
        success: true,
        message: "Products fetched Succefully",
        products,
      });
    } else {
      throw ErrorHandler.NotFoundError("Products Not Found");
    }
  } catch (error) {
    res.status(error.status).send(error);
  }
};

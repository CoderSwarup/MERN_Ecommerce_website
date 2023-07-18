const productModel = require("../Model/product.model");
const ApiFeatures = require("../utils/ApiFeatures");
const ErrorHandler = require("../utils/ErrorHandler");
const { ThrowError } = require("../utils/ErrorHelper");
//create Product  => Admin
exports.createProduct = async (req, res) => {
  try {
    req.body.createdBy = req.user._id;
    const product = await productModel(req.body);

    product
      .save()
      .then(() => {
        res.status(201).send({
          success: true,
          message: "Created successfully",
          product,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send({
          status: false,
          message: "All Fields Are Required",
        });
      });

    // ValidationError
  } catch (error) {
    ThrowError(error, res, "creating Product");
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
    ThrowError(error, res, "updating Product");
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
    ThrowError(error, res, "deleting Product");
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
    ThrowError(error, res, "Geting Single Product");
    // next(error);
  }
};

// getall products
exports.getAllProducts = async (req, res) => {
  try {
    const ProductCount = await productModel.countDocuments();
    const apiFeatures = new ApiFeatures(productModel.find({}), req.query)
      .search()
      .filter()
      .pagination(2);

    // const products = await productModel.find({});
    const products = await apiFeatures.query;

    if (products) {
      res.status(201).send({
        success: true,
        message: "Products fetched Succefully",
        Totalproduct: ProductCount,
        products,
      });
    } else {
      throw ErrorHandler.NotFoundError("Products Not Found");
    }
  } catch (error) {
    ThrowError(error, res, "all Product");
  }
};

//Review Controller
exports.CreateProductReviewController = async (req, res) => {
  try {
    const { rating, comment, productId } = req.body;

    if (!rating) throw ErrorHandler.customError("Rating Are Require", 201);
    if (!comment) throw ErrorHandler.customError("Comment is Require", 201);
    if (!productId)
      throw ErrorHandler.customError(
        "Review Not Save Sorry please Try Later",
        201
      );

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    const product = await productModel.findById(productId);

    //More functionality that if review is already addedt then update it
    // const isReviewed = product.reviews.find(rev =>rev.user.toString() == req.user._id.toString())

    //save review
    product.reviews.push(review);
    product.numofreviews = product.reviews.length;

    //finding rating avg
    let avg = 0;
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;
    await product.save({ validateBeforeSave: false });
    res.status(200).send({
      success: true,
      message: "Your Review is Saved",
    });
  } catch (error) {
    ThrowError(error, res, "Product Review");
  }
};

//fetching singlr product review
exports.GetProductAllRviews = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (!product) {
      throw ErrorHandler.customError("Product Not Found", 404);
    }
    return res.json({ success: true, reviews: product.reviews });
  } catch (error) {
    console.log(error);
    ThrowError(error, res, "Product review find");
  }
};

//deleting product review
exports.DeleteProductReviews = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (!product) {
      throw ErrorHandler.customError("Product Not Found", 404);
    }

    let reviews = product.reviews.filter((rev) => {
      return rev._id.toString() !== req.query.reviewid.toString();
    });

    let avg = 0;
    reviews.forEach((rev) => {
      avg += rev.rating;
    });
    const ratings = avg / reviews.length;
    const numofreviews = reviews.length;

    await productModel.findByIdAndUpdate(
      req.params.id,
      {
        reviews,
        ratings,
        numofreviews,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    ThrowError(error, res, "Delete Review Product");
  }
};

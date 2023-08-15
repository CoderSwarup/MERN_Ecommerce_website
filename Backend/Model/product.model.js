const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      maxLength: [8, "Price Cannot exceed 8 Charater"],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: [true, "Please Enter Product Category"],
    },
    stock: {
      type: Number,
      min: [0, "Product Stock should be greater than or equal to one"],
      default: 1,
    },
    numofreviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.ObjectId,
          res: "User",
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],

    createdAt: {
      type: Date,
      default: Date.now(),
    },
    createdBy: {
      type: mongoose.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Product", productSchema);

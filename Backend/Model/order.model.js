const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    shippingInfo: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
        default: "india",
      },
      pincode: {
        type: Number,
        required: true,
      },
      mobile: {
        type: Number,
        required: true,
      },
    },
    orderItems: [
      {
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        product: {
          type: mongoose.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.ObjectId,
      ref: "User",
      required: true,
    },
    paymentInfo: {
      id: {
        type: String,
        required: true,
      },
      status: {
        type: Boolean,
        require: false,
      },
    },
    paidAt: {
      type: Date,
      required: true,
    },
    itemPrice: {
      type: Number,
      default: 0,
    },
    taxPrice: {
      type: Number,
      default: 0,
    },
    shippingPrice: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    orderStatus: {
      type: String,
      enum: ["pending", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    deliveredAt: Date,
    createdAt: {
      type: Date,
      default: new Date(Date.now()),
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Order", OrderSchema);

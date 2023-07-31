const PaymentRouter = require("express").Router();
const {
  paymentController,
  sendStripeApiKey,
} = require("../Controller/PaymentController");
const { isAuthicatedUser } = require("../middleware/auth");

PaymentRouter.route("/process/payment").post(
  isAuthicatedUser,
  paymentController
);

PaymentRouter.route("/stripeapikey").get(isAuthicatedUser, sendStripeApiKey);

module.exports = PaymentRouter;

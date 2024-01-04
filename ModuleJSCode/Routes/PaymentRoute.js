import express from "express";
import {
  paymentController,
  sendStripeApiKey,
} from "../Controller/PaymentController.js";
import { isAuthicatedUser } from "../middleware/auth.js";

const PaymentRouter = express.Router();

PaymentRouter.route("/process/payment").post(
  isAuthicatedUser,
  paymentController
);

PaymentRouter.route("/stripeapikey").get(isAuthicatedUser, sendStripeApiKey);

export default PaymentRouter;

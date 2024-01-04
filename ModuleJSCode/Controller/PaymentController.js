import { ThrowError } from "../utils/ErrorHelper.js";
import dotenv from "dotenv";
import stripe from "stripe";
dotenv.config();

stripe(process.env.STRIPE_SECRET_KEY);
export const paymentController = async (req, res) => {
  try {
    const makePayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      metadata: {
        company: "Ecommerce",
      },
    });

    res.status(200).send({
      success: true,
      message: "Payment Successful.",
      client_secret: makePayment.client_secret,
    });
  } catch (error) {
    console.log(error);
    ThrowError(error, res, "Processing Payment");
  }
};

export const sendStripeApiKey = async (req, res, next) => {
  try {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_PUBLIC_API_KEY });
  } catch (error) {
    ThrowError(error, res, "Send Api Key");
  }
};

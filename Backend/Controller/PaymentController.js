const { ThrowError } = require("../utils/ErrorHelper");
const dotenv = require("dotenv");
dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
exports.paymentController = async (req, res) => {
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

exports.sendStripeApiKey = async (req, res, next) => {
  try {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_PUBLIC_API_KEY });
  } catch (error) {
    ThrowError(error, res, "Send Api Key");
  }
};

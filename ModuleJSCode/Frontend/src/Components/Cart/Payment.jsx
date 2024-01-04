import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps ";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../Layouts/MetaData/Metadata";
import Typography from "@mui/material/Typography";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import "./payment.css";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { ClearOrderError, ClearOrderMsg } from "../../Store/Slice/OrderSlice";
import { CreateNewOrder } from "../../Store/Actions/OrderActions";

export default function Payment() {
  const stripe = useStripe();
  const elements = useElements();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const Navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  //   const alert = useAlert();

  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  // const { error, loading, message } = useSelector((state) => state.order);

  const paymentData = {
    amount: Math.round(orderInfo?.totalPrice * 100),
  };

  //Order data
  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo?.subtotal,
    taxPrice: orderInfo?.tax,
    shippingPrice: orderInfo?.shippingCharges,
    totalPrice: orderInfo?.totalPrice,
  };
  console.log(order);

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process/payment",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });
      if (result.error) {
        payBtn.current.disabled = false;

        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(CreateNewOrder(order));

          toast.success(data.message);

          Navigate("/order/success");
          sessionStorage.removeItem("orderInfo");
          localStorage.removeItem("shippingInfo");
          localStorage.removeItem("cartItems");
        } else {
          toast.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      console.log(error);
      payBtn.current.disabled = false;
      toast.error(error.response.data.message);
    }
  };

  // useEffect(() => {
  //   if (error) {
  //     toast.error(error);
  //     dispatch(ClearOrderError());
  //   }
  //   if (message) {
  //     toast.success(message);
  //     dispatch(ClearOrderMsg());
  //   }
  // }, [dispatch, error, message]);

  // console.log(location.pathname);
  useEffect(() => {
    if (!orderInfo) {
      Navigate("/account", {
        state: location.pathname,
      });
    }
  }, []);

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
  );
}

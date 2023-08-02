import React, { useEffect } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./orderSuccess.css";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ResetOrderSuccess } from "../../Store/Slice/OrderSlice";

export default function OrderSuccess() {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const { success } = useSelector((state) => {
    return state.order;
  });

  const Orders = (e) => {
    e.preventDefault();
    dispatch(ResetOrderSuccess());
    Navigate("/orders");
  };
  // useEffect(() => {
  //   if (success === false) {
  //     Navigate("/account");
  //   }
  // });
  return (
    <div className="orderSuccess">
      <CheckCircleIcon />

      <Typography>Your Order has been Placed successfully </Typography>
      <button onClick={Orders}>View Orders</button>
    </div>
  );
}

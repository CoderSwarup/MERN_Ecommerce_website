import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../Layouts/MetaData/Metadata";
import { Link, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import SideBar from "./Sidebar";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Layouts/Loader/Loading";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import Button from "@mui/material/Button";
import "./processOrder.css";
import { toast } from "react-toastify";
import {
  ClrOrderDetailsMsg,
  ClrOrderDetailserr,
} from "../../Store/Slice/OrderSlice";
import {
  GetOrderDetailsAction,
  UpdateOrderStatus,
} from "../../Store/Actions/OrderActions";
import { Reset_Is_Updated } from "../../Store/Slice/UserSlice";

const ProcessOrder = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [isProcess, setisProcess] = useState(false);
  //   const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { loading, error, order, isUpdated, message } = useSelector(
    (state) => state.orderDetails
  );
  const updateOrderSubmitHandler = (e) => {
    setisProcess(true);
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(UpdateOrderStatus([params.id, myForm]));
    setisProcess(false);
  };

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(ClrOrderDetailserr());
    }

    if (message) {
      toast.success(message);
      dispatch(ClrOrderDetailsMsg());
    }
  }, [dispatch, params.id, message, error]);
  useEffect(() => {
    dispatch(GetOrderDetailsAction(params.id));
    if (isUpdated) {
      dispatch(Reset_Is_Updated());
    }
  }, [dispatch, isUpdated]);
  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                display: order?.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirmshippingArea">
                  <Typography>Shipping Info</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Name:</p>
                      <span>{order?.user && order.user.name}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>
                        {order?.shippingInfo && order?.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {order?.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>

                  <Typography>Payment</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order?.paymentInfo &&
                          order?.paymentInfo.status === "succeeded"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order?.paymentInfo &&
                        order?.paymentInfo.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </p>
                    </div>

                    <div>
                      <p>Amount:</p>
                      <span>{order?.totalPrice && order?.totalPrice}</span>
                    </div>
                  </div>

                  <Typography>Order Status</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order?.orderStatus &&
                          order?.orderStatus === "Delivered"
                            ? "green"
                            : "red"
                        }
                      >
                        {order?.orderStatus && order?.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="confirmCartItems">
                  <Typography>Your Cart Items:</Typography>
                  <div className="confirmCartItemsContainer">
                    {order?.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <Link to={`/product/${item.product}`}>
                            <OpenInNewIcon color="tomato" />
                          </Link>
                          {/* <img src={item.image} alt="Product" /> */}
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                          <span>
                            {item?.quantity} X ₹{item.price} ={" "}
                            <b>₹{item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {/*  */}
              <div
                style={{
                  display: order.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <form className="updateOrderForm">
                  <h1>Process Order</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {order.orderStatus === "pending" && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <button
                    className="SearchBtn"
                    disabled={isProcess}
                    onClick={updateOrderSubmitHandler}
                  >
                    Process
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;

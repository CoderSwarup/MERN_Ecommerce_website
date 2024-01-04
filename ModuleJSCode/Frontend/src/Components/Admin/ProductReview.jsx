import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./productReviews.css";
import { useSelector, useDispatch } from "react-redux";

import Button from "@mui/material/Button";
import MetaData from "../Layouts/MetaData/Metadata";
import DeleteIcon from "@mui/icons-material/Delete";
import Star from "@mui/icons-material/Star";

import SideBar from "./Sidebar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  DeleteProductReview,
  GetProductReviews,
} from "../../Store/Actions/ProductActions";
import {
  ProductReviewsErrClr,
  Reset_Is_Deleted,
} from "../../Store/Slice/ProductSlice";

export default function ProductReview() {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const { error, reviews, loading, isDeleted } = useSelector(
    (state) => state.productReviews
  );

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    if (productId === "") {
      return toast.info("Please Fill The ProductId");
    }
    if (productId.length > 24) {
      return toast.info("Product Id Is Not Valid Please Check");
    }

    dispatch(DeleteProductReview([productId, reviewId]));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    if (productId === "") {
      return toast.info("Please Fill The ProductId");
    }
    if (productId.length > 24) {
      return toast.info("Product Id Is Not Valid Please Check");
    }
    dispatch(GetProductReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(GetProductReviews(productId));
    }
    if (error) {
      toast.error(error);
      dispatch(ProductReviewsErrClr);
    }

    if (isDeleted) {
      toast.success(isDeleted);
      Navigate("/admin/reviews");
      dispatch(Reset_Is_Deleted());
    }
  }, [dispatch, error, isDeleted, productId]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,

      // cellClassName: (params) => {
      //   return params.getValue(params.id, "rating") >= 3
      //     ? "greenColor"
      //     : "redColor";
      // },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <div
            onClick={() => {
              deleteReviewHandler(params.row.id);
            }}
          >
            <Button>
              <DeleteIcon />
            </Button>
          </div>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL REVIEWS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

            <div>
              <Star />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <span onClick={productReviewsSubmitHandler}>
              <Button
                className="SearchBtn"
                type="submit"
                disabled={
                  loading ? true : false || productId === "" ? true : false
                }
              >
                Search
              </Button>
            </span>
          </form>

          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <h1 className="productReviewsFormHeading">No Reviews Found</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
}

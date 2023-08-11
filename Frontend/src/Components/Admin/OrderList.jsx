import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import MetaData from "../Layouts/MetaData/Metadata";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import { fetchAdminOrders } from "../../Store/Actions/OrderActions";
import { ClearOrderError } from "../../Store/Slice/OrderSlice";

const OrderList = () => {
  const dispatch = useDispatch();

  const { error, orders } = useSelector((state) => state.order);

  // const deleteOrderHandler = (id) => {
  //   // dispatch(deleteOrder(id));
  // };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearOrderError());
    }

    dispatch(fetchAdminOrders());
  }, [dispatch, error]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
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
          <Fragment>
            <Link to={`/admin/order/${params.row.id}`}>
              <EditIcon />
            </Link>

            {/* <div
              onClick={() => {
                deleteOrderHandler(params.row.id);
              }}
            >
              <Button>
                <DeleteIcon />
              </Button>
            </div> */}
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
            getCellClassName={(params) => {
              if (params.field === "status") {
                return params.value === "Delivered" ? "green" : "red";
              }
            }}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;

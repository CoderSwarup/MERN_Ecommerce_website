import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./myOrders.css";
import { saveAs } from "file-saver";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Layouts/Loader/Loading";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import MetaData from "../Layouts/MetaData/Metadata";
import LaunchIcon from "@mui/icons-material/Download";
import { toast } from "react-toastify";
import { FetchMyorders } from "../../Store/Actions/OrderActions";
import { ClearMyorderErr } from "../../Store/Slice/OrderSlice";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

export default function MyOrders() {
  const dispatch = useDispatch();
  const [download, setDownload] = useState(false);

  const { loading, error, orders } = useSelector((state) => state.myorders);
  const [downloadingId, setDownloadingId] = useState(null);
  const { user } = useSelector((state) => state.user);

  const DownloadHandler = async (id) => {
    ///
    try {
      setDownloadingId(id);
      setDownload(true);
      const response = await axios.get(
        `api/v1/orders/invoices/download/${id}`,
        {
          responseType: "blob", // Important: Set the responseType to 'blob'
        }
      );

      const blob = response.data;

      // Save the Blob as a file with FileSaver.js
      saveAs(blob, `invoice_${id}.pdf`);
      setDownload(false);
      setDownloadingId(null);
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.message);
    }
  };

  const GridColDef = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.value === "Delivered"
          ? { backgroundColor: "green", color: "white" }
          : { backgroundColor: "red", color: "white" };
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
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
        const orderId = params.row.id; // Assuming the orderId is available in the "actions" field
        return (
          <>
            {downloadingId === orderId && download ? (
              <Stack
                sx={{ color: "grey.200" }}
                size="120"
                spacing={2}
                direction="row"
              >
                <CircularProgress color="success" />
              </Stack>
            ) : (
              <div onClick={() => DownloadHandler(orderId)}>
                <LaunchIcon />
              </div>
            )}
          </>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(ClearMyorderErr());
    }

    dispatch(FetchMyorders());
  }, [dispatch, error]);

  return (
    <Fragment>
      <MetaData title={`${user?.user?.name} - Orders`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={GridColDef}
            getCellClassName={(params) => {
              if (params.field === "status") {
                return params.value == "pending" ? "red" : "green";
              }
            }}
          />

          {/* <DataGrid */}
          {/* rows={rows} */}
          {/* columns={columns} */}
          {/* pageSize={10} */}
          {/* disableSelectionOnClick className="myOrdersTable" autoHeight */}
          {/* /> */}
          <Typography id="myOrdersHeading">
            {user?.user?.name}'s Orders
          </Typography>
        </div>
      )}
    </Fragment>
  );
}

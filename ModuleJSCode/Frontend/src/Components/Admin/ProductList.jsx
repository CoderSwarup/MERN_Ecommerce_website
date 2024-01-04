import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import MetaData from "../Layouts/MetaData/Metadata";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import { toast } from "react-toastify";
import {
  deleteProductAction,
  getAllAdmingProducts,
} from "../../Store/Actions/ProductActions";
import {
  ClearProductMsg,
  ClearProductsError,
} from "../../Store/Slice/ProductSlice";

export default function ProductList() {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deletedata, setdeletedata] = useState(null);
  const [deletebtn, setdeletebtn] = useState(false);
  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setdeletedata(null);
    setOpenDeleteDialog(false);
  };

  const { error, products, message } = useSelector((state) => state.products);

  //   const { error: deleteError, isDeleted } = useSelector(
  //     (state) => state.product
  //   );

  const deleteProductHandler = () => {
    if (deletedata == null) {
      return toast.error("some thing Wrong Please try After SomeTime");
    }
    console.log(deletedata.id);

    dispatch(deleteProductAction(deletedata.id));
    handleCloseDeleteDialog();
    setdeletebtn(false);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(ClearProductsError());
    }
    if (message) {
      toast.success(message);
      dispatch(ClearProductMsg());
    }

    // if (deleteError) {
    //   toast.error(deleteError);
    //   dispatch(clearErrors());
    // }

    // if (isDeleted) {
    //   toast.success("Product Deleted Successfully");
    // }

    dispatch(getAllAdmingProducts());
  }, [dispatch, toast, error, message]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.6,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 90,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
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
            <Link to={`/admin/product/${params.row.id}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() => {
                setdeletedata({ id: params.row.id, name: params.row.name });
                handleOpenDeleteDialog();
              }}
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  products?.products &&
    products?.products?.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the Product:
            <b style={{ color: "red" }}>{deletedata?.name}</b> ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={deleteProductHandler}
            disabled={deletebtn}
            color="secondary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./LsitsStyles.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import MetaData from "../Layouts/MetaData/Metadata";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import Loading from "../Layouts/Loader/Loading";
import { toast } from "react-toastify";
import {
  DeleteUserAction,
  GetAllUsersAction,
} from "../../Store/Actions/AuthAction";
import { ProfileClearErr, ProfileClearMsg } from "../../Store/Slice/UserSlice";

export default function UsersList() {
  const dispatch = useDispatch();
  const history = useNavigate();

  const { loading, error, users } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(DeleteUserAction(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(ProfileClearErr());
    }

    if (isDeleted) {
      history("/admin/users");
    }
    if (message) {
      toast.success(message);
      dispatch(ProfileClearMsg());
    }

    dispatch(GetAllUsersAction());
  }, [dispatch, error, message, history]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 0.6,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 120,
      flex: 0.3,
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
            <Link to={`/admin/user/${params.row.id}`}>
              <EditIcon />
            </Link>

            <div
              className=""
              onClick={() => {
                deleteUserHandler(params.row.id);
              }}
            >
              <Button>
                <DeleteIcon />
              </Button>
            </div>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL USERS - Admin`} />

      {loading ? (
        <Loading></Loading>
      ) : (
        <div className="dashboard">
          <SideBar />
          <div className="productListContainer">
            <h1 id="productListHeading">ALL USERS</h1>

            <DataGrid
              rows={rows}
              columns={columns}
              disableSelectionOnClick
              getCellClassName={(params) => {
                if (params.field === "role") {
                  return params.value == "admin" ? "green" : "red";
                }
              }}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
}

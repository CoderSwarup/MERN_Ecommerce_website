import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import MetaData from "../Layouts/MetaData/Metadata";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SideBar from "./Sidebar";
import Loader from "../Layouts/Loader/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  GetUserDetails,
  UpdateUserRoleDetails,
} from "../../Store/Actions/AuthAction";
import {
  ProfileClearErr,
  ProfileClearMsg,
  Reset_Is_Updated,
} from "../../Store/Slice/UserSlice";

export default function UpdateUser() {
  const dispatch = useDispatch();
  const params = useParams();
  const history = useNavigate();

  const { loading, error, user } = useSelector((state) => state.userDetails);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
    message,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const userId = params.id;

  useEffect(() => {
    dispatch(GetUserDetails(params.id));
  }, []);

  useEffect(() => {
    if (user?.role) {
      setName(user?.name);
      setEmail(user?.email);
      setRole(user?.role);
    }
    if (error) {
      toast.error(error);
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(ProfileClearErr());
    }
    if (isUpdated) {
      history("/admin/users");
      dispatch(Reset_Is_Updated());
    }
    if (message) {
      toast.success(`${message}`);
      dispatch(ProfileClearMsg());
    }
  }, [dispatch, error, history, isUpdated, updateError, user, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(UpdateUserRoleDetails([userId, myForm]));
  };

  return (
    <Fragment>
      <MetaData title="Update User" />
      <div className="dashboard">
        <SideBar />
        <div className="LoginSignUpContainer">
          {loading ? (
            <Loader />
          ) : (
            <form className="loginForm" onSubmit={updateUserSubmitHandler}>
              <h1>Update User</h1>

              <div>
                <PersonIcon />
                <input
                  type="text"
                  disabled
                  placeholder="Name"
                  required
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div>
                <MailOutlineIcon />
                <input
                  type="email"
                  disabled
                  placeholder="Email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>

              <div className="Select">
                {/* <VerifiedUserIcon /> */}
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <Button
                className="loginBtn"
                id="createProductBtn"
                type="submit"
                disabled={
                  updateLoading ? true : false || role === "" ? true : false
                }
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
}

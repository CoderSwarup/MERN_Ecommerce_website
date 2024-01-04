import React, { useState, useEffect } from "react";
import "./UpdatePassword.css";
import Loading from "../Layouts/Loader/Loading";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Metadata from "../Layouts/MetaData/Metadata";
import { useNavigate } from "react-router-dom";

import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockClose from "@mui/icons-material/Lock";

import { ProfileClearErr, ProfileClearMsg } from "../../Store/Slice/UserSlice";
import { PasswordUpdate } from "../../Store/Actions/ProfileActions";

//
const UpdatePassword = () => {
  const dispatch = useDispatch();
  const Naviagte = useNavigate();

  const { message, error, isUpdated, loading } = useSelector(
    (state) => state.profile
  );

  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setnewPassword] = useState("");
  const [cnewpassword, setcnewPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    if (oldpassword === "" || newpassword === "" || cnewpassword === "") {
      toast.error("All fields Are Required");
      return;
    }
    if (newpassword !== cnewpassword) {
      toast.error("New Password Dosen't Matched");
      return;
    }

    const myForm = new FormData();
    myForm.set("oldpassword", oldpassword);
    myForm.set("newpassword", newpassword);
    myForm.set("cpassword", cnewpassword);
    dispatch(PasswordUpdate(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(ProfileClearErr());
    }

    if (message) {
      toast.success(message);
      dispatch(ProfileClearMsg());
      Naviagte("/account");
    }
  }, [dispatch, error, isUpdated, message]);
  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          <Metadata title="Update Profile" />
          <div className="UpdatePasswordContainer">
            <div className="UpdatePasswordBox">
              <h2 className="UpdatePasswordHeading">Update Password</h2>

              <form
                className="UpdatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="UpdatePassword">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="Old Password"
                    name="oldpassword"
                    value={oldpassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    autoComplete=""
                  />
                </div>
                <div className="UpdatePassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    name="password"
                    value={newpassword}
                    onChange={(e) => setnewPassword(e.target.value)}
                    autoComplete=""
                  />
                </div>
                <div className="UpdatePassword">
                  <LockClose />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    name="confirmpassword"
                    value={cnewpassword}
                    onChange={(e) => setcnewPassword(e.target.value)}
                    autoComplete=""
                  />
                </div>
                <input
                  type="submit"
                  value="Update Password"
                  className="UpdatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdatePassword;

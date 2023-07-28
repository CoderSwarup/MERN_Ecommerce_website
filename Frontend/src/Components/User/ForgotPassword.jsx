import React, { useState, useEffect } from "react";
import "./UpdatePassword.css";
import Loading from "../Layouts/Loader/Loading";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Metadata from "../Layouts/MetaData/Metadata";
import { useNavigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import {
  forgotclearError,
  forgotclearSuccess,
} from "../../Store/Slice/UserSlice";
import { ForgotPasswordAPi } from "../../Store/Actions/ProfileActions";

//
export default function ForgotPassword() {
  const dispatch = useDispatch();
  const Naviagte = useNavigate();

  const { loading, success, error } = useSelector((state) => {
    return state.forgotpassword;
  });

  const [email, setemail] = useState("");

  const ForgotPasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(ForgotPasswordAPi(email));
  };
  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(forgotclearSuccess());
    }
    if (error) {
      toast.error(error);
      dispatch(forgotclearError());
    }
  }, [success, error]);

  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          <Metadata title="Update Profile" />
          <div className="ForgotPasswordContainer">
            <div className="ForgotPasswordBox">
              <h2 className="ForgotPasswordHeading">Password Recovery</h2>

              <form
                className="ForgotPasswordForm"
                onSubmit={ForgotPasswordSubmit}
              >
                <div className="Email">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    autoComplete="Email"
                  />
                </div>
                <input
                  type="submit"
                  value="Send Email"
                  className="ForgotPasswordBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

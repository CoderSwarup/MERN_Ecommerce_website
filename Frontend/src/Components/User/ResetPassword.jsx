import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockClose from "@mui/icons-material/Lock";
import Loading from "../Layouts/Loader/Loading";
import Metadata from "../Layouts/MetaData/Metadata";
import { ResetPasswordToken } from "../../Store/Actions/ProfileActions";
import { toast } from "react-toastify";
import {
  forgotclearError,
  forgotclearSuccess,
} from "../../Store/Slice/UserSlice";
export default function ResetPassword() {
  const params = useParams();
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [newpassword, setnewPassword] = useState("");
  const [cnewpassword, setcnewPassword] = useState("");

  const { loading, success, error } = useSelector((state) => {
    return state.forgotpassword;
  });

  const ResetPasswordSubmit = (e) => {
    e.preventDefault();
    if (newpassword !== cnewpassword) {
      return toast.error("Password Dosen't Match");
    }
    const Token = params.token;
    dispatch(ResetPasswordToken([Token, newpassword, cnewpassword]));
  };
  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(forgotclearSuccess());
      Navigate("/signin");
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
          <div className="UpdatePasswordContainer">
            <div className="UpdatePasswordBox">
              <h2 className="UpdatePasswordHeading">Password Set</h2>

              <form
                className="UpdatePasswordForm"
                onSubmit={ResetPasswordSubmit}
              >
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
}

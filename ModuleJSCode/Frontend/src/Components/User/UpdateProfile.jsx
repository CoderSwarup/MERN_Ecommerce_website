import React, { useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loading from "../Layouts/Loader/Loading";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Metadata from "../Layouts/MetaData/Metadata";
import { useNavigate } from "react-router-dom";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CallIcon from "@mui/icons-material/Call";
import { ProfileUpdate } from "../../Store/Actions/ProfileActions";
import { ProfileClearErr, ProfileClearMsg } from "../../Store/Slice/UserSlice";

//
const UpdateProfile = () => {
  const dispatch = useDispatch();
  const Naviagte = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { message, error, isUpdated, loading } = useSelector(
    (state) => state.profile
  );
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const updateProfileSubmit = (e) => {
    if (
      user?.user?.name === name &&
      user?.user?.email === email &&
      user?.user?.mobile === mobile &&
      avatar === ""
    ) {
      toast.error("Profile Data Not Changed");
      return;
    }
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("id", id);
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("mobile", mobile);
    myForm.set("avatar", avatar);
    dispatch(ProfileUpdate(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setId(user?.user?._id);
      setName(user?.user?.name);
      setEmail(user?.user?.email);
      setMobile(user?.user?.mobile);
      setAvatarPreview(user?.user?.avatar.url);
    }

    if (error) {
      toast.error(error);
      dispatch(ProfileClearErr());
    }

    if (message) {
      toast.success(message);
      dispatch(ProfileClearMsg());
      Naviagte("/account");
    }
  }, [dispatch, error, user, isUpdated, message]);
  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          <Metadata title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <AccountCircleIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="PhoenNo">
                  <CallIcon />
                  <input
                    type="text"
                    placeholder="Mobile No"
                    required
                    name="mobile"
                    value={mobile}
                    pattern="[0-9]*"
                    onChange={(e) => setMobile(e.target.value)}
                    autoComplete=""
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateProfile;

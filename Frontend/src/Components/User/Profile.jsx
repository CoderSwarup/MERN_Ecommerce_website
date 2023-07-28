import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Loading from "../Layouts/Loader/Loading";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";
import Metadata from "../Layouts/MetaData/Metadata";

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const Navigate = useNavigate();
  const createdAtString = user?.user?.createdAt?.toString().substring(0, 10);

  useEffect(() => {
    if (isAuthenticated === false) {
      console.log("wjeej");
      Navigate("/signin");
    }
  }, [Navigate, isAuthenticated, loading]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Metadata title={`${user?.user?.name}'s Profile | SamEcom`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={user?.user?.avatar.url} alt={user.name} />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user?.user?.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user?.user?.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{createdAtString}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;

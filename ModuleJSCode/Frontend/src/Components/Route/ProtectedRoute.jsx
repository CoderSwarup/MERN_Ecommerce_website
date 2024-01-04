import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Loading from "../Layouts/Loader/Loading";

const ProtectedRoute = () => {
  const { isAuthenticated, user } = useSelector((state) => {
    return state.user;
  });
  const Navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated === false || user?.user?.role !== "admin") {
      Navigate("/signin");
    }
  });

  return isAuthenticated === true && user.user.role === "admin" ? (
    <>
      <Outlet></Outlet>
    </>
  ) : (
    <Loading></Loading>
  );
};

export default ProtectedRoute;

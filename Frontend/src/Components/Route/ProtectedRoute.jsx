import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loading from "../Layouts/Loader/Loading";

const ProtectedRoute = ({ element: Element }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  if (loading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return <Element />;
};

export default ProtectedRoute;

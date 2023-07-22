import React from "react";
import "./Loading.css";
import loading from "../../../assets/loading.gif";

export default function Loading() {
  return (
    <div className="loading">
      <div>
        <img src={loading} alt="" />
      </div>
    </div>
  );
}

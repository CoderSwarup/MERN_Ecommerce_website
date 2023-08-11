import React from "react";
import Img from "../../../assets/Imges/nofoundImg.jpg";
export default function PageNotFound() {
  return (
    <div
      style={{
        width: "100vw",
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img width={"250px"} src={Img} alt="Not Found" />
    </div>
  );
}

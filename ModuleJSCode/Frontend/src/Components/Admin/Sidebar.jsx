import React, { useState } from "react";
import "./sidebar.css";

import logo from "../../assets/Imges/Logo.jpg";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import CategoryIcon from "@mui/icons-material/Category";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";

export default function siderbar2() {
  const [isOpen, setIsOpen] = useState(false);
  const routes = [
    {
      path: "/admin/Products",
      name: "Products",
      icon: <ExpandMoreIcon />,
      subRoutes: [
        {
          path: "/admin/products",
          name: "All Products ",
          icon: <ImportExportIcon />,
        },
        {
          path: "/admin/create-product",
          name: "Create Product",
          icon: <AddIcon />,
        },
      ],
    },
  ];

  return (
    <div className="siderbar2">
      <Link to="/">
        <p>
          <img
            width={150}
            style={{ marginLeft: "17px" }}
            src={logo}
            alt="Ecommerce"
          />
        </p>{" "}
      </Link>
      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      <Link to="/admin/ctegory">
        <p>
          <CategoryIcon></CategoryIcon>
          Category
        </p>
      </Link>
      <div className={`dropdown ${isOpen ? "open" : ""}`}>
        <div className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
          {routes[0].icon}
          <span>Products</span>
        </div>
        {isOpen && (
          <div className="dropdown-content">
            {routes[0].subRoutes.map((subRoute, index) => (
              <Link key={index} to={subRoute.path} className="sub-link">
                {subRoute.icon}
                <span>{subRoute.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Link to="/admin/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link>
    </div>
  );
}

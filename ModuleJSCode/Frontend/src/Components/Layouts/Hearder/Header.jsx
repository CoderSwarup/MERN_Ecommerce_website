import React from "react";

import "./Header.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
import { MdStore } from "react-icons/md";
import { BiSolidUserCircle } from "react-icons/bi";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import { FcList } from "react-icons/fc";
import { useSelector } from "react-redux";
import logo from "../../../assets/Imges/Logo.jpg";
export default function Header({ children }) {
  const { isAuthenticated } = useSelector((state) => {
    return state.user;
  });

  const routes = [
    {
      path: "/",
      name: "Home",
      icon: <FaHome />,
    },
    {
      path: "/Products",
      name: "Products",
      icon: <MdStore />,
    },
    {
      path: `${isAuthenticated ? "/account" : "/signin"}`,
      name: `${isAuthenticated ? "Account" : "SignIn"}`,
      icon: <BiSolidUserCircle />,
    },
    // {
    //   path: "/analytics",
    //   name: "Analytics",
    //   icon: <BiAnalyse />,
    // },
    // {
    //   path: "/file-manager",
    //   name: "File Manager",
    //   icon: <AiTwotoneFileExclamation />,
    //   subRoutes: [
    //     {
    //       path: "/settings/profile",
    //       name: "Profile ",
    //       icon: <FaUser />,
    //     },
    //     {
    //       path: "/settings/2fa",
    //       name: "2FA",
    //       icon: <FaLock />,
    //     },
    //     {
    //       path: "/settings/billing",
    //       name: "Billing",
    //       icon: <FaMoneyBill />,
    //     },
    //   ],
    // },
    {
      path: "/cart",
      name: "Cart",
      icon: <BsCartCheck />,
    },
    isAuthenticated && {
      path: "/accout",
      name: "Settings",
      icon: <BiCog />,
      exact: true,
      subRoutes: [
        {
          path: "/account",
          name: "Profile ",
          icon: <FaUser />,
        },
        {
          path: "/password/update",
          name: "Update Password",
          icon: <FaLock />,
        },
        {
          path: "/me/update",
          name: "Update Profile",
          icon: <FaMoneyBill />,
        },
      ],
    },
    {
      path: "/about",
      name: "About Us",
      icon: <AiFillHeart />,
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [keyword, setkeyword] = useState("");
  const Navigate = useNavigate();

  const SearchKeyword = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      Navigate(`/products/${keyword}`);
    } else {
      Navigate("/products");
    }
  };
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };
  return (
    <div className="main-container">
      <motion.div
        animate={{
          width: isOpen ? "190px" : "30px",
          transition: {
            duration: 0.5,
            type: "spring",
            damping: 10,
          },
        }}
        className={`sidebar `}
      >
        <div className="top_section">
          <AnimatePresence>
            {isOpen && (
              <motion.h1
                variants={showAnimation}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="logo"
              >
                <img width={100} src={logo} alt="" />
              </motion.h1>
            )}
          </AnimatePresence>

          <div className="bars">
            <FcList size="23px" onClick={toggle} />
          </div>
        </div>
        <div className="search">
          <div className="search_icon">
            <BiSearch onClick={toggle} />
          </div>
          <AnimatePresence>
            {isOpen && (
              <form action="" onSubmit={SearchKeyword}>
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                  onChange={(e) => {
                    setkeyword(e.target.value);
                  }}
                  value={keyword}
                />
              </form>
            )}
          </AnimatePresence>
        </div>
        <section className="routes">
          {routes.map((route, index) => {
            if (route.subRoutes) {
              return (
                <SidebarMenu
                  setIsOpen={setIsOpen}
                  route={route}
                  showAnimation={showAnimation}
                  isOpen={isOpen}
                  key={index}
                />
              );
            }

            return (
              <NavLink
                to={route.path}
                key={index}
                className="link"
                activeclassname="active"
              >
                <div className="icon">{route.icon}</div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      variants={showAnimation}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="link_text"
                    >
                      <span className="route-name"> {route.name}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </NavLink>
            );
          })}
        </section>
      </motion.div>

      <main>{children}</main>
    </div>
  );
}

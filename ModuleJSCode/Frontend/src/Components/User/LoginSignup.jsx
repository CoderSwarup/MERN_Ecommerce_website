import React, { useEffect, useRef, useState } from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CallIcon from "@mui/icons-material/Call";
import "./LoginSignup.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { LoginUser, RegisterUser } from "../../Store/Actions/AuthAction";
import { toast } from "react-toastify";
import Loading from "../Layouts/Loader/Loading";
import { clearMessage } from "../../Store/Slice/UserSlice";
import { Typography } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
//-----------------------

export default function LoginSignup() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation();

  //   Login Email Password
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const { loading, isAuthenticated, error, message } = useSelector((state) => {
    return state.user;
  });

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(
      LoginUser({
        email: loginEmail,
        password: loginPassword,
      })
    );
  };

  //Registre User
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const { name, email, mobile, password } = user;
  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("mobile", mobile);
    myForm.set("avatar", avatar);

    dispatch(RegisterUser(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const redirect = location.state ? location.state.from : "/account";
  useEffect(() => {
    if (isAuthenticated) {
      history("/account", {
        state: location.pathname,
      });
    }
  }, [dispatch, isAuthenticated]);

  //-----------------
  //Login register tab Switching Form Switching
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  const GoogleLogin = () => {
    console.log("sksksksks");
    window.open("https://samecommbackend.cyclic.cloud/auth/google", "_self");
  };
  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        <div className="LoginSignUpContainer">
          <div className="LoginSignUpBox">
            <div>
              <div className="login_signUp_toggle">
                <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
              </div>
              <button ref={switcherTab}></button>
            </div>
            <>
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    autoComplete="Email"
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => {
                      setLoginPassword(e.target.value);
                    }}
                    autoComplete="current-password"
                  />
                </div>
                <Link to="/password/forgot">Forget Password ?</Link>
                <input type="submit" value="Login" className="loginBtn" />
                <Typography>OR</Typography>

                <div className="google">
                  <div className="btn " onClick={GoogleLogin}>
                    <FcGoogle></FcGoogle>
                    <Typography className="g">Google</Typography>
                  </div>
                </div>
              </form>
            </>
            <>
              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <AccountCircleIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
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
                    onChange={registerDataChange}
                    autoComplete=""
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                    autoComplete="current-password"
                  />
                </div>

                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Register" className="signUpBtn" />

                <Typography>OR</Typography>

                <div className="google">
                  <div className="btn " onClick={GoogleLogin}>
                    <FcGoogle></FcGoogle>
                    <Typography className="g">Google</Typography>
                  </div>
                </div>
              </form>
            </>
          </div>
        </div>
      )}
    </>
  );
}

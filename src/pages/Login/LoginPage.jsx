import React, { useState } from "react";
import { baseURL, loginPath } from "../../api/endPoints";
import { LocalStorage } from "../../utils/LocalStorage";
import axiosClient from "../../api/customFetch";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./style.css";

const LoginPage = () => {
  const navigation = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rotateHead, setRotateHead] = useState(0);

  const handleLogin = async () => {
    try {
      const response = await axiosClient.post(baseURL + loginPath, {
        email: username,
        password: password,
      });

      LocalStorage.setToken(response?.data?.accessToken);
      LocalStorage.setRole(response?.data?.user?.role);

      if (response.data.user.role === "admin") {
        navigation("/admin");
        toast.success("Login successful");
      } else if (response.data.user.role === "host") {
        navigation("/");
        toast.success("Login successful");
      } else {
        navigation("/");
        toast.error("You can't login to the system");
        LocalStorage.clearToken();
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(
        "Login failed: " + (error.response?.data?.message || error.message)
      );
    }
  };

  const handleFocusPassword = () => {
    document.querySelectorAll(".hand").forEach((hand) => {
      hand.classList.add("hide");
    });
    document.querySelector(".tongue").classList.remove("breath");
  };

  const handleBlurPassword = () => {
    document.querySelectorAll(".hand").forEach((hand) => {
      hand.classList.remove("hide");
      hand.classList.remove("peek");
    });
    document.querySelector(".tongue").classList.add("breath");
  };

  const handleFocusUsername = () => {
    const length = Math.min(username.length - 16, 19);
    document.querySelectorAll(".hand").forEach((hand) => {
      hand.classList.remove("hide");
      hand.classList.remove("peek");
    });
    setRotateHead(-length);
  };

  const handleBlurUsername = () => {
    setRotateHead(0);
  };

  const handleInputUsername = (event) => {
    const length = Math.min(event.target.value.length - 16, 19);
    setRotateHead(-length);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    document.querySelectorAll(".hand").forEach((hand) => {
      if (showPassword) {
        hand.classList.remove("peek");
        hand.classList.add("hide");
      } else {
        hand.classList.remove("hide");
        hand.classList.add("peek");
      }
    });
  };

  return (
    <div className="layout-background">
      <div className="center" style={{ marginTop: "350px" }}>
        <div className="ear ear--left"></div>
        <div className="ear ear--right"></div>
        <div className="face" style={{ "--rotate-head": `${rotateHead}deg` }}>
          <div className="eyes">
            <div className="eye eye--left">
              <div className="glow"></div>
            </div>
            <div className="eye eye--right">
              <div className="glow"></div>
            </div>
          </div>
          <div className="nose">
            <svg width="38.161" height="22.03">
              <path
                d="M2.017 10.987Q-.563 7.513.157 4.754C.877 1.994 2.976.135 6.164.093 16.4-.04 22.293-.022 32.048.093c3.501.042 5.48 2.081 6.02 4.661q.54 2.579-2.051 6.233-8.612 10.979-16.664 11.043-8.053.063-17.336-11.043z"
                fill="#243946"
              ></path>
            </svg>
            <div className="glow"></div>
          </div>
          <div className="mouth">
            <svg className="smile" viewBox="-2 -2 84 23" width="84" height="23">
              <path
                d="M0 0c3.76 9.279 9.69 18.98 26.712 19.238 17.022.258 10.72.258 28 0S75.959 9.182 79.987.161"
                fill="none"
                strokeWidth="3"
                strokeLinecap="square"
                strokeMiterlimit="3"
              ></path>
            </svg>
            <div className="mouth-hole"></div>
            <div className="tongue breath">
              <div className="tongue-top"></div>
              <div className="line"></div>
              <div className="median"></div>
            </div>
          </div>
        </div>
        <div className="hands">
          <div className="hand hand--left">
            <div className="finger">
              <div className="bone"></div>
              <div className="nail"></div>
            </div>
            <div className="finger">
              <div className="bone"></div>
              <div className="nail"></div>
            </div>
            <div className="finger">
              <div className="bone"></div>
              <div className="nail"></div>
            </div>
          </div>
          <div className="hand hand--right">
            <div className="finger">
              <div className="bone"></div>
              <div className="nail"></div>
            </div>
            <div className="finger">
              <div className="bone"></div>
              <div className="nail"></div>
            </div>
            <div className="finger">
              <div className="bone"></div>
              <div className="nail"></div>
            </div>
          </div>
        </div>
        <div className="login">
          <label>
            <div className="fa fa-phone"></div>
            <Input
              className="username"
              type="text"
              autoComplete="on"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={handleFocusUsername}
              onBlur={handleBlurUsername}
              onInput={handleInputUsername}
            />
          </label>
          <label>
            <div className="fa fa-commenting"></div>
            <Input
              className="password"
              type={showPassword ? "text" : "password"}
              autoComplete="off"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={handleFocusPassword}
              onBlur={handleBlurPassword}
            />
            <Button className="password-button" onClick={toggleShowPassword}>
              show
            </Button>
          </label>
          <Button className="login-button" onClick={handleLogin}>
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

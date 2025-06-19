import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { FcGoogle } from "react-icons/fc";
import InputAdornment from "@mui/material/InputAdornment";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../Core-Components/Button";
import { useNavigate } from "react-router-dom";
import logo from "../Assets/logo.jpg";
import "./Auth.css";

function Login({ title, registerNav, handleLogin }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisibile] = useState(false);
  const navigate = useNavigate();
  const {
    loading: PublisherLoad,
    PubLoginStatus: PublisherLogin,
    LoginData,
  } = useSelector((state) => state?.PublisherLogin);
  const { loading: UserLoad, UserLoginStatus } = useSelector(
    (state) => state?.UserLogin
  );

  const payload = { email, password };

  const handleSubmit = () => {
    handleLogin(payload);
  };

  useEffect(() => {
    if (PublisherLogin) {
      setEmail("");
      setPassword("");
      navigate("/publisher/dashboard");
    } else if (UserLoginStatus) {
      setEmail("");
      setPassword("");
      navigate("/reader/dashboard");
    }
  }, [PublisherLogin, UserLoginStatus]);

  return (
    <>
      <div className="logo">
        <img
          src={logo}
          alt="logo"
          width="40px"
          style={{ borderRadius: "50%" }}
        />
        <h3 className="auth-title">{title}</h3>
      </div>

      <TextField
        fullWidth
        label="Enter Your Email"
        variant="outlined"
        className="input my-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        size="small"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="emd" style={{ cursor: "pointer" }}>
                <MdEmail />
              </InputAdornment>
            ),
          },
        }}
      />
      <TextField
        fullWidth
        type={passwordVisible ? "text" : "password"}
        label="Enter Your Password"
        variant="outlined"
        className="input mb-1"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        size="small"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="emd" style={{ cursor: "pointer" }}>
                {passwordVisible ? (
                  <FaEyeSlash onClick={() => setPasswordVisibile(false)} />
                ) : (
                  <FaEye onClick={() => setPasswordVisibile(true)} />
                )}
              </InputAdornment>
            ),
          },
        }}
      />
      <div style={{ width: "100%" }}>
        <a href="/resetpassword" className="mb-0">
          Forgot Password
        </a>
      </div>
      <CustomButton
        type="button"
        className="w-100 button my-3"
        onClick={handleSubmit}
        loading={PublisherLoad || UserLoad ? true : false}
      >
        SIGN IN
      </CustomButton>
      <p className="or mb-0">
        <span className="line" />
        OR
        <span className="line" />
      </p>
      <div className="p-text">
        <p>
          <FcGoogle className="google mx-1" />
          Sign in with Google
        </p>
        <p>
          Don’t have an account?
          <span className="navigationLink" onClick={registerNav}>
            Create an account
          </span>
        </p>
      </div>
    </>
  );
}

export default Login;

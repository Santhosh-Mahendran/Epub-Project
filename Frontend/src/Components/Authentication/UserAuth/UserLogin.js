import React from "react";
import Login from "../Login";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { User_Login_Request } from "../../../Redux/Action/UserAction/UserAuthAction";

function UserLogin({ setAnimationActive }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleNavToUserReg = () => {
    setAnimationActive(true);
  };
  const UserLoginAction = (payload) => {
    dispatch(User_Login_Request(payload));
  };
  return (
    <Login
      title="USER LOGIN"
      registerNav={handleNavToUserReg}
      handleLogin={UserLoginAction}
    />
  );
}

export default UserLogin;

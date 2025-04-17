import React from "react";
import Login from "../Login";
import { useDispatch } from "react-redux";
import { Publisher_Login_Request } from "../../../Redux/Action/PublisherAction/PuAuthAction";

function PubLogin({ setAnimationActive }) {
  const dispatch = useDispatch();

  const handleNavToPubReg = () => {
    setAnimationActive(true);
  };
  const PubLoginAction = (payload) => {
    dispatch(Publisher_Login_Request(payload));
  };
  return (
    <Login
      title="PUBLISHER lOGIN"
      registerNav={handleNavToPubReg}
      handleLogin={PubLoginAction}
    />
  );
}

export default PubLogin;

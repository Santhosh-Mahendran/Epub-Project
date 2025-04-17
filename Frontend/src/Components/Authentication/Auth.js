import React, { useEffect, useState } from "react";
import "./Auth.css";

import { Outlet, useLocation, useNavigate } from "react-router-dom";

function Auth() {
  const navigate = useNavigate();
  const [readactive, setReadActive] = useState(false);
  const [pubactive, setPubActive] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/auth/publisher") {
      setPubActive(true);
      setReadActive(false);
    } else if (location.pathname === "/") {
      setPubActive(false);
      setReadActive(true);
    }
  }, [location]);
  return (
    <>
      <div className="auth-container">
        <div className="role-nav">
          <div className="role-btn">
            <div
              role="button"
              onClick={() => navigate("/")}
              className={`${readactive ? "active" : ""}`}
            >
              READER
            </div>
            <div
              role="button "
              onClick={() => navigate("/auth/publisher")}
              className={`${pubactive ? "active" : ""}`}
            >
              PUBLISHER
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default Auth;

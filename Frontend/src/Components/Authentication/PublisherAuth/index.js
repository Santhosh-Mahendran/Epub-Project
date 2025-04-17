import React, { useState } from "react";
import CustomButton from "../../Core-Components/Button";
import PubLogin from "./PubLogin";
import PubRegister from "./PubRegister";

function PublisherAuth() {
  const [animationActive, setAnimationActive] = useState(false);
  const handleRegisterOpen = () => {
    setAnimationActive(true);
  };

  const handleLoginOpen = () => {
    setAnimationActive(false);
  };

  return (
    <div
      className={`content-container ${animationActive ? "animateAuth" : ""}`}
    >
      <div className="form-container login">
        <form>
          <PubLogin setAnimationActive={setAnimationActive} />
        </form>
      </div>
      <div className="form-container register">
        <PubRegister setAnimationActive={setAnimationActive} />
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-right">
            <h1>Welcome back!</h1>
            <p>
              Manage your published books, track sales, and connect with readers
              worldwide. Log in to access your author dashboard and publishing
              tools.
            </p>
            <CustomButton
              sx={{
                backgroundColor: "transparent",
                border: "1px solid #fff",
              }}
              onClick={handleRegisterOpen}
            >
              Sign up
            </CustomButton>
          </div>
          <div className="toggle-panel toggle-left">
            <h1>Join our publishing community!</h1>
            <p>
              Sign up to publish your eBooks, reach global audiences, and grow
              your author brand with powerful publishing tools.
            </p>
            <CustomButton
              sx={{
                backgroundColor: "transparent",
                border: "1px solid #fff",
              }}
              onClick={handleLoginOpen}
            >
              Sign In
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublisherAuth;

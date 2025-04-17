import React, { useState } from "react";
import UserLogin from "./UserLogin";
import UserRegister from "./UserRegister";
import CustomButton from "../../Core-Components/Button";

function ReaderAuth({ LoginRole }) {
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
          <UserLogin setAnimationActive={setAnimationActive} />
        </form>
      </div>
      <div className="form-container register">
        <UserRegister setAnimationActive={setAnimationActive} />
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-right">
            <h1>Welcome back!</h1>
            <p>
              Dive into your personal library and continue your reading journey.
              Log in to access your saved books, bookmarks, and personalized
              recommendations
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
            <h1>Join our book-loving community!</h1>
            <p>
              Sign up to explore a vast collection of eBooks, track your reading
              progress, and create your own digital library
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

export default ReaderAuth;

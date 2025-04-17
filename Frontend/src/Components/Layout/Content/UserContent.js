import React from "react";
import { Outlet } from "react-router-dom";
import SideNavBar from "../Header/SideNavBar";
import "./Content.css";

function UserContent() {
  return (
    <>
      <div className="main-container">
        <div className="userlayout layout">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default UserContent;

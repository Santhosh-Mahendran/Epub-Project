import React from "react";
import { Outlet } from "react-router-dom";
import SideNavBar from "../Header/SideNavBar";
import "./Content.css";

function PublisherContent() {
  return (
    <>
      <div className="main-container">
        <div className="layout">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default PublisherContent;

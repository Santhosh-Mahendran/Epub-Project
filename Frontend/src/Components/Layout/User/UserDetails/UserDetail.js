import React from "react";
import "./UserDetail.css";
import SideNav from "./SideNav";
import { Link, Outlet } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";

function UserDetail() {
  return (
    <>
      <div className="user-details shadow">
        <Link
          style={{
            textDecoration: "none",
            fontSize: "17px",
            padding: "1px 12px",
          }}
          className=" my-3"
          onClick={()=>window.history.back()}
        >
          <IoChevronBack className="mb-1" />
          Back
        </Link>
        <div className="row mt-1 justify-content-center">
          <div className="col-lg-3 user-menu d-none d-lg-block">
            <SideNav />
          </div>
          <div className="col-lg-9 outlet">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDetail;

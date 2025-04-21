import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import "./UserDetail.css";

function SideNav() {
  const [toggleAccountSetting, setToggleAccountSetting] = useState(true);
  const [toggleStaff, setToggleStaff] = useState(true);
  const location = useLocation();
  const hanldeAccountSetOpen = () => {
    setToggleAccountSetting(!toggleAccountSetting);
  };
  const hanldeStaffOpen = () => {
    setToggleStaff(!toggleStaff);
  };
  return (
    <>
      <div className="cardBox shadow p-3 ">
        <div
          className="d-flex justify-content-between align-items-center"
          role="button"
          onClick={hanldeStaffOpen}
        >
          <h6 className="mb-0">MY STAFFS</h6>
          <IoMdArrowDropdown
            size={24}
            style={{
              color: "#636060",
              transform: toggleStaff ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease-in-out",
            }}
          />
        </div>
        {toggleStaff && (
          <div className={`acc-link ${toggleStaff ? "open" : "closed"}`}>
            <Link
              to="/reader/dashboard/detail/order"
              className={`${
                location.pathname === "/reader/dashboard/detail/order"
                  ? "Linkactive"
                  : ""
              }`}
            >
              My cart
            </Link>
            <Link
              to="/reader/dashboard/detail/wishlist"
              className={`${
                location.pathname === "/reader/dashboard/detail/wishlist"
                  ? "Linkactive"
                  : ""
              }`}
            >
              My wishlist
            </Link>
            <Link
              to="/reader/dashboard/detail/library"
              className={`${
                location.pathname === "/reader/dashboard/detail/library"
                  ? "Linkactive"
                  : ""
              }`}
            >
              My Library
            </Link>
            <Link>Notifications</Link>
          </div>
        )}
      </div>
      <div className="cardBox shadow p-3 mt-2">
        <div
          className="d-flex justify-content-between align-items-center"
          role="button"
          onClick={hanldeAccountSetOpen}
        >
          <h6 className="mb-0">ACCOUNT SETTINGS</h6>
          <IoMdArrowDropdown
            size={24}
            style={{
              color: "#636060",
              transform: toggleAccountSetting
                ? "rotate(180deg)"
                : "rotate(0deg)",
              transition: "transform 0.3s ease-in-out",
            }}
          />
        </div>
        {toggleAccountSetting && (
          <div
            className={`acc-link ${toggleAccountSetting ? "open" : "closed"}`}
          >
            <Link>Profile Information</Link>
            <Link>Account Security</Link>
            <Link>Payment Method</Link>
            <Link>Account Security</Link>
          </div>
        )}
      </div>
    </>
  );
}

export default SideNav;

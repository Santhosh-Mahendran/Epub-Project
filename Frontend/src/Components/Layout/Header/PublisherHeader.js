import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import MenuItems from "../../Core-Components/MenuItem";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Publisher_Logout } from "../../../Redux/Action/PublisherAction/PuAuthAction";
import Profile from "../Profile/Profile";
import { IoMdMenu } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import "./Header.css";
import SideNavBar from "./SideNavBar";

function PublisherHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const [openProfileDetails, setProfileDetails] = useState(false);
  const [OpenSideNav, setOpenSideNav] = useState(false);
  const dispatch = useDispatch();
  const handleProfileDetailClose = () => {
    setProfileDetails(false);
  };

  const handleAccountMenuOpen = (event) => {
    setOpenProfileMenu(event.currentTarget);
  };
  const handleProfileOpen = () => {
    // setProfileDetails(true);
    setOpenProfileMenu(null);
  };
  const handleLogout = () => {
    setOpenProfileMenu(null);
    dispatch(Publisher_Logout());
    navigate("/auth/publisher");
  };

  const handleClose = () => {
    setOpenProfileMenu(null);
  };
  const handleMenuOpen = () => {
    setOpenSideNav(!OpenSideNav);
  };

  return (
    <>
      <div className="header">
        <div className="d-flex justify-centent-center align-items-center">
          <div className="menu-icon">
            <IoMdMenu
              size={25}
              className="menu-icon me-2"
              style={{ cursor: "pointer" }}
              onClick={handleMenuOpen}
            />
          </div>
          <h3
            role="button"
            className="title"
            onClick={() => navigate("/publisher/dashboard")}
          >
            HALO PAD READER
          </h3>
        </div>
        <div className="navbar">
          <Link
            to="/publisher/dashboard"
            className={`nav ${
              location.pathname === "/publisher/dashboard" ? "active" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/publisher/dashboard/upload"
            className={`nav ${
              location.pathname === "/publisher/dashboard/upload"
                ? "active"
                : ""
            }`}
          >
            Upload Book
          </Link>
          <Link
            to="/publisher/dashboard/library"
            className={`nav ${
              location.pathname === "/publisher/dashboard/library"
                ? "active"
                : ""
            }`}
          >
            Library
          </Link>
        </div>
        <div
          className="profile d-flex justify-content-center align-items-center"
          style={{ cursor: "pointer" }}
          role="button"
          aria-controls={openProfileMenu ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openProfileMenu ? "true" : undefined}
          onClick={handleAccountMenuOpen}
        >
          <FaRegUserCircle />
          <p className="mb-0 ms-2">Account</p>
        </div>
        <MenuItems
          anchorEl={openProfileMenu}
          open={openProfileMenu}
          onClose={handleClose}
          listdata={[
            { label: "Profile", handleClick: handleProfileOpen },
            { label: "Logout", handleClick: handleLogout },
          ]}
        />
      </div>
      <Profile
        openProfileDetails={openProfileDetails}
        handleClose={handleProfileDetailClose}
      />
      {OpenSideNav && (
        <SideNavBar
          setOpenSideNav={setOpenSideNav}
          menu={[
            {
              path: "/publisher/dashboard",
              icon: <FaHome size={15} className="mx-3 mb-1" />,
              label: "Home",
            },
            {
              path: "/publisher/dashboard/upload",
              icon: <FaCloudUploadAlt size={15} className="mx-3 mb-1" />,
              label: "Upload Book",
            },
            {
              path: "/publisher/dashboard/library",
              icon: <IoLibrary size={15} className="mx-3 mb-1" />,
              label: "Library",
            },
          ]}
        />
      )}
    </>
  );
}

export default PublisherHeader;

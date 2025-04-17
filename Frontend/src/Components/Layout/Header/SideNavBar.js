import React from "react";
import "./SideNavBar.css";
import { Link } from "react-router-dom";

function SideNavBar({ setOpenSideNav, menu }) {
  const handleCloseMenu = () => {
    setOpenSideNav(false);
  };
  return (
    <>
      <div className="sidenavbar">
        {menu?.map((item) => (
          <>
            <Link to={item.path} className="link" onClick={handleCloseMenu}>
              {item.icon}
              {item.label}
            </Link>
          </>
        ))}
      </div>
    </>
  );
}

export default SideNavBar;

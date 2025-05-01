import React from "react";
import "./SideNavBar.css";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

function SideNavBar({ setOpenSideNav, menu }) {
  const handleCloseMenu = () => {
    setOpenSideNav(false);
  };
  return (
    <>
      <div className="sidenavbar">
        <div
          style={{ float: "right", cursor: "pointer" }}
          role="button"
          onClick={handleCloseMenu}
        >
          <RxCross2 />
        </div>
        <div>
          {menu?.map((item) => (
            <>
              <Link to={item.path} className="link" onClick={handleCloseMenu}>
                {item.icon}
                {item.label}
              </Link>
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default SideNavBar;

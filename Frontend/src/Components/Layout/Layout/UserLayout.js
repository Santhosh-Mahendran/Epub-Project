import React, { useEffect, useState } from "react";
import "./Layout.css";
import UserHeader from "../Header/UserHeader";
import UserContent from "../Content/UserContent";
import Footer from "../Footer/Footer";

function UserLayout() {
  const [openMenu, setOpenMenu] = useState("");

  return (
    <div className="epub-reader-wrapper">
      <UserHeader setOpenMenu={setOpenMenu} openMenu={openMenu}/>
      <UserContent openMenu={openMenu}/>
      <Footer />
    </div>
  );
}

export default UserLayout;

import React, { useEffect, useState } from "react";
import "./Layout.css";
import Footer from "../Footer/Footer";
import PublisherHeader from "../Header/PublisherHeader";
import PublisherContent from "../Content/PublisherContent";

function PublisherLayout() {
  const [openMenu, setOpenMenu] = useState("");

  return (
    <div className="epub-reader-wrapper">
      <PublisherHeader setOpenMenu={setOpenMenu} openMenu={openMenu} />
      <PublisherContent openMenu={openMenu} />
      <Footer />
    </div>  
  );
}

export default PublisherLayout;


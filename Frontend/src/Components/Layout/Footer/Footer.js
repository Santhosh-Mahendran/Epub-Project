import React from "react";
import "./Footer.css";
import { Link, useLocation } from "react-router-dom";
import { TiSocialFacebook } from "react-icons/ti";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { CiLink } from "react-icons/ci";
import { MdLocationOn } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { FaGlobe } from "react-icons/fa";
import { useSelector } from "react-redux";

function Footer() {
  const { LoginStatus: publisherLoginStatus } = useSelector(
    (state) => state.PublisherLogin
  );
  const location = useLocation();
  const footerContent = () => {
    if (publisherLoginStatus) {
      return (
        <div className="publisher-footer">
          <div className="company-detail col-3">
            <h4 style={{ color: "#f6f6f6" }}>Vijra Technology</h4>
            <p>
              The training programs offered cover a wide range of disciplines in
              software development.
            </p>
            <div className="icons d-flex gap-3" style={{ cursor: "pointer" }}>
              <div
                style={{
                  backgroundColor: "#0866ff",
                  color: "#f6f6f6",
                  borderRadius: "50%",
                  height: "30px",
                  width: "30px",
                  textAlign: "center",
                  // padding:"5px"
                }}
              >
                <a
                  href="https://www.facebook.com/home.php"
                  style={{ textDecoration: "none", color: "#f6f6f6" }}
                >
                  <TiSocialFacebook size={22} />
                </a>
              </div>
              <div
                style={{
                  backgroundColor: "#000000",
                  color: "#f6f6f6",
                  borderRadius: "50%",
                  height: "30px",
                  width: "30px",
                  textAlign: "center",
                  // padding:"5px"
                }}
              >
                <a
                  href="https://x.com/i/flow/login?lang=en"
                  style={{ textDecoration: "none", color: "#f6f6f6" }}
                >
                  <FaXTwitter size={15} />
                </a>
              </div>
              <div
                style={{
                  backgroundColor: "#0a66c2",
                  color: "#f6f6f6",
                  borderRadius: "50%",
                  height: "30px",
                  width: "30px",
                  textAlign: "center",
                  // padding:"5px"
                }}
              >
                <a
                  href="https://www.linkedin.com/feed/"
                  style={{ textDecoration: "none", color: "#f6f6f6" }}
                >
                  <FaLinkedinIn size={16} />
                </a>
              </div>
            </div>
          </div>
          <div className="Quick-links col-1">
            <h5>Quick Links</h5>
            <Link
              to="/publisher/dashboard"
              className={`nav ${
                location.pathname === "/publisher/dashboard" ? "active" : ""
              }`}
            >
              <CiLink className="mt-1 me-1" />
              Home
            </Link>
            {/* <Link
              to="/publisher/dashboard/report"
              className={`nav ${
                location.pathname === "/publisher/dashboard/report"
                  ? "active"
                  : ""
              }`}
            >
              <CiLink className="mt-1 me-1" />
              Report
            </Link> */}
            <Link
              to="/publisher/dashboard/upload"
              className={`nav ${
                location.pathname === "/publisher/dashboard/upload"
                  ? "active"
                  : ""
              }`}
            >
              <CiLink className="mt-1 me-1" />
              Upload File
            </Link>
            <Link
              to="/publisher/dashboard/library"
              className={`nav ${
                location.pathname === "/publisher/dashboard/library"
                  ? "active"
                  : ""
              }`}
            >
              <CiLink className="mt-1 me-1" />
              Library
            </Link>
          </div>
          <div className="about-us col-2">
            <h5>About Us</h5>
            <p>
              We are an inclusive organization that strives to provide
              high-quality training alongside software services
            </p>
          </div>
          <div className="contact-us col-2">
            <h5>contact Us</h5>
            <div className="d-flex ">
              <span>
                <MdLocationOn className="me-2" size={16} />
              </span>
              <p>No.102, Natchathira Nagar, Thanjavur-613007.</p>
            </div>
            <div className="d-flex">
              <span>
                <FaPhoneAlt className="ms-1 me-2" size={12} />
              </span>
              <p>+91 4362463955</p>
            </div>
            <div className="d-flex">
              <span>
                <IoMailOutline className="me-2 ms-1" />
              </span>
              <p>dharshagan@vijratechnology.com</p>
            </div>
            <div className="d-flex">
              <span>
                <FaGlobe className="me-2 ms-1" />
              </span>
              <p>www.vijratechnology.com</p>
            </div>
          </div>
        </div>
      );
    } else if ("sdsd") {
      return <div></div>;
    }
  };
  return (
    <>
      {/* {footerContent()} */}
      <div className="footer">
        <div className="copyrights">
          <p className="mb-0">
            Copyright © 2025 Halo Pad Reader. All Rights Reserved.
          </p>
        </div>
      </div>
    </>
  );
}

export default Footer;

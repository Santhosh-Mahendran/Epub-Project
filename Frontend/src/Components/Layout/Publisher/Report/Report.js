import React from "react";
import { IoAddOutline } from "react-icons/io5";
import Graph from "./Graph";
import "./Report.css";
import CardComponent from "../../../Core-Components/Card";
import BookImg from "../../../Assets/bookImg.jpg";
import { LuIndianRupee } from "react-icons/lu";
import CustomButton from "../../../Core-Components/Button";
import { useNavigate } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
// import ebook from "../../../Assets/ebook-card.jpg";

function Report() {
  const navigate = useNavigate();
  const BookReport_List = [
    { title: "Book published", count: "500" },
    { title: "Book Sold", count: "400" },
    { title: "Book Rented", count: "500" },
    { title: "Total Revenue", count: "50000" },
  ];

  return (
    <div className="publisher-report">
      <div className="publish-header row gap-3 justify-content-between">
        <h4 className="mb-0 col-lg-4 col-md-6 col-sm-12">REPORT</h4>
        <div className="d-flex col-lg-6 col-md-6 col-sm-12 justify-content-end">
          <CustomButton
            type="button"
            className="addnew-btn me-3"
            style={{
              backgroundColor: "green",
              fontSize: "14px",
              padding: "5px 10px",
            }}
            onClick={() => navigate("/publisher/dashboard/upload")}
          >
            <IoAddOutline className="me-1" style={{ fontSize: "20px" }} />
            Add Book
          </CustomButton>
          <CustomButton
            type="button"
            className="addnew-btn"
            style={{
              backgroundColor: "gray",
              fontSize: "14px",
              padding: "2px 10px",
            }}
            onClick={() => navigate("/publisher/dashboard/library")}
          >
            <MdModeEdit className="me-1" style={{ fontSize: "17px" }} />
            Edit Book
          </CustomButton>
        </div>
      </div>
      <div className="report-card row mt-4">
        {BookReport_List?.map((book) => (
          <CardComponent
            className="col-sm-12 col-lg-3 col-md-3"
            style={{
              width: "280px",
              height: "150px",
            }}
          >
            <div
              className="d-flex align-items-center justify-content-between"
              // style={{ backgroundImage: `url(${ebook})` }}
            >
              <div>
                <h5>{book?.title}</h5>
                <div className="d-flex align-items-center">
                  {book?.title === "Total Revenue" ? (
                    <LuIndianRupee size={25} className="mb-1" />
                  ) : (
                    ""
                  )}
                  <h2>{book?.count}</h2>
                </div>
              </div>
              <img src={BookImg} alt="img" width="100px" />
            </div>
          </CardComponent>
        ))}
      </div>
      <div className="scale-report row mt-5 justify-content-center">
        <div>
          <h5 className="mb-3">BOOK SELL REPORT</h5>
        </div>
        <div className="col-10">
          <Graph />
        </div>
        {/* <div className="col-sm-12 col-lg-6 col-md-6">
          <Chart />
        </div> */}
      </div>
    </div>
  );
}

export default Report;

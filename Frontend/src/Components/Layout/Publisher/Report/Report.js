import { IoAddOutline } from "react-icons/io5";
import Graph from "./Graph";
import "./Report.css";
import CardComponent from "../../../Core-Components/Card";
import { LuIndianRupee } from "react-icons/lu";
import CustomButton from "../../../Core-Components/Button";
import { useNavigate } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import Renevue from "../../../Assets/book-rent.png";
import soldRent from "../../../Assets/rent.png";
import publish from "../../../Assets/publish.webp";
import soldBook from "../../../Assets/sell.webp";
import { FaCalendar } from "react-icons/fa";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPubDetailRequest } from "../../../../Redux/Action/PublisherAction/PubDetail";
import { ProgressSpinner } from "primereact/progressspinner";

function Report() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const is_institution =
    localStorage.getItem("is_institution") === "true" ? true : false;

  const { loading, Details } = useSelector((state) => state?.PubDetail);

  useEffect(() => {
    dispatch(getPubDetailRequest());
  }, []);

  const BookReport_List = is_institution
    ? [
        {
          title: "Book published",
          count: loading ? (
            <ProgressSpinner style={{ width: "20px", height: "20px" }} />
          ) : (
            Details?.Book_published || 0
          ),
          image: publish,
          Des: "Number of Book Published",
        },
      ]
    : [
        {
          title: "Book published",
          count: loading ? (
            <ProgressSpinner style={{ width: "20px", height: "20px" }} />
          ) : (
            Details?.Book_published || 0
          ),
          image: publish,
          Des: "Number of Book Published",
        },
        {
          title: "Book Sold",
          count: loading ? (
            <ProgressSpinner style={{ width: "20px", height: "20px" }} />
          ) : (
            Details?.purchased_book_count || 0
          ),
          image: soldBook,
          Des: "Number of Book Sold",
        },
        {
          title: "Book Rented",
          count: "500",
          image: soldRent,
          width: "50px",
          Des: "Number of Book Rented",
        },
        {
          title: "Total Revenue",
          count: "50000",
          image: Renevue,
          Des: "Revenue on sell",
        },
      ];

  return (
    <div className="publisher-report">
      <div className="publish-header row gap-3 justify-content-between">
        <h5 className="mb-0 col-lg-4 col-md-6 col-sm-12">REPORT</h5>
        <div className="d-flex col-lg-6 col-md-6 col-sm-12 justify-content-end">
          <CustomButton
            type="button"
            className="addnew-btn me-1"
            style={{
              backgroundColor: "green",
              fontSize: "14px",
              padding: "5px 10px",
            }}
            onClick={() => navigate("/publisher/dashboard/upload")}
          >
            <IoAddOutline className="me-1" style={{ fontSize: "18px" }} />
            Add Book
          </CustomButton>
          {/* <CustomButton
            type="button"
            className="addnew-btn"
            style={{
              backgroundColor: "gray",
              fontSize: "14px",
              padding: "2px 10px",
            }}
            onClick={() => navigate("/publisher/dashboard/library")}
          >
            <MdModeEdit className="me-1" style={{ fontSize: "14px" }} />
            Edit Book
          </CustomButton> */}
        </div>
      </div>
      <div className="report-card row mt-4">
        {BookReport_List?.map((book) => (
          <CardComponent
            className="col-sm-12 col-lg-3 col-md-3"
            style={{
              width: "280px",
              height: "150px",
              padding: "10px 0",
            }}
          >
            <div
              className="report-count row align-items-center"
              style={{ width: "100%", height: "100%", margin: "0 auto" }}
            >
              <div className="col-3">
                <img
                  src={book?.image}
                  alt="book"
                  width={book?.width ? book?.width : "60px"}
                />
              </div>
              <div className="col-9">
                <h6
                  className="ms-2"
                  style={{ textTransform: "uppercase", color: "#8d969d" }}
                >
                  {book?.title}
                </h6>
                <div
                  className="d-flex align-items-center ms-2"
                  style={{ color: "#212529" }}
                >
                  {book?.title === "Total Revenue" ? (
                    <LuIndianRupee size={25} className="mb-1" />
                  ) : (
                    ""
                  )}
                  <h2>{book?.count}</h2>
                </div>
              </div>
              <div
                className="col-12"
                style={{ borderTop: "1px solid #e2e2e3" }}
              >
                <p
                  className="d-flex align-items-center gap-2 mb-0 mt-2"
                  style={{ color: "rgb(182 182 182)" }}
                >
                  <FaCalendar />
                  <span>{book?.Des}</span>
                </p>
              </div>
            </div>
          </CardComponent>
        ))}
      </div>
      <div className=" mt-5">
        <h5 className="mb-3">BOOK SELL REPORT</h5>
        <div className="scale-report">
          <div className="col-8">
            <Graph />
          </div>
        </div>
        {/* <div className="col-sm-12 col-lg-6 col-md-6">
          <Chart />
        </div> */}
      </div>
    </div>
  );
}

export default Report;

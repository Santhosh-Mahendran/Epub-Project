import React, { useEffect, useState } from "react";
import { Book_list } from "../../../Datas";
import { Review } from "../../../Core-Components/Highlight";
import { LuIndianRupee } from "react-icons/lu";
import CustomButton from "../../../Core-Components/Button";
import { Tooltip, IconButton } from "@mui/material";
import { ImCross } from "react-icons/im";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./Library.css";
import { useDispatch } from "react-redux";
import { PurchaseBook_Request } from "../../../../Redux/Action/UserAction/PurchaseBookAction";
import { Base_Url } from "../../../../Environment/Base_Url";
import { IoChevronBack } from "react-icons/io5";

function OrderSummary() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const BookDetails = location?.state;
  const BookList = location?.state?.cartItems;
  const [bookList, setBookList] = useState([]);
  useEffect(() => {
    if (BookList) {
      setBookList(BookList);
    }
  }, []);
  const TotalAmount = bookList?.reduce(
    (sum, book) => sum + (Number(book?.price) || 0),
    0
  );

  const handleOrderConfirm = () => {
    dispatch(PurchaseBook_Request({ book_id: BookDetails?.book_id }));
    navigate("/reader/dashboard/detail/order/summary/orderplaced");
  };

  const handleCancelItem = (BookId) => {
    if (BookDetails && !BookList) {
      window.history.back();
    }
    if (BookList) {
      console.log(BookId);

      setBookList(bookList?.filter((book) => book?.book_id !== BookId));
    }
  };

  const OrderSummary = (BookDetails) => {
    return (
      <>
        <div className="cardBox wish-book" style={{ padding: "5px 20px" }}>
          <div className="row justify-content-between">
            <div className="col-lg-2 col-sm-12 col-md-6">
              <img
                src={`${Base_Url}/files/cover_image/${BookDetails?.cover_image}`}
                alt="image"
                width="100px"
              />
            </div>
            <div
              className="col-lg-6 col-sm-12 col-md-6 d-flex flex-column"
              style={{ rowGap: "10px" }}
            >
              <div className="d-flex align-items-center flex-column flex-md-row mt-2">
                <h4 className="mb-0">{BookDetails?.title}</h4>
                <h5 className="mb-0 mt-1" style={{ color: "#5e5e5e" }}>
                  - {BookDetails?.author}
                </h5>
              </div>
              <div>
                <h6 className="mb-0" style={{ color: "#5e5e5e" }}>
                  {BookDetails?.genre}
                </h6>
              </div>
              <Review />
              <h5 className="mb-0">
                <LuIndianRupee
                  size={16}
                  className="mb-1"
                  style={{ fontWeight: "bold" }}
                />
                {BookDetails?.price}
              </h5>
            </div>
            <div className="col-lg-4 col-sm-12 align-self-end d-flex justify-content-end">
              <CustomButton
                className="mx-2 float-right mb-2"
                sx={{
                  backgroundColor: "#BA0E0E",
                  padding: "5px 11px",
                  fontSize: "12px",
                }}
                onClick={() => handleCancelItem(BookDetails?.book_id)}
              >
                {BookDetails && !BookList ? "Cancel" : "Remove Item"}
              </CustomButton>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="Order-summary shadow" style={{ height: "100%" }}>
      <div
        className="d-flex justify-content-between p-0"
        style={{ marginTop: "-13px", marginRight: "-5px" }}
      >
        <Link
          style={{
            textDecoration: "none",
            fontSize: "17px",
          }}
          onClick={() => window.history.back()}
        >
          <IoChevronBack className="mb-1" />
          Back
        </Link>
        <Tooltip title="cancel">
          <IconButton>
            <ImCross
              size={"10px"}
              style={{ color: "rgb(149 149 149)" }}
              onClick={() => navigate("/reader/dashboard/explore")}
            />
          </IconButton>
        </Tooltip>
      </div>
      <h4 className="mb-3">Order Summary</h4>
      <div className="Order-summary-list">
        {BookDetails && !BookList && OrderSummary(BookDetails)}
        {bookList && bookList?.map((BookDetails) => OrderSummary(BookDetails))}
        <>
          <div className="card payment">
            <h6 className="mb-0 card-header">Payment Method</h6>
            <div className="card-body d-flex flex-column gap-3">
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue=""
                name="radio-buttons-group"
              >
                <FormControlLabel value="UPI" control={<Radio />} label="UPI" />
                <FormControlLabel
                  value="Wallet"
                  control={<Radio />}
                  label="Wallet"
                />
                <FormControlLabel
                  value="card"
                  control={<Radio />}
                  label="Credit / debit /ATM Card"
                />
                <FormControlLabel
                  value="Netbanking"
                  control={<Radio />}
                  label="Netbanking"
                />
              </RadioGroup>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-between align-items-center p-2">
                <h6 className="mb-0">Total Amount</h6>
                <h6 className="mb-0 d-flex align-items-center">
                  {" "}
                  <LuIndianRupee
                    size={13}
                    style={{ fontWeight: "bold", marginTop: "3px" }}
                  />
                  <strong>
                    {BookDetails && !BookList
                      ? BookDetails?.price
                      : TotalAmount}
                  </strong>
                </h6>
              </div>
            </div>
          </div>
          <CustomButton
            sx={{ backgroundColor: "green" }}
            onClick={handleOrderConfirm}
          >
            Confirm Order
          </CustomButton>
        </>
      </div>
    </div>
  );
}

export default OrderSummary;

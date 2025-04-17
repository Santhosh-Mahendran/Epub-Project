import React from "react";
import { Book_list } from "../../../Datas";
import { Review } from "../../../Core-Components/Highlight";
import { LuIndianRupee } from "react-icons/lu";
import CustomButton from "../../../Core-Components/Button";
import { Tooltip, IconButton } from "@mui/material";
import { ImCross } from "react-icons/im";
import { useNavigate, useSearchParams } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./Library.css";
import { useDispatch } from "react-redux";
import { PurchaseBook_Request } from "../../../../Redux/Action/UserAction/PurchaseBookAction";

function OrderSummary() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const bookId = searchParams.get("bookId");
  const handleOrderConfirm = () => {
    dispatch(PurchaseBook_Request({ book_id: bookId }));
  };
  return (
    <div className="Order-summary shadow" style={{ height: "100%" }}>
      <div
        className="d-flex justify-content-end p-0"
        style={{ marginTop: "-13px", marginRight: "-5px" }}
      >
        <Tooltip title="cancel">
          <IconButton>
            <ImCross
              size={"10px"}
              style={{ color: "rgb(149 149 149)" }}
              onClick={() => navigate("/user/dash/explore")}
            />
          </IconButton>
        </Tooltip>
      </div>
      <h4 className="mb-3">Order Summary</h4>
      <div className="Order-summary-list">
        {Book_list?.slice(0, 1)?.map((book) => (
          <>
            <div className="cardBox wish-book" style={{ padding: "5px 20px" }}>
              <div className="row justify-content-between">
                <div className="col-2">
                  <img src={book?.Book_cover} width="100px" />
                </div>
                <div
                  className="col-6 d-flex flex-column"
                  style={{ rowGap: "10px" }}
                >
                  <div className="d-flex align-items-center">
                    <h4 className="mb-0">{book?.title}</h4>
                    <h5 className="mb-0 mt-1" style={{ color: "#5e5e5e" }}>
                      - {book?.author}
                    </h5>
                  </div>
                  <div>
                    <h6 className="mb-0" style={{ color: "#5e5e5e" }}>
                      {book?.genre}
                    </h6>
                  </div>
                  <Review />
                  <h5 className="mb-0">
                    <LuIndianRupee
                      size={16}
                      className="mb-1"
                      style={{ fontWeight: "bold" }}
                    />
                    {book?.price}
                  </h5>
                </div>
                <div className="col-4 align-self-end d-flex justify-content-end">
                  <CustomButton
                    className="mx-2 float-right mb-2"
                    sx={{
                      backgroundColor: "#BA0E0E",
                      padding: "5px 11px",
                      fontSize: "12px",
                    }}
                  >
                    Remove Item
                  </CustomButton>
                </div>
              </div>
            </div>

            <div className="cardBox total">
              <div className="d-flex justify-content-between align-items-center p-2">
                <h6 className="mb-0">Total Price</h6>
                <h6 className="mb-0">
                  {" "}
                  <LuIndianRupee
                    size={13}
                    style={{ fontWeight: "bold", marginBottom: "2px" }}
                  />
                  1000
                </h6>
              </div>
            </div>
            <div className="card payment">
              <h6 className="mb-0 card-header">Payment Method</h6>
              <div className="card-body d-flex flex-column gap-3">
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue=""
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="UPI"
                    control={<Radio />}
                    label="UPI"
                  />
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
                  <h6 className="mb-0">Confirm Order</h6>
                  <h6 className="mb-0 d-flex align-items-center">
                    {" "}
                    <LuIndianRupee
                      size={13}
                      style={{ fontWeight: "bold", marginTop: "3px" }}
                    />
                    1000
                  </h6>
                </div>
              </div>
            </div>
            <CustomButton
              sx={{ backgroundColor: "green" }}
              onClick={
                () => handleOrderConfirm()
                // navigate("/user/dash/detail/order/summary/orderplaced")
              }
            >
              Confirm Order
            </CustomButton>
          </>
        ))}
      </div>
    </div>
  );
}

export default OrderSummary;

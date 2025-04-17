import React from "react";
import placed from "../../../Assets/7efs.gif";
import CustomButton from "../../../Core-Components/Button";
import { useNavigate } from "react-router-dom";
import "./Library.css";

function OrderPlaced() {
  const navigate = useNavigate();
  return (
    <div
      className="order-success d-flex flex-column justify-content-center mx-auto"
      style={{ width: "25%", height: "70vh" }}
    >
      <div className="card shadow" style={{ padding: "0px 20px 20px 20px" }}>
        <img src={placed} width="200px" alt="gif" className="mx-auto" />
        <h4
          className="text-center"
          style={{ fontSize: "22px", fontWeight: "medium", marginTop: "-20px" }}
        >
          BOOK PURCHASED <br />
          SUCCESSFULLY!
        </h4>
        <p
          className="text-center"
          style={{ fontSize: "19px", color: "#5e5e5e", fontWeight: "500" }}
        >
          Your book is on the way. Happy reading! 📚
        </p>
        <CustomButton
          type="button"
          onClick={() => navigate("/user/dash/explore")}
          sx={{ backgroundColor: "green" }}
        >
          Continue Shopping
        </CustomButton>
      </div>
    </div>
  );
}

export default OrderPlaced;

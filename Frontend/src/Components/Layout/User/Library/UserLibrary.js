import React, { useEffect } from "react";
import "../UserDetails/UserDetail.css";
import CustomButton from "../../../Core-Components/Button";
import ProductList from "./ProductList";
import { Gauge } from "@mui/x-charts/Gauge";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { Get_PurchasedBook_Request } from "../../../../Redux/Action/UserAction/PurchaseBookAction";
import { useDispatch, useSelector } from "react-redux";

function UserLibrary() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlePreviewOpen = (Book) => {
    navigate(`/reader/bookpreview`, { state: Book });
  };
  const { purchasedBook } = useSelector((state) => state.PurchasedBook);
  useEffect(() => {
    dispatch(Get_PurchasedBook_Request());
  }, [dispatch]);
  return (
    <>
      <ProductList Book_list={purchasedBook} title="My Library">
        {(Book) => (
          <div
            className="mt-1 d-flex flex-column justify-content-between"
            style={{ height: "100%" }}
          >
            <div className="float-right">
              <Box sx={{ position: "relative", zIndex: "0" }}>
                <Gauge
                  width={100}
                  height={100}
                  value={Book?.percentage}
                  text={({ value }) => `${value}%`}
                  sx={{ float: "right" }}
                />
              </Box>
            </div>
            <div className="d-flex justify-content-end mb-2">
              <CustomButton
                className="mx-2"
                sx={{
                  backgroundColor: "#22B16A",
                  padding: "2px 8px",
                  fontSize: "12px",
                }}
              >
                Purchased
              </CustomButton>
              <CustomButton
                sx={{
                  backgroundColor: "#4B4363",
                  padding: "2px 8px",
                  fontSize: "12px",
                }}
                onClick={() => handlePreviewOpen(Book)}
              >
                Continue Reading
              </CustomButton>
            </div>
          </div>
        )}
      </ProductList>
    </>
  );
}

export default UserLibrary;

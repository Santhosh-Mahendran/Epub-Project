import React, { useEffect, useState } from "react";
import CustomButton from "../../../Core-Components/Button";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ProductList from "./ProductList";
import { Tooltip, IconButton } from "@mui/material";
import { LuIndianRupee } from "react-icons/lu";
import "./Library.css";
import { useDispatch, useSelector } from "react-redux";
import {
  GetCartItem_Request,
  RemoveCartitem_Request,
} from "../../../../Redux/Action/UserAction/CartBookAction";
import DeleteCard from "./DeleteCard";

function Cart() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.CartBook);
  const [DelDialogOpen, setDelDialogOpen] = useState(false);
  const [cartId, setCartId] = useState(null);
  const [BookName, setBookname] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(GetCartItem_Request());
  }, [dispatch]);

  const handleDeleteCartItem = (Book) => {
    setCartId(Book?.cart_id);
    setBookname(Book?.title);
    setDelDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDelDialogOpen(false);
  };
  const handleDeleteItem = () => {
    dispatch(RemoveCartitem_Request(cartId));
  };
  const handlepurchase = () => {
    navigate(`/reader/dashboard/detail/order/summary`, {
      state: { cartItems },
    });
  };
  const TotalAmount = cartItems.reduce(
    (sum, book) => sum + (Number(book?.price) || 0),
    0
  );

  const OrderFooter = () => {
    return (
      <div className="total-price">
        <div className="d-flex justify-content-between align-items-center p-2">
          <h6 className="mb-0">Total Price</h6>
          <h6 className="mb-0">
            <LuIndianRupee size={16} className="mb-1" />
            {TotalAmount}
          </h6>
        </div>
        <div className="mt-2" style={{ position: "relative", bottom: "0" }}>
          <div className="d-flex justify-content-end align-items-center p-2">
            <CustomButton
              sx={{
                backgroundColor: "#19701D",
                padding: "6px 12px",
                fontSize: "14px",
              }}
              onClick={handlepurchase}
            >
              Place Order
            </CustomButton>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <ProductList title="My Cart" Book_list={cartItems} Footer={OrderFooter}>
        {(Cart) => (
          <div
            className="d-flex flex-column justify-content-between"
            style={{ height: "100%" }}
          >
            <div className="text-end">
              <Tooltip title="Delete">
                <IconButton>
                  <MdDelete
                    size={19}
                    onClick={() => handleDeleteCartItem(Cart)}
                  />
                </IconButton>
              </Tooltip>
            </div>
            <div className="d-flex justify-content-end mb-2">
              <CustomButton
                className="mx-2"
                sx={{
                  backgroundColor: "#098446",
                  padding: "6px 12px",
                  fontSize: "14px",
                }}
                onClick={() =>
                  navigate(`/reader/dashboard/detail/order/summary`, {
                    state: Cart,
                  })
                }
              >
                Buy Now
              </CustomButton>
              <CustomButton
                sx={{
                  padding: "6px 12px",
                  fontSize: "14px",
                }}
                onClick={() =>
                  navigate(`/reader/dashboard/detail/order/summary`, {
                    state: Cart,
                  })
                }
              >
                Rent Now
              </CustomButton>
            </div>
          </div>
        )}
      </ProductList>
      <DeleteCard
        open={DelDialogOpen}
        onClose={handleDialogClose}
        handleDeleteItem={handleDeleteItem}
        title={`Remove Item from Cart`}
        BookName={BookName}
        discription="Cart"
      />
    </>
  );
}

export default Cart;

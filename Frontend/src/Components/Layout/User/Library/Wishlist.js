import React, { useEffect, useState } from "react";
// import { Book_list } from "../../../Datas";
import CustomButton from "../../../Core-Components/Button";
import { MdDelete } from "react-icons/md";
import ProductList from "./ProductList";
import { useNavigate } from "react-router-dom";
import { Tooltip, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  GetWishlistItem_Request,
  RemoveWishlistitem_Request,
} from "../../../../Redux/Action/UserAction/WishlistBookAction";
import DeleteCard from "./DeleteCard";

function Wishlist() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [bookId, setBookId] = useState(null);
  const [BookName, setBookname] = useState("");
  const { wishlistItems } = useSelector((state) => state.WishlistBook);
  const [DelDialogOpen, setDelDialogOpen] = useState(false);

  const handleDeleteWishlistItem = (Book) => {
    setBookId(Book?.wishlist_id);
    setBookname(Book?.title);
    setDelDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDelDialogOpen(false);
  };
  const handleDeleteItem = () => {
    dispatch(RemoveWishlistitem_Request(bookId));
  };
  useEffect(() => {
    dispatch(GetWishlistItem_Request());
  }, [dispatch]);
  return (
    <>
      <ProductList title="My Wishlist" Book_list={wishlistItems}>
        {(wishlist) => (
          <div
            className="d-flex flex-column justify-content-between"
            style={{ height: "100%" }}
          >
            <div className="text-end">
              <Tooltip title="Remove from Wishlist">
                <IconButton onClick={() => handleDeleteWishlistItem(wishlist)}>
                  <MdDelete size={19} />
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
                onClick={() => navigate("/user/dash/detail/order/summary")}
              >
                Buy Now
              </CustomButton>
              <CustomButton
                sx={{
                  // backgroundColor: "#098446",
                  padding: "6px 12px",
                  fontSize: "14px",
                }}
                onClick={() => navigate("/user/dash/detail/order/summary")}
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
        title={`Remove Item from Wishlist`}
        discription={`Are you sure you want to delete <strong>${BookName}</strong> from
          your wishlist?`}
      />
    </>
  );
}

export default Wishlist;

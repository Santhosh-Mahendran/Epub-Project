import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LuIndianRupee } from "react-icons/lu";
import { FiEye } from "react-icons/fi";
import { FaHeart } from "react-icons/fa6";
import "../Dashboard/UserDash.css";
import CustomButton from "../../../Core-Components/Button";
import { Tooltip, IconButton } from "@mui/material";
import { Review } from "../../../Core-Components/Highlight";
import { ImCross } from "react-icons/im";
import { IoChevronBack } from "react-icons/io5";
import { CiShop } from "react-icons/ci";
import { AddtoWishlist_Request } from "../../../../Redux/Action/UserAction/WishlistBookAction";
import { useDispatch, useSelector } from "react-redux";
import {
  AddtoCart_Request,
  RemoveCartitem_Request,
} from "../../../../Redux/Action/UserAction/CartBookAction";
import coverImg from "../../../Assets/book_cover4.jpg";
import { BookDetailPubLoading } from "../../../Core-Components/Loading";
import { Base_Url } from "../../../../Environment/Base_Url";

function ExploreBookDetail() {
  const location = useLocation();
  const IsPurchased = location?.state;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { BookDetails, loading: BookDetailLoading } = useSelector(
    (state) => state.UserBook
  );
  const { cartItems } = useSelector((state) => state.CartBook);
  const AlreadyInCart = cartItems?.find(
    (cartItem) => cartItem?.book_id === BookDetails?.book_id
  );
  console.log(AlreadyInCart);


  const hanldePublisherDetailsOpen = () => {
    // navigate("/reader/publisherDetails");
    navigate("/reader/publisher/profile");
  };

  const handlePreviewOpen = () => {
    navigate("/reader/bookpreview");
  };

  const handleAddWishlist = (BookId) => {
    dispatch(AddtoWishlist_Request({ book_id: BookId }));
  };

  const handleAddItemToCart = (BookId) => {
    if (AlreadyInCart) {      
      dispatch(RemoveCartitem_Request(AlreadyInCart?.cart_id));
    } else {
      dispatch(AddtoCart_Request({ book_id: BookId }));
    }
  };
  if (BookDetailLoading) {
    return <BookDetailPubLoading role="user" />;
  }
  return (
    <>
      <div className="userbookDetail row shadow cardBox">
        <div className="d-flex justify-content-between p-0">
          <Link
            className="mb-2"
            style={{ textDecoration: "none", fontSize: "19px" }}
            onClick={()=>window.history.back()}
          >
            <IoChevronBack className="mb-1" />
            Back
          </Link>
          <Tooltip title="cancel">
            <IconButton>
              <ImCross
                size={"10px"}
                style={{ color: "rgb(149 149 149)" }}
                onClick={() => navigate("")}
              />
            </IconButton>
          </Tooltip>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12 justify-content-center left-container">
          <img
            src={`${Base_Url}/files/cover_image/${BookDetails?.cover_image}`}
            alt="image"
          />
          <div
            style={{ width: "70%", marginLeft: "auto", marginRight: "auto" }}
          >
            {/* <div className="icons my-2">
              <div
                role="button"
                onClick={handlePreviewOpen}
                // href="/Headword Flipbook Sample/index.html"
                style={{ textDecoration: "none", color: "#5e5e5e" }}
              >
                <FiEye
                  size={20}
                  style={{ color: "#5e5e5e" }}
                  className="mb-1"
                />
                <span className="ms-1" style={{ fontSize: "17px" }}>
                  Preview
                </span>
              </div>
            </div> */}
            <div className="action-btn mt-2 ms-auto" style={{ zIndex: 0 }}>
              {IsPurchased ? (
                <div>
                  <CustomButton
                    sx={{
                      backgroundColor: "rgb(34 177 106)",
                      padding: "0.5rem 1rem",
                    }}
                    className="my-1"
                    disable
                  >
                    PURCHASED
                  </CustomButton>
                  <CustomButton
                    sx={{ backgroundColor: "#0d6efd", padding: "0.5rem 1rem" }}
                    className="my-1"
                    onClick={() => navigate("/reader/dashboard/detail/library")}
                  >
                    Go to Library
                  </CustomButton>
                </div>
              ) : (
                <>
                  <CustomButton
                    className="m-1"
                    sx={{
                      backgroundColor: "#1c6eb2",
                      padding: "6px 12px",
                      fontSize: "14px",
                    }}
                    onClick={() => handleAddItemToCart(BookDetails.book_id)}
                  >
                    {AlreadyInCart
                      ? "Remove from Cart"
                      : " ADD TO CART"}
                  </CustomButton>
                  <CustomButton
                    className="m-1"
                    sx={{
                      backgroundColor: "#098446",
                      padding: "6px 12px",
                      fontSize: "14px",
                    }}
                    onClick={() =>
                      navigate("/reader/dashboard/detail/order/summary", {
                        state: BookDetails,
                      })
                    }
                  >
                    Buy Now
                  </CustomButton>
                  <CustomButton
                    className="m-1"
                    sx={{
                      backgroundColor: "#63af27",
                      padding: "6px 12px",
                      fontSize: "14px",
                    }}
                    onClick={() =>
                      navigate("/reader/dashboard/detail/order/summary", {
                        state: BookDetails,
                      })
                    }
                  >
                    Rent Now
                  </CustomButton>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-6 col-md-12 col-sm-12 book-content right-container">
          <div className="d-flex justify-content-between">
            <span className="tag shadow">BestSeller</span>
            <span>
              <FaHeart
                size={18}
                style={{ color: "grey" }}
                className="like-icon"
                onClick={() => handleAddWishlist(BookDetails.book_id)}
              />
            </span>
          </div>
          <h2>{BookDetails?.title}</h2>
          <p className="author-name mb-0">{BookDetails?.author}</p>
          <p className="mb-0">
            <span className="sub-title">Genre</span> -{" "}
            <span className="value">{BookDetails?.genre}</span>
          </p>
          <Review />
          <p className="mb-0">
            <span className="sub-title">Price</span> -
            {BookDetails?.offer_price ? (
              <span className="value">
                {" "}
                <LuIndianRupee
                  size={16}
                  className="mb-1"
                  style={{ fontWeight: "bold" }}
                />
                <del>{BookDetails?.price}</del>
                &nbsp;{" "}
                <LuIndianRupee
                  size={16}
                  className="mb-1"
                  style={{ fontWeight: "bold" }}
                />
                {BookDetails?.offer_price}
              </span>
            ) : (
              <span className="value">
                {" "}
                <LuIndianRupee
                  size={16}
                  className="mb-1"
                  style={{ fontWeight: "bold" }}
                />
                {BookDetails?.price}
              </span>
            )}
          </p>
          <p className="mb-0">
            <span className="sub-title">Rent</span> -{" "}
            <span className="value">
              <LuIndianRupee size={17} className="mb-1" />
              {BookDetails?.rental_price} / {BookDetails?.Rental_duration} month
            </span>
          </p>
          <p className="mb-0">
            <span className="sub-title"> Discription</span> -{" "}
            <span className="value-dis">{BookDetails?.discription}</span>
          </p>
          <div className="publisher-Details cardBox p-3 d-flex flex-column justify-content-center gap-3">
            <h6
              className="mb-0"
              style={{ color: "#5e5e5e", fontWeight: "700", fontSize: "20px " }}
            >
              Published By
            </h6>
            <div className="shop-detail d-flex justify-content-between align-items-center">
              <div className="d-flex gap-2 align-items-center">
                <div className="border rounded-circle p-2">
                  <CiShop fontSize={26} />
                </div>
                <div
                  style={{
                    color: "#5e5e5e",
                    fontWeight: "600",
                    fontSize: "18px ",
                  }}
                >
                  EBOOK PUBLISHER
                </div>
              </div>
              <div className="view-shop">
                <CustomButton
                  style={{
                    backgroundColor: "transparent",
                    // borderColor: "#4b4363",
                    color: "#4b4363",
                    fontSize: "13px",
                  }}
                  onClick={hanldePublisherDetailsOpen}
                >
                  View Books
                </CustomButton>
              </div>
            </div>
            <div className="review-detail d-flex align-tems-center gap-5">
              <Review />
              <div
                style={{
                  color: "#5e5e5e",
                  fontWeight: "600",
                  fontSize: "17px ",
                }}
              >
                Books - <span style={{ color: "#4b4363" }}>2000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="recommadation"></div>
    </>
  );
}

export default ExploreBookDetail;

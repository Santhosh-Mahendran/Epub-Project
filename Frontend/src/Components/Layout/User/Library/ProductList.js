import React from "react";
import "../UserDetails/UserDetail.css";
import { Review } from "../../../Core-Components/Highlight";
import { LuIndianRupee } from "react-icons/lu";
import "./Library.css";
import { UserLibraryLoading } from "../../../Core-Components/Loading";
import { useSelector } from "react-redux";
import { Base_Url } from "../../../../Environment/Base_Url";
import { useLocation } from "react-router-dom";

function ProductList({ title, Book_list, children, Footer }) {
  const { loading: WishlistLoading } = useSelector(
    (state) => state.WishlistBook
  );
  const { pathname } = useLocation();
  const { loading: CartLoading } = useSelector((state) => state.CartBook);
  const { loading: ParchaseLoading } = useSelector(
    (state) => state.PurchasedBook
  );

  if (WishlistLoading || CartLoading || ParchaseLoading) {
    return <UserLibraryLoading />;
  }

  return (
    <div className="user-wishlist cardBox" style={{ height: "100%" }}>
      <h4>{title}</h4>
      <div className="wishbook-list card-body p-0">
        {Book_list && Book_list.length > 0 ? (
          Book_list?.map((book, index) => (
            <div
              className="cardBox wish-book"
              style={{ padding: "5px 20px" }}
              key={index}
            >
              <div className="row justify-content-center">
                <div className="col-lg-2 col-md-2 col-sm-12">
                  <img
                    src={`${Base_Url}/files/cover_image/${book?.cover_image}`}
                    width="100px"
                  />
                </div>
                <div
                  className="col-lg-5 col-md-5 col-sm-12 d-flex flex-column"
                  style={{ rowGap: "10px" }}
                >
                  <div className="d-flex align-items-center">
                    <h4 className="mb-0">{book?.title}</h4>
                    <h5 className="mb-0 mt-1" style={{ color: "#5e5e5e" }}>
                      - {book?.author}
                    </h5>
                  </div>
                  {book?.genre && (
                    <div>
                      <h6 className="mb-0" style={{ color: "#5e5e5e" }}>
                        {book?.genre}
                      </h6>
                    </div>
                  )}
                  <Review />
                  {pathname !== "/reader/dashboard/detail/library" && (
                    <>
                      {" "}
                      <p className="mb-0">
                        <span className="sub-title">Price</span> -
                        {book?.offer_price ? (
                          <span className="value">
                            {" "}
                            <LuIndianRupee
                              size={16}
                              className="mb-1"
                              style={{ fontWeight: "bold" }}
                            />
                            {book?.offer_price} &nbsp;
                            <span className="strike">
                              <LuIndianRupee
                                size={16}
                                className="mb-1"
                                style={{ fontWeight: "bold" }}
                              />
                              {book?.price}
                            </span>
                          </span>
                        ) : (
                          <span className="value">
                            {" "}
                            <LuIndianRupee
                              size={16}
                              className="mb-1"
                              style={{ fontWeight: "bold" }}
                            />
                            {book?.price}
                          </span>
                        )}
                      </p>
                      {book?.rental_price && (
                        <p className="mb-0">
                          <span className="sub-title">Rental Price</span> -
                          <span className="value">
                            {" "}
                            <LuIndianRupee
                              size={16}
                              className="mb-1"
                              style={{ fontWeight: "bold" }}
                            />
                            {book?.price}
                          </span>
                        </p>
                      )}
                    </>
                  )}
                </div>
                <div className="col-lg-5 col-md-5  col-sm-12">
                  {children && children(book)}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <p>
              {title === "My Cart" && "Cart Empty"}
              {title === "My Wishlist" && "Wishlist Empty"}
              {title === "My Library" && "Library Empty"}
            </p>
          </div>
        )}
      </div>
      {Footer && Footer(Book_list)}
    </div>
  );
}

export default ProductList;

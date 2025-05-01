import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import "../Dashboard/UserDash.css";
import BookList from "../../../Core-Components/BookList.js";
import { IoChevronBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  GetUserBook_Request,
  GetUserBookbyId_Request,
} from "../../../../Redux/Action/UserAction/UserBookAction.js";
import { BookListLoading } from "../../../Core-Components/Loading.js";
import { GetCartItem_Request } from "../../../../Redux/Action/UserAction/CartBookAction.js";
import { GetWishlistItem_Request } from "../../../../Redux/Action/UserAction/WishlistBookAction.js";

function ExploreBook() {
  const [searchBook, setSearchBook] = useState("");
  const [Book_list, setBook_List] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const location = useLocation();
  const publisher = location.state;
  const Dashboard = location.pathname === "/reader/dashboard" ? true : false;
  const {
    UserBooks,
    loading: BookLoading,
    FilteredBook: FilterBook,
  } = useSelector((state) => state.UserBook);

  useEffect(() => {
    dispatch(GetCartItem_Request());
    dispatch(GetWishlistItem_Request());
    dispatch(GetUserBook_Request());
  }, [dispatch]);

  useEffect(() => {
    if (FilterBook.length > 0 && publisher?.value !== "all") {
      setBook_List(FilterBook);
    } else if (FilterBook.length > 0 && publisher?.value === "all") {
      setBook_List(UserBooks);
    } else {
      setBook_List(UserBooks);
    }
  }, [UserBooks, FilterBook, publisher?.value]);

  const FilteredBook = searchQuery
    ? Book_list?.filter((book) => book.title === searchQuery)
    : Book_list;

  const handleBookOpen = (bookData) => {
    if (FilterBook.length > 0 && publisher?.value !== "all") {
      return;
    } else {
      dispatch(GetUserBookbyId_Request(bookData.book_id));
      navigate(`/reader/dashboard/explore/book`, {
        state: bookData?.already_purchased,
      });
    }
  };

  return (
    <>
      <div className="allBooks row shadow">
        {Dashboard ? (
          ""
        ) : (
          <Link
            style={{
              textDecoration: "none",
              fontSize: "17px",
            }}
            className="mb-2"
            onClick={()=>window.history.back()}
          >
            <IoChevronBack className="mb-1" />
            Back
          </Link>
        )}
        <div
          className="d-flex justify-content-between flex-column"
          style={{ rowGap: "20px" }}
        >
          {Dashboard ? (
            <div className="d-flex justify-content-between align-items-center">
              <h4>Explore Books</h4>
              <Link
                to="/reader/dashboard/explore"
                style={{ textDecoration: "none", whiteSpace: "nowrap" }}
              >
                View All
                <FaArrowRight size={16} className="ms-1 mb-1" />
              </Link>
            </div>
          ) : (
            <h4>
              {FilterBook.length > 0 ? publisher?.label : "Explore Books"}
            </h4>
          )}
          {false ? (
            <BookListLoading />
          ) : (
            <BookList
              FilteredBook={
                Dashboard ? FilteredBook?.slice(0, 4) : FilteredBook
              }
              handleBookOpen={handleBookOpen}
              BookLoading={BookLoading}
              SubBook={FilterBook.length > 0 && publisher?.value !== "all"}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default ExploreBook;

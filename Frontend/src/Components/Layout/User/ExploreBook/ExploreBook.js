import React, { useEffect, useState } from "react";
import { InputAdornment, TextField } from "@mui/material";
import { CiSearch } from "react-icons/ci";
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
      navigate(`/reader/dashboard/explore/book`);
    }
  };

  return (
    <>
      <div className="allBooks row shadow ">
        <Link
          to="/reader/dashboard"
          style={{
            textDecoration: "none",
            fontSize: "17px",
            width: "fit-content",
            marginLeft: "12px",
            borderRadius: "5px",
            backgroundColor: "#f2f2f2",
            textAlign: "center",
          }}
          className="shadow my-2"
        >
          <IoChevronBack className="mb-1" />
          Back
        </Link>
        <div
          className="d-flex justify-content-between flex-column"
          style={{ rowGap: "20px" }}
        >
          <h4>{FilterBook.length > 0 ? publisher?.label : "Explore Books"}</h4>
          {/* <TextField
            placeholder="Search by Title , Author , Genre and more..."
            className="input"
            value={searchBook}
            onChange={(e) => setSearchBook(e.target.value)}
            size="small"
            sx={{ width: "500px" }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end" style={{ cursor: "pointer" }}>
                    <CiSearch size={22} />
                  </InputAdornment>
                ),
              },
            }}
          /> */}

          {false ? (
            <BookListLoading />
          ) : (
            <BookList
              FilteredBook={FilteredBook}
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

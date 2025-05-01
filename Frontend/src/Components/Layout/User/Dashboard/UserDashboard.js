import React, { useEffect, useState } from "react";
import Userbanner from "../../../Assets/banner.jpg";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import BookList from "../../../Core-Components/BookList.js";
import { useDispatch, useSelector } from "react-redux";
import { GetCartItem_Request } from "../../../../Redux/Action/UserAction/CartBookAction.js";
import {
  GetUserBook_Request,
  GetUserBookbyId_Request,
} from "../../../../Redux/Action/UserAction/UserBookAction.js";
import { GetWishlistItem_Request } from "../../../../Redux/Action/UserAction/WishlistBookAction";
import ExploreBook from "../ExploreBook/ExploreBook.js";

function UserDashboard() {
  const navigate = useNavigate();
  const [FilteredBook, setFilteredBook] = useState([]);
  const dispatch = useDispatch();
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
    setFilteredBook(UserBooks);
  }, [UserBooks]);

  const handleBookOpen = (bookData) => {
    dispatch(GetUserBookbyId_Request(bookData.book_id));
    navigate(`/reader/dashboard/explore/book`);
  };
  return (
    <>
      <div className="publisher-dashboard">
        <div className="user-banner">
          <img src={Userbanner} width="100%" />
        </div>
        <ExploreBook />
        {/* <div className="d-flex justify-content-between">
            <h4>Explore Books</h4>
            <Link to="/reader/dashboard/explore" style={{ textDecoration: "none",whiteSpace:"nowrap" }}>
              View All
              <FaArrowRight size={16} className="ms-1 mb-1" />
            </Link>
          </div>
          <BookList
            FilteredBook={FilteredBook.length > 0 && FilteredBook?.slice(0, 4)}
            handleBookOpen={handleBookOpen}
            BookLoading={BookLoading}
          /> */}
      </div>
    </>
  );
}

export default UserDashboard;

import { LuIndianRupee } from "react-icons/lu";
import CardComponent from "./Card.js";
import { Review } from "./Highlight.js";
import "./BookList.css";
import { FaHeart } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AddtoWishlist_Request,
  RemoveWishlistitem_Request,
} from "../../Redux/Action/UserAction/WishlistBookAction.js";
import { BookListLoading } from "./Loading.js";
import { Base_Url } from "../../Environment/Base_Url.js";

function BookList({ FilteredBook, handleBookOpen, BookLoading }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wishlistItems } = useSelector((state) => state?.WishlistBook);

  const handleAddWishlist = (Book) => {
    if (Book?.wishlist) {
      const RemoveLikedItem = wishlistItems?.find(
        (item) => item.book_id === Book.book_id
      );

      dispatch(RemoveWishlistitem_Request(RemoveLikedItem?.wishlist_id));
    } else {
      dispatch(AddtoWishlist_Request({ book_id: Book.book_id }));
    }
  };

  if (BookLoading) {
    return <BookListLoading />;
  }
  // const handleStartReadingSubBook = (BookId) => {
  //   navigate(`/reader/bookpreview?BookId=${BookId}`);
  // };

  return (
    <div className="Book-list row">
      {FilteredBook?.length > 0 ? (
        FilteredBook?.map((book) => (
          <div key={book.book_id} className="col-lg-3 col-sm-12 col-md-6">
            <CardComponent
              className="books"
              style={{ width: "100%", height: "100%" }}
            >
              <div className="mb-3 d-flex justify-content-between">
                <div>
                  {book?.Bestsell ? (
                    <span className="tag shadow">BestSeller</span>
                  ) : (
                    ""
                  )}
                </div>
                {/* {location.pathname.startsWith("/reader") && !SubBook ? ( */}
                {location.pathname.startsWith("/reader") ? (
                  <div role="button">
                    <FaHeart
                      size={18}
                      className={`like-icon ${book?.wishlist ? "active" : ""}`}
                      onClick={() => handleAddWishlist(book)}
                    />
                  </div>
                ) : (
                  ""
                )}
                {location.pathname.startsWith("/publisher") ? (
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: `${
                        book.status === "live"
                          ? "#4bb14b"
                          : book.status === "pending"
                          ? "#d01110"
                          : ""
                      }`,
                    }}
                  ></div>
                ) : (
                  ""
                )}
              </div>
              <div role="button" onClick={() => handleBookOpen(book)}>
                <img
                  src={`${Base_Url}/files/cover_image/${book?.cover_image}`}
                  className="book-img"
                />
                <h5 className="mt-2 title">{book?.title}</h5>
                <h6 className="author-name">{book?.author}</h6>
                {/* {SubBook ? (
                  <>
                    <CustomButton
                      sx={{ backgroundColor: "green", padding: "3px 10px" }}
                      className="mt-1"
                      onClick={() => handleStartReadingSubBook(book.book_id)}
                    >
                      Start Reading
                    </CustomButton>
                  </>
                ) : ( */}
                <>
                  {book?.offer_price !== "None" ? (
                    <>
                      <h5>
                        <LuIndianRupee />
                        <del>{book?.price}</del>&nbsp;
                        <LuIndianRupee size={16} className="mb-1" />
                        <span>{book.offer_price}</span>
                      </h5>
                      {/* <span>{(book.offer_price / book?.price)*100}% offer</span> */}
                    </>
                  ) : (
                    <>
                      <h5>
                        <LuIndianRupee size={16} className="mb-1" />
                        <span>{book.price}</span>
                      </h5>
                    </>
                  )}
                  <Review />
                </>
                {/* )} */}
              </div>
            </CardComponent>
          </div>
        ))
      ) : (
        <div>Items Not Found</div>
      )}
    </div>
  );
}

export default BookList;

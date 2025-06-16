import BookList from "../../../Core-Components/BookList";
import { Link, useNavigate } from "react-router-dom";
import "../Dashboard/UserDash.css";
import { CiShop } from "react-icons/ci";
import { IoChevronBack } from "react-icons/io5";
import { useSelector } from "react-redux";

function PublisherBook() {
  const { BookDataList } = useSelector((state) => state.BookData);
  const navigate = useNavigate();
  const handleBookOpen = (bookData) => {
    navigate(`/reader/dashboard/explore/book/${bookData.id}`, {
      state: bookData,
    });
  };
  const handleGoBack = () => {
    window.history.back();
  };
  return (
    <>
      <Link
        role="button"
        // to="/reader/dashboard"
        onClick={handleGoBack}
        className="mb-2"
        style={{ textDecoration: "none", fontSize: "19px" }}
      >
        <IoChevronBack className="mb-1" />
        Back
      </Link>
      <div className="publisher-books">
        <div className="d-flex gap-3 align-items-center">
          <div className="border rounded-circle p-2">
            <CiShop fontSize={35} />
          </div>
          <div
            style={{
              color: "#5e5e5e",
              fontWeight: "700",
              fontSize: "32px ",
            }}
          >
            EBOOK PUBLISHER
          </div>
        </div>
        {/* <div className="offers">
          <img src={offers} alt="offers" width="100%" height="100%" />
        </div> */}
        <BookList FilteredBook={BookDataList} handleBookOpen={handleBookOpen} />
      </div>
    </>
  );
}

export default PublisherBook;

import React, { useEffect, useState } from "react";
import "./Library.css";
import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import CategoryDrawer from "./CategoryDrawer.js";
import BookList from "../../../Core-Components/BookList.js";
import { IoChevronBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  Get_book_Request,
  Get_bookbycat_Request,
  Get_bookbyId_Request,
} from "../../../../Redux/Action/PublisherAction/BookAction.js";
import CustomButton from "../../../Core-Components/Button.js";
import AddReader from "./AddReader.js";
import { Get_Cat_Request } from "../../../../Redux/Action/PublisherAction/CategoryAction.js";
import { Get_Subsciber_Request } from "../../../../Redux/Action/PublisherAction/SubscriberAction.js";
import SubscriberSlide from "./SubscriberSlide.js";

function Library() {
  const [searchBook, setSearchBook] = useState("");
  const [bookToShow, setBookToShow] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    BookDataList,
    filterBook,
    loading: BookLoading,
  } = useSelector((state) => state.BookData);
  const [addReaderOpen, setAddReadOpen] = useState(false);
  const [SubscriberOpen, setSubscriberOpen] = useState(false);
  const { Category } = useSelector((state) => state.category);
  const is_institution =
    localStorage.getItem("is_institution") === "true" ? true : false;

  useEffect(() => {
    dispatch(Get_book_Request());
  }, []);

  useEffect(() => {
    setBookToShow(BookDataList);
  }, [BookDataList]);

  useEffect(() => {
    if (selectedCategory) {
      dispatch(Get_bookbycat_Request(selectedCategory));
    } else {
      setBookToShow(BookDataList);
    }
  }, [selectedCategory, dispatch, BookDataList]);

  useEffect(() => {
    if (selectedCategory && filterBook) {
      setBookToShow(filterBook);
    } else {
      setBookToShow(BookDataList);
    }
  }, [filterBook, selectedCategory]);

  useEffect(() => {
    const FilteredBook = BookDataList?.filter(
      (book) =>
        book?.title.toLowerCase().includes(searchBook.toLowerCase()) ||
        book?.author.toLowerCase().includes(searchBook.toLowerCase()) ||
        book?.genre.toLowerCase().includes(searchBook.toLowerCase())
    );
    setBookToShow(FilteredBook);
  }, [searchBook]);

  const handleBookOpen = (bookData) => {
    navigate(`/publisher/dashboard/library/book`);

    dispatch(Get_bookbyId_Request(bookData.book_id));
  };
  useEffect(() => {
    dispatch(Get_Cat_Request());
  }, []);

  const handleAddReaderOpen = () => {
    setAddReadOpen(true);
    setSubscriberOpen(false);
  };
  const handleAddReaderClose = () => {
    setAddReadOpen(false);
  };

  const handleManageReaderOpen = () => {
    dispatch(Get_Subsciber_Request(selectedCategory));
    setSubscriberOpen(true);
  };
  const Catoptions = Category?.map((cat) => ({
    id: cat.category_id,
    value: cat.category_id,
    label: cat.category_name,
  }));

  return (
    <>
      <span>
        <Link
          to="/publisher/dashboard"
          className="mb-2"
          style={{ textDecoration: "none", fontSize: "19px" }}
        >
          <IoChevronBack className="mb-1 ms-2" />
          Back
        </Link>
      </span>
      <div className="library-container">
        <div className="library-header">
          <h4 className="mb-0">My Library</h4>
          <div className="d-flex align-items-center gap-3">
            {selectedCategory && filterBook ? (
              <>
                {is_institution && (
                  <>
                    {" "}
                    <div>
                      <CustomButton
                        sx={{
                          padding: "5px 10px",
                          fontSize: "14px",
                        }}
                        onClick={handleAddReaderOpen}
                      >
                        Add reader
                      </CustomButton>
                    </div>
                    <div>
                      <CustomButton
                        sx={{
                          padding: "5px 10px",
                          fontSize: "14px",
                        }}
                        onClick={handleManageReaderOpen}
                      >
                        Manage Reader
                      </CustomButton>
                    </div>
                  </>
                )}
              </>
            ) : (
              ""
            )}
            <TextField
              placeholder="Search by Title , Author , Genre and more..."
              // variant="outlined"
              className="input"
              value={searchBook}
              onChange={(e) => setSearchBook(e.target.value)}
              size="small"
              sx={{ width: "400px", backgroundColor: "#f6f6f6" }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      style={{ cursor: "pointer" }}
                    >
                      <CiSearch size={22} />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </div>
        </div>
        <div className="d-block d-lg-none" style={{ maxWidth: "200px" }}>
          <Autocomplete
            options={Catoptions}
            getOptionLabel={(option) =>
              typeof option === "string" ? option : option?.label || ""
            }
            value={
              Catoptions.find((opt) => opt.value === selectedCategory) || null
            }
            onChange={(event, newValue) =>
              setSelectedCategory(newValue?.value ?? null)
            }
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                label="Select Category"
                name="selectedCategory"
                size="small"
              />
            )}
          />
        </div>
        <div className="row">
          <div
            className="col-lg-2 d-none d-lg-block category-container p-0"
            style={{ height: "75vh", overflow: "auto" }}
          >
            <CategoryDrawer setSelectedCategory={setSelectedCategory} />
          </div>
          <div
            className="col-lg-10 mt-2 book-list-container"
            style={{ paddingLeft: "2.5rem" }}
          >
            <BookList
              FilteredBook={bookToShow}
              handleBookOpen={handleBookOpen}
              BookLoading={BookLoading}
            />
          </div>
        </div>
      </div>
      <AddReader
        addReaderOpen={addReaderOpen}
        handleAddReaderClose={handleAddReaderClose}
        selectedCategory={selectedCategory}
      />
      <SubscriberSlide
        open={SubscriberOpen}
        setOpen={setSubscriberOpen}
        selectedCategory={selectedCategory}
      />
    </>
  );
}

export default Library;

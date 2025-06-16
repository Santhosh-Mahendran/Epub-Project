import React, { useEffect, useRef, useState } from "react";
import {
  TextField,
  FormControlLabel,
  Switch,
  InputAdornment,
} from "@mui/material";
import "./UploadFile.css";
import { useLocation, useNavigate } from "react-router-dom";
import NewCategory from "./NewCategory";
import { useDispatch, useSelector } from "react-redux";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { Autocomplete } from "@mui/material";
import {
  Update_book_Request,
  Upload_book_Request,
} from "../../../../Redux/Action/PublisherAction/BookAction";
import { Get_Cat_Request } from "../../../../Redux/Action/PublisherAction/CategoryAction";
import CustomButton from "../../../Core-Components/Button";
import { languages } from "../../../../Environment/Language";
import { useFormik } from "formik";
import * as Yup from "yup";
import ePub from "epubjs";
import { Base_Url } from "../../../../Environment/Base_Url";
import Load from "../../../Assets/BookingLoad.gif";

function UploadFile() {
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const [pickedImage, setPickedImage] = useState();
  const Imageinput = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Category } = useSelector((state) => state.category);
  const { loading } = useSelector((state) => state.BookData);

  const location = useLocation();
  const bookData = location.state?.BookData;
  console.log(bookData);

  const [aiChatbotEnabled, setAiChatbotEnabled] = useState(false);
  const handleToggle = (event) => {
    setAiChatbotEnabled(event.target.checked);
  };
  const initialValues = {
    title: bookData?.title || "",
    author: bookData?.author || "",
    selectedCategory: bookData?.category_id || null,
    isbn: bookData?.isbn || "",
    price: bookData?.price || "",
    OfferPrice: bookData?.offer_price === "None" ? "" : bookData?.offer_price,
    rental_price: bookData?.rental_price || "",
    selectedLang: bookData?.language || null,
    Genre: bookData?.genre || "",
    epubFile: bookData?.epub_file || "",
    bookDis: bookData?.description || "",
    coverImage: bookData?.cover_image || "",
  };

  const validation = Yup.object().shape({
    title: Yup.string()
      .min(3, "title must have atleast 3 characters")
      .required("*this field is required"),
    author: Yup.string()
      .min(3, "Author must have atleast 3 characters")
      .required("this field is required"),
    // selectedCategory: Yup.number().required("*this field is required"),
    isbn: Yup.string()
      .min(3, "Invalid ISBN Number")
      .required("*this field is required"),
    price: Yup.string().required("*this field is required"),
    rental_price: Yup.string().required("*this field is required"),
    selectedLang: Yup.string().required("*this field is required"),
    epubFile: Yup.string().required("*this field is required"),
    Genre: Yup.string().required("*this field is required"),
  });

  const handlePickClick = () => {
    Imageinput.current.click();
  };

  const handleImagePicker = (e) => {
    const pickImage = e.target.files[0];

    if (!pickImage) {
      setPickedImage(null);
      return;
    }
    if (pickImage) {
      formik.setFieldValue("coverImage", pickImage);
    }
    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(pickImage);
  };

  const handleAddCategory = () => {
    setOpenAddCategory(true);
  };
  const handleCategoryClose = () => {
    setOpenAddCategory(false);
  };
  const handleUploadFile = (value) => {
    const payload = {
      title: value.title,
      author: value.author,
      isbn: value.isbn,
      category_id: value.selectedCategory,
      cover_image: value.coverImage && value.coverImage,
      offer_price: value.OfferPrice && value.OfferPrice,
      language: value.selectedLang,
      genre: value.Genre,
      e_book_type: ".epub",
      price: value.price,
      rental_price: value.rental_price,
      file: value.epubFile,
      description: value.bookDis,
      aiChat: aiChatbotEnabled,
    };

    if (bookData) {
      dispatch(Update_book_Request({ ...payload, book_id: bookData.book_id }));
    } else {
      dispatch(Upload_book_Request(payload));
    }
  };

  useEffect(() => {
    dispatch(Get_Cat_Request());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validation,
    onSubmit: (values, { resetForm }) => {
      handleUploadFile(values);
      resetForm();
    },
  });

  const category =
    Category?.map((cat) => ({
      id: cat.category_id,
      value: cat.category_id,
      label: cat.category_name,
    })) || [];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      formik.setFieldValue("epubFile", file);
    }

    // Get Image from EPUB
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      const book = ePub(e.target.result);

      book.ready
        .then(async () => {
          try {
            const coverUrl = await book.coverUrl();
            if (coverUrl) {
              // Store cover image URL in formik or state (without displaying)
              formik.setFieldValue("coverImage", coverUrl);
            }
          } catch (err) {
            console.error("Error getting cover image:", err);
          }
        })
        .catch((error) => console.log("Error processing EPUB:", error));
    };

    fileReader.readAsArrayBuffer(file);
  };

  return (
    <>
      <div className="upload-container shadow">
        <h3>UPLOAD YOUR BOOK</h3>
        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "500px" }}
          >
            <img src={Load} alt="gif" />
          </div>
        ) : (
          <form className="form upload-form row" onSubmit={formik.handleSubmit}>
            <div className="col-lg-6 col-sm-12 col-md-6">
              <TextField
                fullWidth
                label="Title of the Book*"
                variant="outlined"
                className={`input mb-0 ${
                  formik.errors.title && formik.touched.title
                    ? "is-invalid"
                    : formik.touched.title && !formik.errors.title
                    ? "is-valid"
                    : ""
                }`}
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        style={{ cursor: "pointer" }}
                      >
                        {/* <FaBook /> */}
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </div>
            <div className="col-lg-6 col-sm-12 col-md-6">
              <TextField
                fullWidth
                label="Author Name*"
                name="author"
                variant="outlined"
                className={`input mb-0 ${
                  formik.errors.author && formik.touched.author
                    ? "is-invalid"
                    : formik.touched.author && !formik.errors.author
                    ? "is-valid"
                    : ""
                }`}
                value={formik.values.author}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        style={{ cursor: "pointer" }}
                      >
                        {/* <MdEmail /> */}
                      </InputAdornment>
                    ),
                  },
                }}
                error={formik.touched.author && Boolean(formik.errors.author)}
                helperText={formik.touched.author && formik.errors.author}
              />
            </div>
            <div className="col-lg-6 col-sm-12 col-md-6">
              <Autocomplete
                options={category}
                getOptionLabel={(option) => option?.label}
                value={
                  category.find(
                    (option) => option.id === formik.values.selectedCategory
                  ) || null
                }
                onChange={(event, newValue) =>
                  formik.setFieldValue("selectedCategory", newValue?.id || "")
                }
                onBlur={formik.handleBlur}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Book Category*"
                    name="selectedCategory"
                    error={
                      formik.touched.selectedCategory &&
                      Boolean(formik.errors.selectedCategory)
                    }
                    helperText={
                      formik.touched.selectedCategory &&
                      formik.errors.selectedCategory
                    }
                  />
                )}
              />
              <p
                className="mb-0"
                style={{
                  fontSize: "12px",
                  float: "right",
                  textDecoration: "none",
                  color: "rgb(13, 110, 253)",
                  cursor: "pointer",
                }}
                onClick={handleAddCategory}
              >
                Add Category
              </p>
            </div>
            <div className="col-lg-6 col-sm-12 col-md-6">
              <TextField
                fullWidth
                label="Book IBSN Number*"
                name="isbn"
                variant="outlined"
                className={`input mb-0 ${
                  formik.errors.title && formik.touched.title
                    ? "is-invalid"
                    : formik.touched.title && !formik.errors.title
                    ? "is-valid"
                    : ""
                }`}
                value={formik.values.isbn}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment
                        position="emd"
                        style={{ cursor: "pointer" }}
                      >
                        {/* <MdEmail /> */}
                      </InputAdornment>
                    ),
                  },
                }}
                error={formik.touched.isbn && Boolean(formik.errors.isbn)}
                helperText={formik.touched.isbn && formik.errors.isbn}
              />
            </div>
            <div className="col-lg-6 col-sm-12 col-md-6">
              <TextField
                fullWidth
                label="Original Price*"
                name="price"
                variant="outlined"
                className={`input mb-0 ${
                  formik.errors.title && formik.touched.title
                    ? "is-invalid"
                    : formik.touched.title && !formik.errors.title
                    ? "is-valid"
                    : ""
                }`}
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        style={{ cursor: "pointer" }}
                      >
                        <FaIndianRupeeSign />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment
                        position="emd"
                        style={{ cursor: "pointer" }}
                      >
                        {/* <MdEmail /> */}
                      </InputAdornment>
                    ),
                  },
                }}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
              />
            </div>
            <div className="col-lg-6 col-sm-12 col-md-6">
              <TextField
                fullWidth
                label="Offer Price"
                name="OfferPrice"
                variant="outlined"
                className={`input mb-0`}
                value={formik.values.OfferPrice}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        style={{ cursor: "pointer" }}
                      >
                        <FaIndianRupeeSign />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment
                        position="emd"
                        style={{ cursor: "pointer" }}
                      >
                        {/* <MdEmail /> */}
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </div>
            <div className="col-lg-6 col-sm-12 col-md-6">
              <TextField
                fullWidth
                label="Rental Price"
                name="rental_price"
                variant="outlined"
                className={`input mb-0 ${
                  formik.errors.title && formik.touched.title
                    ? "is-invalid"
                    : formik.touched.title && !formik.errors.title
                    ? "is-valid"
                    : ""
                }`}
                value={formik.values.rental_price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        style={{ cursor: "pointer" }}
                      >
                        <FaIndianRupeeSign />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        style={{ cursor: "pointer" }}
                      >
                        <div>
                          <p className="mb-0">/ Per Month</p>
                        </div>
                      </InputAdornment>
                    ),
                  },
                }}
                error={
                  formik.touched.rental_price &&
                  Boolean(formik.errors.rental_price)
                }
                helperText={
                  formik.touched.rental_price && formik.errors.rental_price
                }
              />
            </div>
            <div className="col-lg-6 col-sm-12 col-md-6">
              <Autocomplete
                options={languages}
                getOptionLabel={(option) => option.label ?? option}
                // filterOptions={(options, { inputValue }) =>
                //   inputValue.length >= 2 // Show options only after at least 1 character is typed
                //     ? options.filter((option) =>
                //         option.label
                //           .toLowerCase()
                //           .includes(inputValue.toLowerCase())
                //       )
                //     : []
                // }
                // open={langChar.length >= 1}
                // onClose={() => setLangChar("")}
                value={formik.values.selectedLang}
                // onInputChange={(event, newInputValue) =>
                //   setLangChar(newInputValue)
                // }
                onChange={(event, newValue) => {
                  formik.setFieldValue("selectedLang", newValue?.label || "");
                }}
                onBlur={formik.handleBlur}
                disableCloseOnSelect={false}
                name="selectedLang"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Language*"
                    name="selectedLang"
                    error={
                      formik.touched.selectedLang &&
                      Boolean(formik.errors.selectedLang)
                    }
                    helperText={
                      formik.touched.selectedLang && formik.errors.selectedLang
                    }
                  />
                )}
              />
            </div>
            <div className="col-lg-6 col-sm-12 col-md-6">
              <TextField
                fullWidth
                label="Genre*"
                name="Genre"
                variant="outlined"
                className={`input mb-0 ${
                  formik.errors.Genre && formik.touched.Genre
                    ? "is-invalid"
                    : formik.touched.Genre && !formik.errors.Genre
                    ? "is-valid"
                    : ""
                }`}
                value={formik.values.Genre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        style={{ cursor: "pointer" }}
                      >
                        {/* <MdEmail /> */}
                      </InputAdornment>
                    ),
                  },
                }}
                error={formik.touched.Genre && Boolean(formik.errors.Genre)}
                helperText={formik.touched.Genre && formik.errors.Genre}
              />
            </div>
            <div className="col-lg-6 col-sm-12 col-md-6">
              <TextField
                fullWidth
                label="Upload Book*"
                name="Upload Book"
                className={`input mb-0 ${
                  formik.errors.epubFile && formik.touched.epubFile
                    ? "is-invalid"
                    : formik.touched.epubFile && !formik.errors.epubFile
                    ? "is-valid"
                    : ""
                }`}
                value={
                  formik.values.epubFile
                    ? formik.values.epubFile.name
                      ? formik.values.epubFile.name
                      : formik.values.epubFile
                    : ""
                }
                onBlur={formik.handleBlur}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment
                        position="emd"
                        style={{ cursor: "pointer" }}
                      >
                        <CustomButton
                          component="label"
                          variant="contained"
                          tabIndex={-1}
                          sx={{
                            padding: "3px 10px",
                            fontSize: "14px",
                            backgroundColor: "#858484",
                          }}
                        >
                          Upload files
                          <input
                            type="file"
                            hidden
                            onChange={handleFileUpload}
                            multiple
                          />
                        </CustomButton>
                      </InputAdornment>
                    ),
                  },
                }}
                error={
                  formik.touched.epubFile && Boolean(formik.errors.epubFile)
                }
                helperText={formik.touched.epubFile && formik.errors.epubFile}
              />
              <div>
                <FormControlLabel
                  value="end"
                  control={
                    <Switch
                      color="primary"
                      checked={aiChatbotEnabled}
                      onChange={handleToggle}
                    />
                  }
                  label="Add AI Chatbot"
                  labelPlacement="end"
                />
              </div>
            </div>
            <div className="col-12">
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Book Description"
                name="bookDis"
                variant="outlined"
                className="input"
                value={formik.values.bookDis}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment
                        position="emd"
                        style={{ cursor: "pointer" }}
                      >
                        {/* <MdEmail /> */}
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </div>
            <div className="picker">
              <div className="preview">
                {pickedImage ? (
                  <img
                    src={pickedImage}
                    alt="Image to share"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : bookData?.cover_image ? (
                  <img
                    src={`${Base_Url}/files/cover_image/${bookData.cover_image}`}
                    alt="Existing Cover"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <p>Image is not Picked yet</p>
                )}
              </div>
              <input
                className="input"
                type="file"
                id="image "
                accept="image/png , image/jpeg "
                name="image "
                ref={Imageinput}
                onChange={handleImagePicker}
              />
              <button
                type="button"
                className="button"
                onClick={handlePickClick}
              >
                Pick an Image
              </button>
            </div>
            <div className="d-flex justify-content-end">
              <CustomButton
                type="button"
                className="mx-3 shadow"
                style={{ backgroundColor: "#BA0E0E" }}
                onClick={() => navigate("/publisher/dashboard")}
              >
                Cancel
              </CustomButton>
              {/* <CustomButton
              type="submit"
              className="shadow"
              style={{ backgroundColor: "green", color: "#fff" }}
              loading={loading ? "true" : "false"}
            >
              {bookData ? "Update" : "Submit"}
            </CustomButton> */}
              <CustomButton
                type="submit"
                className="shadow"
                style={{ backgroundColor: "green" }}
                loading={loading ? true : false}
              >
                {bookData ? "Update" : "Submit"}
              </CustomButton>
            </div>
          </form>
        )}
      </div>
      <NewCategory
        handleCategoryClose={handleCategoryClose}
        openAddCategory={openAddCategory}
      />
    </>
  );
}

export default UploadFile;

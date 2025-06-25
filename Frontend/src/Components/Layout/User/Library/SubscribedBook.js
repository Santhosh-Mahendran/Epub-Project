import "../UserDetails/UserDetail.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { GetUserBookbyCat_Request } from "../../../../Redux/Action/UserAction/UserBookAction";
import ProductList from "./ProductList";
import { Gauge } from "@mui/x-charts/Gauge";
import { Box } from "@mui/material";
import CustomButton from "../../../Core-Components/Button";
import { Get_readerSub_Request } from "../../../../Redux/Action/UserAction/SubscriptionAction";

function SubscribedBook() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedSub, setSelectedSub] = useState();

  const { SubScribedBooks } = useSelector((state) => state.SubscribeBook);
  const { FilteredBook } = useSelector((state) => state.UserBook);
  useEffect(() => {
    dispatch(Get_readerSub_Request());
  }, []);

  const SubOption = SubScribedBooks?.map((sub) => ({
    id: sub.category_id,
    value: sub.category_id,
    label: `${
      sub.category_name?.length > 10
        ? sub.category_name?.split(" ").slice(0, 12).join(" ") + "..."
        : sub.category_name
    } - ${
      sub.publisher_name?.length > 10
        ? sub.publisher_name?.split(" ").slice(0, 12).join(" ") + "..."
        : sub.publisher_name
    }`,
  }));

  useEffect(() => {
    if (SubScribedBooks?.length > 0) {
      const options = SubScribedBooks.map((sub) => ({
        id: sub.category_id,
        value: sub.category_id,
        label: `${
          sub.category_name?.length > 10
            ? sub.category_name?.split(" ").slice(0, 12).join(" ") + "..."
            : sub.category_name
        } - ${
          sub.publisher_name?.length > 10
            ? sub.publisher_name?.split(" ").slice(0, 12).join(" ") + "..."
            : sub.publisher_name
        }`,
      }));
      setSelectedSub(options[0]?.id);
      dispatch(GetUserBookbyCat_Request(options[0]?.id));
    }
  }, [SubScribedBooks]);

  const handleSubChange = (event, newValue) => {
    setSelectedSub(newValue?.id);
    dispatch(GetUserBookbyCat_Request(newValue?.id));
  };

  const dropdown =
    SubScribedBooks?.length > 0 ? (
      <div className="subscribe-field d-none d-lg-block">
        <Autocomplete
          options={SubOption}
          disableClearable
          value={selectedSub}
          onChange={handleSubChange}
          defaultValue={SubOption[0]}
          renderInput={(params) => (
            <TextField {...params} placeholder="General" />
          )}
          sx={{
            padding: "0px",
            borderRadius: "5px",
            width: "250px",
            height: "38px",
            "& .MuiTextField-root": {
              padding: "0px",
              width: "250px",
              height: "38px",
            },
            "& .MuiOutlinedInput-root": {
              width: "250px",
              height: "38px",
            },
          }}
        />
      </div>
    ) : null;

  return (
    <>
      {/* <div className="user-wishlist cardBox" style={{ height: "100%" }}>
        <div className="d-flex align-items-center justify-content-between">
          <h4>My Subscriptions</h4>
          {SubScribedBooks?.length > 0 ? (
            <div className="subscribe-field d-none d-lg-block">
              <Autocomplete
                options={SubOption}
                disableClearable
                value={selectedSub}
                onChange={handleSubChange}
                defaultValue={SubOption[0]}
                renderInput={(params) => (
                  <TextField {...params} placeholder="General" />
                )}
                sx={{
                  padding: "0px",
                  borderRadius: "5px",
                  width: "250px",
                  height: "38px",
                  "& .MuiTextField-root": {
                    padding: "0px",
                    width: "250px",
                    height: "38px",
                  },
                  "& .MuiOutlinedInput-root": {
                    width: "250px",
                    height: "38px",
                  },
                }}
              />
            </div>
          ) : (
            ""
          )}
        </div>
        
      </div>
    </> */}
      <ProductList
        Book_list={FilteredBook}
        title="My Subscriptions"
        dropdown={dropdown}
      >
        {(Book) => (
          <div
            className="mt-1 d-flex flex-column justify-content-between"
            style={{ height: "100%", width: "fit-content" }}
          >
            <div className="float-right">
              <Box sx={{ position: "relative", zIndex: "0" }}>
                <Gauge
                  width={100}
                  height={100}
                  value={Book?.percentage}
                  text={({ value }) => `${value || 0}%`}
                  sx={{ float: "right" }}
                />
              </Box>
            </div>
            <div className="d-flex justify-content-end mb-2">
              <CustomButton
                className="mx-2"
                sx={{
                  backgroundColor: "#22B16A",
                  padding: { xs: "2px 20px", md: "2px 8px" },
                  fontSize: "12px",
                }}
              >
                Purchased
              </CustomButton>
              <CustomButton
                sx={{
                  backgroundColor: "#4B4363",
                  padding: "2px 8px",
                  fontSize: "12px",
                }}
                // onClick={() => handlePreviewOpen(Book)}
              >
                {Book?.percentage > 0 ? "Continue Reading" : "Start Reading"}
              </CustomButton>
            </div>
          </div>
        )}
      </ProductList>
    </>
  );
}

export default SubscribedBook;

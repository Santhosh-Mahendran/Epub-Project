import { useDispatch, useSelector } from "react-redux";
import { Skeleton, Typography } from "@mui/material";
import "./Library.css";
import { Get_book_Request } from "../../../../Redux/Action/PublisherAction/BookAction";

function CategoryDrawer({ setSelectedCategory, selectedCategory }) {
  const { Category, loading: catLoad } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const handleCatSelect = (id) => {
    setSelectedCategory(id);
  };

  const handleAllBooks = () => {
    dispatch(Get_book_Request());
    setSelectedCategory(null);
  };

  return (
    <div>
      <h4
        style={{
          fontSize: "20px",
          padding: "10px 12px",
          borderBottom: "1px solid #dddddd",
          backgroundColor: "rgb(33 37 41 / 3%)",
        }}
        className="mb-0"
      >
        Categories
      </h4>
      <div
        className="d-flex flex-column pt-3"
        style={{ rowGap: "15px", padding: "0 12px" }}
      >
        {catLoad ? (
          <div className="d-flex flex-column mt-2" style={{ rowGap: "30px" }}>
            {Array.from(new Array(6)).map((index) => (
              <div key={index}>
                <Skeleton animation="wave" height={30} width="80%" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div
              role="button"
              className={`category p-1 ${selectedCategory == null && "active"}`}
              style={{ borderBottom: "1px solid #f0e9e9" }}
              onClick={handleAllBooks}
            >
              <Typography className="ps-2 text">All Books</Typography>
            </div>
            {Category?.map((cat, index) => (
              <div
                key={index}
                role="button"
                className={`category p-1 ${
                  selectedCategory === cat?.category_id && "active"
                }`}
                style={{ borderBottom: "1px solid #f0e9e9" }}
                onClick={() => handleCatSelect(cat.category_id)}
              >
                <Typography className="ps-2 text">
                  {cat.category_name}
                </Typography>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default CategoryDrawer;

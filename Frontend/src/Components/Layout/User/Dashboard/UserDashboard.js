import { useEffect } from "react";
import Userbanner from "../../../Assets/banner.jpg";
import { useDispatch } from "react-redux";
import { GetCartItem_Request } from "../../../../Redux/Action/UserAction/CartBookAction.js";
import {
  GetUserBook_Request,
} from "../../../../Redux/Action/UserAction/UserBookAction.js";
import { GetWishlistItem_Request } from "../../../../Redux/Action/UserAction/WishlistBookAction";
import ExploreBook from "../ExploreBook/ExploreBook.js";

function UserDashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetCartItem_Request());
    dispatch(GetWishlistItem_Request());
    dispatch(GetUserBook_Request());
  }, [dispatch]);

  return (
    <>
      <div className="publisher-dashboard">
        <div className="user-banner">
          <img src={Userbanner} width="100%" />
        </div>
        <ExploreBook />
      </div>
    </>
  );
}

export default UserDashboard;

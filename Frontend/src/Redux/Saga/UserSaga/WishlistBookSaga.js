import { call, put, takeLatest } from "redux-saga/effects";
import * as Type from "../../ActionType";
import { toast } from "react-toastify";
import {
  Add_to_Wishlist,
  Get_WishlistItem,
  Remove_from_Wishlist,
} from "../../../Service/UserService";
import {
  AddtoWishlist_Failure,
  AddtoWishlist_Success,
  GetWishlistItem_Failure,
  GetWishlistItem_Request,
  GetWishlistItem_Success,
  RemoveWishlistitem_Failure,
  RemoveWishlistitem_Success,
} from "../../Action/UserAction/WishlistBookAction";
import { GetUserBook_Request } from "../../Action/UserAction/UserBookAction";

function* AddItemToWishlist({ payload }) {
  try {
    const Response = yield call(Add_to_Wishlist, payload);
    toast.success(Response?.data?.message);
    yield put(AddtoWishlist_Success(Response.data));
    yield put(GetUserBook_Request());
  } catch (error) {
    toast.error(error?.response?.data?.error);
    yield put(AddtoWishlist_Failure(error));
  }
}

function* GetWishlistItem() {
  try {
    const Response = yield call(Get_WishlistItem);
    toast.success(Response?.data?.message);
    yield put(GetWishlistItem_Success(Response.data));
  } catch (error) {
    toast.error(error?.response?.data?.error);
    yield put(GetWishlistItem_Failure(error));
  }
}

function* RemoveWishlistItem({ payload }) {  
  try {
    const Response = yield call(Remove_from_Wishlist, payload);
    toast.success(Response?.data?.message);
    yield put(RemoveWishlistitem_Success(Response.data));
    yield put(GetWishlistItem_Request());
    yield put(GetUserBook_Request());
  } catch (error) {
    toast.error(error?.response?.data?.error);
    yield put(RemoveWishlistitem_Failure(error));
  }
}

function* WatchWishlist() {
  yield takeLatest(Type.ADD_WISHLISTBOOK_REQUEST, AddItemToWishlist);
  yield takeLatest(Type.GET_WISHLISTBOOK_REQUEST, GetWishlistItem);
  yield takeLatest(Type.DEL_WISHLISTBOOK_REQUEST, RemoveWishlistItem);
}
export default WatchWishlist;

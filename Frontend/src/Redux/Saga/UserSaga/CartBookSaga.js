import { call, put, takeLatest } from "redux-saga/effects";
import * as Type from "../../ActionType";
import { toast } from "react-toastify";
import {
  Add_to_Cart,
  Get_CartItem,
  Remove_from_Cart,
} from "../../../Service/UserService";
import {
  AddtoCart_Failure,
  AddtoCart_Success,
  GetCartItem_Failure,
  GetCartItem_Request,
  GetCartItem_Success,
  RemoveCartitem_Failure,
  RemoveCartitem_Success,
} from "../../Action/UserAction/CartBookAction";

function* AddItemToCart({ payload }) {
  try {
    const Response = yield call(Add_to_Cart, payload);
    toast.success(Response?.data?.message);
    yield put(AddtoCart_Success(Response.data));
    yield put(GetCartItem_Request());
  } catch (error) {
    toast.error(error?.response?.data?.error);
    yield put(AddtoCart_Failure(error?.response?.data?.error));
  }
}

function* GetCartItem() {
  try {
    const Response = yield call(Get_CartItem);
    toast.success(Response?.data?.message);
    yield put(GetCartItem_Success(Response.data));
  } catch (error) {
    toast.error(error?.response?.data?.error);
    yield put(GetCartItem_Failure(error?.response?.data?.error));
  }
}

function* RemoveCartItem({ payload }) {
  try {
    const Response = yield call(Remove_from_Cart, payload);
    toast.success(Response?.data?.message);
    yield put(RemoveCartitem_Success(Response.data));
    yield put(GetCartItem_Request());
  } catch (error) {
    toast.error(error?.response?.data?.error);
    yield put(RemoveCartitem_Failure(error?.response?.data?.error));
  }
}

function* WatchCart() {
  yield takeLatest(Type.ADD_CARTBOOK_REQUEST, AddItemToCart);
  yield takeLatest(Type.GET_CARTBOOK_REQUEST, GetCartItem);
  yield takeLatest(Type.DEL_CARTBOOK_REQUEST, RemoveCartItem);
}
export default WatchCart;

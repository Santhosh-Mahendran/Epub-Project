import { call, put, takeLatest } from "redux-saga/effects";
import * as Type from "../../ActionType";
import { toast } from "react-toastify";
import { Get_Purchasedbook, Purchase_book } from "../../../Service/UserService";
import {
  Get_PurchasedBook_Failure,
  Get_PurchasedBook_Success,
  PurchaseBook_Failure,
  PurchaseBook_Success,
} from "../../Action/UserAction/PurchaseBookAction";

function* PurchaseBook({ payload }) {
  try {
    const Response = yield call(Purchase_book, payload);
    toast.success(Response?.data?.message);
    yield put(PurchaseBook_Success(Response.data));
  } catch (error) {
    toast.error(error?.response?.data?.error);
    yield put(PurchaseBook_Failure(error));
  }
}

function* GetPurchasedBook() {
  try {
    const Response = yield call(Get_Purchasedbook);
    toast.success(Response?.data?.message);
    yield put(Get_PurchasedBook_Success(Response.data));
  } catch (error) {
    toast.error(error?.response?.data?.error);
    yield put(Get_PurchasedBook_Failure(error));
  }
}

function* watchPurchaseBook() {
  yield takeLatest(Type.PURCHASEBOOK_REQUEST, PurchaseBook);
  yield takeLatest(Type.GET_PURCHASEBOOK_REQUEST, GetPurchasedBook);
}
export default watchPurchaseBook;

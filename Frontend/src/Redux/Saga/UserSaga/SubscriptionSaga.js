import { call, put, takeLatest } from "redux-saga/effects";
import * as Type from "../../ActionType";
import { Add_sub_book, Get_ReaderSub } from "../../../Service/UserService";
import {
  Add_readerSub_Failure,
  Add_readerSub_Success,
  Get_readerSub_Failure,
  Get_readerSub_Success,
} from "../../Action/UserAction/SubscriptionAction";

function* GetReaderSub() {
  try {
    const Response = yield call(Get_ReaderSub);
    yield put(Get_readerSub_Success(Response.data));
  } catch (error) {
    yield put(Get_readerSub_Failure(error));
  }
}

function* AddReaderSub({ payload }) {
  try {
    const Response = yield call(Add_sub_book, payload);
    yield put(Add_readerSub_Success(Response.data));
  } catch (error) {
    yield put(Add_readerSub_Failure(error));
  }
}

function* watchSubscibeBook() {
  yield takeLatest(Type.GET_READERSUB_REQUEST, GetReaderSub);
  yield takeLatest(Type.ADD_READERSUB_REQUEST, AddReaderSub);
}
export default watchSubscibeBook;

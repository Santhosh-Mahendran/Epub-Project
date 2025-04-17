import { call, put, takeLatest } from "redux-saga/effects";
import * as Type from "../../ActionType";
import { Add_Category, Get_Category } from "../../../Service/PublisherService";
import {
  Add_Cat_Failure,
  Add_Cat_Success,
  Get_Cat_Failure,
  Get_Cat_Success,
} from "../../Action/PublisherAction/CategoryAction";
import { toast } from "react-toastify";

function* Add_CategorySaga({ payload }) {
  try {
    const Response = yield call(Add_Category, payload);
    yield put(Add_Cat_Success(Response.data));
    toast.success(Response?.data?.message)
  } catch (error) {
    yield put(Add_Cat_Failure(error));
    toast.error(error?.response?.data?.error);
  }
}

function* Get_CategorySaga({ payload }) {
  try {
    const Response = yield call(Get_Category, payload);
    yield put(Get_Cat_Success(Response.data));
  } catch (error) {
    yield put(Get_Cat_Failure(error));
  }
}

function* watchCategory() {
  yield takeLatest(Type.ADD_CATEGORY_REQUEST, Add_CategorySaga);
  yield takeLatest(Type.GET_CATEGORY_REQUEST, Get_CategorySaga);
}
export default watchCategory;

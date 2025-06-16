import { call, put, takeLatest } from "redux-saga/effects";
import * as Type from "../../ActionType";
import { toast } from "react-toastify";
import { UserRegister } from "../../../Service/UserService";
import {
  User_Register_Failure,
  User_Register_Success,
} from "../../Action/UserAction/UserAuthAction";

function* UserRegisterSaga({ payload }) {
  try {
    const Response = yield call(UserRegister, payload);
    toast.success(Response?.data?.message)
    yield put(User_Register_Success(Response.data));
  } catch (error) {
    toast.error(error?.response?.data?.error);
    yield put(User_Register_Failure(error?.response?.data?.error));
  }
}

function* watchUserRegister() {
  yield takeLatest(Type.USER_REGISTER_REQUEST, UserRegisterSaga);
}
export default watchUserRegister;

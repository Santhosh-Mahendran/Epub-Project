import { call, put, takeLatest } from "redux-saga/effects";
import * as Type from "../../ActionType";
import { toast } from "react-toastify";
import { UserLogin } from "../../../Service/UserService";
import {
  User_Login_Failure,
  User_Login_Success,
} from "../../Action/UserAction/UserAuthAction";

function* UserLoginSaga({ payload }) {
  try {
    const Response = yield call(UserLogin, payload);
    const AuthToken = Response?.data?.access_token;
    localStorage.setItem("User_Auth_Token", AuthToken);
    toast.success(Response?.data?.message);
    yield put(User_Login_Success(Response.data));
  } catch (error) {
    toast.error(error?.response?.data?.error);

    yield put(User_Login_Failure(error?.response?.data?.error));
  }
}

function* watchUserLogin() {
  yield takeLatest(Type.USER_LOGIN_REQUEST, UserLoginSaga);
}
export default watchUserLogin;

import { call, put, takeLatest } from "redux-saga/effects";
import * as Type from "../../ActionType";
import { PublisherLogin } from "../../../Service/PublisherService";
import {
  Publisher_Login_Failure,
  Publisher_Login_Success,
} from "../../Action/PublisherAction/PuAuthAction";
import { toast } from "react-toastify";

function* PublisherLoginSaga({ payload }) {
  try {
    const Response = yield call(PublisherLogin, payload);
    const AuthToken = Response?.data?.access_token;
    localStorage.setItem("Publisher_Auth_Token", AuthToken);
    toast.success(Response?.data?.message);
    yield put(Publisher_Login_Success(Response.data));
  } catch (error) {
    toast.error(error?.response?.data?.error);

    yield put(Publisher_Login_Failure(error?.response?.data?.error));
  }
}

function* watchPublisherLogin() {
  yield takeLatest(Type.PUBLISHER_LOGIN_REQUEST, PublisherLoginSaga);
}
export default watchPublisherLogin;

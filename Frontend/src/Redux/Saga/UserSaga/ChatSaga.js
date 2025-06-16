import { call, put, takeLatest } from "redux-saga/effects";
import * as Type from "../../ActionType";
import { Chat_with_Ai } from "../../../Service/UserService";
import {
  PostUserQues_Failure,
  PostUserQues_Success,
} from "../../Action/UserAction/ChatAction";

function* UserQuesSaga({ payload }) {
  try {
    const Response = yield call(Chat_with_Ai, payload);   
    yield put(PostUserQues_Success(Response.data));
  } catch (error) {
    yield put(PostUserQues_Failure(error?.response?.data?.error));
  }
}

function* watchChatRequest() {
  yield takeLatest(Type.POST_USERQUES_REQUEST, UserQuesSaga);
}
export default watchChatRequest;

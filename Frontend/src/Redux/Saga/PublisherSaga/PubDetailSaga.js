import { call, put, takeLatest } from "redux-saga/effects";
import * as Type from "../../ActionType";
import { GetPubDetail } from "../../../Service/PublisherService";
import {
  getPubDetailFailure,
  getPubDetailSuccess,
} from "../../Action/PublisherAction/PubDetail";

function* GetDetails() {
  try {
    const Response = yield call(GetPubDetail);
    yield put(getPubDetailSuccess(Response.data));
  } catch (error) {
    yield put(getPubDetailFailure(error?.response?.data?.error));
  }
}

function* watchPubDetails() {
  yield takeLatest(Type.PUB_DETAIL_REQUEST, GetDetails);
}
export default watchPubDetails;

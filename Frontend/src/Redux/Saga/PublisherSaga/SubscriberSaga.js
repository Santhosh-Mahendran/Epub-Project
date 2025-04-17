import { call, put, takeLatest } from "redux-saga/effects";
import * as Type from "../../ActionType";
import { toast } from "react-toastify";
import { Add_Subscriber } from "../../../Service/PublisherService";
import {
  Add_Subsciber_Failure,
  Add_Subsciber_Success,
} from "../../Action/PublisherAction/SubscriberAction";

function* AddSubscriber({ payload }) {
  try {
    const Response = yield call(Add_Subscriber, payload);
    toast.success(Response?.data?.message);
    yield put(Add_Subsciber_Success(Response.data));
  } catch (error) {
    yield put(Add_Subsciber_Failure(error?.response?.data?.error));
    toast.error(error?.response?.data?.error);
  }
}

function* watchAddSubsciber() {
  yield takeLatest(Type.ADD_SUBSCRIBER_REQUEST, AddSubscriber);
}
export default watchAddSubsciber;

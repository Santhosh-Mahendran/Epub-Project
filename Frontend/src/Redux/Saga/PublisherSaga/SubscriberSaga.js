import { call, put, takeLatest } from "redux-saga/effects";
import * as Type from "../../ActionType";
import { toast } from "react-toastify";
import {
  Add_Subscriber,
  Del_Subscriber,
  Get_Subscriber,
} from "../../../Service/PublisherService";
import {
  Add_Subsciber_Failure,
  Add_Subsciber_Success,
  del_Subsciber_Failure,
  del_Subsciber_Success,
  Get_Subsciber_Failure,
  Get_Subsciber_Request,
  Get_Subsciber_Success,
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

function* GetSubscriber({ payload }) {
  try {
    const Response = yield call(Get_Subscriber, payload);
    yield put(Get_Subsciber_Success(Response.data));
  } catch (error) {
    yield put(Get_Subsciber_Failure(error?.response?.data?.error));
  }
}

function* delSubscriber({ payload }) {
  try {
    const Response = yield call(Del_Subscriber, payload);
    toast.success(Response?.data?.message);
    yield put(del_Subsciber_Success(Response.data));
    yield put(Get_Subsciber_Request(payload?.selectedCategory));
  } catch (error) {
    toast.error(error?.response?.data?.error);
    yield put(del_Subsciber_Failure(error?.response?.data?.error));
  }
}

function* watchAddSubsciber() {
  yield takeLatest(Type.ADD_SUBSCRIBER_REQUEST, AddSubscriber);
  yield takeLatest(Type.GET_SUBSCRIBER_REQUEST, GetSubscriber);
  yield takeLatest(Type.DEL_SUBSCRIBER_REQUEST, delSubscriber);
}
export default watchAddSubsciber;

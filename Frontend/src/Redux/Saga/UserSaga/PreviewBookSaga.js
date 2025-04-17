import { call, put, takeLatest } from "redux-saga/effects";
import * as Type from "../../ActionType";
import { toast } from "react-toastify";
import {
  Add_hightlight,
  Add_Notes,
  Get_hightlight,
  Get_Notes,
  Get_progress,
  Upload_progress,
} from "../../../Service/UserService";
import {
  Add_highlight_Failure,
  Add_highlight_Success,
  Add_Notes_Success,
  Get_highlight_Failure,
  Get_highlight_Success,
  Get_Notes_Failure,
  Get_Notes_Request,
  Get_Notes_Success,
  Get_progress_Failure,
  Get_progress_Success,
  Update_progress_Failure,
  Update_progress_Success,
} from "../../Action/UserAction/PreviewBookAction";

function* AddHighlight({ payload }) {
  console.log(payload);

  try {
    const Response = yield call(Add_hightlight, payload);
    toast.success(Response?.data?.message);
    yield put(Add_highlight_Success(Response.data));
  } catch (error) {
    toast.error(error?.response?.data?.error);

    yield put(Add_highlight_Failure(error));
  }
}

function* GetHighlight({ payload }) {
  try {
    const Response = yield call(Get_hightlight, payload);
    toast.success(Response?.data?.message);
    yield put(Get_highlight_Success(Response.data));
  } catch (error) {
    toast.error(error?.response?.data?.error);
    yield put(Get_highlight_Failure(error));
  }
}

function* AddNotes({ payload }) {
  try {
    const Response = yield call(Add_Notes, payload);
    toast.success(Response?.data?.message);
    yield put(Add_Notes_Success(Response.data));
    yield put(Get_Notes_Request(payload?.book_id));
  } catch (error) {
    toast.error(error?.response?.data?.error);
    yield put(Add_Notes_Success(error));
  }
}

function* GetNotes({ payload }) {
  try {
    const Response = yield call(Get_Notes, payload);
    toast.success(Response?.data?.message);
    yield put(Get_Notes_Success(Response.data));
  } catch (error) {
    toast.error(error?.response?.data?.error);
    yield put(Get_Notes_Failure(error));
  }
}

function* UpdateProgress({ payload }) {
  try {
    const Response = yield call(Upload_progress, payload);
    toast.success(Response?.data?.message);
    yield put(Update_progress_Success(Response.data));
  } catch (error) {
    toast.error(error?.response?.data?.error);
    yield put(Update_progress_Failure(error));
  }
}

function* GetProgress({ payload }) {
  try {
    const Response = yield call(Get_progress, payload);
    yield put(Get_progress_Success(Response.data));
  } catch (error) {
    yield put(Get_progress_Failure(error));
  }
}

function* watchPreviewBook() {
  yield takeLatest(Type.ADD_BOOKHIGHLIGHT_REQUEST, AddHighlight);
  yield takeLatest(Type.GET_BOOKHIGHLIGHT_REQUEST, GetHighlight);
  yield takeLatest(Type.ADD_BOOKNOTES_REQUEST, AddNotes);
  yield takeLatest(Type.GET_BOOKNOTES_REQUEST, GetNotes);
  yield takeLatest(Type.UPDATE_PROGRESS_REQUEST, UpdateProgress);
  yield takeLatest(Type.GET_PROGRESS_REQUEST, GetProgress);
}
export default watchPreviewBook;

import * as Type from "../../ActionType";

export const Add_highlight_Request = (payload) => ({
  type: Type.ADD_BOOKHIGHLIGHT_REQUEST,
  payload: payload,
});

export const Add_highlight_Success = (payload) => ({
  type: Type.ADD_BOOKHIGHLIGHT_SUCCESS,
  payload: payload,
});

export const Add_highlight_Failure = (payload) => ({
  type: Type.ADD_BOOKHIGHLIGHT_FAILURE,
  payload: payload,
});

export const Get_highlight_Request = (payload) => ({
  type: Type.GET_BOOKHIGHLIGHT_REQUEST,
  payload: payload,
});

export const Get_highlight_Success = (payload) => ({
  type: Type.GET_BOOKHIGHLIGHT_SUCCESS,
  payload: payload,
});

export const Get_highlight_Failure = (payload) => ({
  type: Type.GET_BOOKHIGHLIGHT_FAILURE,
  payload: payload,
});

export const Add_Notes_Request = (payload) => ({
  type: Type.ADD_BOOKNOTES_REQUEST,
  payload: payload,
});

export const Add_Notes_Success = (payload) => ({
  type: Type.ADD_BOOKNOTES_SUCCESS,
  payload: payload,
});

export const Add_Notes_Failure = (payload) => ({
  type: Type.ADD_BOOKNOTES_FAILURE,
  payload: payload,
});

export const Get_Notes_Request = (payload) => ({
  type: Type.GET_BOOKNOTES_REQUEST,
  payload: payload,
});

export const Get_Notes_Success = (payload) => ({
  type: Type.GET_BOOKNOTES_SUCCESS,
  payload: payload,
});

export const Get_Notes_Failure = (payload) => ({
  type: Type.GET_BOOKNOTES_FAILURE,
  payload: payload,
});

export const Update_progress_Request = (payload) => ({
  type: Type.UPDATE_PROGRESS_REQUEST,
  payload: payload,
});

export const Update_progress_Success = (payload) => ({
  type: Type.UPDATE_PROGRESS_SUCCESS,
  payload: payload,
});

export const Update_progress_Failure = (payload) => ({
  type: Type.UPDATE_PROGRESS_FAILURE,
  payload: payload,
});

export const Get_progress_Request = (payload) => ({
  type: Type.GET_PROGRESS_REQUEST,
  payload: payload,
});

export const Get_progress_Success = (payload) => ({
  type: Type.GET_PROGRESS_SUCCESS,
  payload: payload,
});

export const Get_progress_Failure = (payload) => ({
  type: Type.GET_PROGRESS_FAILURE,
  payload: payload,
});

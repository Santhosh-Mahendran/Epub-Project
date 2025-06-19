import * as Type from "../../ActionType";

export const Add_Subsciber_Request = (payload) => ({
  type: Type.ADD_SUBSCRIBER_REQUEST,
  payload: payload,
});

export const Add_Subsciber_Success = (resData) => ({
  type: Type.ADD_SUBSCRIBER_SUCCESS,
  payload: resData,
});

export const Add_Subsciber_Failure = (resErr) => ({
  type: Type.ADD_SUBSCRIBER_FAILURE,
  payload: resErr,
});

export const Get_Subsciber_Request = (payload) => ({
  type: Type.GET_SUBSCRIBER_REQUEST,
  payload: payload,
});

export const Get_Subsciber_Success = (resData) => ({
  type: Type.GET_SUBSCRIBER_SUCCESS,
  payload: resData,
});

export const Get_Subsciber_Failure = (resErr) => ({
  type: Type.GET_SUBSCRIBER_FAILURE,
  payload: resErr,
});

export const del_Subsciber_Request = (payload) => ({
  type: Type.DEL_SUBSCRIBER_REQUEST,
  payload: payload,
});

export const del_Subsciber_Success = (resData) => ({
  type: Type.DEL_SUBSCRIBER_SUCCESS,
  payload: resData,
});

export const del_Subsciber_Failure = (resErr) => ({
  type: Type.DEL_SUBSCRIBER_FAILURE,
  payload: resErr,
});

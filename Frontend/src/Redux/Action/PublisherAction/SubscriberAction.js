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

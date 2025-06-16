import * as Type from "../../ActionType";

export const GetUserBook_Request = (payload) => ({
  type: Type.GET_USERBOOKSUG_REQUEST,
  payload: payload && payload,
});

export const GetUserBook_Success = (payload) => ({
  type: Type.GET_USERBOOKSUG_SUCCESS,
  payload: payload,
});

export const GetUserBook_Failure = (payload) => ({
  type: Type.GET_USERBOOKSUG_FAILURE,
  payload: payload,
});

export const GetUserBookbyId_Request = (payload) => ({
  type: Type.GET_USERBOOKBYID_REQUEST,
  payload: payload,
});

export const GetUserBookbyId_Success = (payload) => ({
  type: Type.GET_USERBOOKBYID_SUCCESS,
  payload: payload,
});

export const GetUserBookbyId_Failure = (payload) => ({
  type: Type.GET_USERBOOKBYID_FAILURE,
  payload: payload,
});

export const GetUserBookbyCat_Request = (payload) => ({
  type: Type.GET_USERBOOKBYCAT_REQUEST,
  payload: payload,
});

export const GetUserBookbyCat_Success = (payload) => ({
  type: Type.GET_USERBOOKBYCAT_SUCCESS,
  payload: payload,
});

export const GetUserBookbyCat_Failure = (payload) => ({
  type: Type.GET_USERBOOKBYCAT_FAILURE,
  payload: payload,
});

import * as Type from "../../ActionType";

export const AddtoCart_Request = (payload) => ({
  type: Type.ADD_CARTBOOK_REQUEST,
  payload: payload,
});

export const AddtoCart_Success = (payload) => ({
  type: Type.ADD_CARTBOOK_SUCCESS,
  payload: payload,
});

export const AddtoCart_Failure = (payload) => ({
  type: Type.ADD_CARTBOOK_FAILURE,
  payload: payload,
});


export const GetCartItem_Request = () => ({
  type: Type.GET_CARTBOOK_REQUEST,
});

export const GetCartItem_Success = (payload) => ({
  type: Type.GET_CARTBOOK_SUCCESS,
  payload: payload,
});

export const GetCartItem_Failure = (payload) => ({
  type: Type.GET_CARTBOOK_FAILURE,
  payload: payload,
});


export const RemoveCartitem_Request = (payload) => ({
  type: Type.DEL_CARTBOOK_REQUEST,
  payload: payload,
});

export const RemoveCartitem_Success = (payload) => ({
  type: Type.DEL_CARTBOOK_SUCCESS,
  payload: payload,
});

export const RemoveCartitem_Failure = (payload) => ({
  type: Type.DEL_CARTBOOK_FAILURE,
  payload: payload,
});

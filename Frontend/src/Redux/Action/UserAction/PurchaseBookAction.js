import * as Type from "../../ActionType";

export const PurchaseBook_Request = (payload) => ({
  type: Type.PURCHASEBOOK_REQUEST,
  payload: payload,
});

export const PurchaseBook_Success = (payload) => ({
  type: Type.PURCHASEBOOK_SUCCESS,
  payload: payload,
});

export const PurchaseBook_Failure = (payload) => ({
  type: Type.PURCHASEBOOK_FAILURE,
  payload: payload,
});

export const Get_PurchasedBook_Request = () => ({
  type: Type.GET_PURCHASEBOOK_REQUEST,
});

export const Get_PurchasedBook_Success = (payload) => ({
  type: Type.GET_PURCHASEBOOK_SUCCESS,
  payload: payload,
});

export const Get_PurchasedBook_Failure = (payload) => ({
  type: Type.GET_PURCHASEBOOK_FAILURE,
  payload: payload,
});

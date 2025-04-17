import * as Type from "../../ActionType";

export const AddtoWishlist_Request = (payload) => ({
  type: Type.ADD_WISHLISTBOOK_REQUEST,
  payload: payload,
});

export const AddtoWishlist_Success = (payload) => ({
  type: Type.ADD_WISHLISTBOOK_SUCCESS,
  payload: payload,
});

export const AddtoWishlist_Failure = (payload) => ({
  type: Type.ADD_WISHLISTBOOK_FAILURE,
  payload: payload,
});

export const GetWishlistItem_Request = () => ({
  type: Type.GET_WISHLISTBOOK_REQUEST,
});

export const GetWishlistItem_Success = (payload) => ({
  type: Type.GET_WISHLISTBOOK_SUCCESS,
  payload: payload,
});

export const GetWishlistItem_Failure = (payload) => ({
  type: Type.GET_WISHLISTBOOK_FAILURE,
  payload: payload,
});

export const RemoveWishlistitem_Request = (payload) => ({
  type: Type.DEL_WISHLISTBOOK_REQUEST,
  payload: payload,
});

export const RemoveWishlistitem_Success = (payload) => ({
  type: Type.DEL_WISHLISTBOOK_SUCCESS,
  payload: payload,
});

export const RemoveWishlistitem_Failure = (payload) => ({
  type: Type.DEL_WISHLISTBOOK_FAILURE,
  payload: payload,
});

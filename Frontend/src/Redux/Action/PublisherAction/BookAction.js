import * as Type from "../../ActionType";

export const Upload_book_Request = (payload) => ({
  type: Type.UPLOAD_FILE_REQUEST,
  payload: payload,
});

export const Upload_book_Success = (resData) => ({
  type: Type.UPLOAD_FILE_SUCCESS,
  payload: resData,
});

export const Upload_book_Failure = (resErr) => ({
  type: Type.UPLOAD_FILE_FAILURE,
  payload: resErr,
});

export const Get_book_Request = () => ({
  type: Type.GET_BOOK_REQUEST,
});

export const Get_book_Success = (resData) => ({
  type: Type.GET_BOOK_SUCCESS,
  payload: resData,
});

export const Get_book_Failure = (resErr) => ({
  type: Type.GET_BOOK_FAILURE,
  payload: resErr,
});

export const Update_book_Request = (payload) => ({
  type: Type.UPDATE_BOOK_REQUEST,
  payload: payload,
});

export const Update_book_Success = (resData) => ({
  type: Type.UPDATE_BOOK_SUCCESS,
  payload: resData,
});

export const Update_book_Failure = (resErr) => ({
  type: Type.UPDATE_BOOK_FAILURE,
  payload: resErr,
});

export const Get_bookbyId_Request = (id) => ({
  type: Type.GET_BOOK_ID_REQUEST,
  payload: id,
});

export const Get_bookbyId_Success = (resData) => ({
  type: Type.GET_BOOK_ID_SUCCESS,
  payload: resData,
});

export const Get_bookbyId_Failure = (resErr) => ({
  type: Type.GET_BOOK_ID_FAILURE,
  payload: resErr,
});

export const Get_bookbycat_Request = (id) => ({
  type: Type.GET_BOOK_CAT_REQUEST,
  payload: id,
});

export const Get_bookbycat_Success = (resData) => ({
  type: Type.GET_BOOK_CAT_SUCCESS,
  payload: resData,
});

export const Get_bookbycat_Failure = (resErr) => ({
  type: Type.GET_BOOK_CAT_FAILURE,
  payload: resErr,
});

export const DeleteBook_Request = (id) => {
  return {
    type: Type.DEL_BOOK_REQUEST,
    payload: id,
  };
};

export const DeleteBook_Success = (resData) => ({
  type: Type.DEL_BOOK_SUCCESS,
  payload: resData,
});

export const DeleteBook_Failure = (resErr) => ({
  type: Type.DEL_BOOK_FAILURE,
  payload: resErr,
});

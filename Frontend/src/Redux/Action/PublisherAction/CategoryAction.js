import * as Type from "../../ActionType";

export const Add_Cat_Request = ( payload ) => ({
  type: Type.ADD_CATEGORY_REQUEST,
  payload: payload,
});

export const Add_Cat_Success = (resData) => ({
  type: Type.ADD_CATEGORY_SUCCESS,
  payload: resData,
});

export const Add_Cat_Failure = (resErr) => ({
  type: Type.ADD_CATEGORY_FAILURE,
  payload: resErr,
});

export const Get_Cat_Request = () => ({
    type: Type.GET_CATEGORY_REQUEST,
  });
  
  export const Get_Cat_Success = (resData) => ({
    type: Type.GET_CATEGORY_SUCCESS,
    payload: resData,
  });
  
  export const Get_Cat_Failure = (resErr) => ({
    type: Type.GET_CATEGORY_FAILURE,
    payload: resErr,
  });
import * as Type from "../../ActionType";

export const Get_readerSub_Request = () => {    
  return {
    type: Type.GET_READERSUB_REQUEST,
  };
};

export const Get_readerSub_Success = (payload) => ({
  type: Type.GET_READERSUB_SUCCESS,
  payload: payload,
});

export const Get_readerSub_Failure = (payload) => ({
  type: Type.GET_READERSUB_FAILURE,
  payload: payload,
});

export const Add_readerSub_Request = (payload) => ({
  type: Type.ADD_READERSUB_REQUEST,
  payload: payload,
});

export const Add_readerSub_Success = (payload) => ({
  type: Type.ADD_READERSUB_SUCCESS,
  payload: payload,
});

export const Add_readerSub_Failure = (payload) => ({
  type: Type.ADD_READERSUB_FAILURE,
  payload: payload,
});

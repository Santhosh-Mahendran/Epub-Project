import * as Type from "../../ActionType";

export const User_Login_Request = (payload) => ({
  type: Type.USER_LOGIN_REQUEST,
  payload: payload,
});

export const User_Login_Success = (resData) => {
  return {
    type: Type.USER_LOGIN_SUCCESS,
    payload: resData,
  };
};
export const User_Login_Failure = (resErr) => ({
  type: Type.USER_LOGIN_FAILURE,
  payload: resErr,
});
export const User_Logout = () => ({
  type: Type.USER_LOGOUT,
});

export const User_Register_Request = (payload) => ({
  type: Type.USER_REGISTER_REQUEST,
  payload: payload,
});

export const User_Register_Success = (resData) => ({
  type: Type.USER_REGISTER_SUCCESS,
  payload: resData,
});

export const User_Register_Failure = (resErr) => ({
  type: Type.USER_REGISTER_FAILURE,
  payload: resErr,
});

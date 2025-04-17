import * as Type from "../../ActionType";

export const Publisher_Login_Request = (payload) => ({
  type: Type.PUBLISHER_LOGIN_REQUEST,
  payload: payload,
});

export const Publisher_Login_Success = (resData) => {

  return {
    type: Type.PUBLISHER_LOGIN_SUCCESS,
    payload: resData,
  };
};
export const Publisher_Login_Failure = (resErr) => ({
  type: Type.PUBLISHER_LOGIN_FAILURE,
  payload: resErr,
});
export const Publisher_Logout = () => ({
  type: Type.PUBLISHER_LOGOUT,
});

export const Publisher_Register_Request = (payload) => ({
  type: Type.PUBLISHER_REGISTER_REQUEST,
  payload: payload,
});

export const Publisher_Register_Success = (resData) => ({
  type: Type.PUBLISHER_REGISTER_SUCCESS,
  payload: resData,
});

export const Publisher_Register_Failure = (resErr) => ({
  type: Type.PUBLISHER_REGISTER_FAILURE,
  payload: resErr,
});

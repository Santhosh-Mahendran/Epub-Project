import * as Type from "../../ActionType";

const Auth_Token = localStorage.getItem("User_Auth_Token");

const initialState = {
  loading: false,
  LoginData: {},
  UserLoginStatus: Auth_Token ? true : false,
  error: null,
};
function UserLoginReducer(state = initialState, action) {
  switch (action.type) {
    case Type.USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        UserLoginStatus: Auth_Token ? true : false,
      };
    case Type.USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        LoginData: action.payload,
        UserLoginStatus: action.payload.access_token ? true : false,
      };
    case Type.USER_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Type.USER_LOGOUT:
      localStorage.removeItem("User_Auth_Token");
      localStorage.removeItem("has_subscription");

      return { ...state, UserLoginStatus: false };
    default:
      return state;
  }
}
export default UserLoginReducer;

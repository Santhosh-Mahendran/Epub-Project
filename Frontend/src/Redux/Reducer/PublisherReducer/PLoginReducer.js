import * as Type from "../../ActionType";

const Auth_Token = localStorage.getItem("Publisher_Auth_Token");

const initialState = {
  loading: false,
  LoginData: {},
  PubLoginStatus: Auth_Token ? true : false,
  error: null,
};
function PublisherLoginReducer(state = initialState, action) {
  switch (action.type) {
    case Type.PUBLISHER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        PubLoginStatus: Auth_Token ? true : false,
      };
    case Type.PUBLISHER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        LoginData: action.payload,
        PubLoginStatus: action.payload.access_token ? true : false,
      };
    case Type.PUBLISHER_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Type.PUBLISHER_LOGOUT:
      localStorage.removeItem("Publisher_Auth_Token");

      return { ...state, PubLoginStatus: false };
    default:
      return state;
  }
}
export default PublisherLoginReducer;

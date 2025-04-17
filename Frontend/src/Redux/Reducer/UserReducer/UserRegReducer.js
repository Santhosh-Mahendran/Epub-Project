import * as Type from "../../ActionType";

const initialState = {
  loading: false,
  RegData: {},
  error: null,
  UserRegStatus: false,
};
function UserRegReducer(state = initialState, action) {
  switch (action.type) {
    case Type.USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        UserRegStatus: false,
      };
    case Type.USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        RegData: action.payload,
        UserRegStatus: true,
      };
    case Type.USER_REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        UserRegStatus: false,
      };
    default:
      return state;
  }
}
export default UserRegReducer;

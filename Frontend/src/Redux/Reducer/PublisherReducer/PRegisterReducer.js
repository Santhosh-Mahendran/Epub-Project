import * as Type from "../../ActionType";

const initialState = {
  loading: false,
  RegisterData: [],
  RegStatus: false,
  error: null,
};
function PublisherRegisterReducer(state = initialState, action) {
  switch (action.type) {
    case Type.PUBLISHER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Type.PUBLISHER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        RegisterData: action.payload,
        RegStatus: true,
      };
    case Type.PUBLISHER_REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
export default PublisherRegisterReducer;

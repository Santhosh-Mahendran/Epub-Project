import * as Type from "../../ActionType";

const initialState = {
  loading: false,
  SubScribedBooks: [],
  error: null,
};
function SubscribeBookReducer(state = initialState, action) {
  switch (action.type) {
    case Type.GET_READERSUB_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Type.GET_READERSUB_SUCCESS:
      return {
        ...state,
        loading: false,
        SubScribedBooks: action.payload.subscriptions,
      };
    case Type.GET_READERSUB_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Type.ADD_READERSUB_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Type.ADD_READERSUB_SUCCESS:
      return {
        ...state,
        loading: false,
        // SubScribedBooks: action.payload,
      };
    case Type.ADD_READERSUB_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
export default SubscribeBookReducer;

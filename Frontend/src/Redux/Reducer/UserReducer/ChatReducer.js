import * as Type from "../../ActionType";

const initialState = {
  loading: false,
  Response: {},
  error: null,
};
function ChatReducer(state = initialState, action) {
  switch (action.type) {
    case Type.POST_USERQUES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Type.POST_USERQUES_SUCCESS:
      return {
        ...state,
        loading: false,
        Response: action.payload?.response,
      };
    case Type.POST_USERQUES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
export default ChatReducer;

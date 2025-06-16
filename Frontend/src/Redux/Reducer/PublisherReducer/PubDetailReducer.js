import * as Type from "../../ActionType";

const initialState = {
  loading: false,
  Details: [],
  error: null,
};
function PubDetailReducer(state = initialState, action) {
  switch (action.type) {
    case Type.PUB_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Type.PUB_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        Details: action.payload,
      };
    case Type.PUB_DETAIL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
export default PubDetailReducer;

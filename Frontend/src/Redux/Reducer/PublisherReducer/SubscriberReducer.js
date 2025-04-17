import * as Type from "../../ActionType";

const initialState = {
  loading: false,
  SubScriberData: [],
  error: null,
};
function SubscriberReducer(state = initialState, action) {
  switch (action.type) {
    case Type.ADD_SUBSCRIBER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Type.ADD_SUBSCRIBER_SUCCESS:
      return {
        ...state,
        loading: false,
        // SubScriberData: action.payload,
      };
    case Type.ADD_SUBSCRIBER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
export default SubscriberReducer;

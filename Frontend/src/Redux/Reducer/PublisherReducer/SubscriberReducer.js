import * as Type from "../../ActionType";

const initialState = {
  loading: false,
  SubScriberData: [],
  error: null,
  delLoad: false,
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
    case Type.GET_SUBSCRIBER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Type.GET_SUBSCRIBER_SUCCESS:
      return {
        ...state,
        loading: false,
        SubScriberData: action.payload.subscribers,
      };
    case Type.GET_SUBSCRIBER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Type.DEL_SUBSCRIBER_REQUEST:
      return {
        ...state,
        delLoad: true,
      };
    case Type.DEL_SUBSCRIBER_SUCCESS:
      return {
        ...state,
        delLoad: false,
        // SubScriberData: action.payload.subscribers,
      };
    case Type.DEL_SUBSCRIBER_FAILURE:
      return {
        ...state,
        delLoad: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
export default SubscriberReducer;

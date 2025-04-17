import * as Type from "../../ActionType";

const initialState = {
  loading: false,
  Highlights: [],
  Notes: [],
  error: null,
  Progress: null,
};
function PreviewBookReducer(state = initialState, action) {
  switch (action.type) {
    case Type.ADD_BOOKHIGHLIGHT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Type.ADD_BOOKHIGHLIGHT_SUCCESS:
      return {
        ...state,
        loading: false,
        // cartItems: action.payload,
      };
    case Type.ADD_BOOKHIGHLIGHT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Type.GET_BOOKHIGHLIGHT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Type.GET_BOOKHIGHLIGHT_SUCCESS:
      return {
        ...state,
        loading: false,
        Highlights: action.payload.highlights,
      };
    case Type.ADD_BOOKNOTES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Type.ADD_BOOKNOTES_SUCCESS:
      return {
        ...state,
        loading: false,
        // cartItems: action.payload,
      };
    case Type.ADD_BOOKNOTES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Type.GET_BOOKNOTES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Type.GET_BOOKNOTES_SUCCESS:
      return {
        ...state,
        loading: false,
        Notes: action.payload.notes,
      };
    case Type.GET_BOOKNOTES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Type.UPDATE_PROGRESS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Type.UPDATE_PROGRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        // Notes: action.payload.notes,
      };
    case Type.UPDATE_PROGRESS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Type.GET_PROGRESS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Type.GET_PROGRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        Progress: action.payload.bookmark,
      };
    case Type.GET_PROGRESS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
export default PreviewBookReducer;

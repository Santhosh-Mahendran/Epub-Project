import * as Type from "../../ActionType";

const initialState = {
  loading: false,
  Category: [],
  error: null,
  message: null,
};
function CategoryReducer(state = initialState, action) {
  switch (action.type) {
    case Type.ADD_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Type.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case Type.ADD_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Type.GET_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Type.GET_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        Category: action.payload.categories,
      };
    case Type.GET_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
export default CategoryReducer;

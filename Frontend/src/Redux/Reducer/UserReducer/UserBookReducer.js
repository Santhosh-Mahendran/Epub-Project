import * as Type from "../../ActionType";

const initialState = {
  loading: false,
  UserBooks: [],
  error: null,
  BookDetails: {},
  FilteredBook: [],
};
function UserBookReducer(state = initialState, action) {
  switch (action.type) {
    case Type.GET_USERBOOKSUG_REQUEST:
      return {
        ...state,
        loading: action?.payload?.silent ? false : true,
      };
    case Type.GET_USERBOOKSUG_SUCCESS:
      return {
        ...state,
        loading: false,
        UserBooks: action.payload.books,
      };
    case Type.GET_USERBOOKSUG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Type.GET_USERBOOKBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Type.GET_USERBOOKBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        BookDetails: action.payload,
      };
    case Type.GET_USERBOOKBYID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Type.GET_USERBOOKBYCAT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Type.GET_USERBOOKBYCAT_SUCCESS:
      return {
        ...state,
        loading: false,
        FilteredBook: action.payload.books,
      };
    case Type.GET_USERBOOKBYCAT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
export default UserBookReducer;

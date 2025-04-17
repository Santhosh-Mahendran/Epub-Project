import * as Type from "../../ActionType";

const initialState = {
  loading: false,
  BookDataList: [],
  error: null,
  BookDetail: {},
  filterBook: [],
  BookDeleted: false,
};
function BookReducer(state = initialState, action) {
  switch (action.type) {
    case Type.UPLOAD_FILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Type.UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        loading: false,
        // BookDataList: action.payload,
        BookDeleted: false,
      };
    case Type.UPLOAD_FILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Type.GET_BOOK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Type.GET_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        BookDataList: action.payload,
        BookDeleted: false,
      };
    case Type.GET_BOOK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Type.GET_BOOK_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Type.GET_BOOK_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        BookDetail: action.payload,
        BookDeleted: false,
      };
    case Type.GET_BOOK_ID_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case Type.GET_BOOK_CAT_REQUEST:
      return {
        ...state,
        loading: true,
        filterCatLoading: true,
      };
    case Type.GET_BOOK_CAT_SUCCESS:
      return {
        ...state,
        loading: false,
        filterBook: action.payload.books,
        BookDeleted: false,
      };
    case Type.GET_BOOK_CAT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case Type.DEL_BOOK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Type.DEL_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        BookDeleted: true,
      };
    case Type.DEL_BOOK_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
export default BookReducer;

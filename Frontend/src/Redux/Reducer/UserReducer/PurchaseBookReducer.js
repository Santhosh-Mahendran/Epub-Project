import * as Type from "../../ActionType";

const initialState = {
  loading: false,
  purchasedBook: [],
  error: null,
};
function PurchaseBookReducer(state = initialState, action) {
  switch (action.type) {
    case Type.PURCHASEBOOK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Type.PURCHASEBOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        purchasedBook: action.payload,
      };
    case Type.PURCHASEBOOK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Type.GET_PURCHASEBOOK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Type.GET_PURCHASEBOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        purchasedBook: action.payload.purchased_books,
      };
    case Type.GET_PURCHASEBOOK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
export default PurchaseBookReducer;

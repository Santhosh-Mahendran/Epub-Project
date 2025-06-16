import * as Type from "../../ActionType";

const initialState = {
  loading: false,
  purchasedBook: false,
  PurchasedTrue:false,
  error: null,
};
function PurchaseBookReducer(state = initialState, action) {
  switch (action.type) {
    case Type.PURCHASEBOOK_REQUEST:
      return {
        ...state,
        loading: true,
        PurchasedTrue:false,
      };
    case Type.PURCHASEBOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        PurchasedTrue:true,
        // purchasedBook: action.payload,
      };
    case Type.PURCHASEBOOK_FAILURE:
      return {
        ...state,
        loading: false,
        PurchasedTrue:false,
        error: action.payload,
      };
    case Type.GET_PURCHASEBOOK_REQUEST:
      return {
        ...state,
        loading: true,
        PurchasedTrue:false,
      };
    case Type.GET_PURCHASEBOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        PurchasedTrue:false,
        purchasedBook: action.payload.purchased_books,
      };
    case Type.GET_PURCHASEBOOK_FAILURE:
      return {
        ...state,
        loading: false,
        PurchasedTrue:false,
        error: action.payload,
      };
    default:
      return state;
  }
}
export default PurchaseBookReducer;

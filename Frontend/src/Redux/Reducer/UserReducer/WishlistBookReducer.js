import * as Type from "../../ActionType";

const initialState = {
  loading: false,
  wishlistItems: [],
  error: null,
};
function WishlistBookReducer(state = initialState, action) {
  switch (action.type) {
    case Type.ADD_WISHLISTBOOK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Type.ADD_WISHLISTBOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        // wishlistItems: action.payload,
      };
    case Type.ADD_WISHLISTBOOK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Type.GET_WISHLISTBOOK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Type.GET_WISHLISTBOOK_SUCCESS:
        
      return {
        ...state,
        loading: false,
        wishlistItems: action.payload.wishlist,
      };
    case Type.GET_WISHLISTBOOK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Type.DEL_WISHLISTBOOK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Type.DEL_WISHLISTBOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        // wishlistItems: action.payload,
      };
    case Type.DEL_WISHLISTBOOK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
export default WishlistBookReducer;

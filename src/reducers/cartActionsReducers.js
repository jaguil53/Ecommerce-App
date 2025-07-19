import {
  CART_SAVE_REQUEST,
  CART_SAVE_SUCCESS,
  CART_SAVE_FAILURE,
  FETCH_USER_CART_REQUEST,
  FETCH_USER_CART_SUCCESS,
  FETCH_USER_CART_FAILURE,
  DELETE_PRODUCT_FROM_CART_REQUEST,
  DELETE_PRODUCT_FROM_CART_SUCCESS,
  DELETE_PRODUCT_FROM_CART_FAILURE,
} from "../constants/cartActionConstants";

export const deleteProductFromUserCartReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_FROM_CART_REQUEST:
      return { loadingDelete: true };
    case DELETE_PRODUCT_FROM_CART_SUCCESS:
      return { loadingDelete: false, success: true };
    case DELETE_PRODUCT_FROM_CART_FAILURE:
      return { loadingDelete: false, error: action.payload };
    default:
      return state;
  }
};

export const saveProductToUserCartReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_SAVE_REQUEST:
      return { addToCartLoading: true };
    case CART_SAVE_SUCCESS:
      return { addToCartLoading: false, addToCartSuccess: action.payload };
    case CART_SAVE_FAILURE:
      return { addToCartLoading: false, addToCartError: action.payload };
    default:
      return state;
  }
};

export const fetchUserCartReducer = (state = { cart: [] }, action) => {
  switch (action.type) {
    case FETCH_USER_CART_REQUEST:
      return { loading: true };
    case FETCH_USER_CART_SUCCESS:
      return { loading: false, fetchSuccess: true, cart: action.payload };
    case FETCH_USER_CART_FAILURE:
      return { loading: false, fetchError: action.payload };
    default:
      return state;
  }
};

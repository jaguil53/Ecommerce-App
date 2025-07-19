import {
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_FAILURE,
  USER_ORDER_HISTORY_FAILURE,
  USER_ORDER_HISTORY_SUCCESS,
  USER_ORDER_HISTORY_REQUEST,
  ORDER_HISTORY_ALL_USERS_REQUEST,
  ORDER_HISTORY_ALL_USERS_SUCCESS,
  ORDER_HISTORY_ALL_USERS_FAILURE,
  CHANGE_ORDER_STATUS_REQUEST,
  CHANGE_ORDER_STATUS_SUCCESS,
  CHANGE_ORDER_STATUS_FAILURE,
} from "../constants/orderActionConstants";

export const placeOrderOfUserReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return { loading: true };
    case CREATE_ORDER_SUCCESS:
      return { loading: false, success: true };
    case CREATE_ORDER_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getUserOrdersHistoryReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ORDER_HISTORY_REQUEST:
      return { loading: true };
    case USER_ORDER_HISTORY_SUCCESS:
      return { loading: false, success: true, orders: action.payload };
    case USER_ORDER_HISTORY_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getAllUsersOrderHistoryReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_HISTORY_ALL_USERS_REQUEST:
      return { loading: true };
    case ORDER_HISTORY_ALL_USERS_SUCCESS:
      return { loading: false, success: true, orders: action.payload };
    case ORDER_HISTORY_ALL_USERS_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const changeUserOrderStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_ORDER_STATUS_REQUEST:
      return { loading: true };
    case CHANGE_ORDER_STATUS_SUCCESS:
      return { loading: false, successChangeStatus: action.payload };
    case CHANGE_ORDER_STATUS_FAILURE:
      return { loading: false, errorChangeStatus: action.payload };
    default:
      return state;
  }
};

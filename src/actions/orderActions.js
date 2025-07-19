import axios from "axios";
import { BACKEND_URL_ENDPOINT } from "../constants/backend";

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

export const placeOrderOfUser = (shippingDetails) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_ORDER_REQUEST,
    });
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    console.log("Fetched shipping details ", shippingDetails);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.sessionToken}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
      },
    };
    console.log("Inside place order function");
    await axios
      .post(BACKEND_URL_ENDPOINT + "orders/", { shippingDetails }, config)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: res.data.message,
          });
        } else {
          dispatch({
            type: CREATE_ORDER_FAILURE,
            payload: res.data.message,
          });
        }
      });
  } catch (err) {
    dispatch({
      type: CREATE_ORDER_FAILURE,
      payload: err.response.data.message,
    });
  }
};

export const getUserOrdersHistory =
  (userId = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_ORDER_HISTORY_REQUEST,
      });
      const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      if (userId == "") {
        userId = userInfo._id;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.sessionToken}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
        },
      };
      console.log("Inside getUsersOrdersHoistory");
      await axios
        .get(BACKEND_URL_ENDPOINT + "orders/user/" + userId, config)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            dispatch({
              type: USER_ORDER_HISTORY_SUCCESS,
              payload: res.data.data,
            });
          } else {
            dispatch({
              type: USER_ORDER_HISTORY_FAILURE,
              payload: res.data.message,
            });
          }
        });
    } catch (err) {
      dispatch({
        type: USER_ORDER_HISTORY_FAILURE,
        payload: err.response.data.message,
      });
    }
  };

export const getAllUsersOrderHistory = () => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_HISTORY_ALL_USERS_REQUEST,
    });
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.sessionToken}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
      },
    };
    await axios
      .get(BACKEND_URL_ENDPOINT + "orders/", config)
      .then((res) => {
        console.log(res.data.orders);
        if (res.status === 200) {
          dispatch({
            type: ORDER_HISTORY_ALL_USERS_SUCCESS,
            payload: res.data.orders,
          });
        } else {
          dispatch({
            type: ORDER_HISTORY_ALL_USERS_FAILURE,
            payload: res.data.message,
          });
        }
      });
  } catch (err) {
    dispatch({
      type: ORDER_HISTORY_ALL_USERS_FAILURE,
      payload: err.response.data.message,
    });
  }
};

export const changeUserOrderStatus = (orderId, newStatus) => async (dispatch) => {
  try {
    dispatch({
      type: CHANGE_ORDER_STATUS_REQUEST,
    });
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.sessionToken}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
      },
    };
    await axios
      .put(BACKEND_URL_ENDPOINT + "orders/" + orderId, {newStatus}, config)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: CHANGE_ORDER_STATUS_SUCCESS,
            payload: res.data.message,
          });
        } else {
          dispatch({
            type: CHANGE_ORDER_STATUS_FAILURE,
            payload: res.data.message,
          });
        }
      });
  } catch (err) {
    dispatch({
      type: CHANGE_ORDER_STATUS_FAILURE,
      payload: err.response.data.message,
    });
  }
};

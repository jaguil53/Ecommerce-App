import axios from "axios";
import { BACKEND_URL_ENDPOINT } from "../constants/backend";

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

export const saveToCart =
  (productId, productPrice, quantity) => async (dispatch) => {
    try {
      dispatch({
        type: CART_SAVE_REQUEST,
      });

      const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.sessionToken}`,
        },
      };
      await axios
        .post(
          BACKEND_URL_ENDPOINT + "carts/",
          { productId, productPrice, quantity },
          config
        )
        .then((res) => {
          if (res.status === 200) {
            dispatch({
              type: CART_SAVE_SUCCESS,
              payload: res.data.message,
            });
          } else {
            dispatch({
              type: CART_SAVE_FAILURE,
              payload: res.data.message,
            });
          }
        });
    } catch (err) {
      dispatch({
        type: CART_SAVE_FAILURE,
        payload: err.response.data.message,
      });
    }
  };

export const fetchUserCart = () => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_USER_CART_REQUEST,
    });

    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.sessionToken}`,
      },
    };

    await axios
      .get(BACKEND_URL_ENDPOINT + "carts/", config)
      .then((res) => {
        console.log(res.data.cart);
        console.log(res.data.cart)
        if (res.status === 200) {
          dispatch({
            type: FETCH_USER_CART_SUCCESS,
            payload: res.data.userCart,
          });
        } else {
          dispatch({
            type: FETCH_USER_CART_FAILURE,
            payload: res.data.message,
          });
        }
      });
  } catch (err) {
    dispatch({
      type: FETCH_USER_CART_FAILURE,
      payload: err.message,
    });
  }
};

export const deletProductFromUserCart = (productId) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_PRODUCT_FROM_CART_REQUEST,
    });

    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.sessionToken}`,
      },
    };

    await axios
      .delete(BACKEND_URL_ENDPOINT + `carts/`+productId, config)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: DELETE_PRODUCT_FROM_CART_SUCCESS,
            payload: res.data.message,
          });
        } else {
          dispatch({
            type: DELETE_PRODUCT_FROM_CART_SUCCESS,
            payload: res.data.message,
          });
        }
      });
  } catch (err) {
    dispatch({
      type: DELETE_PRODUCT_FROM_CART_FAILURE,
      payload: err.response.data.message,
    });
  }
};

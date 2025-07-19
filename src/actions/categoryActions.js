import axios from "axios";
import { BACKEND_URL_ENDPOINT } from "../constants/backend";

import {
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_CREATE_FAILURE,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAILURE,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_UPDATE_FAILURE,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAILURE,
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DETAILS_SUCCESS,
  CATEGORY_DETAILS_FAILURE,
} from "../constants/categoryActionConstants";

export const addCategory = (name, description) => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_CREATE_REQUEST,
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
        BACKEND_URL_ENDPOINT + "categories/",
        { name, description },
        config
      )
      .then((res) => {
        if (res.status === 201) {
          console.log(res);
          dispatch({
            type: CATEGORY_CREATE_SUCCESS,
            payload: res.data.message,
          });
        } else {
          dispatch({
            type: CATEGORY_CREATE_FAILURE,
            payload: res.data.message,
          });
        }
      });
  } catch (err) {
    dispatch({
      type: CATEGORY_CREATE_FAILURE,
      payload: err.response.data.message,
    });
  }
};

export const deletCategory = (categoryId) => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_DELETE_REQUEST,
    });

    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.sessionToken}`,
      },
    };

    await axios
      .delete(BACKEND_URL_ENDPOINT + `categories/${categoryId}`, config)
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          dispatch({
            type: CATEGORY_DELETE_SUCCESS,
            payload: res.data.message,
          });
        } else {
          dispatch({
            type: CATEGORY_DELETE_SUCCESS,
            payload: res.data.message,
          });
        }
      });
  } catch (err) {
    dispatch({
      type: CATEGORY_DELETE_FAILURE,
      payload: err.response.data.message,
    });
  }
};

export const listCategories = () => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_LIST_REQUEST,
    });

    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.sessionToken}`,
      },
    };

    await axios
      .get(BACKEND_URL_ENDPOINT + "categories/", config)
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          dispatch({
            type: CATEGORY_LIST_SUCCESS,
            payload: res.data.data,
          });
        } else {
          dispatch({
            type: CATEGORY_LIST_FAILURE,
            payload: res,
          });
        }
      });
  } catch (err) {
    dispatch({
      type: CATEGORY_LIST_FAILURE,
      payload: err.message,
    });
  }
};

export const fetchCategoryDetails = (categoryId) => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_DETAILS_REQUEST,
    });

    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.sessionToken}`,
      },
    };

    await axios
      .get(BACKEND_URL_ENDPOINT + "categories/" + categoryId, config)
      .then((res) => {
        if (res.status === 200) {
          console.log(res)
          dispatch({ type: CATEGORY_DETAILS_SUCCESS, payload: res.data.category });
        } else {
          dispatch({
            type: CATEGORY_DETAILS_FAILURE,
            payload: res.data.message,
          });
        }
      });
  } catch (err) {
    dispatch({
      type: CATEGORY_DETAILS_FAILURE,
      payload: err.response.data.message,
    });
  }
};

export const updateCategory =
  (name, description, categoryId) => async (dispatch) => {
    try {
      dispatch({
        type: CATEGORY_UPDATE_REQUEST,
      });

      const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.sessionToken}`,
        },
      };

      await axios
        .put(
          BACKEND_URL_ENDPOINT + "categories/" + categoryId,
          { name: name, description: description },
          config
        )
        .then((res) => {
          console.log("Category Update API Response : ", res)
          if (res.status === 200) {
            dispatch({ type: CATEGORY_UPDATE_SUCCESS, payload: res.data.message });
          } else {
            dispatch({
              type: CATEGORY_UPDATE_FAILURE,
              payload: res.data.message,
            });
          }
        });
    } catch (err) {
      dispatch({
        type: CATEGORY_UPDATE_FAILURE,
        payload: err.response.data.message,
      });
    }
  };

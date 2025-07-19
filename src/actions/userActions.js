import axios from "axios";
import { LOGIN_API, BACKEND_URL_ENDPOINT } from "../constants/backend";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAILURE,
  USER_DETAILS_UPDATE_REQUEST,
  USER_DETAILS_UPDATE_SUCCESS,
  USER_DETAILS_UPDATE_FAILURE,
  USER_LIST_SUCCESS,
  USER_LIST_FAILURE,
  USER_LIST_REQUEST,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAILURE,
  USER_REGISTER_FAILURE,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
} from "../constants/userActionConstants";

import { useNavigate } from "react-router-dom";

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
      },
    };

    await axios
      .post(LOGIN_API, { username, password }, config)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data.data,
            success: 'Login successful',
          });
          sessionStorage.setItem("userInfo", JSON.stringify(res.data.data));
        } else {
          dispatch({
            type: LOGIN_FAILURE,
            error: 'Unable to Login',
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_FAILURE,
          error: 'Unable to Login',
        });
      });
    // dispatch({ type: LOGIN_SUCCESS, payload: response, message: response });
    // localStorage.setItem("userInfo", JSON.stringify(response));
  } catch (err) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: err.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_REQUEST });

    dispatch({
      type: LOGOUT_SUCCESS,
      payload: 'Successfully logged out',
    });

    sessionStorage.removeItem("userInfo");
    window.location.replace('/')

  } catch (err) {
    dispatch({
      type: LOGOUT_FAILURE,
      payload: err.message,
    });
  }
};

export const registerUser =
  (username, fullname, email, password, isAdmin) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
        },
      };
      await axios
        .post(
          BACKEND_URL_ENDPOINT + "users/",
          { username, fullname, email, password, isAdmin },
          config
        )
        .then((res) => {
          if (res.status === 201) {
            dispatch({
              type: USER_REGISTER_SUCCESS,
              payload: res.data.message,
            });
          } else {
            dispatch({
              type: USER_REGISTER_FAILURE,
              payload: res.data.message,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          dispatch({
            type: USER_REGISTER_FAILURE,
            payload: err.response.data.error,
          });
        });
    } catch (err) {
      console.log(err);
      dispatch({
        type: USER_REGISTER_FAILURE,
        payload: err.response.data.error,
      });
    }
  };

export const deleteUser = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
        Authorization: `Bearer ${userInfo.sessionToken}`,
      },
    };

    await axios
      .delete(BACKEND_URL_ENDPOINT + `users/${userId}`, config)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: USER_DELETE_SUCCESS,
            payload: res.data.message,
          });
        } else {
          dispatch({
            type: USER_DELETE_FAILURE,
            payload: res.data.message,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: USER_DELETE_FAILURE,
          payload: err.message,
        });
      });
  } catch (err) {
    dispatch({
      type: USER_DELETE_FAILURE,
      payload: err.message,
    });
  }
};

export const listUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });

    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.sessionToken}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
      },
    };

    await axios
      .get(BACKEND_URL_ENDPOINT + "users/", config)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          dispatch({
            type: USER_LIST_SUCCESS,
            payload: res.data.data,
          });
        } else {
          dispatch({
            type: USER_LIST_FAILURE,
            payload: res.data.message,
          });
        }
      });
  } catch (err) {
    dispatch({
      type: USER_LIST_FAILURE,
      payload: err,
    });
  }
};

export const userDetails =
  (userId = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_DETAILS_REQUEST,
      });

      const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      console.log("Inside userDetails function : ", userInfo);
      if (!userId) {
        userId = userInfo._id;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.sessionToken}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
        },
      };

      console.log(config);

      await axios
        .get(BACKEND_URL_ENDPOINT + "users/" + userId, config)
        .then((res) => {
          if (res.status === 200) {
            dispatch({
              type: USER_DETAILS_SUCCESS,
              payload: res.data,
            });
          } else {
            dispatch({
              type: USER_DETAILS_FAILURE,
              payload: res.data.message,
            });
          }
        });
    } catch (err) {
      dispatch({
        type: USER_DETAILS_FAILURE,
        payload: err.response.data.message,
      });
    }
  };

export const updateUserDetails =
  (email, password, userId) => async (dispatch) => {
    try {
      dispatch({
        type: USER_DETAILS_REQUEST,
      });

      const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      if (!userId) {
        userId = userInfo._id;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.sessionToken}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
        },
      };

      await axios
        .put(
          BACKEND_URL_ENDPOINT + "users/" + userId,
          { email: email, password: password },
          config
        )
        .then((res) => {
          if (res.status === 200) {
            dispatch({
              type: USER_DETAILS_UPDATE_SUCCESS,
              payload: res.data.message,
            });
          } else {
            dispatch({
              type: USER_DETAILS_UPDATE_FAILURE,
              payload: res.data.message,
            });
          }
        });
    } catch (err) {
      dispatch({
        type: USER_DETAILS_UPDATE_FAILURE,
        payload: err.response.data.message,
      });
    }
  };

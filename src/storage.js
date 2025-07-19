import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userLogoutReducer,
  userListReducer,
  userDetailsReducer,
  userDeleteReducer,
  userRegisterReducer,
  userDetailsUpdateReducer,
} from "./reducers/userReducers";

import {
  addCategoryReducer,
  listCategoriesReducer,
  fetchCategoryDetailsReducer,
  deleteCategoryReducer,
  updateCategoryReducer
} from "./reducers/categoryReducers";

import {
  addProductReducer,
  deleteProductReducer,
  fetchProductDetailsReducer,
  listProductsReducer,
  updateProductDetailsReducer,
} from "./reducers/productReducers";

import {
  saveProductToUserCartReducer,
  fetchUserCartReducer,
  deleteProductFromUserCartReducer,
} from "./reducers/cartActionsReducers";

import {
  placeOrderOfUserReducer,
  getUserOrdersHistoryReducer,
  getAllUsersOrderHistoryReducer,
  changeUserOrderStatusReducer,
} from "./reducers/orderActionsReducers";

const reducer = combineReducers({
  login: userLoginReducer,
  logout: userLogoutReducer,
  userList: userListReducer,
  userDetails: userDetailsReducer,
  userDelete: userDeleteReducer,
  userDetailsUpdate: userDetailsUpdateReducer,
  userRegister: userRegisterReducer,
  addCategory: addCategoryReducer,
  categoryList: listCategoriesReducer,
  categoryDelete: deleteCategoryReducer,
  categoryDetails: fetchCategoryDetailsReducer,
  categoryUpdate: updateCategoryReducer,
  addProduct: addProductReducer,
  productList: listProductsReducer,
  productDelete: deleteProductReducer,
  productDetails: fetchProductDetailsReducer,
  productDetailsUpdate: updateProductDetailsReducer,
  fetchUserCart: fetchUserCartReducer,
  saveProductToUserCart: saveProductToUserCartReducer,
  deleteProductFromUserCart: deleteProductFromUserCartReducer,
  placeOrderOfUser: placeOrderOfUserReducer,
  getUserOrdersHistory: getUserOrdersHistoryReducer,
  getAllUsersOrderHistory: getAllUsersOrderHistoryReducer,
  changeUserOrderStatus: changeUserOrderStatusReducer,
});

const userInfoFromSessionStorage = sessionStorage.getItem("userInfo")
  ? JSON.parse(sessionStorage.getItem("userInfo"))
  : null;

const productsFromLocalStorage = localStorage.getItem("products")
  ? JSON.parse(localStorage.getItem("products"))
  : null;

const categoriesFromLocalStorage = localStorage.getItem("categories")
  ? JSON.parse(localStorage.getItem("categories"))
  : null;

const cartFromLocalStorage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : null;

const initialState = {
  login: { userInfo: userInfoFromSessionStorage },
  productList: {},
  categories: categoriesFromLocalStorage,
  cart: cartFromLocalStorage,
};
const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
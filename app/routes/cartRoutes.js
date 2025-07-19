const express = require("express");
const { auth } = require("../middleware/authenticationHandler");
const cartRouter = express.Router();

const {
  saveToCart,
  fetchUserCart,
  deleteProductFromCart,
} = require("../services/cartService");

cartRouter.route("/").post(auth, saveToCart);
cartRouter.route("/").get(auth, fetchUserCart);
cartRouter.route("/:id").delete(auth, deleteProductFromCart);

module.exports = cartRouter;

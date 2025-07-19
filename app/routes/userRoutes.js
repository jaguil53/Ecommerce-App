const express = require("express");
const { auth, isAdmin } = require("../middleware/authenticationHandler");
const userRouter = express.Router();

const {
  addUser,
  deleteUser,
  editUser,
  getAllUsers,
  userDetails,
  login,
  logout,
} = require("../services/userService");

userRouter.route("/").post(addUser);
userRouter.route("/login").post(login);
userRouter.route("/logout").get(auth, logout);
userRouter.route("/:id").get(auth, userDetails);
userRouter.route("/:id").delete(auth, isAdmin, deleteUser);
userRouter.route("/:id").put(auth, editUser);
userRouter.route("/").get(auth, isAdmin, getAllUsers);

module.exports = userRouter
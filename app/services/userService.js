const expressAsyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const { generatingSessionToken } = require("../helpers/sessionHandling");
const userRepository = require("../database/repositories/userRepository");

const addUser = expressAsyncHandler(async (req, res) => {
  const { username, fullname, email, password, isAdmin } = req.body;

  try {
    const existingUser = await userRepository.findUserByUsername(username);
    if (existingUser) {
      res.status(400);
      throw new Error("User already exists");
    }

    const newUser = await userRepository.createUser({
      username: username,
      fullname: fullname,
      password: password,
      isAdmin: isAdmin,
      email: email,
    });

    if (newUser) {
      res.status(201).json({
        message: "User is successfully registered",
      });
    } else {
      res.status(400).json({
        message: "Unable to create user.",
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: `Error in creating user`,
      error: err.message,
    });
  }
});

const login = expressAsyncHandler(async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userRepository.findUserByUsername(username);
    console.log(user);
    if (!user) {
      res.status(400).json({
        error: "User not found",
      });
      return;
    }

    if (user.password != password) {
      res.status(401).json({
        error: "Invalid username or password",
      });
      return;
    }

    let userSessionObject = await userRepository.findActiveUserSession(
      user._id
    );
      console.log(user._id);
    if (!userSessionObject) {
      const sessionToken = generatingSessionToken(user._id);
      userSessionObject = await userRepository.createUserSession({
        userId: user._id,
        sessionToken: sessionToken,
      });
    }

    res.status(200).json({
      message: "User logged in successfully",
      data: {
        _id: user._id,
        username: user.username,
        fullname: user.fullname,
        email: user.email,
        isAdmin: user.isAdmin,
        sessionToken: userSessionObject.sessionToken,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: `Error processing login request`,
      error: err.message,
    });
  }
});

const userDetails = expressAsyncHandler(async (req, res) => {
  try {
    const userObject = await userRepository.findUserById(req.params.id);
    if (userObject) {
      res.status(200).json({
        _id: userObject._id,
        username: userObject.username,
        fullname: userObject.fullname,
        email: userObject.email,
        isAdmin: userObject.isAdmin,
      });
    } else {
      res.status(400);
      throw new Error("Unable to fetch the user details");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching user details",
      error: err.message,
    });
  }
});

const logout = expressAsyncHandler(async (req, res) => {
  try {
    const userSessionObject = await userRepository.findActiveUserSession(
      req.user._id,
      req.headers.authorization.split(" ")[1]
    );

    if (userSessionObject) {
      await userRepository.deactivateUserSession(userSessionObject);
      res.status(200).json({
        message: "User is successfully logged out.",
      });
    } else {
      res.status(400);
      throw new Error("Unable to logout the user");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      messsage: "Error processing logout request",
      error: err.message,
    });
  }
});

const editUser = expressAsyncHandler(async (req, res) => {
  try {
    const userObject = await userRepository.findUserById(req.params.id);
    if (userObject) {
      userObject.fullname = req.body.fullname || userObject.fullname;
      userObject.isAdmin = req.body.isAdmin || userObject.isAdmin;
      userObject.email = req.body.email || userObject.email;
      userObject.password = req.body.password || userObject.password;

      const updatedUser = await userRepository.updateUser(
        userObject._id,
        userObject
      );
      if (!updatedUser) throw new Error("Unable to update the user details");

      res.status(200).json({
        message: "Details are successfully updated.",
      });
    } else {
      res.status(400);
      throw new Error("Unable to update the user details");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error updating the user details",
      error: err.message,
    });
  }
});

const deleteUserHandler = expressAsyncHandler(async (req, res) => {
  try {
    const userObject = await userRepository.findUserById(req.params.id);
    if (userObject) {
      userObject.isActive = false;
      const userSessionObject = await userRepository.findActiveUserSession(
        userObject._id
      );
      if (userSessionObject) {
        await userRepository.deactivateUserSession(userSessionObject);
      }
      await userRepository.updateUser(userObject._id, userObject);

      res.status(200).json({
        message: "User deleted successfully",
      });
    } else {
      res.status(400);
      throw new Error("Unable to delete the user");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error while deleting the user",
      error: err.message,
    });
  }
});

const getAllUsers = expressAsyncHandler(async (req, res) => {
  try {
    const users = await userRepository.findActiveUsers();
    res.status(200).json({
      data: users,
      message: "Successfully fetched all Users.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching user details",
      error: err.message,
    });
  }
});

module.exports = {
  addUser,
  deleteUser: deleteUserHandler,
  editUser,
  getAllUsers,
  userDetails,
  login,
  logout,
};
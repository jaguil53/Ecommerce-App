const UserModel = require("../../models/userModel");
const UserSessionModel = require("../../models/userSessionModel");

const findUserByUsername = async (username) => {
  try {
    return await UserModel.findOne({ username: username, isActive: true });
  } catch (err) {
    throw new Error(`Error while finding user by username: ${err.message}`);
  }
};

const createUser = async (userData) => {
  try {
    return await UserModel.create(userData);
  } catch (err) {
    throw new Error(`Error while creating user: ${err.message}`);
  }
};

const findUserById = async (id) => {
  try {
    return await UserModel.findOne({ _id: id, isActive: true });
  } catch (err) {
    throw new Error(`Error while finding user by ID: ${err.message}`);
  }
};

const updateUser = async (id, updateData) => {
  try {
    return await UserModel.findByIdAndUpdate(id, updateData, { new: true });
  } catch (err) {
    throw new Error(`Error while updating user: ${err.message}`);
  }
};

const deleteUser = async (id) => {
  try {
    return await UserModel.findByIdAndUpdate(id, { isActive: false });
  } catch (err) {
    throw new Error(`Error while deleting user: ${err.message}`);
  }
};

const findActiveUsers = async () => {
  try {
    return await UserModel.find({ isActive: true });
  } catch (err) {
    throw new Error(`Error while finding active users: ${err.message}`);
  }
};

const findActiveUserSession = async (userId, sessionToken) => {
  try {
    return await UserSessionModel.findOne({
      userId: userId,
      isActive: true,
      sessionToken: sessionToken,
    });
  } catch (err) {
    throw new Error(`Error while finding active user session: ${err.message}`);
  }
};

const createUserSession = async (sessionData) => {
  try {
    console.log(sessionData);
    return await UserSessionModel.create(sessionData);
  } catch (err) {
    throw new Error(`Error while creating user session: ${err.message}`);
  }
};

const deactivateUserSession = async (userSessionObject) => {
  try {
    userSessionObject.isActive = false;
    return await userSessionObject.save();
  } catch (err) {
    throw new Error(`Error while deactivating user session: ${err.message}`);
  }
};


module.exports = {
  findUserByUsername,
  createUser,
  findUserById,
  updateUser,
  deleteUser,
  findActiveUsers,
  findActiveUserSession,
  createUserSession,
  deactivateUserSession,
};
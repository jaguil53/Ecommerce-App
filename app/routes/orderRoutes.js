const express = require("express");
const { auth, isAdmin } = require("../middleware/authenticationHandler");
const orderRouter = express.Router();

const {
    createOrder,
    orderHistoryOfAllUsers,
    orderHistoryOfUser,
    changeOrderStatus
} = require("../services/orderService");

orderRouter.route("/").post(auth, createOrder);
orderRouter.route("/user/:userId").get(auth, orderHistoryOfUser);
orderRouter.route("/").get(auth, isAdmin, orderHistoryOfAllUsers);
orderRouter.route("/:orderId").put(auth, isAdmin, changeOrderStatus);

module.exports = orderRouter;

const orderRepository = require("..//database/repositories/orderRepository");
const expressAsyncHandler = require("express-async-handler");

const createOrder = expressAsyncHandler(async (req, res) => {
  try {
    const result = await orderRepository.createOrder(req.user._id, req.body);

    if (result) {
      res.status(200).json({
        message: "Order is successfully placed",
      });
    } else {
      res.status(400);
      throw new Error("Not able to create order");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error creating order for the user",
      error: err.message,
    });
  }
});

const orderHistoryOfUser = expressAsyncHandler(async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await orderRepository.orderHistoryOfUser(userId);

    if (result) {
      res.status(200).json({
        data: result,
      });
    } else {
      res.status(204);
      throw new Error("OrderHistory not found for the user");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching order history for the user",
      error: err.message,
    });
  }
});

const orderHistoryOfAllUsers = expressAsyncHandler(async (req, res) => {
  try {
    const result = await orderRepository.orderHistoryOfAllUsers();

    res.status(200).json({
      orders: result,
      message: "Sucessfully fetched orders of all the users.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching order history",
      error: err.message,
    });
  }
});

const changeOrderStatus = expressAsyncHandler(async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const result = await orderRepository.changeOrderStatus(
      orderId,
      req.body.newStatus
    );

    if (result) {
      res.status(200).json({
        message: "Order status is changed successfully.",
      });
    } else {
      res.status(204);
      throw new Error(`No order with the given order id`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = {
  createOrder,
  orderHistoryOfAllUsers,
  orderHistoryOfUser,
  changeOrderStatus,
};

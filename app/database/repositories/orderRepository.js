const OrderModel = require("../../models/orderModel");
const CartModel = require("../../models/cartModel");

const createOrder = async (userId, orderData) => {
  try {
    const userCart = await CartModel.findOne({
      userId: userId,
      isActive: true,
    });
    
    if (userCart) {
      const orderDetailsOfUser = await OrderModel.create({
        userId: userCart.userId,
        status: "PROCESSING",
        orderTotalPrice: userCart.orderTotalPrice,
        products: userCart.products,
        shippingDetails: orderData.shippingDetails,
      });

      if (orderDetailsOfUser) {
        await CartModel.findOneAndRemove({
          _id: userCart._id,
        });
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (err) {
    throw new Error(`Error while creating order: ${err.message}`);
  }
};

const orderHistoryOfUser = async (userId) => {
  try {
    const ordersOfUser = await OrderModel.find({
      userId: userId,
      isActive: true,
    });
    return ordersOfUser;
  } catch (err) {
    throw new Error(`Error while fetching order history of user: ${err.message}`);
  }
};

const orderHistoryOfAllUsers = async () => {
  try {
    const orders = await OrderModel.find({
      isActive: true,
    });
    return orders;
  } catch (err) {
    throw new Error(`Error while fetching order history of all users: ${err.message}`);
  }
};

const changeOrderStatus = async (orderId, newStatus) => {
  try {
    const orderDetails = await OrderModel.findOne({
      _id: orderId,
      isActive: true,
    });

    if (!orderDetails) {
      return false;
    }

    orderDetails.status = newStatus;
    await orderDetails.save();
    return true;
  } catch (err) {
    throw new Error(`Error while changing order status: ${err.message}`);
  }
};


module.exports = {
  createOrder,
  orderHistoryOfUser,
  orderHistoryOfAllUsers,
  changeOrderStatus,
};

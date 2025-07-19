const cartRepository = require("..//database/repositories/cartRepository");
const expressAsyncHandler = require("express-async-handler");

const saveToCart = expressAsyncHandler(async (req, res) => {
  try {
    const result = await cartRepository.saveToCart(req.user._id, req.body);

    if (result) {
      res.status(200).json({
        message: "Product is successfully saved in cart",
      });
    } else {
      res.status(400);
      throw new Error("Error saving the product in the cart");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error saving the product in the cart",
      error: err.message,
    });
  }
});

const fetchUserCart = expressAsyncHandler(async (req, res) => {
  try {
    const userCart = await cartRepository.fetchUserCart(req.user._id);

    if (userCart) {
      res.status(200).json({
        data: userCart,
        message: "Successfully fetched User Cart.",
      });
    } else {
      res.status(200).json({
        data: {},
        message: "Successfully fetched User Cart.",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching user cart details",
      error: err.message,
    });
  }
});

const deleteProductFromCart = expressAsyncHandler(async (req, res) => {
  try {
    const productId = req.params.id;
    const result = await cartRepository.deleteProductFromCart(
      req.user._id,
      productId
    );

    if (result) {
      res.status(200).json({
        message: "Product is successfully deleted from cart",
      });
    } else {
      res.status(204);
      throw new Error("Product doesnot exist in the cart.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error deleting product from the cart",
      error: err.message,
    });
  }
});

module.exports = {
  saveToCart,
  fetchUserCart,
  deleteProductFromCart,
};

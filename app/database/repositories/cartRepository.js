const CartModel = require("../../models/cartModel");
const ProductModel = require("../../models/productModel");

const saveToCart = async (userId, cartData) => {
  try {
    const { productId, productPrice, quantity } = cartData.products;
    console.log(cartData);
    console.log(userId);
    const userCart = await CartModel.findOne({
      userId: userId,
      isActive: true,
    });

    console.log(userCart);
    console.log(productId);

    const productObject = await ProductModel.findOne({
      _id: productId,
      isActive: true,
    });

    console.log(productObject);

    if (!productObject) {
      throw new Error("Product does not exists"); // Product doesn't exist
    }

    if (productObject.quantityInStock < quantity) {
      throw new Error("Insufficient Inventory"); // Insufficient quantity
    }

    productObject.quantityInStock -= quantity;

    await productObject.save();

    let productsInCart = {};

    if (userCart) {
      productsInCart = userCart.products;
      if (productId in productsInCart) {
        productsInCart[productId].units += parseInt(quantity);
      } else {
        productsInCart[productId] = {
          _id: productId,
          price: productPrice,
          units: quantity,
          name: productObject.name,
          image: productObject.image,
        };
      }
    } else {
      productsInCart[productId] = {
        _id: productId,
        price: productPrice,
        units: quantity,
        name: productObject.name,
        image: productObject.image,
      };
    }

    const newOrderTotalPrice = userCart
      ? userCart.orderTotalPrice + quantity * productPrice
      : quantity * productPrice;

    const newUserCart = await CartModel.create({
      userId: userId,
      products: productsInCart,
      orderTotalPrice: newOrderTotalPrice,
    });

    if (userCart) {
      await CartModel.findOneAndRemove({
        _id: userCart._id,
      });
    }

    return newUserCart ? true : false;
  } catch (err) {
    throw new Error(`Error while saving to cart: ${err.message}`);
  }
};

const fetchUserCart = async (userId) => {
  try {
    const userCart = await CartModel.findOne({
      userId: userId,
      isActive: true,
    });

    return userCart ? userCart : null;
  } catch (err) {
    throw new Error(`Error while fetching user cart: ${err.message}`);
  }
};

const deleteProductFromCart = async (userId, productId) => {
  try {
    const userCart = await CartModel.findOne({
      userId: userId,
      isActive: true,
    });

    if (!userCart) {
      return false; // No cart exists for the user
    }

    const deletedProduct = userCart.products[productId];

    if (!deletedProduct) {
      return false; // Product not found in the cart
    }

    const deletedProductPrice = deletedProduct.units * deletedProduct.price;

    delete userCart.products[productId];

    const newOrderTotalPrice = userCart.orderTotalPrice - deletedProductPrice;

    let newUserCart = null;

    if (Object.keys(userCart.products).length > 0) {
      newUserCart = await CartModel.create({
        userId: userId,
        products: userCart.products,
        orderTotalPrice: newOrderTotalPrice,
      });
    }

    await CartModel.findOneAndRemove({
      _id: userCart._id,
    });

    return newUserCart ? true : false;
  } catch (err) {
    throw new Error(`Error while deleting product from cart: ${err.message}`);
  }
};

module.exports = {
  saveToCart,
  fetchUserCart,
  deleteProductFromCart,
};

const mongoose = require('mongoose');
const ProductModel = require("../../models/productModel");

const createProduct = async (
  name,
  description,
  price,
  quantityInStock,
  image,
  categoryId
) => {
  try {
    console.log(categoryId, image);
    const newProduct = await ProductModel.create({
      _id:new mongoose.Types.ObjectId(),
      name: name,
      description: description,
      price: price,
      quantityInStock: quantityInStock,
      image: image,
      categoryId: categoryId,
    });
    return newProduct;
  } catch (err) {
    throw new Error(`Error while creating product: ${err.message}`);
  }
};

const editProduct = async (productId, newData) => {
  try {
    const productObject = await ProductModel.findOne({
      _id: productId,
      isActive: true,
    });

    if (!productObject) {
      return null;
    }

    Object.assign(productObject, newData);
    const updatedProduct = await productObject.save();
    return updatedProduct;
  } catch (err) {
    throw new Error(`Error while editing product: ${err.message}`);
  }
};

const deleteProduct = async (productId) => {
  try {
    const productObject = await ProductModel.findOne({
      _id: productId,
      isActive: true,
    });

    if (!productObject) {
      return null;
    }

    productObject.isActive = false;
    const updatedProduct = await productObject.save();
    return updatedProduct;
  } catch (err) {
    throw new Error(`Error while deleting product: ${err.message}`);
  }
};

const getProduct = async (productId) => {
  try {
    const productObject = await ProductModel.findOne({
      _id: productId,
      isActive: true,
    });

    return productObject;
  } catch (err) {
    throw new Error(`Error while fetching product: ${err.message}`);
  }
};

const getAllProducts = async () => {
  try {
    const products = await ProductModel.find({ isActive: true });
    return products;
  } catch (err) {
    throw new Error(`Error while fetching products: ${err.message}`);
  }
};


module.exports = {
  createProduct,
  editProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
};

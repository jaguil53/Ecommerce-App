const productRepository = require("..//database/repositories/productRepository");
const expressAsyncHandler = require("express-async-handler");

const createProduct = expressAsyncHandler(async (req, res) => {
  try {
    const { name, description, price, quantityInStock, image, categoryId } =
      req.body;
      console.log(image);
    const result = await productRepository.createProduct(
      name,
      description,
      price,
      quantityInStock,
      image,
      categoryId
    );

    if (result) {
      res.status(201).json({
        message: "Product created successfully",
      });
    } else {
      res.status(400);
      throw new Error("Product creation failed");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error creating product using provided details.",
      error: err.message,
    });
  }
});

const editProduct = expressAsyncHandler(async (req, res) => {
  try {
    const productId = req.params.id;
    const result = await productRepository.editProduct(productId, req.body);

    if (result) {
      res.status(200).json({
        message: "Product is successfully edited",
      });
    } else {
      res.status(400);
      throw new Error("Product editing failed");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error editing product details.",
      error: err.message,
    });
  }
});

const deleteProduct = expressAsyncHandler(async (req, res) => {
  try {
    const productId = req.params.id;
    const result = await productRepository.deleteProduct(productId);

    if (result) {
      res.status(200).json({
        message: "Product is successfully deleted",
      });
    } else {
      res.status(400);
      throw new Error("Product deletion failed");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error deleting product from the database",
      error: err.message,
    });
  }
});

const getProduct = expressAsyncHandler(async (req, res) => {
  try {
    const productId = req.params.id;
    const result = await productRepository.getProduct(productId);

    if (result) {
      res.status(200).json({
        data: result,
        message: "Successfully fetched product details.",
      });
    } else {
      res.status(204);
      throw new Error(
        `Not able to find the product based on the product id : ${productId}`
      );
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching product details.",
      error: err.message,
    });
  }
});

const getAllProducts = expressAsyncHandler(async (req, res) => {
  try {
    const result = await productRepository.getAllProducts();
    console.log(result);
    res.status(200).json({
      data: result,
      message: "Sucessfully fetched all products",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching all products details.",
      error: err.message,
    });
  }
});

module.exports = {
  createProduct,
  editProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
};

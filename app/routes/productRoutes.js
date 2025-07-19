const express = require("express");
const { auth, isAdmin } = require("../middleware/authenticationHandler");
const productRouter = express.Router();

const {
  createProduct,
  editProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
} = require("../services/productService");

productRouter.route("/").post(auth, isAdmin, createProduct);
productRouter.route("/:id").put(auth, isAdmin, editProduct);
productRouter.route("/:id").delete(auth, isAdmin, deleteProduct);
productRouter.route("/:id").get(getProduct);
productRouter.route("/").get(getAllProducts);

module.exports = productRouter;

const categoryRepository = require("..//database/repositories/categoryRepository");
const expressAsyncHandler = require("express-async-handler");

const createCategory = expressAsyncHandler(async (req, res) => {
  try {
    const { name, description } = req.body;
    const result = await categoryRepository.createCategory(name, description);

    if (result) {
      res.status(201).json({
        message: "Category created successfully",
      });
    } else {
      res.status(400);
      throw new Error(`Category creation failed`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error creating category",
      error: err.message,
    });
  }
});

const editCategory = expressAsyncHandler(async (req, res) => {
  try {
    const categoryId = req.params.id;
    const result = await categoryRepository.editCategory(categoryId, req.body);

    if (result) {
      res.status(200).json({
        message: "Category is successfully edited",
      });
    } else {
      res.status(400);
      throw new Error(`Category editing failed`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error editing category details",
      error: err.message,
    });
  }
});

const deleteCategory = expressAsyncHandler(async (req, res) => {
  try {
    const categoryId = req.params.id;
    const result = await categoryRepository.deleteCategory(categoryId);

    if (result) {
      res.status(200).json({
        message: "Category is successfully deleted",
      });
    } else {
      res.status(400);
      throw new Error(`Category deletion failed`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error deleting category",
      error: err.message,
    });
  }
});

const getCategory = expressAsyncHandler(async (req, res) => {
  try {
    const categoryId = req.params.id;
    const result = await categoryRepository.getCategory(categoryId);

    if (result) {
      res.status(200).json({
        data: result,
        message: "Sucessfully fetched category details.",
      });
    } else {
      res.status(204);
      throw new Error(
        `Not able to find the category based on the category id: ${categoryId}`
      );
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching category details",
      error: err.message,
    });
  }
});

const getAllCategories = expressAsyncHandler(async (req, res) => {
  try {
    const result = await categoryRepository.getAllCategories();
    res.status(200).json({
      data: result,
      message: "Successfully fetched all categories.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching categories",
      error: err.message,
    });
  }
});

module.exports = {
  createCategory,
  editCategory,
  deleteCategory,
  getCategory,
  getAllCategories,
};

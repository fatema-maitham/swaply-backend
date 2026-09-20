const Category = require('../models/category');

// GET /categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({
      name: 1,
    });

    res.status(200).json({
      categories,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: 'Something went wrong',
    });
  }
};

// POST /categories
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        err: 'Category name is required',
      });
    }

    const existingCategory = await Category.findOne({
      name: name.trim(),
    });

    if (existingCategory) {
      return res.status(409).json({
        err: 'Category already exists',
      });
    }

    const category = await Category.create({
      name: name.trim(),
    });

    res.status(201).json({
      category,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: 'Something went wrong',
    });
  }
};

// PATCH /categories/:categoryId
const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        err: 'Category name is required',
      });
    }

    const category = await Category.findById(
      req.params.categoryId
    );

    if (!category) {
      return res.status(404).json({
        err: 'Category not found',
      });
    }

    const existingCategory = await Category.findOne({
      name: name.trim(),
      _id: { $ne: category._id },
    });

    if (existingCategory) {
      return res.status(409).json({
        err: 'Category already exists',
      });
    }

    category.name = name.trim();

    await category.save();

    res.status(200).json({
      category,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: 'Something went wrong',
    });
  }
};

// DELETE /categories/:categoryId
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(
      req.params.categoryId
    );

    if (!category) {
      return res.status(404).json({
        err: 'Category not found',
      });
    }

    await Category.findByIdAndDelete(
      req.params.categoryId
    );

    res.status(200).json({
      message: 'Category deleted successfully',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: 'Something went wrong',
    });
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
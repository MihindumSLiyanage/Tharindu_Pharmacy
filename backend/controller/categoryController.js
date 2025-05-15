const Category = require("../models/Category");

// Add a new category
const addCategory = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(201).send({ message: "Category Added Successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Get all categories with status 'Show'
const getShowingCategory = async (req, res) => {
  try {
    const categories = await Category.find({ status: "show" }).sort({
      _id: -1,
    });
    res.send(categories);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Get all categories
const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ _id: -1 });
    res.send(categories);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Get category by id
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).send({ message: "Category not found" });
    }
    res.send(category);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Update a category
const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).send({ message: "Category not found" });
    }
    category.name = req.body.name || category.name;
    category.products =
      req.body.products !== undefined ? req.body.products : category.products;
    category.icon = req.body.icon || category.icon;
    category.children = req.body.children || category.children;
    category.description = req.body.description || category.description;
    category.status = req.body.status || category.status;
    await category.save();
    res.send({ message: "Category Updated Successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Update Category status only
const updateStatus = async (req, res) => {
  try {
    const updated = await Category.updateOne(
      { _id: req.params.id },
      { status: req.body.status }
    );
    if (updated.matchedCount === 0) {
      return res.status(404).send({ message: "Category not found" });
    }
    res.send({ message: `Category ${req.body.status} Successfully!` });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Delete category
const deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.deleteOne({ _id: req.params.id });
    if (deleted.deletedCount === 0) {
      return res.status(404).send({ message: "Category not found to delete!" });
    }
    res.status(200).send({ message: "Category Deleted Successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  addCategory,
  getAllCategory,
  getShowingCategory,
  getCategoryById,
  updateCategory,
  updateStatus,
  deleteCategory,
};

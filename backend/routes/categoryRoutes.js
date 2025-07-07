const express = require("express");
const router = express.Router();
const {
  addCategory,
  getAllCategory,
  getShowingCategory,
  getCategoryById,
  updateCategory,
  updateStatus,
  deleteCategory,
} = require("../controller/categoryController");
const { isAuth, isAdmin } = require("../config/auth");

//add a category
router.post("/add", isAuth, isAdmin, addCategory);

//get only showing category
router.get("/show", getShowingCategory);

//get all category
router.get("/", getAllCategory);

//get a category
router.get("/:id", getCategoryById);

//update a category
router.put("/:id", isAuth, isAdmin, updateCategory);

//show/hide a category
router.put("/status/:id", isAuth, isAdmin, updateStatus);

//delete a category
router.delete("/:id", isAuth, isAdmin, deleteCategory);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  loginAdmin,
  forgotPassword,
  resetPassword,
  addStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
  approveOrRejectOrder,
} = require("../controller/adminController");
const { isAuth, isAdmin } = require("../config/auth");

//login a admin
router.post("/login", loginAdmin);

//forgot-password
router.put("/forgot-password", forgotPassword);

//reset-password
router.put("/reset-password", resetPassword);

//add a staff
router.post("/add", isAuth, isAdmin, addStaff);

//get all staff
router.get("/", getAllStaff);

//get a staff
router.get("/:id", getStaffById);

//update a staff
router.put("/:id", isAuth, isAdmin, updateStaff);

//delete a staff
router.delete("/:id", isAuth, isAdmin, deleteStaff);

//approve or reject Order
router.put("/order/:id/review", approveOrRejectOrder);

module.exports = router;

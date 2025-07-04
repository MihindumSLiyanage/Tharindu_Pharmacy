const express = require("express");
const router = express.Router();
const {
  registerAdmin,
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

//register a staff
router.post("/register", registerAdmin);

//login a admin
router.post("/login", loginAdmin);

//forgot-password
router.put("/forgot-password", forgotPassword);

//reset-password
router.put("/reset-password", resetPassword);

//add a staff
router.post("/add", addStaff);

//get all staff
router.get("/", getAllStaff);

//get a staff
router.get("/:id", getStaffById);

//update a staff
router.put("/:id", updateStaff);

//delete a staff
router.delete("/:id", deleteStaff);

router.put("/order/:id/review", approveOrRejectOrder);

module.exports = router;

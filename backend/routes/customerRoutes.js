const express = require("express");
const router = express.Router();
const {
  loginCustomer,
  registerCustomer,
  verifyEmailAddress,
  forgotPassword,
  changePassword,
  resetPassword,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} = require("../controller/customerController");

//verify email
router.post("/verify-email", verifyEmailAddress);

//register a Customer
router.post("/register/:token", registerCustomer);

//login a Customer
router.post("/login", loginCustomer);

//forgot-password
router.put("/forgot-password", forgotPassword);

//reset-password
router.put("/reset-password", resetPassword);

//change password
router.post("/change-password", changePassword);

//get all Customer
router.get("/", getAllCustomers);

//get a Customer
router.get("/:id", getCustomerById);

//update a Customer
router.put("/:id", updateCustomer);

//delete a Customer
router.delete("/:id", deleteCustomer);

module.exports = router;

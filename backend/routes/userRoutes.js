const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser,
  verifyEmailAddress,
  forgotPassword,
  changePassword,
  resetPassword,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controller/userController");

//verify email
router.post("/verify-email", verifyEmailAddress);

//register a user
router.post("/register", registerUser);

//login a user
router.post("/login", loginUser);

//forgot-password
router.put("/forgot-password", forgotPassword);

//reset-password
router.put("/reset-password", resetPassword);

//change password
router.post("/change-password", changePassword);

//get all user
router.get("/", getAllUsers);

//get a user
router.get("/:id", getUserById);

//update a user
router.put("/:id", updateUser);

//delete a user
router.delete("/:id", deleteUser);

module.exports = router;

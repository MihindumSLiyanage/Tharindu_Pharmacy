const express = require("express");
const router = express.Router();
const {
  addOrder,
  getOrderById,
  getOrderByUser,
  createPaymentIntent,
  getUserPrescriptions,
} = require("../controller/userOrderController");

// Add an order
router.post("/add", addOrder);

// create stripe payment intent
router.post("/create-payment-intent", createPaymentIntent);

// Get all prescriptions for the logged-in user
router.get("/prescriptions", getUserPrescriptions);

// Get a specific order by ID
router.get("/:id", getOrderById);

// Get all orders for the logged-in user
router.get("/", getOrderByUser);

module.exports = router;

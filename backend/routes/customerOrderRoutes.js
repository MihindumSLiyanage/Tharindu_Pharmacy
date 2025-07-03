const express = require("express");
const router = express.Router();
const {
  addOrder,
  getOrderById,
  getOrderByCustomer,
  createPaymentIntent,
  getCustomerPrescriptions,
} = require("../controller/customerOrderController");

// Add an order
router.post("/add", addOrder);

// create stripe payment intent
router.post("/create-payment-intent", createPaymentIntent);

// Get all prescriptions for the logged-in Customer
router.get("/prescriptions", getCustomerPrescriptions);

// Get a specific order by ID
router.get("/:id", getOrderById);

// Get all orders for the logged-in Customer
router.get("/", getOrderByCustomer);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  addSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
  getSupplierProducts,
} = require("../controller/supplierController");

// Add a supplier
router.post("/add", addSupplier);

// Get all suppliers
router.get("/", getAllSuppliers);

// Get a supplier by ID
router.get("/:id", getSupplierById);

// Update a supplier
router.put("/:id", updateSupplier);

// Delete a supplier
router.delete("/:id", deleteSupplier);

// Get products supplied by a supplier
router.get("/:id/products", getSupplierProducts);

module.exports = router;

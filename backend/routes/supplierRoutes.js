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
const { isAuth, isAdmin } = require("../config/auth");

// Add a supplier
router.post("/add", isAuth, isAdmin, addSupplier);

// Get all suppliers
router.get("/", getAllSuppliers);

// Get a supplier by ID
router.get("/:id", getSupplierById);

// Update a supplier
router.put("/:id", isAuth, isAdmin, updateSupplier);

// Delete a supplier
router.delete("/:id", isAuth, isAdmin, deleteSupplier);

// Get products supplied by a supplier
router.get("/:id/products", getSupplierProducts);

module.exports = router;

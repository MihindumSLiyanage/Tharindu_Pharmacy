const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getShowingProducts,
  getProductById,
  getProductBySlug,
  addProduct,
  updateProduct,
  updateStatus,
  deleteProduct,
  getShowingStoreProducts,
} = require("../controller/productController");
const { isAuth, isAdmin } = require("../config/auth");

//add a product
router.post("/add", isAuth, isAdmin, addProduct);

//get a product
router.post("/:id", getProductById);

//get showing products only
router.get("/show", getShowingProducts);

//get showing products in store
router.get("/store", getShowingStoreProducts);

//get all products
router.get("/", getAllProducts);

//get a product by slug
router.get("/product/:slug", getProductBySlug);

//update a product
router.put("/:id", isAuth, isAdmin, updateProduct);

//update a product status
router.put("/status/:id", isAuth, isAdmin, updateStatus);

//delete a product
router.delete("/:id", isAuth, isAdmin, deleteProduct);

module.exports = router;

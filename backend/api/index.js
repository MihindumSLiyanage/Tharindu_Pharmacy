require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");

// Database Connection
const connectDataBase = require("../config/db");

// Middleware & Auth
const { isAuth } = require("../config/auth");

// Route Imports
const adminRoutes = require("../routes/adminRoutes");
const categoryRoutes = require("../routes/categoryRoutes");
const couponRoutes = require("../routes/couponRoutes");
const languageRoutes = require("../routes/languageRoutes");
const orderRoutes = require("../routes/orderRoutes");
const productRoutes = require("../routes/productRoutes");
const supplierRoutes = require("../routes/supplierRoutes");
const customerRoutes = require("../routes/customerRoutes");
const customerOrderRoutes = require("../routes/customerOrderRoutes");

// Initialize App
const app = express();
connectDataBase();

// Middleware Setup
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Root Route
app.get("/", (req, res) => {
  res.send("App is running properly!");
});

// API Routes For Customers
app.use("/api/category", categoryRoutes);
app.use("/api/coupon", couponRoutes);
app.use("/api/languages", languageRoutes);
app.use("/api/order", isAuth, customerOrderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/supplier", supplierRoutes);
app.use("/api/customer", customerRoutes);

// API Routes For Admin
app.use("/api/admin", adminRoutes);
app.use("/api/orders", orderRoutes);

// Error Handling
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  res.status(400).json({ message: err.message });
});

// Start Server
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

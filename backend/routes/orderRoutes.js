const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  getOrderById,
  getOrderCustomer,
  updateOrder,
  deleteOrder,
  getBestSellerProductChart,
  getDashboardOrders,
  getDashboardRecentOrder,
  getDashboardCount,
  getDashboardAmount,
  getSalesReport,
} = require("../controller/orderController");
const { isAuth, isAdmin } = require("../config/auth");

//get all orders
router.get("/", getAllOrders);

// get dashboard orders data
router.get("/dashboard", getDashboardOrders);

// dashboard recent-order
router.get("/dashboard-recent-order", getDashboardRecentOrder);

// dashboard order count
router.get("/dashboard-count", getDashboardCount);

// dashboard order amount
router.get("/dashboard-amount", getDashboardAmount);

// chart data for product
router.get("/best-seller/chart", getBestSellerProductChart);

//get all order by a user
router.get("/customer/:id", getOrderCustomer);

//get sales report
router.get("/sales-report", isAuth, isAdmin, getSalesReport);

//get a order by id
router.get("/:id", getOrderById);

//update a order
router.put("/:id", isAuth, isAdmin, updateOrder);

//delete a order
router.delete("/:id", isAuth, isAdmin, deleteOrder);

module.exports = router;

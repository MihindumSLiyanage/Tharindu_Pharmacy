const express = require("express");
const router = express.Router();
const {
  addCoupon,
  getAllCoupons,
  getCouponById,
  updateCoupon,
  updateStatus,
  deleteCoupon,
} = require("../controller/couponController");

//add a coupon
router.post("/add", addCoupon);

//get all coupon
router.get("/", getAllCoupons);

//get a coupon
router.get("/:id", getCouponById);

//update a coupon
router.put("/:id", updateCoupon);

//show/hide a coupon
router.put("/status/:id", updateStatus);

//delete a coupon
router.delete("/:id", deleteCoupon);

module.exports = router;

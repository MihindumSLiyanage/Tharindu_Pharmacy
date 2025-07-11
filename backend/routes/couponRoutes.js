const express = require("express");
const router = express.Router();
const {
  addCoupon,
  getAllCoupons,
  getShowingCoupons,
  getCouponById,
  updateCoupon,
  updateStatus,
  deleteCoupon,
} = require("../controller/couponController");
const { isAuth, isAdmin } = require("../config/auth");

//add a coupon
router.post("/add", isAuth, isAdmin, addCoupon);

//get all coupon
router.get("/", getAllCoupons);

//get only enable coupon
router.get("/show", getShowingCoupons);

//get a coupon
router.get("/:id", getCouponById);

//update a coupon
router.put("/:id", isAuth, isAdmin, updateCoupon);

//show/hide a coupon
router.put("/status/:id", isAuth, isAdmin, updateStatus);

//delete a coupon
router.delete("/:id", isAuth, isAdmin, deleteCoupon);

module.exports = router;

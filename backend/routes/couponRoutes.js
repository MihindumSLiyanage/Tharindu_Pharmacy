const express = require('express');
const router = express.Router();
const {
    addCoupon,
    addAllCoupon,
    getAllCoupons,
    getCouponById,
    updateCoupon,
    deleteCoupon,
} = require('../controller/couponController');

//add a coupon
router.post('/add', addCoupon);

//add multiple coupon
router.post('/all', addAllCoupon);

//get all coupon
router.get('/', getAllCoupons);

//get a coupon
router.get('/:id', getCouponById);

//update a coupon
router.put('/:id', updateCoupon);

//delete a coupon
router.delete('/:id', deleteCoupon);

module.exports = router;

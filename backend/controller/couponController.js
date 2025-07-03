const Coupon = require("../models/Coupon");
const dayjs = require("dayjs");

// Add a new coupon
const addCoupon = async (req, res) => {
  try {
    const newCoupon = new Coupon(req.body);
    await newCoupon.save();
    res.status(201).send({ message: "Coupon Added Successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Get all coupons
const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({}).sort({ _id: -1 });
    res.send(coupons);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Get coupon by ID
const getCouponById = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
      return res.status(404).send({ message: "Coupon not found" });
    }
    res.send(coupon);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Update a coupon
const updateCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
      return res.status(404).send({ message: "Coupon not found" });
    }

    coupon.title = req.body.title ?? coupon.title;
    coupon.couponCode = req.body.couponCode ?? coupon.couponCode;
    coupon.logo = req.body.logo ?? coupon.logo;
    coupon.startTime = req.body.startTime
      ? dayjs(req.body.startTime).toDate()
      : coupon.startTime;
    coupon.endTime = req.body.endTime
      ? dayjs(req.body.endTime).toDate()
      : coupon.endTime;
    coupon.minimumAmount = req.body.minimumAmount ?? coupon.minimumAmount;
    coupon.productType = req.body.productType ?? coupon.productType;
    coupon.status = req.body.status ?? coupon.status;

    if (req.body.discount) {
      const { type, value } = req.body.discount;
      if (type && value !== undefined) {
        coupon.discount = { type, value };
      }
    }

    await coupon.save();
    res.send({ message: "Coupon Updated Successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Update status
const updateStatus = async (req, res) => {
  try {
    const newStatus = req.body.status;

    await Coupon.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: newStatus,
        },
      }
    );
    res.status(200).send({
      message: `Coupon ${
        newStatus === "show" ? "Published" : "Un-Published"
      } Successfully!`,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// Delete coupon
const deleteCoupon = async (req, res) => {
  try {
    const deleted = await Coupon.deleteOne({ _id: req.params.id });
    if (deleted.deletedCount === 0) {
      return res.status(404).send({ message: "Coupon not found to delete!" });
    }
    res.status(200).send({ message: "Coupon Deleted Successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  addCoupon,
  getAllCoupons,
  updateStatus,
  getCouponById,
  updateCoupon,
  deleteCoupon,
};

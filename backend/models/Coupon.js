const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    couponCode: {
      type: String,
      required: true,
      unique: true,
    },
    logo: {
      type: String,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    discount: {
      type: {
        type: String,
        enum: ["fixed", "percentage"],
        required: true,
      },
      value: {
        type: Number,
        required: true,
      },
    },
    minimumAmount: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    productType: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      lowercase: true,
      enum: ["show", "hide"],
      default: "show",
    },
  },
  {
    timestamps: true,
  }
);

const Coupon = mongoose.models.Coupon || mongoose.model("Coupon", couponSchema);

module.exports = Coupon;

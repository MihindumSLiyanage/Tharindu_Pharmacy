const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    prices: {
      originalPrice: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      discount: {
        type: Number,
        required: false,
      },
    },
    quantity: {
      type: Number,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    tag: [String],
    status: {
      type: String,
      enum: ["show", "hide"],
      default: "show",
    },
    requiresPrescription: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

module.exports = Product;

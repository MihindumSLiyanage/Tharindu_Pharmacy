const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    children: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      enum: ["show", "hide"],
      default: "show",
    },
    products: {
      type: Number,
      required: true,
      default: 0,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

module.exports = Category;

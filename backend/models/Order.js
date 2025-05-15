const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    invoice: {
      type: Number,
      required: false,
    },
    cart: [{}],
    user_info: {
      name: String,
      email: String,
      contact: String,
      address: String,
      city: String,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    shippingCost: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    cardInfo: {
      type: Object,
      required: false,
    },

    prescriptions: [
      {
        type: String,
        required: false,
      },
    ],

    status: {
      type: String,
      enum: ["Pending", "Processing", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Order =
  mongoose.models.Order ||
  mongoose.model(
    "Order",
    orderSchema.plugin(AutoIncrement, {
      inc_field: "invoice",
      start_seq: 10000,
    })
  );

module.exports = Order;

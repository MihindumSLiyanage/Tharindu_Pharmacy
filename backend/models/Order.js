const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    invoice: {
      type: Number,
      required: false,
    },
    cart: [{}],
    customer_info: {
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
      enum: [
        "Pending",
        "Approved",
        "Rejected",
        "Processing",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.plugin(AutoIncrement, {
  inc_field: "invoice",
  start_seq: 10000,
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

module.exports = Order;

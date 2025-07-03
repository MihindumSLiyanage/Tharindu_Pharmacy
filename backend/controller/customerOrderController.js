const mongoose = require("mongoose");
const Order = require("../models/Order");
const stripe = require("stripe")(`${process.env.STRIPE_KEY}`);
const { handleProductQuantity } = require("../config/others");
const { formatAmountForStripe } = require("../config/stripe");

const addOrder = async (req, res) => {
  try {
    const orderData = {
      ...req.body,
      customer: req.body.customer,
    };

    orderData.prescriptions = req.body.prescriptions;

    const newOrder = new Order(orderData);
    const order = await newOrder.save();

    await handleProductQuantity(order.cart);

    res.status(201).send({ order });
  } catch (err) {
    console.error("Order creation failed:", err);
    res
      .status(500)
      .send({ message: "Failed to create order. Please try again." });
  }
};

//create payment intent for stripe
const createPaymentIntent = async (req, res) => {
  const { total: amount, cardInfo: payment_intent } = req.body;
  if (!(amount >= process.env.MIN_AMOUNT && amount <= process.env.MAX_AMOUNT)) {
    return res.status(500).json({ message: "Invalid amount." });
  }
  if (payment_intent.id) {
    try {
      const current_intent = await stripe.paymentIntents.retrieve(
        payment_intent.id
      );
      if (current_intent) {
        const updated_intent = await stripe.paymentIntents.update(
          payment_intent.id,
          {
            amount: formatAmountForStripe(amount, process.env.CURRENCY),
          }
        );
        return res.send(updated_intent);
      }
    } catch (err) {
      if (err.code !== "resource_missing") {
        const errorMessage =
          err instanceof Error ? err.message : "Internal server error";
        return res.status(500).send({ message: errorMessage });
      }
    }
  }
  try {
    const params = {
      amount: formatAmountForStripe(amount, process.env.CURRENCY),
      currency: process.env.CURRENCY,
      description: process.env.STRIPE_PAYMENT_DESCRIPTION ?? "",
      automatic_payment_methods: {
        enabled: true,
      },
    };
    const payment_intent = await stripe.paymentIntents.create(params);
    res.send(payment_intent);
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal server error";
    res.status(500).send({ message: errorMessage });
  }
};

const getOrderByCustomer = async (req, res) => {
  try {
    const customerId = req.query.customer;

    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return res.status(400).send({ message: "Invalid customer ID" });
    }

    const { page, limit } = req.query;
    const pages = Number(page) || 1;
    const limits = Number(limit) || 8;
    const skip = (pages - 1) * limits;

    const totalDoc = await Order.countDocuments({
      customer: customerId,
    });

    const pipeline = (status) => [
      {
        $match: {
          status,
          customer: new mongoose.Types.ObjectId(customerId),
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$total" },
          count: { $sum: 1 },
        },
      },
    ];

    const [totalPendingOrder, totalProcessingOrder, totalDeliveredOrder] =
      await Promise.all([
        Order.aggregate(pipeline("Pending")),
        Order.aggregate(pipeline("Processing")),
        Order.aggregate(pipeline("Delivered")),
      ]);

    const orders = await Order.find({ customer: customerId })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limits);

    res.send({
      orders,
      limits,
      pages,
      pending: totalPendingOrder[0]?.count || 0,
      processing: totalProcessingOrder[0]?.count || 0,
      delivered: totalDeliveredOrder[0]?.count || 0,
      totalDoc,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.send(order);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getCustomerPrescriptions = async (req, res) => {
  try {
    const customerId = req.query.customer;
    const prescriptions = await Order.aggregate([
      { $match: { customer: new mongoose.Types.ObjectId(customerId) } },
      { $unwind: "$prescriptions" },
      {
        $project: {
          _id: 0,
          url: "$prescriptions",
          orderId: "$_id",
          invoice: "$invoice",
          createdAt: "$createdAt",
        },
      },
    ]);

    res.send({ prescriptions });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  addOrder,
  createPaymentIntent,
  getOrderById,
  getOrderByCustomer,
  getCustomerPrescriptions,
};

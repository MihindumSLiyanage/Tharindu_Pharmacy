const Order = require("../models/Order");

const getAllOrders = async (req, res) => {
  const {
    customerName,
    status,
    page = 1,
    limit = 8,
    day,
    startDate,
    endDate,
  } = req.query;

  const queryObject = {};

  if (status) {
    queryObject.status = { $regex: status, $options: "i" };
  }

  if (customerName) {
    queryObject.$or = [
      { "customer_info.name": { $regex: customerName, $options: "i" } },
    ];
    if (!isNaN(customerName)) {
      queryObject.$or.push({ invoice: Number(customerName) });
    }
  }

  if (day) {
    const today = new Date();
    const fromDate = new Date();
    fromDate.setDate(today.getDate() - Number(day));
    queryObject.createdAt = { $gte: fromDate, $lte: today };
  }

  if (startDate && endDate) {
    queryObject.updatedAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  const skip = (Number(page) - 1) * Number(limit);

  try {
    const totalDoc = await Order.countDocuments(queryObject);
    const orders = await Order.find(queryObject)
      .select(
        "invoice paymentMethod subTotal total customer_info discount shippingCost status createdAt updatedAt prescriptions"
      )
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .lean();

    res.json({ orders, limits: Number(limit), pages: Number(page), totalDoc });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getOrderCustomer = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.params.id })
      .sort({ _id: -1 })
      .lean();
    res.send(orders);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("cart.product")
      .lean();
    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }
    res.send(order);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await Order.updateOne({ _id: id }, { $set: { status } });
    res.status(200).json({ message: "Order Updated Successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    await Order.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Order Deleted Successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getDashboardRecentOrder = async (req, res) => {
  try {
    const { page = 1, limit = 8 } = req.query;
    const skip = (page - 1) * limit;

    const queryObject = {
      status: { $in: ["Pending", "Processing", "Delivered", "Cancel"] },
    };

    const totalDoc = await Order.countDocuments(queryObject);
    const orders = await Order.find(queryObject)
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .lean();

    res.send({ orders, page, limit, totalOrder: totalDoc });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getDashboardCount = async (req, res) => {
  try {
    const totalDoc = await Order.countDocuments();

    const [pending, processing, delivered] = await Promise.all([
      Order.aggregate([
        { $match: { status: "Pending" } },
        {
          $group: { _id: null, total: { $sum: "$total" }, count: { $sum: 1 } },
        },
      ]),
      Order.aggregate([
        { $match: { status: "Processing" } },
        { $group: { _id: null, count: { $sum: 1 } } },
      ]),
      Order.aggregate([
        { $match: { status: "Delivered" } },
        { $group: { _id: null, count: { $sum: 1 } } },
      ]),
    ]);

    res.send({
      totalOrder: totalDoc,
      totalPendingOrder: pending[0] || 0,
      totalProcessingOrder: processing[0]?.count || 0,
      totalDeliveredOrder: delivered[0]?.count || 0,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getDashboardAmount = async (req, res) => {
  let week = new Date();
  week.setDate(week.getDate() - 10);

  try {
    const [totalAmountAgg, monthlyAgg, recentOrders] = await Promise.all([
      Order.aggregate([{ $group: { _id: null, tAmount: { $sum: "$total" } } }]),
      Order.aggregate([
        {
          $match: {
            status: { $regex: "Delivered", $options: "i" },
            $expr: { $eq: [{ $month: "$updatedAt" }, { $month: new Date() }] },
          },
        },
        {
          $group: {
            _id: { month: { $month: "$updatedAt" } },
            total: { $sum: "$total" },
          },
        },
        { $sort: { _id: -1 } },
        { $limit: 1 },
      ]),
      Order.find(
        {
          createdAt: { $gte: week },
        },
        {
          paymentMethod: 1,
          paymentDetails: 1,
          total: 1,
          createdAt: 1,
          updatedAt: 1,
          status: 1,
        }
      ).lean(),
    ]);

    res.send({
      totalAmount: totalAmountAgg[0]?.tAmount?.toFixed(2) || "0.00",
      thisMonthlyOrderAmount: monthlyAgg[0]?.total || 0,
      ordersData: recentOrders,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getBestSellerProductChart = async (req, res) => {
  try {
    const totalDoc = await Order.countDocuments({});
    const bestSellingProduct = await Order.aggregate([
      {
        $unwind: "$cart",
      },
      {
        $group: {
          _id: "$cart.name",

          count: {
            $sum: "$cart.quantity",
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 4,
      },
    ]);

    res.send({
      totalDoc,
      bestSellingProduct,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getDashboardOrders = async (req, res) => {
  const { page = 1, limit = 8 } = req.query;
  const skip = (page - 1) * limit;
  const week = new Date();
  week.setDate(week.getDate() - 10);
  const today = new Date();

  try {
    const [
      totalDoc,
      orders,
      totalAmountAgg,
      todayOrders,
      monthTotalAgg,
      pending,
      processing,
      delivered,
      weeklyReport,
    ] = await Promise.all([
      Order.countDocuments(),
      Order.find({}).sort({ _id: -1 }).skip(skip).limit(Number(limit)).lean(),
      Order.aggregate([{ $group: { _id: null, tAmount: { $sum: "$total" } } }]),
      Order.find({ createdAt: { $gte: today.toDateString() } }).lean(),
      Order.aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            total: { $sum: "$total" },
          },
        },
        { $sort: { _id: -1 } },
        { $limit: 1 },
      ]),
      Order.aggregate([
        { $match: { status: "Pending" } },
        {
          $group: { _id: null, total: { $sum: "$total" }, count: { $sum: 1 } },
        },
      ]),
      Order.aggregate([
        { $match: { status: "Processing" } },
        { $group: { _id: null, count: { $sum: 1 } } },
      ]),
      Order.aggregate([
        { $match: { status: "Delivered" } },
        { $group: { _id: null, count: { $sum: 1 } } },
      ]),
      Order.find({
        status: { $regex: "Delivered", $options: "i" },
        createdAt: { $gte: week },
      }).lean(),
    ]);

    res.send({
      totalOrder: totalDoc,
      totalAmount: totalAmountAgg[0]?.tAmount?.toFixed(2) || "0.00",
      todayOrder: todayOrders,
      totalAmountOfThisMonth: monthTotalAgg[0]?.total?.toFixed(2) || "0.00",
      totalPendingOrder: pending[0] || 0,
      totalProcessingOrder: processing[0]?.count || 0,
      totalDeliveredOrder: delivered[0]?.count || 0,
      orders,
      weeklySaleReport: weeklyReport,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getSalesReport = async (req, res) => {
  const { startDate, endDate } = req.query;
  const filter = {
    createdAt: {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    },
  };

  try {
    const [
      revenue,
      totalOrders,
      avgOrderValue,
      topCustomers,
      topProducts,
      salesOverTime,
      cogs,
    ] = await Promise.all([
      Order.aggregate([
        { $match: filter },
        { $group: { _id: null, revenue: { $sum: "$total" } } },
      ]),
      Order.countDocuments(filter),
      Order.aggregate([
        { $match: filter },
        { $group: { _id: null, avg: { $avg: "$total" } } },
      ]),
      Order.aggregate([
        { $match: filter },
        {
          $group: {
            _id: "$customer_info.name",
            totalSpent: { $sum: "$total" },
          },
        },
        { $sort: { totalSpent: -1 } },
        { $limit: 5 },
      ]),
      Order.aggregate([
        { $match: filter },
        { $unwind: "$cart" },
        {
          $group: {
            _id: "$cart.name",
            qtySold: { $sum: "$cart.quantity" },
            totalRevenue: {
              $sum: { $multiply: ["$cart.quantity", "$cart.price"] },
            },
          },
        },
        { $sort: { qtySold: -1 } },
        { $limit: 5 },
      ]),
      Order.aggregate([
        { $match: filter },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
            },
            total: { $sum: "$total" },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),
      Order.aggregate([
        { $match: filter },
        { $unwind: "$cart" },
        {
          $group: {
            _id: null,
            totalCost: {
              $sum: { $multiply: ["$cart.quantity", "$cart.cost"] },
            },
          },
        },
      ]),
    ]);

    const totalRevenue = revenue[0]?.revenue || 0;
    const totalCost = cogs[0]?.totalCost || 0;
    const grossProfit = totalRevenue - totalCost;

    res.json({
      revenue: totalRevenue,
      totalOrders,
      avgOrderValue: avgOrderValue[0]?.avg || 0,
      topCustomers,
      topProducts,
      salesOverTime,
      cogs: totalCost,
      grossProfit,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  getOrderCustomer,
  updateOrder,
  deleteOrder,
  getBestSellerProductChart,
  getDashboardOrders,
  getDashboardRecentOrder,
  getDashboardCount,
  getDashboardAmount,
  getSalesReport,
};

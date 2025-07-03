require("dotenv").config();
const connectDataBase = require("../config/db");

const Customer = require("../models/Customer");
const customerData = require("../utils/customers");
const Admin = require("../models/Admin");
const adminData = require("../utils/admin");
const Language = require("../models/Language");
const languageData = require("../utils/language");
const Product = require("../models/Product");
const productData = require("../utils/products");
const Category = require("../models/Category");
const categoryData = require("../utils/category");
const Coupon = require("../models/Coupon");
const couponData = require("../utils/coupon");
const Order = require("../models/Order");
const orderData = require("../utils/orders");
const Supplier = require("../models/Supplier");
const supplierData = require("../utils/suppliers");

connectDataBase();

const importData = async () => {
  try {
    await Customer.deleteMany();
    await Customer.insertMany(customerData);

    await Admin.deleteMany();
    await Admin.insertMany(adminData);

    await Category.deleteMany();
    await Category.insertMany(categoryData);

    await Product.deleteMany();
    await Product.insertMany(productData);

    await Coupon.deleteMany();
    await Coupon.insertMany(couponData);

    await Order.deleteMany();
    await Order.insertMany(orderData);

    await Supplier.deleteMany();
    await Supplier.insertMany(supplierData);

    await Language.deleteMany();
    await Language.insertMany(languageData);

    console.log("Data inserted successfully!");
    process.exit();
  } catch (error) {
    console.log("error", error);
    process.exit(1);
  }
};

importData();

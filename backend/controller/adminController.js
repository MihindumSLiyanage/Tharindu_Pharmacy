const bcrypt = require("bcryptjs");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
const jwt = require("jsonwebtoken");
const { signInToken, tokenForVerify } = require("../config/auth");
const { sendEmail } = require("../config/email");
const {
  generatePasswordResetEmail,
  generateOrderReviewResultEmail,
} = require("../config/emailTemplates");
const Admin = require("../models/Admin");
const Order = require("../models/Order");

// Admin Login
const loginAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    if (admin && bcrypt.compareSync(req.body.password, admin.password)) {
      const token = signInToken(admin);
      res.send({
        token,
        _id: admin._id,
        name: admin.name,
        phone: admin.phone,
        email: admin.email,
        image: admin.image,
        role: admin.role,
      });
    } else {
      res.status(401).send({ message: "Invalid Email or password!" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Forgot Password for Admin
const forgotPassword = async (req, res) => {
  try {
    const staff = await Admin.findOne({ email: req.body.email });
    if (!staff) {
      return res
        .status(404)
        .send({ message: "Staff Not found with this email!" });
    }
    const token = tokenForVerify(staff);
    const emailBody = generatePasswordResetEmail(req.body.email, token);
    sendEmail(emailBody, res, "Please check your email to reset password!");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Reset Password for Admin
const resetPassword = async (req, res) => {
  const token = req.body.token;
  if (!token) return res.status(400).send({ message: "Token required!" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_FOR_VERIFY);
    const staff = await Admin.findOne({ email: decoded.email });
    if (!staff) return res.status(404).send({ message: "Staff not found" });

    const { newPassword } = req.body;
    if (!newPassword || newPassword.length < 8) {
      return res
        .status(400)
        .send({ message: "Password must be at least 8 characters long" });
    }

    staff.password = bcrypt.hashSync(newPassword);
    await staff.save();
    res.send({
      message: "Your password change successful, you can login now!",
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Add Staff (Admin/Pharmacist)
const addStaff = async (req, res) => {
  try {
    const { name, email, password, role, phone, image, address, joiningDate } =
      req.body;
    if (!name || !email || !password || !role) {
      return res
        .status(400)
        .send({ message: "Name, email, password, and role are required" });
    }

    const isAdded = await Admin.findOne({ email });
    if (isAdded) {
      return res.status(409).send({ message: "This Email already Added!" });
    }

    const newStaff = new Admin({
      name,
      email,
      role,
      password: bcrypt.hashSync(password),
      phone,
      image,
      address,
      joiningDate: joiningDate ? dayjs(joiningDate).utc().toDate() : Date.now(),
    });

    const staff = await newStaff.save();
    const token = signInToken(staff);
    res.status(201).send({
      token,
      _id: staff._id,
      name: staff.name,
      email: staff.email,
      role: staff.role,
      joiningDate: staff.joiningDate,
      phone: staff.phone,
      image: staff.image,
      address: staff.address,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Get All Staff
const getAllStaff = async (req, res) => {
  try {
    const admins = await Admin.find({}).select("-password");
    res.send(admins);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Get Staff By ID
const getStaffById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id).select("-password");
    if (!admin) {
      return res.status(404).send({ message: "Staff not found" });
    }
    res.send(admin);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Update Staff Details
const updateStaff = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id).select("-password");
    if (!admin) {
      return res.status(404).send({ message: "Staff not found" });
    }
    admin.name = req.body.name || admin.name;
    admin.email = req.body.email || admin.email;
    admin.phone = req.body.phone || admin.phone;
    admin.role = req.body.role || admin.role;
    admin.joiningDate = req.body.joiningDate
      ? dayjs(req.body.joiningDate).utc().toDate()
      : admin.joiningDate;
    admin.password = req.body.password
      ? bcrypt.hashSync(req.body.password)
      : admin.password;
    admin.image = req.body.image || admin.image;
    admin.address = req.body.address || admin.address;

    const updatedAdmin = await admin.save();
    const token = signInToken(updatedAdmin);
    res.send({
      token,
      _id: updatedAdmin._id,
      name: updatedAdmin.name,
      email: updatedAdmin.email,
      role: updatedAdmin.role,
      image: updatedAdmin.image,
      joiningDate: updatedAdmin.joiningDate,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Delete Staff
const deleteStaff = async (req, res) => {
  try {
    const deleted = await Admin.deleteOne({ _id: req.params.id });
    if (deleted.deletedCount === 0) {
      return res.status(404).send({ message: "Staff not found to delete!" });
    }
    res.status(200).send({ message: "Admin Deleted Successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Approve or Reject Order
const approveOrRejectOrder = async (req, res) => {
  try {
    const { status, reason } = req.body;
    const { id } = req.params;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status." });
    }

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });

    const emailBody = generateOrderReviewResultEmail(order, status, reason);
    await sendEmail(emailBody, res, `Order ${status} email sent to customer.`);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  loginAdmin,
  forgotPassword,
  resetPassword,
  addStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
  approveOrRejectOrder,
};

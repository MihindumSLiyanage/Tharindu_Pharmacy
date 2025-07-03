require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { signInToken, tokenForVerify } = require("../config/auth");
const { sendEmail } = require("../config/email");
const {
  generatePasswordResetEmail,
  generateEmailVerificationEmail,
} = require("../config/emailTemplates");
const Customer = require("../models/Customer");

const verifyEmailAddress = async (req, res) => {
  try {
    const isAdded = await Customer.findOne({ email: req.body.email });

    if (isAdded) {
      return res.status(403).send({
        message: "This Email already Added!",
      });
    } else {
      const token = tokenForVerify(req.body);

      const emailBody = generateEmailVerificationEmail(req.body.email, token);
      sendEmail(emailBody, res, "Please check your email to verify!");
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const registerCustomer = async (req, res) => {
  try {
    const token = req.params.token;
    const decodedToken = jwt.decode(token);

    if (!decodedToken)
      return res.status(400).send({ message: "Invalid token!" });

    const { name, email, password } = decodedToken;

    const isAdded = await Customer.findOne({ email: email });

    if (isAdded) {
      const token = signInToken(isAdded);
      return res.send({
        token,
        _id: isAdded._id,
        name: isAdded.name,
        email: isAdded.email,
        message: "Email Already Verified!",
      });
    }

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_FOR_VERIFY, (err, decoded) => {
        if (err) {
          return res.status(401).send({
            message: "Token Expired, Please try again!",
          });
        } else {
          const newCustomer = new Customer({
            name,
            email,
            password: bcrypt.hashSync(password),
          });
          newCustomer.save();
          const token = signInToken(newCustomer);
          res.send({
            token,
            _id: newCustomer._id,
            name: newCustomer.name,
            email: newCustomer.email,
            message: "Email Verified, Please Login Now!",
          });
        }
      });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const loginCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOne({ email: req.body.email });

    if (
      customer &&
      customer.password &&
      bcrypt.compareSync(req.body.password, customer.password)
    ) {
      const token = signInToken(customer);
      res.send({
        token,
        _id: customer._id,
        name: customer.name,
        email: customer.email,
        address: customer.address,
        phone: customer.phone,
        image: customer.image,
        gender: customer.gender,
      });
    } else {
      res.status(401).send({ message: "Invalid email or password!" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const customer = await Customer.findOne({ email: req.body.verifyEmail });

    if (!customer) {
      return res.status(404).send({
        message: "Customer Not found with this email!",
      });
    } else {
      const token = tokenForVerify(customer);
      const emailBody = generatePasswordResetEmail(customer.email, token);

      sendEmail(emailBody, res, "Please check your email to reset password!");
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const resetPassword = async (req, res) => {
  const token = req.body.token;
  const { email } = jwt.decode(token);
  const customer = await Customer.findOne({ email: email });

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_FOR_VERIFY, (err, decoded) => {
      if (err) {
        return res.status(500).send({
          message: "Token expired, please try again!",
        });
      } else {
        customer.password = bcrypt.hashSync(req.body.newPassword);
        customer.save();
        res.send({
          message: "Your password change successful, you can login now!",
        });
      }
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const customer = await Customer.findOne({ email: req.body.email });
    if (!customer.password) {
      return res.send({
        message:
          "For change password,You need to sign in with email & password!",
      });
    } else if (
      customer &&
      bcrypt.compareSync(req.body.currentPassword, customer.password)
    ) {
      customer.password = bcrypt.hashSync(req.body.newPassword);
      await customer.save();
      res.send({
        message: "Your password change successfully!",
      });
    } else {
      res.status(401).send({
        message: "Invalid email or current password!",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllCustomers = async (_req, res) => {
  try {
    const users = await Customer.find({}).sort({ _id: -1 });
    res.send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer)
      return res.status(404).send({ message: "Customer not found!" });
    res.send(customer);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (customer) {
      customer.name = req.body.name;
      customer.email = req.body.email;
      customer.phone = req.body.phone;
      customer.address = req.body.address;
      customer.image = req.body.image;
      customer.gender = req.body.gender || customer.gender;
      const updatedCustomer = await customer.save();
      const token = signInToken(updatedCustomer);
      res.send({
        token,
        _id: updatedCustomer._id,
        name: updatedCustomer.name,
        email: updatedCustomer.email,
        address: updatedCustomer.address,
        phone: updatedCustomer.phone,
        image: updatedCustomer.image,
        gender: updatedCustomer.gender,
      });
    } else {
      res.status(404).send({ message: "Customer not found" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const result = await Customer.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0)
      return res.status(404).send({ message: "Customer not found!" });
    res.send({ message: "Customer deleted successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  loginCustomer,
  registerCustomer,
  verifyEmailAddress,
  forgotPassword,
  changePassword,
  resetPassword,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};

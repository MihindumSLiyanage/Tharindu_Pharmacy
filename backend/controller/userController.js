require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { signInToken, tokenForVerify } = require("../config/auth");
const { sendEmail } = require("../config/email");
const {
  generatePasswordResetEmail,
  generateEmailVerificationEmail,
} = require("../config/emailTemplates");
const User = require("../models/User");

const verifyEmailAddress = async (req, res) => {
  try {
    const isAdded = await User.findOne({ email: req.body.email });

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

const registerUser = async (req, res) => {
  try {
    const token = req.params.token;
    const decodedToken = jwt.decode(token);

    if (!decodedToken)
      return res.status(400).send({ message: "Invalid token!" });

    const { name, email, password } = decodedToken;

    const isAdded = await User.findOne({ email: email });

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
          const newUser = new User({
            name,
            email,
            password: bcrypt.hashSync(password),
          });
          newUser.save();
          const token = signInToken(newUser);
          res.send({
            token,
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            message: "Email Verified, Please Login Now!",
          });
        }
      });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (
      user &&
      user.password &&
      bcrypt.compareSync(req.body.password, user.password)
    ) {
      const token = signInToken(user);
      res.send({
        token,
        _id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone,
        image: user.image,
        gender: user.gender,
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
    const user = await User.findOne({ email: req.body.verifyEmail });

    if (!user) {
      return res.status(404).send({
        message: "User Not found with this email!",
      });
    } else {
      const token = tokenForVerify(user);
      const emailBody = generatePasswordResetEmail(user.email, token);

      sendEmail(emailBody, res, "Please check your email to reset password!");
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const resetPassword = async (req, res) => {
  const token = req.body.token;
  const { email } = jwt.decode(token);
  const user = await User.findOne({ email: email });

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_FOR_VERIFY, (err, decoded) => {
      if (err) {
        return res.status(500).send({
          message: "Token expired, please try again!",
        });
      } else {
        user.password = bcrypt.hashSync(req.body.newPassword);
        user.save();
        res.send({
          message: "Your password change successful, you can login now!",
        });
      }
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user.password) {
      return res.send({
        message:
          "For change password,You need to sign in with email & password!",
      });
    } else if (
      user &&
      bcrypt.compareSync(req.body.currentPassword, user.password)
    ) {
      user.password = bcrypt.hashSync(req.body.newPassword);
      await user.save();
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

const getAllUsers = async (_req, res) => {
  try {
    const users = await User.find({}).sort({ _id: -1 });
    res.send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send({ message: "User not found!" });
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name;
      user.email = req.body.email;
      user.phone = req.body.phone;
      user.address = req.body.address;
      user.image = req.body.image;
      user.gender = req.body.gender || user.gender;
      const updatedUser = await user.save();
      const token = signInToken(updatedUser);
      res.send({
        token,
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        address: updatedUser.address,
        phone: updatedUser.phone,
        image: updatedUser.image,
        gender: updatedUser.gender,
      });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await User.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0)
      return res.status(404).send({ message: "User not found!" });
    res.send({ message: "User deleted successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  loginUser,
  registerUser,
  verifyEmailAddress,
  forgotPassword,
  changePassword,
  resetPassword,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};

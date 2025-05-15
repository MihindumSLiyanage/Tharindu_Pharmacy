require("dotenv").config();
const nodemailer = require("nodemailer");

const sendEmail = (body, res, message) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  transporter.verify(function (err, success) {
    if (err) {
      res.status(403).send({
        message: `Error occurred while verifying email server: ${err.message}`,
      });
      console.log("Email server verification error:", err.message);
    } else {
      console.log("Email server is ready to send messages.");
    }
  });

  transporter.sendMail(body, (err, data) => {
    if (err) {
      res.status(403).send({
        message: `Error occurred while sending email: ${err.message}`,
      });
    } else {
      res.send({
        message: message,
      });
    }
  });
};

module.exports = { sendEmail };

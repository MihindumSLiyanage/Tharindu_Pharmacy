const generatePasswordResetEmail = (email, token) => {
  return {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset",
    html: `<h2>Hello ${email}</h2>
        <p>A request has been received to change the password for your <strong>Tharindu Pharmacy</strong> account.</p>
        <p>This link will expire in <strong>15 minutes</strong>.</p>
        <p style="margin-bottom:20px;">Click this link to reset your password:</p>
        <a href=${process.env.WEBSITE_URL}/user/forget-password/${token} style="background:#22c55e;color:white;border:1px solid #22c55e; padding: 10px 15px; border-radius: 4px; text-decoration:none;">Reset Password</a>
        <p style="margin-top: 35px;">If you did not initiate this request, please contact us immediately at <a href='mailto:tharindupharmacy71@gmail.com'>tharindupharmacy71@gmail.com</a></p>
        <p style="margin-bottom:0px;">Thank you</p>
        <strong>Tharindu Pharmacy Team</strong>`,
  };
};

const generateEmailVerificationEmail = (email, token) => {
  return {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify Your Email",
    html: `<h2>Hello ${email}</h2>
        <p>Verify your email address to complete the signup and login into your <strong>Tharindu Pharmacy</strong> account.</p>
        <p>This link will expire in <strong>15 minutes</strong>.</p>
        <p style="margin-bottom:20px;">Click this link to activate your account:</p>
        <a href=${process.env.WEBSITE_URL}/user/email-verification/${token} style="background:#22c55e;color:white;border:1px solid #22c55e; padding: 10px 15px; border-radius: 4px; text-decoration:none;">Verify Account</a>
        <p style="margin-top: 35px;">If you did not initiate this request, please contact us immediately at <a href='mailto:tharindupharmacy71@gmail.com'>tharindupharmacy71@gmail.com</a></p>
        <p style="margin-bottom:0px;">Thank you</p>
        <strong>Tharindu Pharmacy Team</strong>`,
  };
};

const generateOrderReviewResultEmail = (order, status, reason) => {
  const isRejected = status === "Rejected";

  return {
    from: process.env.EMAIL_USER,
    to: order.customer_info.email,
    subject: `Order #${order.invoice} ${status}`,
    html: `
      <h2>Hello ${order.customer_info.name}</h2>
      <p>Your order with <strong>Tharindu Pharmacy</strong> has been <strong style="color: ${
        isRejected ? "#dc2626" : "#22c55e"
      };">${status}</strong>.</p>
      ${
        isRejected
          ? `<p><strong>Rejection Reason:</strong> ${
              reason || "Not specified."
            }</p>`
          : `<p>We are currently processing your order. You’ll receive another email once it’s on the way.</p>`
      }
      <p><strong>Invoice No:</strong> ${order.invoice}</p>

      <p style="margin-top: 35px;">If you have any questions, please contact us at <a href="mailto:tharindupharmacy71@gmail.com">tharindupharmacy71@gmail.com</a></p>
      <p style="margin-bottom:0px;">Thank you</p>
      <strong>Tharindu Pharmacy Team</strong>
    `,
  };
};

const generateExpiryAlertEmail = (products) => {
  const productList = products
    .map(
      (p) =>
        `<li><strong>${p.name}</strong> - Expires on: ${new Date(
          p.expiryDate
        ).toDateString()}</li>`
    )
    .join("");

  return {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: "Medicines Expiring in One Week",
    html: `<h2>Upcoming Expirations</h2>
        <p>The following medicines are set to expire in <strong>7 days</strong>:</p>
        <ul>${productList}</ul>
        <p>Please review and take necessary action.</p>
        <br/>
        <strong>Tharindu Pharmacy System</strong>`,
  };
};

module.exports = {
  generateExpiryAlertEmail,
  generatePasswordResetEmail,
  generateEmailVerificationEmail,
  generateOrderReviewResultEmail,
};

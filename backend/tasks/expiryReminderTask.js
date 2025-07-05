const cron = require("node-cron");
const dayjs = require("dayjs");
const Product = require("../models/Product");
const { sendEmail } = require("../config/email");
const { generateExpiryAlertEmail } = require("../config/emailTemplates");

// This logic lives entirely on the backend.
// It's handled by node-cron — runs in the background every day at 8 AM.
// It checks the DB for medicines expiring in 7 days.
// If there are any, it sends an email to the admin using Mailtrap.

const checkExpiringMedicines = async () => {
  const targetDate = dayjs().add(7, "day").startOf("day").toDate();
  const nextDay = dayjs(targetDate).add(1, "day").toDate();

  const expiringProducts = await Product.find({
    expiryDate: { $gte: targetDate, $lt: nextDay },
  });

  if (expiringProducts.length > 0) {
    const email = generateExpiryAlertEmail(expiringProducts);
    await sendEmail(email);
    console.log("Expiry alert email sent.");
  } else {
    console.log("No medicines expiring in 7 days.");
  }
};

// Schedule to run daily at 8 AM
cron.schedule("0 8 * * *", () => {
  console.log("Running Expiry Check Task...");
  checkExpiringMedicines();
});

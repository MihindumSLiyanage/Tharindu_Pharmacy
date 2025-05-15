const Product = require("../models/Product");

//decrease product quantity after a order created
const handleProductQuantity = async (cart) => {
  try {
    for (const p of cart) {
      await Product.updateOne(
        { _id: p._id },
        {
          $inc: {
            quantity: -p.quantity,
          },
        }
      );
    }
  } catch (err) {
    console.log("Error:", err.message);
  }
};

module.exports = {
  handleProductQuantity,
};

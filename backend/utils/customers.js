const bcrypt = require("bcryptjs");

const customers = [
  {
    name: "Kasun Isuru",
    email: "kasunis1234@gmail.com",
    password: bcrypt.hashSync("123456"),
    phone: "828-896-3442",
    gender: "Male",
    address: "123 Main St, Colombo, Sri Lanka",
  },
];

module.exports = customers;

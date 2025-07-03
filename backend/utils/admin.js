const bcrypt = require("bcryptjs");

const admins = [
  {
    name: "Admin",
    image: "https://i.ibb.co/WpM5yZZ/9.png",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("123456"),
    phone: "360-943-7332",
    role: "admin",
    joiningDate: new Date(),
    address: "123 Main St",
  },
  {
    name: "Pharmacist",
    image: "https://i.ibb.co/ZTWbx5z/team-1.jpg",
    email: "pharmacist@gmail.com",
    password: bcrypt.hashSync("123456"),
    phone: "505-771-8879",
    role: "pharmacist",
    joiningDate: new Date(),
    address: "456 Pharmacy Lane",
  },
];

module.exports = admins;

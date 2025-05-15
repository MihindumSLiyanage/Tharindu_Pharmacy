const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Kasun Isuru",
    email: "kasunis1234@gmail.com",
    password: bcrypt.hashSync("123456"),
    phone: "828-896-3442",
    gender: "Male",
    address: "123 Main St, Colombo, Sri Lanka",
  },
  {
    name: "Brain H. Landry",
    email: "brain@gmail.com",
    password: bcrypt.hashSync("123456"),
    phone: "714-200-5488",
    gender: "Male",
    address: "456 Oak Ave, Los Angeles, CA, USA",
  },
  {
    name: "Thomas",
    email: "thomas@gmail.com",
    password: bcrypt.hashSync("123456"),
    phone: "818-363-8091",
    gender: "Male",
    address: "789 Pine St, San Francisco, CA, USA",
  },
  {
    name: "Danielle R. Martin",
    email: "danielle@gmail.com",
    password: bcrypt.hashSync("123456"),
    phone: "831-539-6621",
    gender: "Female",
    address: "321 Elm St, Miami, FL, USA",
  },
  {
    name: "Linda",
    email: "linda@gmail.com",
    password: bcrypt.hashSync("123456"),
    phone: "801-844-8271",
    gender: "Female",
    address: "654 Birch Rd, Salt Lake City, UT, USA",
  },
  {
    name: "Eddie N. Garcia",
    email: "eddie@gmail.com",
    password: bcrypt.hashSync("123456"),
    phone: "917-313-4731",
    gender: "Male",
    address: "987 Cedar Ln, New York, NY, USA",
  },
  {
    name: "Williams",
    email: "williams@gmail.com",
    password: bcrypt.hashSync("123456"),
    phone: "714-776-3942",
    gender: "Male",
    address: "123 Maple St, Riverside, CA, USA",
  },
];

module.exports = users;

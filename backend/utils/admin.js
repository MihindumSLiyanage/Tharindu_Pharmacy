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
    specialization: "",
    licenseNumber: "",
  },
  {
    name: "Kasun Isuru",
    image: "https://i.ibb.co/ZTWbx5z/team-1.jpg",
    email: "kasunis1234@gmail.com",
    password: bcrypt.hashSync("123456"),
    phone: "505-771-8879",
    role: "pharmacist",
    joiningDate: new Date(),
    address: "456 Pharmacy Lane",
    specialization: "",
    licenseNumber: "PH123456",
  },
  {
    name: "Dorothy R. Brown",
    image: "https://i.ibb.co/d294W8Y/team-4.jpg",
    email: "dorothy@gmail.com",
    password: bcrypt.hashSync("123456"),
    phone: "708-628-3122",
    role: "pharmacist",
    joiningDate: new Date(),
    address: "789 Health Blvd",
    specialization: "",
    licenseNumber: "PH789321",
  },
  {
    name: "Alice B. Porter",
    image: "https://i.ibb.co/m5B0hK4/team-8.jpg",
    email: "alice@gmail.com",
    password: bcrypt.hashSync("123456"),
    phone: "708-488-9728",
    role: "doctor",
    joiningDate: new Date(),
    address: "1010 Clinic Dr",
    specialization: "Cardiology",
    licenseNumber: "DOC102938",
  },
  {
    name: "Corrie H. Cates",
    image: "https://i.ibb.co/SNN7JCX/team-6.jpg",
    email: "corrie@gmail.com",
    password: bcrypt.hashSync("123456"),
    phone: "914-623-6873",
    role: "doctor",
    joiningDate: new Date(),
    address: "1212 Medical Park",
    specialization: "Dermatology",
    licenseNumber: "DOC384756",
  },
  {
    name: "Shawn E. Palmer",
    image: "https://i.ibb.co/GWVWYNn/team-7.jpg",
    email: "shawn@gmail.com",
    password: bcrypt.hashSync("123456"),
    phone: "949-202-2913",
    role: "admin",
    joiningDate: new Date(),
    address: "654 Admin Rd",
    specialization: "",
    licenseNumber: "",
  },
  {
    name: "Stacey J. Meikle",
    image: "https://i.ibb.co/XjwBLcK/team-2.jpg",
    email: "stacey@gmail.com",
    password: bcrypt.hashSync("123456"),
    phone: "616-738-0407",
    role: "pharmacist",
    joiningDate: new Date(),
    address: "321 Med Supply St",
    specialization: "",
    licenseNumber: "PH645321",
  },
  {
    name: "Marion V. Parker",
    image: "https://i.ibb.co/3zs3H7z/team-5.jpg",
    email: "marion@gmail.com",
    password: bcrypt.hashSync("123456"),
    phone: "713-675-8813",
    role: "admin",
    joiningDate: new Date(),
    address: "999 Admin Circle",
    specialization: "",
    licenseNumber: "",
  },
];

module.exports = admins;

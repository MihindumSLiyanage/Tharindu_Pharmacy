const categories = [
  {
    _id: "62c827b5a427b63741da9175",
    name: "Beauty Care",
    icon: "https://i.ibb.co/cK06bpjL/Beauty-care-dhm3ek.png",
    children: ["Cleansers", "Toners", "Beauty Tools", "BB Cream"],
    status: "show",
    products: 120,
    description:
      "Beauty care products to enhance skin, hair, and overall appearance.",
  },
  {
    _id: "62cc0791d511b304aecdfbf2",
    name: "Baby Care",
    icon: "https://i.ibb.co/20wqCZFH/Baby-Care-s2xjj8.png",
    children: ["Baby Shampoo", "Baby Lotion", "Teething Toys", "Wipes"],
    status: "show",
    products: 200,
    description:
      "Products for infants, from food to diapers and baby health essentials.",
  },
  {
    _id: "62cc07b8d511b304aecdfbfa",
    name: "Capsules",
    icon: "https://i.ibb.co/27h36HxR/Capsules-dbhdx6.png",
    children: ["Iron Capsules", "Omega-3", "Digestive Enzymes", "Zinc"],
    status: "show",
    products: 150,
    description: "Capsules for vitamins, supplements, pain relief, and more.",
  },
  {
    _id: "62cfab28484d89068aa7a7f5",
    name: "Face and Skin Care",
    icon: "https://i.ibb.co/prQ7Gw97/Face-and-skin-care-b3slrz.png",
    children: ["Cleansing Oils", "Sheet Masks", "Face Scrubs", "Eye Cream"],
    status: "show",
    products: 180,
    description:
      "Face and skin care products for all types of skin and conditions.",
  },
  {
    _id: "62cfab39484d89068aa7a7fb",
    name: "Feminine Hygiene",
    icon: "https://i.ibb.co/Wp65XmqB/Feminine-hygiene-v7gan7.png",
    children: [
      "Menstrual Cups",
      "Panty Liners",
      "Vaginal Wash",
      "Heating Pads",
    ],
    status: "show",
    products: 100,
    description: "Feminine hygiene products for comfort and care.",
  },
  {
    _id: "62cfab4b484d89068aa7a7ff",
    name: "First Aid Kit",
    icon: "https://i.ibb.co/hxD9qQZM/First-Aid-Kit-xnevd2.png",
    children: ["Gauze", "Burn Cream", "Tweezers", "Ice Packs"],
    status: "show",
    products: 60,
    description:
      "First aid essentials for medical emergencies and minor injuries.",
  },
  {
    _id: "62cfad3d484d89068aa7a819",
    name: "Health & Wellness",
    icon: "https://i.ibb.co/3yN4HM6N/Health-Wellness-cs97se.png",
    children: ["Detox Kits", "Sleep Aids", "Immunity Boosters", "Energy Bars"],
    status: "show",
    products: 200,
    description:
      "Health and wellness products to maintain a healthy lifestyle.",
  },
  {
    _id: "62cfad52484d89068aa7a81f",
    name: "Oral Care",
    icon: "https://i.ibb.co/XxYSn4dG/Oral-ghsvdx.png",
    children: ["Whitening Kits", "Tongue Cleaners", "Oral Gels", "Braces Wax"],
    status: "show",
    products: 80,
    description:
      "Toothpaste, toothbrushes, and mouthwash for optimal oral hygiene.",
  },
  {
    _id: "62d02efd2d28e904b20e22bf",
    name: "Personal Care",
    icon: "https://i.ibb.co/0yNg9YxZ/Personal-Care-vnpln3.png",
    children: ["Deodorants", "Body Wash", "Loofahs", "Hair Removal Cream"],
    status: "show",
    products: 150,
    description: "Personal care products for everyday hygiene and grooming.",
  },
  {
    _id: "62d03a312d28e904b20e233c",
    name: "Pregnancy Care",
    icon: "https://i.ibb.co/2Y5xf33W/Pregnancy-w5f3rm.png",
    children: [
      "Stretch Mark Cream",
      "Prenatal Teas",
      "Nursing Pillows",
      "Folic Acid",
    ],
    status: "show",
    products: 70,
    description:
      "Products for pregnant women, including vitamins, wear, and essentials.",
  },
  {
    _id: "62d03a542d28e904b20e2342",
    name: "Sexual Wellbeing",
    icon: "https://i.ibb.co/yFFGBFqK/Sexual-wellbeing-pvprs0.png",
    children: [
      "Arousal Gels",
      "Protection Kits",
      "Safe Lubes",
      "Enhancement Pills",
    ],
    status: "show",
    products: 90,
    description: "Products promoting sexual health and wellness.",
  },
  {
    _id: "62d2bbd22e63b40520194f1b",
    name: "Supplements",
    icon: "https://i.ibb.co/hJ2mtKkd/Suppliments-oihczj.png",
    children: [
      "Joint Support",
      "Brain Boosters",
      "Hair Growth",
      "Men's Health",
    ],
    status: "hide",
    products: 130,
    description:
      "Nutritional supplements for fitness, weight loss, and health.",
  },
  {
    _id: "62d2bbe62e63b40520194f21",
    name: "Surgical Supplies",
    icon: "https://i.ibb.co/HZFCCX7/Surgical-wryhed.png",
    children: ["Surgical Masks", "Sterilizers", "Surgical Drapes", "Syringes"],
    status: "hide",
    products: 50,
    description:
      "Surgical supplies and medical tools for healthcare professionals.",
  },
];

module.exports = categories;

const coupons = [
  {
    title: "Beauty Care Discount",
    couponCode: "BEAUTY20",
    logo: "https://i.ibb.co/cK06bpjL/Beauty-care-dhm3ek.png",
    startTime: "2025-05-10T00:00:00.000Z",
    endTime: "2025-06-20T00:00:00.000Z",
    discount: {
      type: "fixed",
      value: 20,
    },
    minimumAmount: 200,
    productType: "Beauty Care",
    status: "show",
  },
  {
    title: "Baby Care Discount",
    couponCode: "BABY15",
    logo: "https://i.ibb.co/20wqCZFH/Baby-Care-s2xjj8.png",
    startTime: "2025-05-10T00:00:00.000Z",
    endTime: "2025-06-20T00:00:00.000Z",
    discount: {
      type: "percentage",
      value: 15,
    },
    minimumAmount: 300,
    productType: "Baby Care",
    status: "show",
  },
  {
    title: "Capsules Discount",
    couponCode: "CAPSULES10",
    logo: "https://i.ibb.co/27h36HxR/Capsules-dbhdx6.png",
    startTime: "2025-05-10T00:00:00.000Z",
    endTime: "2025-05-25T00:00:00.000Z",
    discount: {
      type: "percentage",
      value: 10,
    },
    minimumAmount: 1000,
    productType: "Capsules",
    status: "hide",
  },
];

module.exports = coupons;

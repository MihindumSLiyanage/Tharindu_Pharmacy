import requests from "./httpServices";

const OrderServices = {
  addOrder: async (body) => {
    return requests.post("/order/add", body);
  },

  createPaymentIntent: async (body) => {
    return requests.post("/order/create-payment-intent", body);
  },

  getOrderByCustomer: async ({ page = 1, limit = 8, customer }) => {
    return requests.get(
      `/order?limit=${limit}&page=${page}&customer=${customer}`
    );
  },

  getOrderById: async (id) => {
    return requests.get(`/order/${id}`);
  },

  getPrescriptionsByCustomer: async () => {
    return requests.get("/order/prescriptions");
  },
};

export default OrderServices;

import requests from "./httpServices";

const OrderServices = {
  addOrder: async (body) => {
    return requests.post("/order/add", body);
  },

  createPaymentIntent: async (body) => {
    return requests.post("/order/create-payment-intent", body);
  },

  getOrderByUser: async ({ page = 1, limit = 8 }) => {
    return requests.get(`/order?limit=${limit}&page=${page}`);
  },

  getOrderById: async (id, body) => {
    return requests.get(`/order/${id}`, body);
  },

  getPrescriptionsByUser: async () => {
    return requests.get("/order/prescriptions");
  },
};

export default OrderServices;

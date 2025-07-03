import requests from "./httpServices";

const CustomerServices = {
  customerLogin(body) {
    return requests.post("/customer/login", body);
  },

  verifyEmailAddress(body) {
    return requests.post("/customer/verify-email", body);
  },

  customerRegister(token, body) {
    return requests.post(`/customer/register/${token}`, body);
  },

  forgotPassword(body) {
    return requests.put("/customer/forgot-password", body);
  },

  resetPassword(body) {
    return requests.put("/customer/reset-password", body);
  },

  changePassword(body) {
    return requests.post("/customer/change-password", body);
  },

  updateCustomer(id, body) {
    return requests.put(`/customer/${id}`, body);
  },
};

export default CustomerServices;

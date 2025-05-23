import requests from "./httpServices";

const UserServices = {
  userLogin(body) {
    return requests.post("/user/login", body);
  },

  verifyEmailAddress(body) {
    return requests.post("/user/verify-email", body);
  },

  userRegister(token, body) {
    return requests.post(`/user/register/${token}`, body);
  },

  forgotPassword(body) {
    return requests.put("/user/forgot-password", body);
  },

  resetPassword(body) {
    return requests.put("/user/reset-password", body);
  },

  changePassword(body) {
    return requests.post("/user/change-password", body);
  },

  updateUser(id, body) {
    return requests.put(`/user/${id}`, body);
  },
};

export default UserServices;

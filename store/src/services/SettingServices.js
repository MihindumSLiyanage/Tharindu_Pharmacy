import requests from "./httpServices";

const SettingServices = {
  getAllLanguages: async () => {
    return requests.get(`/languages/all`);
  },
};

export default SettingServices;

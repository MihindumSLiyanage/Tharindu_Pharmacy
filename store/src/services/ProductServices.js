import requests from "./httpServices";

const ProductServices = {
  getShowingProducts: async () => {
    return requests.get("/products/show");
  },

  getShowingStoreProducts: async ({ category = "", name = "" }) => {
    return requests.get(`/products/store?category=${category}&name=${name}`);
  },

  getProductBySlug: async (slug) => {
    return requests.get(`/products/${slug}`);
  },
};

export default ProductServices;

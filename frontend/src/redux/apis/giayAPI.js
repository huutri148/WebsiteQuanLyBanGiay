import axiosService from "../../services/axiosService";
const url = "/api/products";

// GET /api/products
export const getList = () => {
  return axiosService.get(url);
};

// GET /api/products/:id
export const getGiayByID = (id) => {
  return axiosService.get(`url/${id}`);
};

// GET /api/products/:id/sizes
export const getSizeGiay = (id) => {
  return axiosService.get(`${url}/${id}/sizes`);
};

export const createGiay = (item) => {
  return axiosService.post(`${url}`, item);
};

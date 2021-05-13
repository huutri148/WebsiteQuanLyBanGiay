import axiosService from "../services/axiosService";
const url = "/api/products";

export const getList = () => {
  return axiosService.get(url);
};

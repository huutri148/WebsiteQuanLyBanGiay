import axiosService from "../services/axiosService";
const url = "/api/brands";

export const getList = () => {
  return axiosService.get(url);
};

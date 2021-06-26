import axiosService from "../../services/axiosService";
const url = "/api/paymentvouchers";

export const getList = () => {
  return axiosService.get(url);
};

export const create = (item) => {
  // Add config for cofig (header with token)
  return axiosService.post(url, item);
};

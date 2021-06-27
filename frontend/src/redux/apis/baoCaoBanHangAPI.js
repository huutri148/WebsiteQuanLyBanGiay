import axiosService from "../../services/axiosService";
const url = "/api/reports";

export const getList = () => {
  return axiosService.get(url);
};

export const create = (item) => {
  // Add config for cofig (header with token)
  return axiosService.post(url, item);
};
export const getDetails = (id) => {
  return axiosService.get(`${url}/details/${id}`);
};

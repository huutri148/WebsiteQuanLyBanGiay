import axiosService from "../../services/axiosService";
const url = "/api/carts";

export const getList = () => {
  return axiosService.get(url);
};

export const update = (id, item) => {
  // Add config for cofig (header with token)
  return axiosService.patch(`${url}/${id}`, item);
};

export const deleteItem = (id) => {
  // Add config for cofig (header with token)
  return axiosService.delete(`${url}/${id}`);
};

export const getDetails = (id) => {
  return axiosService.get(`${url}/details/${id}`);
};

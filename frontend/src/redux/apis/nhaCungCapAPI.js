import axiosService from "../../services/axiosService";
const url = "/api/suppliers";

export const getList = () => {
  return axiosService.get(url);
};

export const create = (item) => {
  // Add config for cofig (header with token)
  return axiosService.post(url, item);
};

export const update = (id, item) => {
  // Add config for cofig (header with token)
  return axiosService.patch(`${url}/${id}`, item);
};

export const deleteItem = (id) => {
  // Add config for cofig (header with token)
  return axiosService.delete(`${url}/${id}`);
};

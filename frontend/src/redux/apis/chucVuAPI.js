import axiosService from "../../services/axiosService";
const url = "/api/duties";

export const getList = () => {
  return axiosService.get(url);
};

export const getDutyPermissions = (id) => {
  return axiosService.get(`${url}/permissions/${id}`);
};

export const getPermissions = () => {
  return axiosService.get(url + "/permissions");
};

export const addPermissions = (id, item) => {
  // Add config for cofig (header with token)
  return axiosService.post(`${url}/permissions/${id}`, item);
};
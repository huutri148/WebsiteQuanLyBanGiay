import axiosService from "../../services/axiosService";
const url = "/api/duties";

export const getList = () => {
  return axiosService.get(url);
};

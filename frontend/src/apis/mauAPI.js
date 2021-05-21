import axiosService from "../services/axiosService";
const url = "/api/colors";

export const getList = () => {
  return axiosService.get(url);
};

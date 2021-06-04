import axiosService from "../../services/axiosService";
const url = "/api/sizes";

// GET /api/sizes
export const getList = () => {
  return axiosService.get(url);
};

import axiosService from "../../services/axiosService";
const url = "/api/users";

export const login = (item) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axiosService.post(`${url}/login`, item, config);
};

export const register = (item) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axiosService.post(`${url}`, item, config);
};
export const getList = () => {
  return axiosService.get(url);
};

export const getListKhachHang = () => {
  return axiosService.get(`${url}/customers`);
};

export const getListNhanVien = () => {
  return axiosService.get(`${url}/employees`);
};

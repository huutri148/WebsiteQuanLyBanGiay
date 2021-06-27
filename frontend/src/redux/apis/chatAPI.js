import axiosService from "../../services/axiosService";
const url = "/api/chats";

// GET /api/products
export const getList = () => {
  return axiosService.get(url);
};

// GET /api/products/:id
export const getRoomByID = (id) => {
  return axiosService.get(`${url}/${id}`);
};

// GET /api/chats/details
export const getListDetailRoom = () => {
  return axiosService.get(`${url}/details`);
};

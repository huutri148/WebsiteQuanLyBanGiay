import axios from "axios";

class AxiosService {
  constructor() {
    const instance = axios.create();
    instance.interceptors.response.use(this.handleSuccess, this.handlesError);
    this.instance = instance;
  }

  handleSuccess(response) {
    return response;
  }
  handlesError(error) {
    return Promise.reject(error);
  }
  get(url) {
    return this.instance.get(url);
  }
}
export default new AxiosService();

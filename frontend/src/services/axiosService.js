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
  post(url, item) {
    return this.instance.post(url, item);
  }
  patch(url, item) {
    return this.instance.patch(url, item);
  }
  delete(url) {
    return this.instance.delete(url);
  }
}
export default new AxiosService();

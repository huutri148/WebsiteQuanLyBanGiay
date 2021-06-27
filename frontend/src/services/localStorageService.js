class localStorageService {
  ls = window.localStorage;

  setItem(key, value) {
    value = JSON.stringify(value);
    this.ls.setItem(key, value);
    return true;
  }
  setAccessToken(key, value) {
    const now = new Date();
    var item = {
      value: value,
      expiry: now.getTime() + 60 * 1000,
    };
    item = JSON.stringify(item);
    this.ls.setItem(key, item);
    return true;
  }

  getItem(key) {
    let value = this.ls.getItem(key);
    try {
      return JSON.parse(value);
    } catch (e) {
      return null;
    }
  }
  removeItem(key) {
    this.ls.removeItem(key);
  }
}

export default new localStorageService();

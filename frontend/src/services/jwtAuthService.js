import localStorageService from "./localStorageService";

export const getAccessToken = () => localStorageService.getItem("access_token");
export const getRefreshToken = () =>
  localStorageService.getItem("refresh_token");

export const setAccessToken = (item) => {
  localStorageService.setItem("access_token", item);
};
export const setRefreshToken = (item) => {
  localStorageService.setItem("refresh_token", item);
};

export const isAuthenticated = () => !!getAccessToken();

export const authenticate = async () => {
  if (getRefreshToken()) {
    try {
      // const tokens = await refreshTokens() // call an API, returns tokens

      // const expires = (tokens.expires_in || 60 * 60) * 1000
      // const inOneHour = new Date(new Date().getTime() + expires)

      // // you will have the exact same setters in your Login page/app too
      // Cookies.set('access_token', tokens.access_token, { expires: inOneHour })
      // Cookies.set('refresh_token', tokens.refresh_token)

      // return true
      redirectToLogin();
      return false;
    } catch (error) {
      redirectToLogin();
      return false;
    }
  }

  redirectToLogin();
  return false;
};

const redirectToLogin = () => {};

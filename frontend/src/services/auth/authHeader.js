export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  if (user && user.accessToken) {
    return { "x-acccess-token": user.accessToken };
  } else {
    return {};
  }
}

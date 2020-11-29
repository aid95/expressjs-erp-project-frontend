export const logUserIn = (token) => {
  localStorage.setItem("token", token);
  window.location = "/";
};

export const logUserOut = () => {
  localStorage.removeItem("token");
  window.location = "/";
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

export const numberWithCommas = (n) => {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

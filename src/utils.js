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

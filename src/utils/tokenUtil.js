export const saveTokenToLocalStorage = (token) => {
    localStorage.setItem("jwtToken", token);
    localStorage.setItem("isLoggedIn", "true");
  };
  export const getTokenFromLocalStorage = () => {
    return localStorage.getItem("jwtToken");
  };
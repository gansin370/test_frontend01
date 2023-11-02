import { setCookie, getCookie, deleteCookie } from "cookies-next";

export default function useToken() {
  const token = getCookie("token");

  const setToken = (token: string) => {
    setCookie("token", token, {
      path: "/",
    });
  };

  const removeToken = () => {
    deleteCookie("token");
  };

  return {
    token,
    setToken,
    removeToken,
  };
}

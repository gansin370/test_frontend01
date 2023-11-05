import { useEffect } from "react";
import useToken from "./useToken";
import { useUserStore } from "@/store/user";
import oaRequest from "@/network/oaRequest";
import { axiosMethod } from "@/network/axiosUtils";

export default function useInitialize() {
  const { token } = useToken();
  const { setUser } = useUserStore();
  useEffect(() => {
    if (token) {
      // 세션 체크 로직
      oaRequest<User>({
        method: axiosMethod.GET,
        url: "/auth/info",
      }).then((res) => {
        setUser(res.data);
      });
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      let vh = window.innerHeight * 1;

      const rootElement = document.getElementById("__next");
      rootElement?.style.setProperty("height", `${vh}px`);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    () => window.removeEventListener("resize", handleResize);
  }, []);
}

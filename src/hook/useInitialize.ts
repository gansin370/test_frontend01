import { useEffect } from "react";
import useToken from "./useToken";
import { useUserStore } from "@/store/user";

export default function useInitialize() {
  const { token } = useToken();
  const { setUser } = useUserStore();
  useEffect(() => {
    if (token) {
      // 세션 체크 로직
      setUser({
        id: 1,
        name: "test",
        email: "test@example.com",
      });
    }
  }, [token]);

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

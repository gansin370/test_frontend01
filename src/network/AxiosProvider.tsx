import { PropsWithChildren } from "react";
import { oaAxiosInstance } from "./oaRequest";
import useToken from "@/hook/useToken";

export default function AxiosProvider({
  children,
}: PropsWithChildren<unknown>) {
  const { token } = useToken();
  if (token) {
    oaAxiosInstance.interceptors.request.use((config) => {
      config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    });
  }
  return <>{children}</>;
}

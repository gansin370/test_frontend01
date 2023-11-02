import { AxiosRequestParams, NetworkManager, request } from "./axiosUtils";

export const oaAxiosInstance = new NetworkManager().getInstance();

oaAxiosInstance.interceptors.request.use((config) => {
  // 임시 토큰
  // config.headers["Authorization"] =
  //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImV4cCI6MTczMDE4NjY4My42NjksImlhdCI6MTY5ODY1MDY4My42Njl9.TuYAi2NDdm9d_ZE-OF5xTaia27YXokJj9uJKuLCtVfw";
  return config;
});

const oaRequest = async <T>({
  method,
  url,
  queryParams,
  requestBody,
  headers,
}: AxiosRequestParams) => {
  // curlirize(instance);
  return request<T>(
    oaAxiosInstance,
    method,
    url,
    queryParams,
    requestBody,
    headers
  );
};

export default oaRequest;

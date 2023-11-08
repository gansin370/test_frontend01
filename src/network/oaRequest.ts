import { AxiosRequestParams, NetworkManager, request } from "./axiosUtils";

export const oaAxiosInstance = new NetworkManager().getInstance();

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

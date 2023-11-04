import axios, {
  AxiosInstance,
  AxiosRequestHeaders,
  AxiosResponse,
  Method,
} from "axios";
import qs from "qs";

export interface AxiosRequestParams {
  method: Method;
  url: string;
  queryParams?: any;
  requestBody?: any;
  headers?: any;
}

export const axiosMethod: Record<string, Method> = {
  GET: "get",
  POST: "post",
  PATCH: "patch",
  DELETE: "delete",
};

export const axiosUtils = {
  AXIOS_CONFIG_DEFAULT: {
    timeout: 300000,
    paramsSerializer: (params: unknown) =>
      qs.stringify(params, { arrayFormat: "brackets" }),
  },
};

export const request = async <T>(
  instance: AxiosInstance,
  method: Method,
  url: string,
  queryParams: unknown,
  requestBody: unknown,
  headers?: AxiosRequestHeaders
): Promise<AxiosResponse<T>> => {
  switch (method) {
    case axiosMethod.GET:
      return instance.get(url, { params: queryParams, headers });
    case axiosMethod.POST:
      return instance.post(url, requestBody, {
        params: queryParams,
        headers,
      });
    case axiosMethod.PATCH:
      return instance.put(url, requestBody, {
        params: queryParams,
        headers,
      });
    case axiosMethod.DELETE:
      return instance.delete(url, {
        params: queryParams,
        headers,
      });
    default:
      return Promise.reject(new Error("Invalid HttpMethod"));
  }
};

export class NetworkManager {
  private readonly baseURL: string;

  private instance: AxiosInstance | undefined;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_OUR_APT_SERVER_ROOT_URL as string;
  }

  public readonly createInstance = (): AxiosInstance => {
    const { baseURL } = this;
    const axiosConfig = {
      ...axiosUtils.AXIOS_CONFIG_DEFAULT,
      baseURL,
    };
    return axios.create(axiosConfig);
  };

  public readonly getInstance = (): AxiosInstance => {
    if (!this.instance) {
      this.instance = this.createInstance();
    }
    return this.instance;
  };
}

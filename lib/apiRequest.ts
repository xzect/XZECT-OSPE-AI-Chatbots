import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

const apiRequest = async <T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data?: any,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await axios({
      url,
      method,
      data,
      ...config,
    });

    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `API Error: ${error.response?.status} - ${error.message}`,
      );
    } else {
      throw new Error(`Unexpected Error: ${error}`);
    }
  }
};

export default apiRequest;

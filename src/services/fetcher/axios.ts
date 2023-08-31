import axios from "axios";

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

http.interceptors.request.use(
  (config) => {
    const accessToken = process.env.NEXT_PUBLIC_API_TOKEN;

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    throw error;
  },
);

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status == 401) {
      alert("error Token auth!");
    }
    return Promise.reject(error);
  },
);

export const defaultQueryFn = async ({ queryKey }: any) => {
  try {
    const { data } = await http.get(queryKey[0], { params: queryKey[1] });
    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) throw err.response;
    throw err;
  }
};

export { axios };

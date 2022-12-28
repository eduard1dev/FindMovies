import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/",
});

const request = async (options: AxiosRequestConfig, store?: any) => {
  const onSuccess = (response: AxiosResponse) => {
    return response.data;
  };

  const onError = (error: any) => {
    return Promise.reject(error.response);
  };

  return api(options).then(onSuccess).catch(onError);
};

export default request;

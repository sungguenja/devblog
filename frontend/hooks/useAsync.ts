import axios, { AxiosResponse } from "axios";
import camelcaseKeys from "camelcase-keys";

interface LooseObject {
  [key: string]: any;
}

export const changeCamelCase = (response: AxiosResponse) => {
  let data: LooseObject = {};
  try {
    data = camelcaseKeys(response.data, { deep: true });
  } catch (err) {
    console.log(err);
    data = response.data;
  }
  return {
    ...response,
    data,
  };
};

const axiosInstance = axios.create();
axiosInstance.interceptors.response.use(changeCamelCase);

export const useGetAsync = async (url: string) => {
  const response = await axiosInstance({ url: url, method: "GET" })
    .then((res) => res)
    .catch((e) => e);

  return response;
};

export const usePostAsync = async (url: string, data: object) => {
  const response = await axiosInstance({ url: url, data: data, method: "POST" })
    .then((res) => res)
    .catch((e) => e);

  return response;
};

export const useDeleteAsync = async (url: string) => {
  const response = await axiosInstance({ url: url, method: "DELETE" })
    .then((res) => res)
    .catch((e) => e);

  return response;
};

export const usePutAsync = async (url: string, data: object) => {
  const response = await axiosInstance({ url: url, data: data, method: "PUT" })
    .then((res) => res)
    .catch((e) => e);

  return response;
};

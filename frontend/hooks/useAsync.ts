import axios from "axios";

export const useGetAsync = async (url: string) => {
  const response = await axios({ url: url, method: "GET" })
    .then((res) => res)
    .catch((e) => e);

  return response;
};

export const usePostAsync = async (url: string, data: object) => {
  const response = await axios({ url: url, data: data, method: "POST" })
    .then((res) => res)
    .catch((e) => e);

  return response;
};

export const useDeleteAsync = async (url: string) => {
  const response = await axios({ url: url, method: "DELETE" })
    .then((res) => res)
    .catch((e) => e);

  return response;
};

export const usePutAsync = async (url: string, data: object) => {
  const response = await axios({ url: url, data: data, method: "PUT" })
    .then((res) => res)
    .catch((e) => e);

  return response;
};

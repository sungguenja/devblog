import axios from "axios";

interface LooseObject {
  [key: string]: any;
}

export const changeCamelCase = (response: any) => {
  if (typeof response === "object") {
    if (Array.isArray(response)) {
      let returnObject: any[] = [];
      for (var i = 0; i < response.length; i++) {
        returnObject[i] = changeCamelCase(response[i]);
      }
      return returnObject;
    } else {
      let returnObject: LooseObject = {};
      for (var key in response) {
        const keyList = key.split("_");
        let camelizedKey = keyList[0];
        for (var i = 1; i < keyList.length; i++) {
          camelizedKey += keyList[i][0].toUpperCase() + keyList[i].slice(1);
        }

        returnObject[camelizedKey] = changeCamelCase(response[key]);
      }
      return returnObject;
    }
  } else {
    return response;
  }
};

const axiosInstance = axios.create();
axiosInstance.interceptors.response.use((response: object) => {
  return changeCamelCase(response);
});

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

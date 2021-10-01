import axios from "axios";

const useGetCSRF = async () => {
  const csrfToken = await axios({
    url: "http://localhost:8000/users/csrftoken/asdf",
    method: "GET",
    withCredentials: true,
  })
    .then((res) => res)
    .catch((e) => e);

  return csrfToken;
};

export default useGetCSRF;

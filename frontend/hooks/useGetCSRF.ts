import axios from "axios";

const useGetCSRF = async () => {
  const csrfToken = await axios.get('http://localhost:8000/users/csrftoken/asdf')
  .then(res => res)
  .catch(e => e)

  return csrfToken;
};

export default useGetCSRF;